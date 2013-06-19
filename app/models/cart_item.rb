class CartItem < ActiveRecord::Base
  belongs_to :cart
  belongs_to :product
  default_scope order('created_at DESC')
  attr_accessible :cart_id, :product_id, :quantity
end
