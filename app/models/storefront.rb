class Storefront < ActiveRecord::Base
  require 'httparty'
  require 'pp'
  include HTTParty
  has_many :categories
  has_many :carts
  has_many :addresses
  has_many :stripe_cards
  attr_accessible :billing_user_id, :default_currency, :default_language, :description, :inactive, :title, :url

  def self.bootstrap_dev
    au = User.find_by_email("devteam@aeonstructure.com")
    if au.blank?
      au = User.new
      au.email = "devteam@aeonstructure.com"
      au.password = "support2366apex"
      au.password_confirmation = "support2366apex"
      au.save!
    end
    sf = Storefront.find_by_url("devbuntu.local")
    if sf.blank?
      sf = Storefront.new
      sf.url = "devbuntu.local"
      sf.title = "Dev Store"
      sf.description = "Dev Store Description"
      sf.billing_user_id = au.id
      sf.save!
    end
    Category.all.each do |c|
      c.storefront_id = sf.id
      c.save!
    end
  end

  def create_stripe_customer_for_user(user_id, stripe_token)
    if self.stripe_secret.blank?
      return "Storefront #{self.id} is missing Stripe Secret!"
    end

    user = User.find(user_id)
    uri = "https://api.stripe.com/v1/customers"
    auth = {:username => self.stripe_secret, :password => "password"}

    response = HTTParty.post(uri, :basic_auth => auth, :body => {:card => stripe_token, :email => user.email, :description => "Payment method for #{user.fullname}'s (#{user.id}) account for #{self.title} (#{self.url})" } )
    if response.code == 200
      response_json = JSON.parse(response.body)
      customer_id = response_json['id']
      card_type = response_json['active_card']['type']
      last4 = response_json['active_card']['last4']
      exp_month = response_json['active_card']['exp_month']
      exp_year = response_json['active_card']['exp_year']

      stripe_card = StripeCard.new
      stripe_card.user_id = user_id
      stripe_card.storefront_id = self.id
      stripe_card.stripe_customer_id = customer_id
      stripe_card.card_type = card_type
      stripe_card.last4 = last4
      stripe_card.exp_month = exp_month
      stripe_card.exp_year = exp_year

      stripe_card.save!
    else
      pp "Failed with error code : #{response.code}"
    end

  end

  def fetch_stripe_customer_for_payment(stripe_card_id)
    if self.stripe_secret.blank?
      return "Storefront #{self.id} is missing Stripe Secret!"
    end

    stripe_card = PaymentMethod.find(payment_method_id)
    user = User.find(payment_method.user_id)
    uri = "https://api.stripe.com/v1/customers/#{user.stripe_customer_id}"
    auth = {:username => self.stripe_secret, :password => "password"}

    response = HTTParty.post(uri, :basic_auth => auth )
    if response.code == 200
      pp JSON.parse(response.body)
    else
      pp "Failed with error code : #{response.code}"
    end

  end

end
