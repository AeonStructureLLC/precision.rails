function model_to_json(model, model_id){
    var ui = $("[model='" + model + "'][model_id='" + model_id + "'][model_root='true']");

    var model_json = {};
    model_json[model] = {};
    var attributes = ui.children('.attribute');
    _.each(attributes, function(attribute){
        var attribute = $(attribute);
        var attribute_name = attribute.attr('attribute_name');
        var attribute_type = attribute.attr('attribute_type');
        if(attribute_type == 'text'){
            model_json[model][attribute_name] = attribute.text();
        } else {
            model_json[model][attribute_name] = attribute.html();
        }
    });
    return model_json;
}

function aeon_persist(item) {
    var model = item.attr('model');
    var model_id = item.attr('model_id');
    var url = "/" + model + ".json?id=" + model_id;
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'PUT',
        data: model_to_json(model, model_id),
        success: function(data){
        }
    });
}

function start_categories_edit(){
    $("#CategoriesList").addClass('edit_mode');
    $(".category_listing .attribute").attr('contenteditable', 'true');
    set_categories_navigation("off");
    resetCategoryInteractions();
    // Change Edit Button Status
}

function end_categories_edit(){
    $("#CategoriesList").removeClass('edit_mode');
    $(".category_listing .attribute").removeAttr('contenteditable');
    set_categories_navigation("on");
    // Change Edit Button Status
}

function set_categories_navigation(state){
    state = state || "off";
    $(".category_listing").off('click');
    if(state == "on"){
        $(".category_listing").on('click', function(event){
            event.stopPropagation();
            var self = $(this);
            var model_id = self.attr('model_id');
            var url = "/categories/" + model_id;
            location = url;
        });
    }
}

function start_products_edit(){
    $("#ProductsList").addClass('edit_mode');
    $(".product_listing .attribute").attr('contenteditable', 'true');
    $(".product_listing .price_missing").addClass('hidden');
    $(".product_listing .currency_marker").removeClass('hidden');
    $(".product_listing .price").removeClass('hidden');
    set_products_navigation("off");
    resetProductInteractions();
    // Change Edit Button Status
}

function end_products_edit(){
    $("#ProductsList").removeClass('edit_mode');
    $(".product_listing .attribute").removeAttr('contenteditable');
    var product_listings = $(".product_listing");
    _.each(product_listings, function(product_listing){
        var price = $(product_listing).find('.price').text();
        if(price.length == 0){
            $(product_listing).find('.price').addClass('hidden');
            $(product_listing).find('.currency_marker').addClass('hidden');
            $(product_listing).find('.price_missing').removeClass('hidden');
        }
    });
    set_products_navigation("on");
    // Change Edit Button Status
}

function set_products_navigation(state){
    state = state || "off";
    $(".product_listing").off('click');
    if(state == "on"){
        $(".product_listing").on('click', function(event){
            event.stopPropagation();
            var self = $(this);
            var model_id = self.attr('model_id');
            var url = "/products/" + model_id;
            location = url;
        });
    }
}

$(document).off('keyup', '.attribute');
$(document).on('keyup', '.attribute', function(event){
    aeon_persist($(this));
});
$(document).off('paste', '.attribute');
$(document).on('paste', '.attribute', function(event){
    var self = $(this);
    setTimeout(function(){
        aeon_persist(self);
    }, 100);
});

$(document).off('click', "#EditCategoriesButton");
$(document).on('click', '#EditCategoriesButton', function(event){
    event.stopPropagation();
    var self = $(this);
    if($("#CategoriesList").hasClass('edit_mode')){
        self.text('Edit Categories');
        end_categories_edit();
    } else {
        self.text('Save Categories');
        start_categories_edit();
    }
});

$(document).off('click', "#EditProductsButton");
$(document).on('click', '#EditProductsButton', function(event){
    event.stopPropagation();
    var self = $(this);
    if($("#ProductsList").hasClass('edit_mode')){
        self.text('Edit Products');
        end_products_edit();
    } else {
        self.text('Save Products');
        start_products_edit();
    }
});

function setMediaItemsWidth(ui){
    var media_items_listing = ui.find('.media_items_listing');
    var media_items = media_items_listing.find('.media_item');
    var width = 0;
    _.each(media_items,function(media_item){
        width = width + $(media_item).width() + 14;
    });
    media_items_listing.css('width', width + "px");
}

$(document).on('click','.media_item_thumb', function(){
    var media = $(this);
    var media_items = media.closest('.media_items_listing').find('.media_item_thumb');
    media_items.removeClass('selected');
    media.addClass('selected');
    var media_items_listing_wrapper = media.closest('.media_items_listing_wrapper');
    media_items_listing_wrapper.scrollTo(media, 900, {axis: 'x',margin: true, over: -0.5});
    var media_items_wrapper = media.closest('.media_items_wrapper');
    var closest_preview = media_items_wrapper.find('.preview_container');
    var preview_height = closest_preview.height();
    var resource_id = media_items_wrapper.closest('[resource_id]').attr('resource_id');
    var html = "";

    switch(media.attr('mime_type').split('/')[0]){
        case "image":
            html += "<img class='media image' src='"+ media.attr('img_src') +"' />";
            break;

        case "video":
            html += "<video class='media video' src='"+ media.attr('video_src') +"' controls='true'  />";
            break;
    }
    closest_preview.html(html);

    return false;
});

$(document).off('click', '.next_media_item');
$(document).on('click','.next_media_item', function(event){
    event.stopImmediatePropagation();
    event.preventDefault();
    var selected_image = $(this).closest('.media_items_wrapper').find('.selected');
    var next_image = selected_image.next('.media_item_thumb');
    if(next_image.length > 0){
        next_image.click();
    }
});
$(document).off('click', '.previous_media_item');
$(document).on('click','.previous_media_item', function(event){
    event.stopImmediatePropagation();
    event.preventDefault();
    var selected_image = $(this).closest('.media_items_wrapper').find('.selected');
    var prev_image = selected_image.prev('.media_item_thumb');
    if(prev_image.length > 0){
        prev_image.click();
    }
});