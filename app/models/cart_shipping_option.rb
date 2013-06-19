class CartShippingOption < ActiveRecord::Base
  belongs_to :cart
  #default_scope order()
  attr_accessible :cart_id, :cost, :label, :provider
end
