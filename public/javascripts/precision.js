String.prototype.capitalize = function () {
    return this.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
        return p1 + p2.toUpperCase();
    });
};

function getHostWithoutPort(){
    var rawHost = location.host;
    var host = rawHost.split(':')[0]
    return host;
}

function stripPastedContent(OriginalString){
    var StrippedString = OriginalString.replace(/(<([^>]+)>)/ig,"");
    return StrippedString;
}

function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

(function($) {
    $.fn.flatten = function() {
        return $(this).clone().wrap('<div></div>').parent().html();
    }
})(jQuery);

jQuery.fn.center = function () {
    this.css("position","fixed");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
        $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
        $(window).scrollLeft()) + "px");
    return this;
}

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

function uploadProgressor(progress){

    if($("#ProgressModalBlocker").length > 0){
        var progress_blocker = $("#ProgressModalBlocker");
        var progress_modal = $("#ProgressModal");
        var progress_bar = $("#ProgressBar");
    } else {
        var progress_blocker = $("<div></div>").attr('id', "ProgressModalBlocker");
        var progress_modal = $("<div></div>").attr('id', "ProgressModal");

        var progress_bar_wrapper = $("<div></div>").attr('id', "ProgressBarWrapper");
        var progress_bar = $("<div></div>").attr('id', "ProgressBar");
        progress_bar_wrapper.append(progress_bar);
        progress_modal.append(progress_bar_wrapper);

        var progress_information = $("<div></div>").attr('id', "ProgressInformation").text(current_upload_file_name);
        progress_modal.append(progress_information);


        $("body").append(progress_blocker);
        $("body").prepend(progress_modal);
        $("#ProgressModal").center();
    }

    var progress_percentage = Math.round((progress.loaded / progress.total) * 100);
    progress_bar.css('width', progress_percentage + "%");
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

function reset_media_item_droppable(){
    $('.media_item_listing').droppable({
        scope: 'delete_media',
        tolerance: 'intersect',
        greedy: true,
        drop: function(event, ui){
            var target = $(event.target);
            var media_item_id = target.attr('media_item_id');
            var media_items_wrapper = target.closest('.media_items_wrapper');
            var media_items_preview = target.closest('.media_items_preview');
            if($(ui.draggable).hasClass('delete_media_widget')){
                var url = "/media_item.json?id=" + media_item_id;
                $.ajax({
                    url: url,
                    dataType: 'json',
                    type: 'DELETE',
                    success: function(data){
                        media_items_preview.find('.previous_media_item').click();
                        $("[media_item_id='" + media_item_id +"']").remove();
                        if(media_items_wrapper.find('.media_items_listing').children().length == 0){
                            media_items_wrapper.addClass('hidden');
                        }
                    }
                });
            }
        }
    });
}

$(document).on('click','.media_item_thumb', function(){
    var self = $(this);
    var media_item_id = self.attr('media_item_id');
    var media_items_wrapper = self.closest('.media_items_wrapper');
    media_items_wrapper.find('.media_item_thumb').removeClass('selected');
    self.addClass('selected');
    var preview_container = media_items_wrapper.find('.preview_container');
    var media_item;
    var media_src;
    if(self.hasClass('image')){
        media_src = self.attr('img_src');
        media_item = $("<img />").attr('src', media_src).attr('media_item_id', media_item_id).addClass('media image media_item_listing');
    } else if(self.hasClass('video')){
        media_src = self.attr('video_src');
        media_item = $("<video />").attr('src', media_src).attr('controls', 'true').attr('media_item_id', media_item_id).addClass('media video media_item_listing');
    }
    preview_container.html(media_item)
    reset_media_item_droppable();
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