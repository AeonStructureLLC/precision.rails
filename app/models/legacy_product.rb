class LegacyProduct < ActiveRecord::Base
  establish_connection "legacy_products"
  attr_accessible :Xprod_ready, :Xprod_taxable, :jscript_call, :jscript_file, :manuf_active, :manuf_code, :manuf_itemcd, :meta_descr, :meta_keywd, :old_image, :old_prodcode, :old_prodname, :old_thumb, :part_id, :part_partname_IMPORT, :part_vendcatid, :part_vendpartcode, :part_vendpartdescr, :part_vendpartid, :part_vendpartimage, :part_vendpartname, :price_dealer, :price_map, :price_msrp, :price_site, :prod_active, :prod_bullet1_text, :prod_bullet1_title, :prod_bullet2_text, :prod_bullet2_title, :prod_bullet3_text, :prod_bullet3_title, :prod_bullet4_text, :prod_bullet4_title, :prod_caption_list, :prod_catcodes, :prod_catsub, :prod_cattop, :prod_change_history, :prod_code, :prod_code_BAK, :prod_condition, :prod_descr, :prod_drop, :prod_html_files, :prod_html_text, :prod_id, :prod_images, :prod_itemnum, :prod_locked, :prod_long_descr_export, :prod_mapcat, :prod_media, :prod_oldpage, :prod_options, :prod_overview, :prod_pdf_files, :prod_price_updt, :prod_short_descr_export, :prod_status, :prod_subcodes, :prod_subname, :prod_thumb, :prod_timestamp, :prod_topname, :prod_topname_BAK, :prod_type, :ship_flatrate, :ship_freeship, :ship_weight, :update_datetime

  def self.setup_products
    self.build_categories
    self.build_products
    MediaItem.generate_thumbnails
  end

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

  def self.build_products
    LegacyProduct.all.each do |lp|
      c = Category.find_by_title(lp.prod_cattop)
      p = Product.find_by_title(lp.prod_topname)

      if p.blank?
        p = c.products.new
        p.title = lp.prod_topname
      end

      if lp.prod_active == 1
        p.product_discontinued = false
      else
        p.product_discontinued = true
      end

      unless lp.prod_thumb.blank?
        prod_thumb = p.media_items.new
        file_name = lp.prod_thumb
        prod_thumb.file_name = file_name
        extension = file_name.split('.').last
        mime_type = case extension
                      when "jpg" then "image/jpeg"
                      when "png" then "image/png"
                      when "gif" then "image/gif"
                    end
        prod_thumb.mime_type = mime_type
        prod_thumb.cover = true
        prod_thumb.save!
      end

      unless lp.prod_images.blank?
        files_array = lp.prod_images.split('|')
        files_array.each do |file_name|
          image = p.media_items.new
          image.file_name = file_name
          extension = file_name.split('.').last
          mime_type = case extension
                        when "jpg" then "image/jpeg"
                        when "png" then "image/png"
                        when "gif" then "image/gif"
                      end
          image.mime_type = mime_type
          image.cover = false
          image.save!
        end
      end

      if lp.price_msrp > 0
        p.price = lp.price_msrp
      end

      if lp.price_site > 0
        p.price = lp.price_site
      end

      if lp.price_map > 0
        p.price = lp.price_map
      end

      if lp.ship_weight > 0
        p.weight = lp.ship_weight
      end

      unless lp.prod_overview.blank?
        p.content = lp.prod_overview
      end

      unless p.content.blank?
        p.description = p.content.truncate(250)
      end


      p.save!

    end

  end

end
