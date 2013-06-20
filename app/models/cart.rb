class Cart < ActiveRecord::Base
  belongs_to :storefront
  belongs_to :user
  has_many :cart_items
  has_many :cart_shipping_options
  attr_accessible :storefront_id, :user_id

  def clear
    self.cart_items.destroy_all
    self.cart_shipping_options.destroy_all
    self.alternate_payment_option = ""
    self.save!
  end

  def subtotal
    subtotal = 0.0
    self.cart_items.each do |ci|
      p = Product.find(ci.product_id)
      subtotal = subtotal + (p.price * ci.quantity)
    end
    return subtotal
  end

  def tax
    tax = 0.0
    shipping_address = self.user.addresses.select{|o| o.shipping}.first
    tax_rate = self.storefront.get_tax_rate_for_zip(shipping_address.postal_code)
    return (self.subtotal * (tax_rate / 100)).round(2)
  end

  def item_count
    quantity = 0
    self.cart_items.each do |ci|
      quantity = quantity + ci.quantity
    end
    return quantity
  end

  def weight
    weight = 0.0
    self.cart_items.each do |ci|
      p = Product.find(ci.product_id)
      weight = weight + (p.weight * ci.quantity)
    end
    return weight
  end

  def self.get_or_create(storefront_id, user_id)
    cart = Cart.where(:storefront_id => storefront_id, :user_id => user_id).first
    if cart.blank?
      cart = Cart.new
      cart.storefront_id = storefront_id
      cart.user_id = user_id
      cart.save!
    end
    return cart
  end

  def add_item(product_id)
    item = self.cart_items.find_by_product_id(product_id)
    if item.blank?
      item = self.cart_items.new
      item.product_id = product_id
      item.quantity = 1
      item.save!
    else
      item.quantity = item.quantity + 1
      item.save!
    end
  end

  def transfer_to_cart_id(cart_id)
    new_cart = Cart.find(cart_id)
    self.cart_items.each do |item|
      item.quantity.times do
        new_cart.add_item(item.product_id)
      end
    end
    self.destroy
    return new_cart
  end

  def cart_items_by_product_weight
    return self.cart_items.sort_by! { |ci| ci.product.weight }
  end

end
