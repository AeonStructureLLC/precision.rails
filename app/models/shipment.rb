class Shipment < ActiveRecord::Base
  belongs_to :order
  attr_accessible :order_id, :provider, :tracking_number
end
