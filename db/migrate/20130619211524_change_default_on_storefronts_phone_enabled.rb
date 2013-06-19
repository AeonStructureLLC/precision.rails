class ChangeDefaultOnStorefrontsPhoneEnabled < ActiveRecord::Migration
  def up
    change_column_default :storefronts, :phone_enabled, false
  end

  def down
  end
end
