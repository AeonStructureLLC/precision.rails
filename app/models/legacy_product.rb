class LegacyProduct < ActiveRecord::Base
  establish_connection "legacy_products"
  attr_accessible :Xprod_ready, :Xprod_taxable, :jscript_call, :jscript_file, :manuf_active, :manuf_code, :manuf_itemcd, :meta_descr, :meta_keywd, :old_image, :old_prodcode, :old_prodname, :old_thumb, :part_id, :part_partname_IMPORT, :part_vendcatid, :part_vendpartcode, :part_vendpartdescr, :part_vendpartid, :part_vendpartimage, :part_vendpartname, :price_dealer, :price_map, :price_msrp, :price_site, :prod_active, :prod_bullet1_text, :prod_bullet1_title, :prod_bullet2_text, :prod_bullet2_title, :prod_bullet3_text, :prod_bullet3_title, :prod_bullet4_text, :prod_bullet4_title, :prod_caption_list, :prod_catcodes, :prod_catsub, :prod_cattop, :prod_change_history, :prod_code, :prod_code_BAK, :prod_condition, :prod_descr, :prod_drop, :prod_html_files, :prod_html_text, :prod_id, :prod_images, :prod_itemnum, :prod_locked, :prod_long_descr_export, :prod_mapcat, :prod_media, :prod_oldpage, :prod_options, :prod_overview, :prod_pdf_files, :prod_price_updt, :prod_short_descr_export, :prod_status, :prod_subcodes, :prod_subname, :prod_thumb, :prod_timestamp, :prod_topname, :prod_topname_BAK, :prod_type, :ship_flatrate, :ship_freeship, :ship_weight, :update_datetime


  def self.build_categories
    LegacyProduct.all.each do |lp|
      c = Category.find_by_title(lp.prod_cattop)
      if c.blank?
        c = Category.new
        c.title = lp.prod_cattop
        c.save!
      end
    end
  end

end
