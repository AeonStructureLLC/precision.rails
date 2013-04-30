class Category < ActiveRecord::Base
  belongs_to :storefront
  has_many :media_items
  has_many :products
  default_scope order('title')
  attr_accessible :content, :depth, :description, :lft, :parent_id, :rgt, :title
  acts_as_nested_set

  def categories
    return children
  end
end
