class CreateProductAddons < ActiveRecord::Migration
  def change
    create_table :product_addons do |t|
      t.integer :product_id
      t.integer :addon_id

      t.timestamps
    end
  end
end
