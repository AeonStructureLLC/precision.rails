class CreateGeoAreas < ActiveRecord::Migration
  def change
    create_table :geo_areas do |t|
      t.string :zip
      t.string :geo_area_type
      t.string :primary_city
      t.text :acceptable_cities
      t.text :unacceptable_cities
      t.string :state
      t.string :county
      t.string :timezone
      t.text :area_codes
      t.string :latitude
      t.string :longitude
      t.string :world_region
      t.string :country
      t.string :decommissioned
      t.string :estimated_population
      t.text :notes
      t.timestamps
    end
  end
end
