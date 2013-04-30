class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :check_admin, :get_storefront

  def check_admin
    @editable = true
  end

  def get_storefront
    host = request.host
    @storefront = Storefront.find_by_url(host)
    if @storefront.blank? && request.original_url.exclude?("/customer_setup")
      redirect_to create_your_storefront_url
    end
  end

  def authenticate_user!(*args)
    current_user.present? || super(*args)
  end

  def current_user
    super || AnonymousUser.where(authentication_token: anonymous_user_token).first_or_initialize do |user|
      user.email = "#{anonymous_user_token}@#{@storefront.url}"
      user.save(validate: false) if user.new_record?
    end
  end

  private
  def anonymous_user_token
    session[:user_token] ||= SecureRandom.hex(8)
  end
end
