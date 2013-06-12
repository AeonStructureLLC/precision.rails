class ChangeColumnNameForTypeOnStripeCards < ActiveRecord::Migration
  def up
    change_column :stripe_cards, :type, :card_type
  end

  def down
  end
end
