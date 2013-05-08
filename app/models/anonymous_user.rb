class AnonymousUser < User
  attr_accessible *ACCESSIBLE_ATTRS, :type, :authentication_token, as: :registrant

  def register(params)
    params = params.merge(authentication_token: nil)
    self.update_attributes(params, as: :registrant)
  end

  ## LATER
  def register_or_login(params)
    # For a single user visiting multiple stores, we need to resurrect their cart as they login
  end

end