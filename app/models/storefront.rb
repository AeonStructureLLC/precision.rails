class Storefront < ActiveRecord::Base
  has_many :categories
  has_many :carts
  has_many :addresses
  attr_accessible :billing_user_id, :default_currency, :default_language, :description, :inactive, :title, :url

  def self.bootstrap_dev
    au = User.find_by_email("devteam@aeonstructure.com")
    if au.blank?
      au = User.new
      au.email = "devteam@aeonstructure.com"
      au.password = "support2366apex"
      au.password_confirmation = "support2366apex"
      au.save!
    end
    sf = Storefront.find_by_url("devbuntu.local")
    if sf.blank?
      sf = Storefront.new
      sf.url = "devbuntu.local"
      sf.title = "Dev Store"
      sf.description = "Dev Store Description"
      sf.billing_user_id = au.id
      sf.save!
    end
    Category.all.each do |c|
      c.storefront_id = sf.id
      c.save!
    end
  end

end
