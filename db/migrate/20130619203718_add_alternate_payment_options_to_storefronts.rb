class AddAlternatePaymentOptionsToStorefronts < ActiveRecord::Migration
  def change
    add_column :storefronts, :cod_enabled, :boolean, :default => false
    add_column :storefronts, :cod_details, :text
    add_column :storefronts, :check_enabled, :boolean, :default => false
    add_column :storefronts, :check_details, :text
  end
end
