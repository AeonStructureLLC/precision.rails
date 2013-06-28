class AddCustomerFullnameToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :customer_fullname, :string
    add_index :orders, :customer_fullname
  end
end
