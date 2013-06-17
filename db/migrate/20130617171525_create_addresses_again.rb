class CreateAddressesAgain < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :address1
      t.string :address2
      t.string :city
      t.string :state
      t.string :postal_code
      t.boolean :billing, :default => false
      t.boolean :shipping, :default => false
      t.integer :user_id
      t.integer :storefront_id
      t.timestamps
    end
  end
end