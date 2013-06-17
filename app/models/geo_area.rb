class GeoArea < ActiveRecord::Base
  # attr_accessible :title, :body
  has_many :storefront_presences
end
