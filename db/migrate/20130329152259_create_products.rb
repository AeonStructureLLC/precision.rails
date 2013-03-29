class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :title
      t.text :description
      t.text :content
      t.float :price
      t.float :ship_flatrate
      t.float :weight
      t.boolean :free_shipping
      t.boolean :accessory
      t.boolean :product_discontinued
      t.integer :category_id

      t.timestamps
    end
    add_index :products, :title
  end
end
