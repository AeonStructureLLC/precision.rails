class Address < ActiveRecord::Base
  belongs_to :user
  belongs_to :storefront
  # attr_accessible :title, :body
  #after_create :setup_defaults

  def setup_defaults
    u = User.find(self.user_id)
    if u.addresses.count == 1
      self.shipping = true
      self.billing = true
      self.save!
    end
  end

end
