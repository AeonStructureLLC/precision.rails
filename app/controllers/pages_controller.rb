class PagesController < ApplicationController

  def stub
    require 'ostruct'
    page_relation = {
        :id => 0,
        :title => "New Page",
        :description => "Description",
        :storefront_id => @storefront.id
    }
    page_relation = OpenStruct.new page_relation
    render :partial => 'pages/page_relation', :locals => { :page_relation => page_relation }
  end

  def index

  end

  def create
    current_page = Page.find(params[:current_page_id])
    page = current_page.pages.new
    page.title = params[:title]
    page.description = params[:description]
    page.storefront_id = @storefront.id
    page.save!
    render :partial => 'pages/page_relation', :locals => { :page_relation => page }
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

  def set_page_order
    pages = params[:pages]
    pages.each do |order, page_id|
      puts "Order #{order}   ::   Page #{page_id}"
      page = Page.find(page_id)
      page.page_order = order
      page.save!
    end
    render :nothing => true, :status => 200
  end

  def page_tabs
    render :partial => '/shared/page_tabs'
  end

end
