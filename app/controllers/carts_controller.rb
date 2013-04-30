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
      item = cart.cart_items.find_by_product_id(product_id)
      if item.blank?
        item = cart.cart_items.new
        item.product_id = product_id
        item.quantity = 1
        item.save!
      else
        item.quantity = item.quantity + 1
        item.save!
      end
    end
    render json: cart.to_json(:include => :cart_items)
  end

end
