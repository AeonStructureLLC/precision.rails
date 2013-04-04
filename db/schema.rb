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

ActiveRecord::Schema.define(:version => 20130404182830) do

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
  end

  add_index "categories", ["parent_id"], :name => "index_categories_on_parent_id"

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
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
