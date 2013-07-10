class StorefrontPresencesController < ApplicationController

  def index
    render :partial => 'storefront_presences/index'
  end

  def update
    storefront_presence = StorefrontPresence.find(params[:id])
    if storefront_presence.update_attributes(params[:storefront_presence])
      render json: storefront_presence
    else
      render json: storefront_presence.errors, status: :unprocessable_entity
    end
  end

  def create
    zip = params[:zip]
    geo_area = GeoArea.find_by_zip(zip)
    presence_check = @storefront.storefront_presences.select{|o| o.geo_area_id == geo_area.id}
    if presence_check.blank?
      storefront_presence = @storefront.storefront_presences.new
      storefront_presence.geo_area_id = geo_area.id

      if @storefront.storefront_presences.select{|o| o.ship_from == true}.blank?
        storefront_presence.ship_from = true
      else
        storefront_presence.ship_from = false
      end

      storefront_presence.save!

      render :partial => 'storefront_presences/index'
    else
      render :partial => 'storefront_presences/index'
    end
  end

  def destroy
    storefront_presence = StorefrontPresence.find(params[:id])
    storefront_presence.destroy
    render json: storefront_presence
  end

end
