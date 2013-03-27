class CreateMediaItems < ActiveRecord::Migration
  def up
    create_table :media_items do |t|
      t.text :description
      t.string :file_name
      t.string :mime_type
      t.string :title
      t.string :uuid
      t.integer :category_id
      t.integer :product_id

      t.timestamps
    end
  end

  def down
  end
end
