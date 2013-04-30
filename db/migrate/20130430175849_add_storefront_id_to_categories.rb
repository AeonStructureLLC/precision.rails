class AddStorefrontIdToCategories < ActiveRecord::Migration
  def change
    add_column :categories, :storefront_id, :integer
    add_index :categories, :storefront_id
  end
end
