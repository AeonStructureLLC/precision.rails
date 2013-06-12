class RenameTypeToCardTypeOnStripeCards < ActiveRecord::Migration
  def up
    drop_table :stripe_cards
    create_table :stripe_cards do |t|
      t.integer :user_id
      t.integer :storefront_id
      t.string :stripe_customer_id
      t.string :name
      t.string :last4
      t.string :exp_month
      t.string :exp_year
      t.string :card_type
      t.timestamps
    end
  end

  def down
  end
end
