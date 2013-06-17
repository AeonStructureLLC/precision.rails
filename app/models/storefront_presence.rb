class StorefrontPresence < ActiveRecord::Base
  attr_accessible :city_tax_rate, :county_tax_rate, :geo_area_id, :ship_from, :state_tax_rate, :storefront_id
  belongs_to :storefront
  belongs_to :geo_area
end
