class AddSelectedToCartShippingOptions < ActiveRecord::Migration
  def change
    add_column :cart_shipping_options, :selected, :boolean, :default => false
  end
end
