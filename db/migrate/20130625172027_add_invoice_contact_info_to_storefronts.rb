class AddInvoiceContactInfoToStorefronts < ActiveRecord::Migration
  def change
    add_column :storefronts, :invoice_contact_info, :text
  end
end
