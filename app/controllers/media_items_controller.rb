class MediaItemsController < ApplicationController

  def create
    media_item = MediaItem.create(params[:media_item])

    media_data = params[:media_item][:media_data]

    file_name = params[:media_item][:file_name]
    if media_item.save!
      new_file_name = "#{Rails.root}/public/media_controller/#{file_name}"
      FileUtils.mv(media_data.tempfile.to_path.to_s, new_file_name)
      FileUtils.chmod 0755, new_file_name
      media_item.make_thumbnail

      respond_to do |format|
        format.html { render :partial => "media_items/media_item_thumb", :locals => { :media_item_thumb => media_item } }
        format.json { render json: media_item }
      end
    end
  end

  def show
    media_item = MediaItem.find(params[:id])

    respond_to do |format|
      format.html { render :partial => "media_items/media_item_listing", :locals => { :media_item_listing => media_item } }
      format.json { render json: media_item }
    end
  end

  def update
    media_item = MediaItem.find(params[:id])
    respond_to do |format|
      if media_item.update_attributes(params[:media_item])
        format.html { }
        format.json { render json: media_item }
      else
        format.html { render action: "edit" }
        format.json { render json: media_item.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    media_item = MediaItem.find(params[:id])
    media_item.destroy

    render json: media_item
  end

end
