class Order < ActiveRecord::Base
  belongs_to :storefront
  belongs_to :user
  has_many :order_items
  has_many :shipments
  default_scope order("order_number DESC")
  paginates_per 50
  after_create :setup_defaults
  attr_accessible :notes, :order_number, :order_status, :payment_method, :serialized_billing_address, :serialized_shipping_address, :serialized_shipping_option, :serialized_user, :storefront_id, :subtotal, :tax, :total

  def setup_defaults
    order_number = self.storefront.orders.count + 1000
    self.order_number = order_number
    self.save!
  end

  def create_from_cart(cart)
    User
    user = cart.user
    shipping_option = cart.cart_shipping_options.select{|o| o.selected}.first
    shipping_address = user.addresses.select{|o| o.shipping}.first
    billing_address = user.addresses.select{|o| o.billing}.first
    self.serialized_user = Marshal::dump(user)
    self.serialized_shipping_option = Marshal::dump(shipping_option)
    self.serialized_shipping_address = Marshal::dump(shipping_address)
    self.serialized_billing_address = Marshal::dump(billing_address)

    self.user_id = user.id
    self.subtotal = cart.subtotal
    self.tax = cart.tax
    self.total = self.subtotal + self.tax + shipping_option.cost

    if cart.alternate_payment_option.blank?
      card = user.default_stripe_card
      self.payment_method = "#{card.card_type} ending in #{card.last4}"
    else
      self.payment_method = cart.alternate_payment_option
    end

    self.save!

    cart.cart_items.each do |cart_item|
      product = Product.find(cart_item.product_id)
      order_item = self.order_items.new
      order_item.quantity = cart_item.quantity
      order_item.serialized_product = Marshal::dump(product)
      order_item.save!
    end

  end

  def shipping_option
    CartShippingOption
    return Marshal::load(self.serialized_shipping_option)
  end

  def shipping_address
    Address
    return Marshal::load(self.serialized_shipping_address)
  end

  def billing_address
    Address
    return Marshal::load(self.serialized_billing_address)
  end

  def user
    User
    StripeCard
    Address
    return Marshal::load(self.serialized_user)
  end

  def total_cents
    return (self.total * 100).to_i
  end

  def order_date
    date = self.created_at.to_date
    return date.strftime("%B #{date.day.ordinalize}, %Y")
  end

  def update_customer_fullname
    self.customer_fullname = self.user.fullname
    self.save!
  end


end
