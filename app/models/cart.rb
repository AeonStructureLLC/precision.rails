class Cart < ActiveRecord::Base
  belongs_to :storefront
  belongs_to :user
  has_many :cart_items
  attr_accessible :storefront_id, :user_id
end
