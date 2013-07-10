class AddDefaultsForFloatsOnStorefrontPresences < ActiveRecord::Migration
  def up
    change_column_default :storefront_presences, :city_tax_rate, 0.0
    change_column_default :storefront_presences, :county_tax_rate, 0.0
    change_column_default :storefront_presences, :state_tax_rate, 0.0
  end

  def down
  end
end
