class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :address1
      t.string :address2
      t.string :city
      t.string :state
      t.string :postal_code
      t.boolean :billing, :default => true
      t.boolean :shipping, :default => true
      t.integer :user_id
      t.integer :storefront_id
      t.timestamps
    end
  end
end
