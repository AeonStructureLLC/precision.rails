class AddAlternatePaymentOptionToCarts < ActiveRecord::Migration
  def change
    add_column :carts, :alternate_payment_option, :string
  end
end
