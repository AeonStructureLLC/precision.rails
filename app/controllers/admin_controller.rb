class AdminController < ApplicationController

  def index
    if current_user.email == "devteam@aeonstructure.com" || "dennisharrison@gmail.com" || "digilord@me.com"
      @storefronts = Storefront.all
      render 'admin/index'
    else
      redirect_to "/"
    end
  end

  def create_storefront
    if current_user.email == "devteam@aeonstructure.com" || "dennisharrison@gmail.com" || "digilord@me.com"
      storefront = Storefront.create(params[:storefront])
      storefront.inactive = false
      storefront.save!
      @storefronts = Storefront.all
      render :partial => 'admin/storefront_list'
    else
      redirect_to "/"
    end

  end

  def change_storefront_status
    if current_user.email == "devteam@aeonstructure.com" || "dennisharrison@gmail.com" || "digilord@me.com"
      storefront = Storefront.find(params[:storefront_id])
      storefront.inactive = params[:inactive]
      storefront.save!
      @storefronts = Storefront.all
      render :partial => 'admin/storefront_list'
    else
      redirect_to "/"
    end
  end

end
