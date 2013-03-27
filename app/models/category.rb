class Category < ActiveRecord::Base
  acts_as_nested_set
  has_many :media_items
  default_scope order('title')
  attr_accessible :content, :depth, :description, :lft, :parent_id, :rgt, :title

  def categories
    return children
  end
end
