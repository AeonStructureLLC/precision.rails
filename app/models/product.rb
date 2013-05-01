class Product < ActiveRecord::Base
  belongs_to :category
  has_many :media_items
  has_many :product_addons
  default_scope order('title')
  attr_accessible :accessory, :category_id, :content, :description, :free_shipping, :price, :product_discontinued, :ship_flatrate, :ship_flatrate_price, :title, :weight

  def addons
    addons = []
    self.product_addons.each do |addon|
      addons.push Product.find(addon.addon_id)
    end
    return addons
  end

  def cover_image_src
    if self.media_items.blank?
      cover_image_src = "/images/missing_product_image.png"
    else
      media_item = MediaItem.where(:product_id => self.id, :cover => true).first
      if media_item.blank?
        cover_image_src = "/media_controller/#{self.media_items.first.uuid}_preview.png"
      else
        cover_image_src = "/media_controller/#{media_item.uuid}_preview.png"
      end
    end
    return cover_image_src
  end

  def cover_thumb_src
    if self.media_items.blank?
      cover_image_src = "/images/missing_product_image_thumb.png"
    else
      media_item = MediaItem.where(:product_id => self.id, :cover => true).first
      if media_item.blank?
        cover_image_src = "/media_controller/#{self.media_items.first.uuid}_thumb.png"
      else
        cover_image_src = "/media_controller/#{media_item.uuid}_thumb.png"
      end
    end
    return cover_image_src
  end

end