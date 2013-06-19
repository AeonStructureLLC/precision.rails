class AddPayByPhoneOptionsToStorefronts < ActiveRecord::Migration
  def change
    add_column :storefronts, :phone_enabled, :boolean, :default => true
    add_column :storefronts, :phone_details, :text
  end
end
