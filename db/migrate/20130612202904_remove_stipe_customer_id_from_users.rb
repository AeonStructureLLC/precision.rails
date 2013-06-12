class RemoveStipeCustomerIdFromUsers < ActiveRecord::Migration
  def up
    remove_column :users, :stripe_customer_id
  end

  def down
  end
end
