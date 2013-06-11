class User < ActiveRecord::Base
  has_many :carts
  has_many :addresses

  ACCESSIBLE_ATTRS = [:email, :password, :password_confirmation, :remember_me]
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :token_authenticatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible *ACCESSIBLE_ATTRS
  # attr_accessible :title, :body

  def greeting
    if self.fullname.blank?
      return "Hello, #{email}"
    else
      return "Hello, #{self.firstname}"
    end
  end

  def firstname
    unless self.fullname.blank?
      return self.fullname.split[0]
    end
  end

  def is_anonymous
    if self.class == User
      return false
    else
      return true
    end
  end

  def as_json(options)
    # make sure options is not nil
    options ||= {}
    # call super with modified options
    super options.deep_merge(methods: [:greeting, :is_anonymous, :addresses])
  end

  def set_default_shipping_address(address_id)
    self.addresses.each do |a|
      a.shipping = false
      if a.id == address_id.to_i
        a.shipping = true
      end
      a.save!
    end
  end

  def set_default_billing_address(address_id)
    self.addresses.each do |a|
      a.billing = false
      if a.id == address_id.to_i
        a.billing = true
      end
      a.save!
    end
  end

end
