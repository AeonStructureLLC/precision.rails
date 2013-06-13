class GeoAreasImporterController < ApplicationController
  #TODO Make sure user is an Admin Admin Admin
  #before_filter :authenticate_user!
  protect_from_forgery :except => :create
  require 'csv'
  require 'active_support/core_ext/hash'
  require 'pp'

  def index
    render 'import_form'
  end

  def create
    GeoArea.delete_all
    csv_file = params[:csv_file].tempfile
    csv = CSV.parse(csv_file, :headers => false)

    csv.each do |orig_row|
      row = []
      orig_row.each do |value|
        if value.blank?
          row << ""
        else
          row << value.force_encoding("utf-8")
        end
      end
      ga = GeoArea.new
      ga.zip = row[0]
      ga.geo_area_type = row[1]
      ga.primary_city = row[2]
      ga.acceptable_cities = row[3]
      ga.unacceptable_cities = row[4]
      ga.state = row[5]
      ga.county = row[6]
      ga.timezone = row[7]
      ga.area_codes = row[8]
      ga.latitude = row[9]
      ga.longitude = row[10]
      ga.world_region = row[11]
      ga.country = row[12]
      ga.decommissioned = row[13]
      ga.estimated_population = row[14]
      ga.notes = row[15]
      ga.save!
    end

    bad_geo_area = GeoArea.find_by_zip("zip")
    unless bad_geo_area.blank?
      bad_geo_area.destroy
    end

    render :text => 'import_complete'
  end
end
