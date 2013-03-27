class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :title
      t.integer :parent_id
      t.integer :lft
      t.integer :rgt
      t.integer :depth
      t.text :description
      t.text :content

      t.timestamps
    end
  end
end
