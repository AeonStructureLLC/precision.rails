class ChangeShipFlatrateFormatOnProducts < ActiveRecord::Migration
  def up
    change_column :products, :ship_flatrate, :boolean
  end

  def down

  end
end
