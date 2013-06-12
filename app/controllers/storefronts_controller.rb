class StorefrontsController < ApplicationController
  def new
    
  end

  def create
    
  end

  def edit
    
  end

  def update

  end

  def destroy
    # NEVER DO THIS!
    storefront = Storefront.find(params[:id])
    storefront.inactive = true
    storefront.save!
  end
end
