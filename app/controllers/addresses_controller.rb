class AddressesController < ApplicationController

  def new
    address = Address.create(params[:address])
    address.storefront_id = @storefront.id
    address.user_id = current_user.id
    addresses = Address.find_all_by_user_id(current_user.id)
    if addresses.blank?
      address.shipping = true
      address.billing = true
    end
    address.save!
    render :partial => 'addresses/addresses_list'
  end

  def destroy
    address = Address.find(params[:id])
    address.destroy
    render json: address
  end

end
