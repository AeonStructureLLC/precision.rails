class ChangeDefaultsForShippingAndBillingOnAddresses < ActiveRecord::Migration
  def up
    change_column_default :addresses, :shipping, false
    change_column_default :addresses, :billing, false
  end

  def down
    change_column_default :addresses, :shipping, true
    change_column_default :addresses, :billing, true
  end
end
