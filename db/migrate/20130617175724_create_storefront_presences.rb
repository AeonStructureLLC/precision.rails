class CreateStorefrontPresences < ActiveRecord::Migration
  def change
    create_table :storefront_presences do |t|
      t.integer :storefront_id
      t.integer :geo_area_id
      t.boolean :ship_from
      t.float :state_tax_rate
      t.float :county_tax_rate
      t.float :city_tax_rate

      t.timestamps
    end
  end
end
