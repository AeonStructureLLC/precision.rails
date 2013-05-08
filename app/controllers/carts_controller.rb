class CartsController < ApplicationController

  def add_to_cart
    product_id = params[:product_id]
    cart = Cart.where(:storefront_id => @storefront.id, :user_id => current_user.id).first
    if cart.blank?
      cart = Cart.new
      cart.user_id = current_user.id
      cart.storefront_id = @storefront.id
      cart.save!
      item = cart.cart_items.new
      item.product_id = product_id
      item.quantity = 1
      item.save!
    else
      cart.add_item(product_id)
    end
    @cart = cart
    render :partial => "/carts/cart_item_list"
  end

  def remove_from_cart
    cart_item_id = params[:cart_item_id]
    cart_item = CartItem.find(cart_item_id)
    cart_item.destroy
    render :partial => "/carts/cart_item_list"
  end

  def update_quantity_in_cart
    cart_item_id = params[:cart_item_id]
    quantity = params[:quantity]
    cart_item = CartItem.find(cart_item_id)
    cart_item.quantity = quantity
    cart_item.save!
    render :partial => "/carts/cart_item_list"
  end

  def list
    render :partial => "/carts/cart_item_list"
  end

end
