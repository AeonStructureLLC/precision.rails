class AddStripeKeysToStorefronts < ActiveRecord::Migration
  def change
    add_column :storefronts, :stripe_secret, :string
    add_column :storefronts, :stripe_publish, :string
  end
end
