class Storefront < ActiveRecord::Base
  has_many :categories
  has_many :carts
  has_many :addresses
  has_many :stripe_cards
  has_many :storefront_presences
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
      pp "create_stripe_customer_for_user SUCCESS: #{response_json}"

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

      updated_card = StripeCard.where(:user_id => user_id, :storefront_id => self.id, :last4 => last4, :card_type => card_type).first
      unless updated_card.blank?
        updated_card.destroy
      end

      stripe_cards = StripeCard.find_all_by_user_id(user_id)
      if stripe_cards.blank?
        address.is_default = true
      end

      stripe_card.save!
    else
      pp "create_stripe_customer_for_user FAILED with error code : #{response.code}"
    end

  end

  def fetch_stripe_customer_for_payment(stripe_card_id)
    if self.stripe_secret.blank?
      return "Storefront #{self.id} is missing Stripe Secret!"
    end

    stripe_card = StripeCard.find(stripe_card_id)
    user = User.find(stripe_card.user_id)
    uri = "https://api.stripe.com/v1/customers/#{stripe_card.stripe_customer_id}"
    auth = {:username => self.stripe_secret, :password => "password"}

    response = HTTParty.post(uri, :basic_auth => auth )
    if response.code == 200
      pp "fetch_stripe_customer_for_payment SUCCESS: #{JSON.parse(response.body)}"
    else
      pp "fetch_stripe_customer_for_payment FAILED with error code: #{response.code}"
    end

  end

  def get_tax_rate_for_zip(zip)
    customer_geo_area = GeoArea.find_by_zip(zip)
    tax_rate = 0.0
    state_tax_rate = 0.0
    county_tax_rate = 0.0
    city_tax_rate = 0.0
    self.storefront_presences.each do |sp|
      storefront_geo_area = sp.geo_area
      if storefront_geo_area == customer_geo_area
        state_tax_rate = sp.state_tax_rate
        county_tax_rate = sp.county_tax_rate
        city_tax_rate = sp.city_tax_rate
      else
        areas = GeoArea.where(:state => storefront_geo_area.state, :county => storefront_geo_area.county)
        areas.each do |area|
          if area.state == customer_geo_area.state
            state_tax_rate = sp.state_tax_rate
          end
          if area.county == customer_geo_area.county
            county_tax_rate = sp.county_tax_rate
          end
        end
      end
    end

    tax_rate = state_tax_rate + county_tax_rate + city_tax_rate
    return tax_rate
  end

end
