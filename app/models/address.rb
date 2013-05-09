class Address < ActiveRecord::Base
  belongs_to :user
  belongs_to :storefront
  # attr_accessible :title, :body
end
