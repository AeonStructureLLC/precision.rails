class AddIsDefaultToStripeCards < ActiveRecord::Migration
  def change
    add_column :stripe_cards, :is_default, :boolean, :default => false
  end
end
