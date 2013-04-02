class CategoriesController < ApplicationController

  def index
    @categories = Category.find_all_by_parent_id(nil)
  end

  def stub
    require 'ostruct'
    category_listing = {
        :id => 0,
        :title => "New Category"
    }
    category_listing = OpenStruct.new category_listing
    render :partial => 'categories/category_listing', :locals => { :category_listing => category_listing }
  end

  def show
    @categories = Category.find_all_by_parent_id(nil)
    @category = Category.find(params[:id])
  end

  def new
    category = Category.create(params[:category])
    category.save!
    unless category.parent_id.blank?
      parent = Category.find(category.parent_id)
      category.move_to_child_of(parent)
      parent.reload
    end
    render :partial => 'categories/category_listing', :locals => { :category_listing => category }
  end

  def update
    @category = Category.find(params[:id])
    respond_to do |format|
      if @category.update_attributes(params[:category])
        format.html { }
        format.json { render json: @category }
      else
        format.html { render action: "edit" }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  def set_containment
    parent_id = params[:parent_id]
    child = Category.find(params[:child_id])
    if parent_id.blank?
      child.parent_id = nil
      child.save!
    else
      parent = Category.find(params[:parent_id])
      child.move_to_child_of(parent)
    end
    Category.all.each do |c|
      c.reload
    end
    render json: child
  end

  def destroy
    category = Category.find(params[:id])
    category.destroy
    render json: category
  end

end
