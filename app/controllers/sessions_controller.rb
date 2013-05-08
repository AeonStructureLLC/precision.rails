class SessionsController < Devise::SessionsController

  def create
    anon_user_id = params[:anon_user_id]
    storefront = Storefront.find_by_url(request.host)
    anon_cart = Cart.get_or_create(storefront.id, anon_user_id)
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    current_cart = Cart.get_or_create(storefront.id, current_user.id)

    puts "=" * 50
    puts "Anon Cart ID: #{anon_cart.id} --- For User ID: #{anon_user_id}"
    puts "Current Cart ID: #{current_cart.id} --- For User ID: #{current_user.id}"
    puts "=" * 50

    anon_cart.transfer_to_cart_id(current_cart.id)
    respond_with resource, :location => after_sign_in_path_for(resource)
  end

end
