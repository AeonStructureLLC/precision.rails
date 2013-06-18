class CartItem < ActiveRecord::Base
  belongs_to :cart
  belongs_to :product
  attr_accessible :cart_id, :product_id, :quantity
end
