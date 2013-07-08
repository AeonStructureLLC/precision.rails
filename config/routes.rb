PrecisionRails::Application.routes.draw do
  devise_for :users, :controllers => {:registrations => 'registrations', :sessions => 'sessions'}

  resources :categories
  resource :category
  match 'category_stub' => 'categories#stub'
  match 'set_containment_category' => 'categories#set_containment'

  resources :products
  resource :product
  match 'product_stub' => 'products#stub'
  match 'product_addons_index' => 'products#addons_index'
  match 'link_product_addon' => 'products#link_product_addon'
  match 'unlink_product_addon' => 'products#unlink_product_addon'
  match 'set_cover_media_item' => 'products#set_cover_media_item'

  resources :media_items
  resource :media_item

  match 'customer_setup/create_your_storefront' => 'customer_setup#create_storefront', :as => 'create_your_storefront'

  resources :carts
  resource :cart
  match 'cart/list' => 'carts#list', :as => 'cart_list'
  match 'add_to_cart' => 'carts#add_to_cart', :as => 'add_to_cart'
  match 'remove_from_cart' => 'carts#remove_from_cart', :as => 'remove_from_cart'
  match 'update_quantity_in_cart' => 'carts#update_quantity_in_cart', :as => 'update_quantity_in_cart'
  match 'select_shipping_option' => 'carts#select_shipping_option'
  match 'set_alternate_payment_option' => 'carts#set_alternate_payment_option'
  match 'convert_cart_to_order' => 'storefronts#convert_cart_to_order'

  match 'my_orders' => 'storefronts#my_orders'
  match 'my_orders/:order_number' => 'storefronts#my_orders'
  match 'orders' => 'storefronts#orders'
  match 'orders/:order_number' => 'storefronts#orders'

  resources :addresses
  match 'set_default_shipping_address' => 'registrations#set_default_shipping_address'
  match 'set_default_billing_address' => 'registrations#set_default_billing_address'

  resources :stripe_cards
  match 'create_stripe_customer_for_user' => 'storefronts#create_stripe_customer_for_user'
  match 'set_default_stripe_card' => 'registrations#set_default_stripe_card'

  resources :geo_areas_importer


  match 'checkout' => 'checkouts#checkout', :as => 'checkout'
  match 'checkout_list' => 'checkouts#checkout_list', :as => 'checkout_list'
  match "get_tax_rate_for_zip" => "storefronts#get_tax_rate_for_zip"
  match 'get_shipping_options_for_cart' => 'storefronts#get_shipping_options_for_cart'
  match 'change_order_status' => 'storefronts#change_order_status'
  match 'add_shipment_to_order' => 'storefronts#add_shipment_to_order'
  match 'remove_shipment' => 'storefronts#remove_shipment'

  match 'check_registration' => 'registrations#check_registration', :as => 'check_registration'


  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => 'categories#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
