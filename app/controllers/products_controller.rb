class ProductsController < ApplicationController

  def index
    @products = Product.find_all_by_category_id(params[:category_id])
  end

  def addons_index
    addons = Product.find_all_by_accessory(true)
    render :partial => 'products/addons_index', :locals => { :addons => addons }
  end

  def stub
    require 'ostruct'
    product_listing = {
        :id => 0,
        :title => "New Product",
        :price => 9.99,
        :weight => 5.00,
        :free_shipping => false,
        :description => "New Product - Description",
        :ship_flatrate => 9.99,
        :product_discontinued => false,
        :content => "New Product - Content"
    }
    product_listing = OpenStruct.new product_listing
    render :partial => 'products/product_listing', :locals => { :product_listing => product_listing }
  end

  def show
    @categories = Category.find_all_by_parent_id(nil)
    @product = Product.find(params[:id])
  end

  def new
    product = Product.create(params[:product])
    product.save!
    render :partial => 'products/product_listing', :locals => { :product_listing => product }
  end

  def update
    @product = Product.find(params[:id])
    respond_to do |format|
      if @product.update_attributes(params[:product])
        format.html { }
        format.json { render json: @product }
      else
        format.html { render action: "edit" }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  def link_product_addon
    product_id = params[:product_id]
    addon_id = params[:addon_id]
    product = Product.find(product_id)
    addon = Product.find(addon_id)
    unless product.addons.include? addon
      product_addon = ProductAddon.new
      product_addon.product_id = product_id
      product_addon.addon_id = addon_id
      product_addon.save!
    end
    render json: addon
  end

  def unlink_product_addon
    product_id = params[:product_id]
    addon_id = params[:addon_id]
    product = Product.find(product_id)
    addon = Product.find(addon_id)
    if product.addons.include? addon
      product_addons = ProductAddon.where(:product_id => product_id, :addon_id => addon_id)
      product_addons.each do |product_addon|
        product_addon.destroy
      end
    end
    render json: addon
  end

  def destroy
    product = Product.find(params[:id])
    product.destroy
    render json: product
  end

end
