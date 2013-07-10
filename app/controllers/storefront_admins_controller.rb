class StorefrontAdminsController < ApplicationController

  def index
    render :partial => 'storefront_admins/index'
  end

  def create
    user = User.find_by_email(params[:email])
    admin_check = @storefront.storefront_admins.select{|o| o.user_id == user.id}
    if admin_check.blank?
      storefront_admin = @storefront.storefront_admins.new
      storefront_admin.user_id = user.id
      storefront_admin.save!
      render :partial => 'storefront_admins/index'
    else
      render :partial => 'storefront_admins/index'
    end
  end

  def destroy
    storefront_admin = StorefrontAdmin.find(params[:id])
    storefront_admin.destroy
    render json: storefront_admin
  end

end
