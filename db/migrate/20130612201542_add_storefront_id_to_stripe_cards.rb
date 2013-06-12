class AddStorefrontIdToStripeCards < ActiveRecord::Migration
  def change
    add_column :stripe_cards, :storefront_id, :integer
  end
end
