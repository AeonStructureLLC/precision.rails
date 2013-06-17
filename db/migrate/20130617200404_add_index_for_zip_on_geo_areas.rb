class AddIndexForZipOnGeoAreas < ActiveRecord::Migration
  def up
    add_index :geo_areas, :zip
  end

  def down
  end
end
