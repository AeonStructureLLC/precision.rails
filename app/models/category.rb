class Category < ActiveRecord::Base
  has_many :media_items
  default_scope order('title')
  attr_accessible :content, :depth, :description, :lft, :parent_id, :rgt, :title
  acts_as_nested_set

  def categories
    return children
  end
end
