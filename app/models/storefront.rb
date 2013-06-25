class Storefront < ActiveRecord::Base
  require 'active_shipping'
  include ActiveMerchant::Shipping
  has_many :categories
  has_many :carts
  has_many :addresses
  has_many :stripe_cards
  has_many :storefront_presences
  has_many :orders
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

  def create_stripe_customer_for_user(user_id, stripe_token)
    if self.stripe_secret.blank?
      return "Storefront #{self.id} is missing Stripe Secret!"
    end

    user = User.find(user_id)
    uri = "https://api.stripe.com/v1/customers"
    auth = {:username => self.stripe_secret, :password => "password"}

    response = HTTParty.post(uri, :basic_auth => auth, :body => {:card => stripe_token, :email => user.email, :description => "Payment method for #{user.fullname}'s (#{user.id}) account for #{self.title} (#{self.url})" } )
    if response.code == 200
      response_json = JSON.parse(response.body)
      pp "create_stripe_customer_for_user SUCCESS: #{response_json}"

      customer_id = response_json['id']
      card_type = response_json['active_card']['type']
      last4 = response_json['active_card']['last4']
      exp_month = response_json['active_card']['exp_month']
      exp_year = response_json['active_card']['exp_year']

      stripe_card = StripeCard.new
      stripe_card.user_id = user_id
      stripe_card.storefront_id = self.id
      stripe_card.stripe_customer_id = customer_id
      stripe_card.card_type = card_type
      stripe_card.last4 = last4
      stripe_card.exp_month = exp_month
      stripe_card.exp_year = exp_year

      updated_card = StripeCard.where(:user_id => user_id, :storefront_id => self.id, :last4 => last4, :card_type => card_type).first
      unless updated_card.blank?
        updated_card.destroy
      end

      stripe_cards = StripeCard.find_all_by_user_id(user_id)
      if stripe_cards.blank?
        address.is_default = true
      end

      stripe_card.save!
    else
      pp "create_stripe_customer_for_user FAILED with error code : #{response.code}"
    end

  end

  def fetch_stripe_customer_for_payment(stripe_card_id)
    if self.stripe_secret.blank?
      return "Storefront #{self.id} is missing Stripe Secret!"
    end

    stripe_card = StripeCard.find(stripe_card_id)
    user = User.find(stripe_card.user_id)
    uri = "https://api.stripe.com/v1/customers/#{stripe_card.stripe_customer_id}"
    auth = {:username => self.stripe_secret, :password => "password"}

    response = HTTParty.post(uri, :basic_auth => auth )
    if response.code == 200
      pp "fetch_stripe_customer_for_payment SUCCESS: #{JSON.parse(response.body)}"
    else
      pp "fetch_stripe_customer_for_payment FAILED with error code: #{response.code}"
    end

  end

  def get_tax_rate_for_zip(zip)
    customer_geo_area = GeoArea.find_by_zip(zip)
    tax_rate = 0.0
    state_tax_rate = 0.0
    county_tax_rate = 0.0
    city_tax_rate = 0.0
    self.storefront_presences.each do |sp|
      storefront_geo_area = sp.geo_area
      if storefront_geo_area == customer_geo_area
        state_tax_rate = sp.state_tax_rate
        county_tax_rate = sp.county_tax_rate
        city_tax_rate = sp.city_tax_rate
      else
        areas = GeoArea.where(:state => storefront_geo_area.state, :county => storefront_geo_area.county)
        areas.each do |area|
          if area.state == customer_geo_area.state
            state_tax_rate = sp.state_tax_rate
          end
          if area.county == customer_geo_area.county
            county_tax_rate = sp.county_tax_rate
          end
        end
      end
    end

    tax_rate = state_tax_rate + county_tax_rate + city_tax_rate
    return tax_rate
  end

  def get_shipping_options_for_cart(cart_id)
    cart = Cart.find(cart_id)
    shipping_destination_address = Address.where(:user_id => cart.user.id, :shipping => true).first

    package_weight_counter = 0.0
    packages = []

    cart.cart_items_by_product_weight.each do |ci|
      ci.quantity.times do

        if (package_weight_counter + ci.product.weight) <= 70
          package_weight_counter = package_weight_counter + ci.product.weight
        else
          p = Package.new((package_weight_counter * 16), [], :units => :imperial)
          packages << p
          package_weight_counter = ci.product.weight
        end

      end

    end

    p = Package.new((package_weight_counter * 16), [], :units => :imperial)
    packages << p

    packages.each do |package|
      #pp package
    end

    shipping_origin_geo_area = StorefrontPresence.where(:storefront_id => self.id, :ship_from => true).first.geo_area

    shipping_origin = Location.new(
        :country => 'US',
        :state => shipping_origin_geo_area.state,
        :city => shipping_origin_geo_area.primary_city,
        :zip => shipping_origin_geo_area.zip
    )

    shipping_destination = Location.new(
        :country => 'US',
        :state => shipping_destination_address.state,
        :city => shipping_destination_address.city,
        :zip => shipping_destination_address.postal_code
    )

    ups = UPS.new(:login => 'dennisharrison', :password => 'Q210r0n3aeon', :key => 'CCB8702B7BA43C76')
    ups_response = ups.find_rates(shipping_origin, shipping_destination, packages)
    ups_rates = ups_response.rates.sort_by(&:price).collect {|rate| [rate.service_name, rate.price]}

    usps = USPS.new(:login => '173AEONS6843')
    usps_response = usps.find_rates(shipping_origin, shipping_destination, packages)
    usps_rates = usps_response.rates.sort_by(&:price).collect {|rate| [rate.service_name, rate.price]}
    usps_rates.delete_if {|x| x.first.include?("Flat Rate")}
    usps_rates.delete_if {|x| x.first.include?("Hold For Pickup")}
    usps_rates.delete_if {|x| x.first.include?("Library")}
    usps_rates.delete_if {|x| x.first.include?("Media")}

    fedex = FedEx.new(:key => 'c5bY8XoS6PaRFLhi', :password => '5hQpZoir2g9K4pdLqaYSEp15J', :account => '374170015', :login => '105295872')
    fedex_response = fedex.find_rates(shipping_origin, shipping_destination, packages)
    fedex_rates = fedex_response.rates.sort_by(&:price).collect {|rate| [rate.service_name, rate.price]}

    shipping_options = {}
    shipping_options['ups'] = ups_rates
    shipping_options['fedex'] = fedex_rates
    shipping_options['usps'] = usps_rates

    cart.cart_shipping_options.destroy_all

    new_shipping_options_array = {}

    shipping_options.each do |key,values|
      new_shipping_options_array[key] = []
      values.each do |value|
        shipping_option = cart.cart_shipping_options.new
        shipping_option.provider = key
        label = shipping_option.label = value[0]
        cost = shipping_option.cost = (value[1] / 100.0)
        shipping_option.save!
	      id = shipping_option.id
	      options = [label, cost, id]
	      new_shipping_options_array[key].push options
      end
    end

    return new_shipping_options_array

  end

  def charge_stripe_card_for_order(stripe_card, order)
    if self.stripe_secret.blank?
      return "Storefront #{self.id} is missing Stripe Secret!"
    end

    uri = "https://api.stripe.com/v1/charges"
    auth = {:username => self.stripe_secret, :password => "password"}

    response = HTTParty.post(uri, :basic_auth => auth, :body => {:customer => stripe_card.stripe_customer_id, :amount => order.total_cents, :currency => 'usd', :description => "Payment for Order #{order.order_number} (#{order.id}) -- #{self.title} (#{self.url})" } )
    if response.code == 200
      response_json = JSON.parse(response.body)
      pp "charge_stripe_card_for_order SUCCESS: #{response_json}"

      paid = response_json['paid']
      charge_id = response_json['id']
      if paid == true
        order.order_status = "paid"
        order.stripe_charge_id = charge_id
        order.save!
        return true
      else
        order.destroy
        return false
      end

    else
      pp "charge_stripe_card_for_order FAILED with error code: #{response.code}"
      return false
    end
  end

  def convert_cart_to_order(cart)
    order = self.orders.new
    order.create_from_cart(cart)
    if cart.alternate_payment_option.blank?
      stripe_card = cart.user.default_stripe_card
      charged = self.charge_stripe_card_for_order(stripe_card, order)
      if charged
        cart.clear
        return true
      else
        return false
      end
    else
      cart.clear
      return true
    end

  end

end
