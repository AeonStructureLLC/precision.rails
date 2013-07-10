class ChangeDefaultForShipFromOnStorefrontPresences < ActiveRecord::Migration
  def up
    change_column_default :storefront_presences, :ship_from, false
  end

  def down
  end
end
