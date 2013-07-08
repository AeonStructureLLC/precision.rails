class StorefrontAdmin < ActiveRecord::Base
  belongs_to :storefront
  attr_accessible :storefront_id, :user_id
end
