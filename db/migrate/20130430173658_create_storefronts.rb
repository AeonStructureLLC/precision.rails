class CreateStorefronts < ActiveRecord::Migration
  def change
    create_table :storefronts do |t|
      t.string :title
      t.text :description
      t.string :url
      t.boolean :inactive, :default => false
      t.string :default_language, :default => "en-US"
      t.string :default_currency, :default => "USD"
      t.integer :billing_user_id

      t.timestamps
    end
    add_index :storefronts, :url, :unique => true
    add_index :storefronts, :billing_user_id
  end
end
