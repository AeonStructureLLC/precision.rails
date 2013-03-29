class MediaItem < ActiveRecord::Base
  require 'RMagick'
  default_scope order('created_at')

  belongs_to :category
  belongs_to :product

  attr_accessible :category_id, :description, :file_name, :mime_type, :product_id, :title, :uuid

  after_create :setup_defaults
  before_destroy :clean_up

  def setup_defaults

  end

  def create_uuid
    self.uuid = UUID.generate
    self.save!
  end

  def clean_up
    file_path = "#{Rails.root}/public/media_controller/#{self.file_name}"
    if File.exists?(file_path)
      FileUtils.rm(file_path)
    end
    thumb_path = "#{Rails.root}/public/media_controller/#{self.uuid}_thumb.png"
    if File.exists?(thumb_path)
      FileUtils.rm(thumb_path)
    end
    preview_path = "#{Rails.root}/public/media_controller/#{self.uuid}_preview.jpg"
    if File.exists?(preview_path)
      FileUtils.rm(preview_path)
    end
  end

  def make_thumbnail
    if self.mime_type.include? 'image'
      img = Magick::Image.read("#{Rails.root}/public/media_controller/#{self.file_name}")

      img[0].rotate(90).resize_to_fit(72).rotate(-90).write("#{Rails.root}/public/media_controller/#{self.uuid}_thumb.png")
      img[0].rotate(90).resize_to_fit(540).rotate(-90).write("#{Rails.root}/public/media_controller/#{self.uuid}_preview.png")

    elsif self.mime_type.include? 'video'
      command = "ffmpeg -ss 3 -i '#{Rails.root}/public/media_controller/#{self.file_name}' -vframes 1 '#{Rails.root}/public/media_controller/#{self.uuid}_thumb.png'"
      %x[#{command}]
    else
      puts "What type of file is it then?!"
    end
  end

  def self.generate_thumbnails
    MediaItem.find_in_batches(:batch_size => 100) do |media_items|
      sleep(45) #Convention?
      media_items.each do |mi|
        if mi.uuid.blank?
          mi.uuid = mi.file_name.split('.')[0]
          mi.save!
        end
        mi.make_thumbnail
      end
    end
  end

end