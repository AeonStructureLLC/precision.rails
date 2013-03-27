class CategoriesController < ApplicationController

  def index
    @categories = Category.find_all_by_parent_id(nil)
  end

end
