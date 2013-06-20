class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.integer :storefront_id
      t.string :order_status, :default => "pending_payment"
      t.float :subtotal, :default => 0.0
      t.float :tax, :default => 0.0
      t.float :total, :default => 0.0
      t.string :payment_method
      t.text :notes
      t.binary :serialized_user
      t.binary :serialized_shipping_option
      t.binary :serialized_shipping_address
      t.binary :serialized_billing_address

      t.timestamps
    end
  end
end
