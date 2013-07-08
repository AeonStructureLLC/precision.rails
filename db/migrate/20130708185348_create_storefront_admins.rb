class CreateStorefrontAdmins < ActiveRecord::Migration
  def change
    create_table :storefront_admins do |t|
      t.integer :storefront_id
      t.integer :user_id

      t.timestamps
    end
  end
end
