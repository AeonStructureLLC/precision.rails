class OrderItem < ActiveRecord::Base
  belongs_to :order
  attr_accessible :order_id, :quantity, :serialized_product

  def product
    Product
    ProductAddon
    MediaItem
    Category
    return Marshal::load(self.serialized_product)
  end

end
