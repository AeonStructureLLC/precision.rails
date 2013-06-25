class StorefrontsController < ApplicationController
  def new
    
  end

  def create
    
  end

  def edit
    
  end

  def update

  end

  def create_stripe_customer_for_user
    @storefront.create_stripe_customer_for_user(current_user.id, params[:stripe_token])
    render :partial => 'stripe_cards/stripe_cards_list'
  end

  def get_tax_rate_for_zip
    tax_rate = @storefront.get_tax_rate_for_zip(params[:zip])
    render :json => tax_rate
  end

  def get_shipping_options_for_cart
    @shipping_options = @storefront.get_shipping_options_for_cart(@cart.id)
    render :partial => 'storefronts/shipping_options'
  end

  def destroy
    # NEVER DO THIS!
    storefront = Storefront.find(params[:id])
    storefront.inactive = true
    storefront.save!
  end


  def my_orders
    order_number = params[:order_number]
    if order_number.blank?
      @orders = Order.where(:storefront_id => @storefront.id, :user_id => current_user.id)
      render 'storefronts/my_orders'
    else
      @order = Order.where(:storefront_id => @storefront.id, :user_id => current_user.id, :order_number => order_number).first
      if @order.blank?
        redirect_to "/my_orders"
      else
        @page_title = "#{@storefront.title} - Invoice #{@order.order_number}"
        render 'storefronts/invoice'
      end
    end
  end

end