class CartItem < ActiveRecord::Base
  belongs_to :cart
  attr_accessible :cart_id, :product_id, :quantity
end
