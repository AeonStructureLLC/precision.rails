class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string :title
      t.text :description
      t.integer :page_order
      t.integer :storefront_id
      t.integer :parent_id
      t.integer :lft
      t.integer :rgt
      t.integer :depth
      t.boolean :active, :default => false

      t.timestamps
    end
  end
end
