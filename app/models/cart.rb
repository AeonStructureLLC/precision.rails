class Cart < ActiveRecord::Base
  belongs_to :storefront
  belongs_to :user
  has_many :cart_items
  attr_accessible :storefront_id, :user_id

  def subtotal
    subtotal = 0
    self.cart_items.each do |ci|
      p = Product.find(ci.product_id)
      subtotal = subtotal + (p.price * ci.quantity)
    end
    return subtotal
  end

end
