class AddShippingTogglesToStorefronts < ActiveRecord::Migration
  def change
    add_column :storefronts, :ups_enabled, :boolean, :default => false
    add_column :storefronts, :fedex_enabled, :boolean, :default => false
    add_column :storefronts, :usps_enabled, :boolean, :default => false
  end
end
