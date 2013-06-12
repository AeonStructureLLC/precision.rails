class StripeCard < ActiveRecord::Base
  attr_accessible :exp_month, :exp_year, :last4, :name, :stripe_customer_id, :type, :user_id
  belongs_to :user
  belongs_to :storefront
end
