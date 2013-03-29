class Product < ActiveRecord::Base
  belongs_to :category
  has_many :media_items
  has_many :product_addons
  attr_accessible :accessory, :category_id, :content, :description, :free_shipping, :price, :product_discontinued, :ship_flatrate, :title, :weight

  def addons
    addons = []
    self.product_addons.each do |addon|
      addons.push Product.find(addon_id)
    end
    return addons
  end

end
