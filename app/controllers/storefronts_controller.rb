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

  def convert_cart_to_order
    converted = @storefront.convert_cart_to_order(@cart)
    if converted
      render :nothing => true, :status => 200
    else
      render :nothing => true, :status => 402
    end
  end


  def my_orders
    order_number = params[:order_number]
    if order_number.blank?
      @orders = Order.where(:storefront_id => @storefront.id, :user_id => current_user.id)
      render 'storefronts/my_orders'
    else
      @order = Order.where(:storefront_id => @storefront.id, :user_id => current_user.id, :order_number => order_number).first
      if @order.blank?
        redirect_to '/my_orders'
      else
        @page_title = "#{@storefront.title} - Invoice #{@order.order_number}"
        render 'storefronts/invoice'
      end
    end
  end

  def orders
    order_number = params[:order_number]
    if order_number.blank?
      @orders = Order.where(:storefront_id => @storefront.id).page params[:page]
      render 'storefronts/orders'
    else
      @order = Order.where(:storefront_id => @storefront.id, :order_number => order_number).first
      if @order.blank?
        redirect_to '/orders'
      else
        @page_title = "#{@storefront.title} - Invoice #{@order.order_number}"
        render 'storefronts/invoice'
      end
    end
  end

  def change_order_status
    order = Order.find(params[:order_id])
    order.order_status = params[:order_status]
    order.save!
    return_json = {}
    return_json['order_status'] = order.order_status
    render json: return_json
  end

  def add_shipment_to_order
    order = Order.find(params[:order_id])
    shipment = order.shipments.new
    shipment.provider = params[:shipment][:provider]
    shipment.tracking_number = params[:shipment][:tracking_number]
    shipment.save!
    render :partial => 'storefronts/order_shipments', :locals => { :shipments => order.shipments }
  end

  def remove_shipment
    shipment = Shipment.find(params[:shipment_id])
    @storefront.remove_shipment(shipment)
    render json: shipment
  end

  def render_shipments_for_order
    order = Order.find(params[:order_id])
    render :partial => 'storefronts/order_shipments', :locals => { :shipments => order.shipments }
  end

  def settings
    if @storefront.user_is_admin(current_user)
      render 'storefronts/settings'
    else
      redirect_to '/'
    end
  end

  def update_storefront_settings
    if @storefront.update_attributes(params[:storefront])
      render json: @storefront
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def set_ship_from_storefront_presence
    storefront_presence_id = params[:storefront_presence_id].to_i
    @storefront.storefront_presences.each do |storefront_presence|
      if storefront_presence.id == storefront_presence_id
        storefront_presence.ship_from = true
      else
        storefront_presence.ship_from = false
      end
      storefront_presence.save!
    end
    render json: storefront_presence_id
  end

  def create_admin_user
    user = User.create(params[:user])
    @storefront.storefront_admins.create(:user_id => user.id)
    render :partial => "storefront_admins/index"
  end

end