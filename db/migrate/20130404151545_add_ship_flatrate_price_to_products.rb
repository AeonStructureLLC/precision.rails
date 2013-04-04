class AddShipFlatratePriceToProducts < ActiveRecord::Migration
  def change
    add_column :products, :ship_flatrate_price, :float
  end
end
