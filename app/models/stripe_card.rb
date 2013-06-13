class StripeCard < ActiveRecord::Base
  attr_accessible :exp_month, :exp_year, :last4, :name, :stripe_customer_id, :type, :user_id
  belongs_to :user
  belongs_to :storefront
  before_destroy :clear_card_from_stripe


  def clear_card_from_stripe
    storefront = Storefront.find(self.storefront_id)
    uri = "https://api.stripe.com/v1/customers/#{self.stripe_customer_id}"
    auth = {:username => storefront.stripe_secret, :password => "password"}

    response = HTTParty.delete(uri, :basic_auth => auth)
    if response.code == 200
      pp JSON.parse(response.body)
    else
      pp "Failed with error code : #{response.code}"
    end
  end

end
