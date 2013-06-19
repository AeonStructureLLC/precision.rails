class CreateCartShippingOptions < ActiveRecord::Migration
  def change
    create_table :cart_shipping_options do |t|
      t.integer :cart_id
      t.string :provider
      t.string :label
      t.float :cost

      t.timestamps
    end
  end
end
