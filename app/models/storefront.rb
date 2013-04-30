class Storefront < ActiveRecord::Base
  has_many :categories
  attr_accessible :billing_user_id, :default_currency, :default_language, :description, :inactive, :title, :url
end
