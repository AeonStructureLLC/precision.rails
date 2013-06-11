class RegistrationsController < ApplicationController
  def create
    @user = AnonymousUser.find(current_user.id)
    if @user.register(params[:user])
      sign_in @user.becomes(User)
      render json: @user
    else
      render :new
    end
  end


  def check_registration
    email = params[:email]
    u = User.find_by_email(email)
    if u.blank?
      render :nothing => true, :status => 404
    else
      render :nothing => true, :status => 200
    end
  end

  def set_default_shipping_address
    current_user.set_default_shipping_address(params[:address_id])
    render :nothing => true, :status => 200
  end

  def set_default_billing_address
    current_user.set_default_billing_address(params[:address_id])
    render :nothing => true, :status => 200
  end

end
