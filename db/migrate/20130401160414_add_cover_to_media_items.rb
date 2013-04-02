class AddCoverToMediaItems < ActiveRecord::Migration
  def change
    add_column :media_items, :cover, :boolean
  end
end
