class PagesController < ApplicationController

  def index

  end

  def update
    page = Page.find(params[:id])
    respond_to do |format|
      if page.update_attributes(params[:page])
        format.html { }
        format.json { render json: page }
      else
        format.html { render action: "edit" }
        format.json { render json: page.errors, status: :unprocessable_entity }
      end
    end
  end

end
