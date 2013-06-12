class CreateStripeCards < ActiveRecord::Migration
  def change
    create_table :stripe_cards do |t|
      t.integer :user_id
      t.string :stripe_customer_id
      t.string :name
      t.string :last4
      t.string :exp_month
      t.string :exp_year
      t.string :type

      t.timestamps
    end
  end
end
