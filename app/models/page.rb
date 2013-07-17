class Page < ActiveRecord::Base
  belongs_to :storefront
  has_many :media_items
  has_many :categories
  has_many :products
  attr_accessible :active, :depth, :description, :lft, :page_order, :parent_id, :rgt, :storefront_id, :title
  acts_as_nested_set

  def pages
    return children
  end

end
