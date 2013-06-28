# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130628181834) do

  create_table "addresses", :force => true do |t|
    t.string   "address1"
    t.string   "address2"
    t.string   "city"
    t.string   "state"
    t.string   "postal_code"
    t.boolean  "billing",       :default => false
    t.boolean  "shipping",      :default => false
    t.integer  "user_id"
    t.integer  "storefront_id"
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
  end

  create_table "cart_items", :force => true do |t|
    t.integer  "product_id"
    t.integer  "quantity"
    t.integer  "cart_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "cart_shipping_options", :force => true do |t|
    t.integer  "cart_id"
    t.string   "provider"
    t.string   "label"
    t.float    "cost"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.boolean  "selected",   :default => false
  end

  create_table "carts", :force => true do |t|
    t.integer  "storefront_id"
    t.integer  "user_id"
    t.datetime "created_at",               :null => false
    t.datetime "updated_at",               :null => false
    t.string   "alternate_payment_option"
  end

  create_table "categories", :force => true do |t|
    t.string   "title"
    t.integer  "parent_id"
    t.integer  "lft"
    t.integer  "rgt"
    t.integer  "depth"
    t.text     "description"
    t.text     "content"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.integer  "category_order"
    t.integer  "storefront_id"
  end

  add_index "categories", ["parent_id"], :name => "index_categories_on_parent_id"
  add_index "categories", ["storefront_id"], :name => "index_categories_on_storefront_id"

  create_table "geo_areas", :force => true do |t|
    t.string   "zip"
    t.string   "geo_area_type"
    t.string   "primary_city"
    t.text     "acceptable_cities"
    t.text     "unacceptable_cities"
    t.string   "state"
    t.string   "county"
    t.string   "timezone"
    t.text     "area_codes"
    t.string   "latitude"
    t.string   "longitude"
    t.string   "world_region"
    t.string   "country"
    t.string   "decommissioned"
    t.string   "estimated_population"
    t.text     "notes"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
  end

  add_index "geo_areas", ["zip"], :name => "index_geo_areas_on_zip"

  create_table "legacy_products", :force => true do |t|
    t.integer  "prod_id"
    t.datetime "update_datetime"
    t.boolean  "prod_locked"
    t.text     "prod_change_history"
    t.boolean  "prod_drop"
    t.string   "prod_type"
    t.string   "manuf_code"
    t.boolean  "manuf_active"
    t.string   "prod_code"
    t.text     "manuf_itemcd"
    t.string   "prod_subcodes"
    t.text     "prod_options"
    t.string   "prod_topname"
    t.string   "prod_subname"
    t.string   "prod_cattop"
    t.boolean  "prod_catsub"
    t.boolean  "prod_active"
    t.text     "prod_catcodes"
    t.string   "prod_thumb"
    t.text     "prod_images"
    t.boolean  "prod_mapcat"
    t.float    "price_map"
    t.float    "price_site"
    t.float    "price_msrp"
    t.float    "price_dealer"
    t.string   "prod_price_updt"
    t.string   "prod_status"
    t.integer  "ship_freeship"
    t.float    "ship_flatrate"
    t.float    "ship_weight"
    t.text     "meta_keywd"
    t.text     "meta_descr"
    t.text     "prod_overview"
    t.string   "prod_bullet1_title"
    t.text     "prod_bullet1_text"
    t.string   "prod_bullet2_title"
    t.text     "prod_bullet2_text"
    t.string   "prod_bullet3_title"
    t.text     "prod_bullet3_text"
    t.string   "prod_bullet4_title"
    t.text     "prod_bullet4_text"
    t.text     "prod_caption_list"
    t.text     "prod_html_text"
    t.text     "prod_html_files"
    t.text     "prod_pdf_files"
    t.text     "prod_long_descr_export"
    t.text     "prod_short_descr_export"
    t.string   "jscript_file"
    t.string   "jscript_call"
    t.string   "prod_oldpage"
    t.string   "old_prodcode"
    t.string   "old_prodname"
    t.string   "old_thumb"
    t.string   "old_image"
    t.datetime "prod_timestamp"
    t.string   "prod_condition"
    t.string   "prod_itemnum"
    t.text     "prod_media"
    t.text     "prod_descr"
    t.string   "prod_code_BAK"
    t.string   "prod_topname_BAK"
    t.boolean  "Xprod_taxable"
    t.boolean  "Xprod_ready"
    t.integer  "part_id"
    t.integer  "part_vendpartid"
    t.string   "part_vendpartcode"
    t.integer  "part_vendcatid"
    t.string   "part_vendpartname"
    t.text     "part_vendpartdescr"
    t.string   "part_vendpartimage"
    t.string   "part_partname_IMPORT"
    t.datetime "created_at",              :null => false
    t.datetime "updated_at",              :null => false
  end

  create_table "media_items", :force => true do |t|
    t.text     "description"
    t.string   "file_name"
    t.string   "mime_type"
    t.string   "title"
    t.string   "uuid"
    t.integer  "category_id"
    t.integer  "product_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.boolean  "cover"
  end

  create_table "order_items", :force => true do |t|
    t.integer  "order_id"
    t.integer  "quantity",           :default => 1
    t.binary   "serialized_product"
    t.datetime "created_at",                        :null => false
    t.datetime "updated_at",                        :null => false
  end

  create_table "orders", :force => true do |t|
    t.integer  "storefront_id"
    t.string   "order_status",                :default => "pending_payment"
    t.float    "subtotal",                    :default => 0.0
    t.float    "tax",                         :default => 0.0
    t.float    "total",                       :default => 0.0
    t.string   "payment_method"
    t.text     "notes"
    t.binary   "serialized_user"
    t.binary   "serialized_shipping_option"
    t.binary   "serialized_shipping_address"
    t.binary   "serialized_billing_address"
    t.datetime "created_at",                                                 :null => false
    t.datetime "updated_at",                                                 :null => false
    t.integer  "order_number"
    t.integer  "user_id"
    t.string   "stripe_charge_id"
    t.string   "customer_fullname"
  end

  add_index "orders", ["customer_fullname"], :name => "index_orders_on_customer_fullname"

  create_table "product_addons", :force => true do |t|
    t.integer  "product_id"
    t.integer  "addon_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "products", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.text     "content"
    t.float    "price"
    t.boolean  "ship_flatrate"
    t.float    "weight"
    t.boolean  "free_shipping"
    t.boolean  "accessory"
    t.boolean  "product_discontinued"
    t.integer  "category_id"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.float    "ship_flatrate_price"
  end

  add_index "products", ["title"], :name => "index_products_on_title"

  create_table "storefront_presences", :force => true do |t|
    t.integer  "storefront_id"
    t.integer  "geo_area_id"
    t.boolean  "ship_from"
    t.float    "state_tax_rate"
    t.float    "county_tax_rate"
    t.float    "city_tax_rate"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  create_table "storefronts", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.string   "url"
    t.boolean  "inactive",             :default => false
    t.string   "default_language",     :default => "en-US"
    t.string   "default_currency",     :default => "USD"
    t.integer  "billing_user_id"
    t.datetime "created_at",                                :null => false
    t.datetime "updated_at",                                :null => false
    t.string   "stripe_secret"
    t.string   "stripe_publish"
    t.boolean  "cod_enabled",          :default => false
    t.text     "cod_details"
    t.boolean  "check_enabled",        :default => false
    t.text     "check_details"
    t.boolean  "phone_enabled",        :default => false
    t.text     "phone_details"
    t.text     "invoice_contact_info"
  end

  add_index "storefronts", ["billing_user_id"], :name => "index_storefronts_on_billing_user_id"
  add_index "storefronts", ["url"], :name => "index_storefronts_on_url", :unique => true

  create_table "stripe_cards", :force => true do |t|
    t.integer  "user_id"
    t.integer  "storefront_id"
    t.string   "stripe_customer_id"
    t.string   "name"
    t.string   "last4"
    t.string   "exp_month"
    t.string   "exp_year"
    t.string   "card_type"
    t.datetime "created_at",                            :null => false
    t.datetime "updated_at",                            :null => false
    t.boolean  "is_default",         :default => false
  end

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "authentication_token"
    t.string   "fullname"
    t.string   "phone_number"
  end

  add_index "users", ["authentication_token"], :name => "index_users_on_authentication_token", :unique => true
  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
