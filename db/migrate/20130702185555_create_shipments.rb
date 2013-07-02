class CreateShipments < ActiveRecord::Migration
  def change
    create_table :shipments do |t|
      t.string :provider
      t.string :tracking_number
      t.integer :order_id

      t.timestamps
    end
  end
end
