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

  def destroy
    # NEVER DO THIS!
    storefront = Storefront.find(params[:id])
    storefront.inactive = true
    storefront.save!
  end
end