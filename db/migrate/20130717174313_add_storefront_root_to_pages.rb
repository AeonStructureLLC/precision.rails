class AddStorefrontRootToPages < ActiveRecord::Migration
  def change
    add_column :pages, :storefront_root, :boolean, :default => false
  end
end
