(function ($) {
    $.extend($.fn, {

        addStatusIcon:function () {
            var ui = this;
            var id = _.uniqueId('statusIcon')

            var status = $('<div/>');
            status.addClass('statusIcon');
            status.attr('id', id);

            $('.statusIcon').remove();
            ui.prepend(status);
            return this;
        },

        addDeleteIcon:function (model, id) {
            var ui = this;

            var Delete = $('<div/>');
            Delete.addClass('DeleteIcon');
            Delete.attr('model', model);
            Delete.attr('model_id', id);
            Delete.addClass('ui-icon ui-icon-closethick')

            ui.prepend(Delete);

            return ui;
        },

        addWrapper:function () {
            var wrapper = $('<div />');
            var id = _.uniqueId('wrapper_')
            wrapper.attr('id', id);
            wrapper.addClass('wrapper');
            wrapper.html(this);

            return wrapper;
        },

        replace:function (o) {
            return this.after(o).remove()
        },

        random:function () {
            var randomIndex = Math.floor(Math.random() * this.length);
            return $(this[randomIndex]);
        }

    });
})(jQuery);



function buildHTML() {
    var self = this;
    var container = "<div id='" + self.uuid + "' class='content_item' contenteditable='false' type='" + self.type + "'>";
    container += "<div contenteditable='false' class='lesson_section " + self.type + "'>";
    container += "<div class='heading' contenteditable='true'>" + self.heading + "</div>";
    container += "<div contenteditable='false'>";
    container += "<div class='content' contenteditable='true'>" + self.content + "</div>";
    container += "</div>";
    container += "</div>\n";

    var html = $(container);

    if (self.type != "LessonHeader") {
        if (self.type != "StandardHeader") {
            html.children(":first").addDeleteIcon();
        }
    }

    return html;
}

function WhiteboardHTML() {
    var self = this;
    var container = "<div id='" + self.uuid + "' class='content_item' contenteditable='false' type='" + self.type + "'>";
    container += "<div contenteditable='false' class='lesson_section " + self.type + "'>";
    container += "<div class='button whiteboard_button sendToWhiteboard'>Whiteboard</div>";
    container += "<div class='button send_to_students_button sendToStudents'>Students</div>";
    container += "<div contenteditable='false'>";
    container += "<div class='content' contenteditable='true'>" + self.content + "</div>";
    container += "</div>";
    container += "</div>";
    container += "</div>\n";

    var html = $(container);
    html.children(":first").addDeleteIcon();
    return html;
}

function TeacherWidgetHTML(){
    var self = this;
    var container = "<div id='" + self.uuid + "' class='content_item' contenteditable='false' type='" + self.type + "'>";
    container += "<div contenteditable='false' class='lesson_section " + self.type + "'>";
    container += "<div class='button whiteboard_button sendToWhiteboard'>Whiteboard</div>";
    container += "<div class='button send_to_students_button sendToStudents'>Students</div>";
    container += "<div contenteditable='false'>";
    container += "<div class='content' contenteditable='true'>" + self.content + "</div>";
    container += "</div>";
    container += "</div>";
    container += "</div>\n";

    var html = $(container);

    html.children(":first").addDeleteIcon();
    html.prepend('<br/>');
    return html;
}

function LessonFocusHTML() {
    var self = this;
    var container = "<div id='" + self.uuid + "' class='content_item' contenteditable='false' type='" + self.type + "'>";
    container += "<div contenteditable='false' class='lesson_section " + self.type + "'>";
    container += "<div class='button whiteboard_button sendToWhiteboard'>Whiteboard</div>";
    container += "<div class='heading' contenteditable='true'>" + self.heading + "</div>";
    container += "<div contenteditable='false'>";
    container += "<div class='content' contenteditable='true'>" + self.content + "</div>";
    container += "</div>";
    container += "</div>\n";

    var html = $(container);
    html.children(":first").addDeleteIcon();
    return html;
}

function TeacherSaysHTML() {
    var self = this;
    var container = "<div id='" + self.uuid + "' class='content_item' contenteditable='false' type='" + self.type + "'>";
    container += "<div class='lesson_section " + self.type + "'>";
    container += "<div class='lesson_q'>";
    container += "<span class='no_select emphasize lesson_chat_name'>Teacher</span>";
    container += "<span class='chat_bubble'>";
    container += "<div class='content' contenteditable='true'>" + self.content + "</div>";
    container += "</span>";
    container += "</div>";
    container += "</div>";
    container += "</div>\n";

    var html = $(container);
    html.children(":first").addDeleteIcon();
    return html;
}

function ClassSaysHTML() {
    var self = this;
    var container = "<div id='" + self.uuid + "' class='content_item' contenteditable='false' type='" + self.type + "'>";
    container += "<div class='lesson_section " + self.type + "'>";
    container += "<div class='lesson_a'>";
    container += "<span class='chat_bubble'>";
    container += "<div class='content' contenteditable='true'>" + self.content + "</div>";
    container += "</span>";
    container += "<span class='no_select emphasize lesson_chat_name'>Class</span>";
    container += "</div>";
    container += "</div>";
    container += "</div>\n";

    var html = $(container);
    html.children(":first").addDeleteIcon();
    return html;
}

function StandardHTML() {
    var self = this;
    var container = "<div id='StandardHeader' contenteditable='false' type='" + self.type + "'>";
    container += "<div contenteditable='false' class='lesson_section " + self.type + "'>";
    container += "<div class='heading' contenteditable='true'>" + self.heading + "</div>";
    container += "<div contenteditable='false'>";
    container += "<div class='content' contenteditable='true'>" + self.content + "</div>";
    container += "</div>";
    container += "</div>\n";

    var html = $(container);

    if (self.type != "LessonHeader") {
        if (self.type != "StandardHeader") {
            html.children(":first").addDeleteIcon();
        }
    }

    return html;
}

function ConceptHTML() {
    var self = this;
    var container = "<div id='" + self.uuid + "' class='content_item' contenteditable='false' type='" + self.type + "'>";
    container += "<div contenteditable='false' class='lesson_section " + self.type + "'>";
    container += "<div class='content' contenteditable='true'>" + self.content + "</div>";
    container += "</div>\n";

    var html = $(container);

    return html;
}

function addDragHandle(){
    var html = "";
    if(renderControls){
        html = "<div class='drag_handle aeon_drag'></div>";
    }
    return html;
}

function conditionalAddDeleteIcon(ui, model, id){
    if(renderControls){
        ui.addDeleteIcon(model, id);
    }
}

function PerceptionHTML() {
    var self = this;
    var container = "<li id='" + self.uuid + "' perception_id='" + self.id + "' class='aeon_drag model_listing perception_listing' contenteditable='false' type='" + self.type + "'>";
    container += addDragHandle();
    container += "<div class='heading perception_heading attribute' contenteditable='true' model='perception' model_id='" + self.id + "' attribute_name='title'>";
    container +=  self.heading + "</div>";
    container += "<ul class='perception_resources_listing'></ul>";
    container += "</li>";

    var html = $(container);
    conditionalAddDeleteIcon(html, self.type.toLowerCase(), self.id);

    return html;
}

function DisplayHTML() {
    var self = this;
    var container = "<li id='" + self.uuid + "' resource_id='" + self.id + "' class='aeon_drag model_listing resource_listing display_listing' contenteditable='false' type='" + self.type + "'>";
    container += addDragHandle();
    container += "<div class='heading attribute' contenteditable='true' model='resource' model_id='" + self.id + "' attribute_name='title'>";
    container += self.heading + "</div>";
    container += "    <div class='attribute content' attribute_name='content' contenteditable='true' model='resource' model_id='"+ self.id +"'>"+ self.content +"</div>";
    container += "<div class='hidden attribute' attribute_name='resource_type'>"+ self.type +"</div>";

    container += addMediaItems(self.obj);

    container += "</li>";

    var html = $(container);
    conditionalAddDeleteIcon(html, 'resource', self.id);
    return html;
}


function TeacherGuideHTML() {
    var self = this;
    var container = "<li id='" + self.uuid + "' resource_id='" + self.id + "' class='aeon_drag model_listing resource_listing teacher_guide_listing' contenteditable='false' type='" + self.type + "'>";
    container += addDragHandle();
    container += "<div class='heading attribute' contenteditable='true' model='resource' model_id='" + self.id + "' attribute_name='title'>";
    container += self.heading + "</div>";
    container += "    <div class='attribute content' attribute_name='content' contenteditable='true' model='resource' model_id='"+ self.id +"'>"+ self.content +"</div>";
    container += "<div class='hidden attribute' attribute_name='resource_type'>"+ self.type +"</div>";

    //container += addMediaItems(self.obj);

    container += "</li>";

    var html = $(container);
    conditionalAddDeleteIcon(html,'resource', self.id);

    return html;
}

function LessonStarterHTML() {
    var self = this;
    var container = "<li id='" + self.uuid + "' resource_id='" + self.id + "' class='aeon_drag model_listing resource_listing lesson_starter_listing' contenteditable='false' type='" + self.type + "'>";
    container += addDragHandle();
    container += "<div class='heading attribute' contenteditable='true' model='resource' model_id='" + self.id + "' attribute_name='title'>";
    container += self.heading + "</div>";
    container += "    <div class='attribute content' attribute_name='content' contenteditable='true' model='resource' model_id='"+ self.id +"'>"+ self.content +"</div>";
    container += "<div class='hidden attribute' attribute_name='resource_type'>"+ self.type +"</div>";

    //container += addMediaItems(self.obj.media_items_json);

    container += "</li>";

    var html = $(container);
    conditionalAddDeleteIcon(html, 'resource', self.id);

    return html;
}

function createMediaTag(media){
    var html = "";
    switch(media.mime_type.split('/')[0]){
        case "image":
            html += "<img class='media' src='/media_controller/"+ media.file_name +"' />";
            break;

        case "video":
            html += "<video class='media' src='/media_controller/"+ media.file_name +"' controls='true'  />";
            break;
    }

    return html;
}

function setMediaItemsWidth(ui){
    var media_items_listing = ui.find('.media_items_listing');
    var media_items = media_items_listing.find('.media_item');
    var width = 0;
    _.each(media_items,function(media_item){
        width = width + $(media_item).width() + 14;
    });
    media_items_listing.css('width', width + "px");
}

function populateMediaItems(resource_id){
    var resource_ui = $("[resource_id='"+ resource_id +"']");
    var media_items_wrapper = resource_ui.find('.media_items_wrapper');
    var uri = content_server_uri + 'resources/' + resource_id + ".json";
    $.ajax({
        url: '/resources/' + resource_id + ".json",
        dataType: 'json',
        success: function(data){
            dresource = data;
            // render media items
            var html = addMediaItems(data);
            mhtml = html;
            resource_ui.find('.media_upload_wrapper').remove();
            media_items_wrapper.replace(html);
            setMediaItemsWidth(resource_ui);
        }
    });
}

function addMediaItems(resource){
    if(resource == null){
        return "";
    }
    var media_items = resource.media_items_json;
    var container = "";
    var empty_list_class = "";
    var first_image = "";
    var media_upload_class = "";
    var delete_button = "";

    if(media_items.length == 0) {
        empty_list_class = ' hidden';
    } else {

        first_image = createMediaTag(media_items[0]);
        media_upload_class = "has_media";
        if(renderControls){
            delete_button = "<div class='delete_media_item' parent_resource_id='"+ resource.id +"' model='media_item' model_id='"+ media_items[0].id +"'>Delete</div>";
        }
    }
    if(renderControls){
        container += "<div class='media_upload_wrapper " + media_upload_class + "'><img class='media_upload_icon' src='/images/camera_icon.png'/><input class='hidden' type='file'></div>";
    }
    container += "<div class='media_items_wrapper"+ empty_list_class +"'>";
    container += "<div class='media_items_preview panel'>";
    container += "<div class='left_arrow nav_arrows previous_media_item'><img class='prev_icon' src='/images/prev.png' /></div>";
    container += "<div class='preview_container'>";
    container +=  delete_button;
    //container += "<div class='loading_spinner'></div>";
    container +=  first_image;
    container += "</div>";
    container += "<div class='right_arrow nav_arrows next_media_item'><img class='next_icon' src='/images/next.png' /></div>";
    container += " </div>";
    container += "<div class='media_items_listing_wrapper'>";
    container += "<ul class='media_items_listing'>";
    var counter = 1;
    _.each(media_items, function(media_item){
        var css_class = "";
        if(counter == 1) {
            css_class += ' selected_image';
        }
        container += addMediaItem(css_class, media_item);
        counter = counter +1;
    });
    container += " </ul>";
    container += "</div>";
    container += "</div>";

    return container;
}

function addMediaItem(selected_class, media_item){
    var css_media_class = "media_item_" + media_item.mime_type.split('/')[0];
    var css_class = [];
    css_class.push(css_media_class);
    css_class.push(selected_class);
    var html = "";
    html += "<li class='media_item "+ css_class.join(' ') +" thumbnail'>";
    switch (media_item.mime_type.split('/')[0]) {
        case "image":
            html += "<img class='media' img_src='/media_controller/"+ media_item.file_name +"' src='/media_controller/"+ media_item.uuid +"_thumb.jpg' mime_type='"+ media_item.mime_type +"' media_item_id='"+media_item.id+"'/>";
            break;

        case "video":
            html += "<img class='media' video_src='/media_controller/"+ media_item.file_name +"' mime_type='"+ media_item.mime_type +"' media_item_id='"+media_item.id+"' src='/media_controller/"+ media_item.uuid +"_thumb.jpg'/>";
            break;
    }

    html += "</li>"

    return html;
}

function model_to_json(model, model_id){
    var ui = $("[model='" + model + "'][model_id='" + model_id + "'][model_root='true']");

    var model_json = {};
    model_json[model] = {};
    var attributes = ui.children('.attribute');
    _.each(attributes, function(attribute){
        var attribute = $(attribute);
        var attribute_name = attribute.attr('attribute_name');
        model_json[model][attribute_name] = attribute.html();
    });
    return model_json;
}

function aeon_persist(item) {
    var model = item.attr('model');
    var model_id = item.attr('model_id');
    var url = content_server_uri + model + ".json?id=" + model_id;
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'PUT',
        data: model_to_json(model, model_id),
        success: function(data){
            if(data.resource_part_type == "Vocabulary") {
            }
        }
    });
}

var miw;

$(document).on('click','.thumbnail', function(){
    var media_items = $(this).closest('.media_items_listing').find('.media_item');
    media_items.removeClass('selected_image');
    $(this).addClass('selected_image');
    var media_items_listing_wrapper = $(this).closest('.media_items_listing_wrapper');
    media_items_listing_wrapper.scrollTo($(this), 900, {axis: 'x',margin: true, over: -0.5});
    var media_items_wrapper = $(this).closest('.media_items_wrapper');
    var closest_preview = media_items_wrapper.find('.preview_container');
    var preview_height = closest_preview.height();
    var media = $(this).find('.media');
    miw = media_items_wrapper;
    var resource_id = media_items_wrapper.closest('[resource_id]').attr('resource_id');
    var html = "<div class='delete_media_item' parent_resource_id='"+ resource_id +"' model='media_item' model_id='"+ media.attr('media_item_id') +"'>Delete</div>";
//    var media = {};
//    html += createMediaTag(MediaItemRegistry[media.attr('media_item_id')]);

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

$(document).on('click', '.delete_media_item', function(event){
    if (confirm("You are about to remove this media item.  This action CANNOT be undone. Are you sure you want to do this?")) {
        var self = $(this);
        var media_item_id = self.attr('model_id');
        var resource_id = self.attr('parent_resource_id');

        var url = "/media_items/" + media_item_id + ".json?resource_id=" + resource_id;

        $.ajax({
            url: url,
            dataType: 'json',
            type: 'DELETE',
            success: function(data){
                var models = Object.keys(data);
                _.each(models, function(model){
                    model_id = data[model].id;
                    var ui = $("[" + model + "_id='" + model_id + "']");
                    var parent = ui.parent();

                    var previous_image = parent.prev('.media_item');
                    if(previous_image.length > 0){
                        parent.remove();
                        previous_image.click();
                    } else {
                        var next_image = parent.next('.media_item');
                        if(next_image.length > 0){
                            parent.remove();
                            next_image.click();
                        } else {
                            parent.remove();
                            populateMediaItems(resource_id);
                        }
                    }
                });
            }
        });
    }
});


$(document).on('click','.next_media_item', function(event){
    var selected_image = $(this).closest('.media_items_wrapper').find('.selected_image');
    var next_image = selected_image.next('.media_item');
    if(next_image.length > 0){
        next_image.click();
    }
});

$(document).on('click','.previous_media_item', function(event){
    event.stopImmediatePropagation();
    event.preventDefault();
    //$(document).off('click', '.previous_media_item');
    var selected_image = $(this).closest('.media_items_wrapper').find('.selected_image');
    var prev_image = selected_image.prev('.media_item');
    if(prev_image.length > 0){
        prev_image.click();
    }
});

$(document).on('click', '.media_upload_icon', function(){
    var media_upload_wrapper = $(this).closest('.media_upload_wrapper');
    var input_file = media_upload_wrapper.find('input');
    input_file.click();
    input_file.off('change');
    input_file.on('change',postUpload);
    input_file.val('');
});

var current_upload_file_name;

function postUpload(e){
    var input_field = $(e.target);
    var model_listing = input_field.closest('.model_listing');
    var model = model_listing.children(":first").attr('model');
    var target_container = model_listing.find('.media_items_listing');
    var resource_id = model_listing.attr(model + '_id');

    var perception = model_listing.closest('[perception_id]');
    var perception_id = perception.attr('perception_id');

    var collection = perception.closest('[collection_id]');
    var collection_id = collection.attr('collection_id');

    var original_file_name = input_field[0].files[0].name;
    var mime_type = input_field[0].files[0].type;
    var file_size = input_field[0].files[0].size;
    var uuid = createUUID();
    var file_name_array = original_file_name.split('.');
    var extension = file_name_array[(file_name_array.length - 1)];
    extension = extension.toLowerCase();
    var file_name = uuid + "." + extension;

    var allowed_extensions = [
        'mp4','mov','jpg','jpeg','png','gif','svg','m4v'
    ];

    if(!_.contains(allowed_extensions, extension)) {
        alert('Invalid file type [ ' + extension + ' ] for a media resource.  Please use one of: ' + allowed_extensions.join(',') + '.')
        return;
    }

    var submission = new FormData();

    submission.append('[media_item][uuid]', uuid);
    submission.append('[media_item][media_data]', input_field[0].files[0]);
    submission.append('[media_item][mime_type]', mime_type);
    submission.append('[media_item][file_name]', file_name);
    submission.append('[media_item][resource_id]', resource_id);
    submission.append('[media_item][perception_id]', perception_id);
    submission.append('[media_item][collection_id]', collection_id);
    submission.append('[media_item][model]', model);

    current_upload_file_name = original_file_name;

    var ajax_submit = $.ajax({
       url: '/media_item/',
       type: 'POST',
        xhr: function(){
            var myXhr = $.ajaxSettings.xhr();
            myXhr.upload.addEventListener('progress', uploadProgressor, false);
            return myXhr;
        },
       data: submission,
       processData: false,
       contentType: false,
       success: function(media_item){
           var media_item = JSON.parse(media_item);
           console.log("Upload Complete - Finally!");
           console.log(media_item);
           $("#ProgressModalBlocker").remove();
           $("#ProgressModal").remove();
           model_listing.find('.media_items_wrapper').removeClass('hidden');
           model_listing.find('.media_upload_wrapper').addClass('has_media');
           var html = addMediaItem("", media_item);
           var jhtml = $(html);
           target_container.append(jhtml);
           setMediaItemsWidth(model_listing);
           jhtml.click();
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

function handleFiles(e) {
    var reader = new FileReader;
    reader.onloadstart = function (event) {
        var allowed_extensions = [
            'mp4','mov','jpg','jpeg','png','gif','svg','m4v'
        ];
        var mime_type = reader.result.split(';')[0].replace('data:','');
        var model_listing = $(e.target).closest('.model_listing');
        var model = model_listing.children(":first").attr('model');
        var resource_id = model_listing.attr(model + '_id');

        var perception = model_listing.closest('[perception_id]');
        var perception_id = perception.attr('perception_id');

        var collection = perception.closest('[collection_id]');
        var collection_id = collection.attr('collection_id');

        var target_container = $(e.target).closest('.model_listing').find('.media_items_listing');
        var params = {};
        var file_path = $(e.target).val();
        var extension = file_path.split('.').pop().toLowerCase();
        if(typeof extension == 'undefined'){
            extension = file_path.split(',').pop().toLowerCase();
        }

        if(!_.contains(allowed_extensions, extension)) {
            alert('Invalid file type [ ' + extension + ' ] for a media resource.  Please use one of: ' + allowed_extensions.join(',') + '.')
            return;
        }

        params['media_item'] = {
            media_data: reader.result,
            mime_type: mime_type,
            file_name: createUUID() + "." + extension,
            resource_id: resource_id,
            perception_id: perception_id,
            collection_id: collection_id,
            model: model
        }
        model_listing.find('.media_items_wrapper').removeClass('hidden');
        model_listing.find('.media_upload_wrapper').addClass('has_media');
        var preview_container = model_listing.find('.preview_container');
        preview_container.html(loadingSpinner());
        $.ajax({
            url: '/media_item/',
            dataType: 'json',
            type: 'POST',
            data: params,
            success: function(media_item){
                var html = addMediaItem("", media_item);
                var jhtml = $(html);
                target_container.append(jhtml);
                setMediaItemsWidth(model_listing);
                jhtml.click();
            }
        });
    }


    reader.readAsDataURL(e.target.files[0]);
}

function loadingSpinner() {
    var loading = "<div class='loading_spinner'></div>";
    return $(loading);
}


function ConceptNoteHTML() {
    var self = this;
    var container = "<li id='" + self.uuid + "' resource_id='" + self.id + "' class='aeon_drag model_listing resource_listing concept_note_listing' contenteditable='false' type='" + self.type + "'>";
    container += "<div class='heading attribute' contenteditable='true' model='resource' model_id='" + self.id + "' attribute_name='title'>";
    container += self.heading + "</div>";
    container += "<div class='hidden attribute' attribute_name='resource_type'>"+ self.type +"</div>";
    container += "<div class='resources_parts_listing'>";
    _.each(self.obj.resource_parts_json, function(resource_part){
        var css_class = resource_part.title.toLowerCase() + "_section";
        container += "<div class='resource_part "+ css_class +"' model='resource_part' model_id='"+ resource_part.id +"' resource_part_id='"+ resource_part.id +"' resource_part_type='"+ resource_part.title +"'>";
        container += "    <div class='title_wrapper'>";
        container += "    <div class='attribute title no-select' attribute_name='title' model='resource_part' model_id='"+ resource_part.id +"'>"+ resource_part.title +"</div>";
        container += "    </div>";
        container += "    <div class='attribute content' attribute_name='content' contenteditable='true' model='resource_part' model_id='"+ resource_part.id +"'>"+ resource_part.content +"</div>";
        container += "</div>";
    });
    container += "</div>";
    container += "</li>";

    var html = $(container);
    html.addDeleteIcon('resource', self.id);

    return html;
}

function VocabularyHTML() {
    var self = this;
    var container = "<li id='" + self.uuid + "' resource_id='" + self.id + "' class='aeon_drag model_listing resource_listing vocabulary_listing' contenteditable='false' type='" + self.type + "'>";
    container += addDragHandle();
    container += "<div class='heading attribute' contenteditable='true' model='resource' model_id='" + self.id + "' attribute_name='title'>";
    container += self.heading + "</div>";
    container += "<div class='hidden attribute' attribute_name='resource_type'>"+ self.type +"</div>";
    container += "<div class='vocabulary_word_view'></div>";
    container += "<div class='resource_parts_listing'>";
    if(self.obj != null) {
        _.each(self.obj.resource_parts_json, function(resource_part){
            var css_class = resource_part.resource_part_type.toLowerCase() + "_section";
            container += "<div class='resource_part "+ css_class +"' model='resource_part' model_id='"+ resource_part.id +"' resource_part_id='"+ resource_part.id +"' resource_part_type='"+ resource_part.resource_part_type +"'>";
            container += "    <div class='title no-select' attribute_name='title' model='resource_part' model_id='"+ resource_part.id +"'>"+ resource_part.title +"</div>";
            container += "</div>";
        });
    }

    container += "</div>";
    container += "<div class='add_vocabulary_word'>+</div>";
    container += "</li>";

    var html = $(container);
    html.addDeleteIcon('resource', self.id);

    return html;
}


function EngageHTML() {
    var self = this;
    var container = "<li id='" + self.uuid + "' resource_id='" + self.id + "' class='aeon_drag model_listing resource_listing engage_listing' contenteditable='false' type='" + self.type + "'>";
    container += addDragHandle();
    container += "<div class='heading attribute' contenteditable='true' model='resource' model_id='" + self.id + "' attribute_name='title'>";
    container += self.heading + "</div>";
    container += "    <div class='attribute content' attribute_name='content' contenteditable='true' model='resource' model_id='"+ self.id +"'>"+ self.content +"</div>";
    container += "<div class='hidden attribute' attribute_name='resource_type'>"+ self.type +"</div>";

    container += addMediaItems(self.obj);

    container += "</li>";

    var html = $(container);
    conditionalAddDeleteIcon(html, 'resource', self.id);
    return html;
}

$(document).on('click', '.vocabulary_section', function(){
    var resource_part_id = $(this).attr('model_id');
    var vocabulary_word_view = $(this).closest('.vocabulary_listing').find('.vocabulary_word_view');
    var resource_id = $(this).closest("[resource_id]").attr('resource_id');
    var url = content_server_uri + "/resource_parts/" + resource_part_id + "/edit";

    $.get(url,function(data){
        vocabulary_word_view.html(data);
        var delete_button = "<div class='delete_resource_part' parent_resource_id='"+ resource_id +"' model='resource_part' model_id='"+ resource_part_id +"'>Delete</div>";
        vocabulary_word_view.prepend($(delete_button));
    });
});

$(document).on('click', '.delete_resource_part', function(event){
    if (confirm("You are about to remove this resource.  This action CANNOT be undone. Are you sure you want to do this?")) {
        var self = $(this);
        var resource_part_id = self.attr('model_id');
        var resource_id = self.attr('parent_resource_id');

        var url = "/resource_parts/" + resource_part_id + ".json";

        $.ajax({
            url: url,
            dataType: 'json',
            type: 'DELETE',
            success: function(data){
                console.log(data);
                var models = Object.keys(data);
                _.each(models, function(model){
                    model_id = data[model].id;
                    var ui = $("[" + model + "_id='" + model_id + "']");
                    ui.remove();
                    self.remove();
                });
            }
        });
    }
});

$(document).on('focusout', '.vocabulary_edit .title', function(){
    var resource_id = $(this).closest("[resource_id]").attr('resource_id');
    fetchResourceParts(resource_id);
});


function fetchResourceParts(resource_id){
    var resource = $("[resource_id='" + resource_id + "']");
    var url = "/resource_parts?resource_id=" + resource_id;
    $.get(url,function(data){
        console.log("I could have updated the page.");
            var resource_parts_listing = resource.find('.resource_parts_listing');
            resource_parts_listing.html(data);
    });
}

function fetchAndSelectResourceParts(resource_id, selected_id){
    var resource = $("[resource_id='" + resource_id + "']");
    var url = "/resource_parts?resource_id=" + resource_id;
    console.log(selected_id);
    $.ajax({
        url: url,
        dataType: 'html',
        success: function(data){
            console.log("I could have updated the page and selected the proper vocab.");
            var resource_parts_listing = resource.find('.resource_parts_listing');
            resource_parts_listing.html(data);
            resource_parts_listing.find("[resource_part_id='" + selected_id + "']").click();
        }
    })
}

$(document).on('click', '.add_vocabulary_word', function(){
    var resource = $(this).closest("[resource_id]");
    var resource_id = resource.attr('resource_id');
    var url = "/resources/" + resource_id + "/add_resource_part.json?resource_part_type=Vocabulary";
    $.ajax({
        url: url,
        dataType: 'json',
        success: function(data){
            var selected_id = data.id;
            fetchAndSelectResourceParts(resource_id, selected_id);
        }
    })
});




function ResourceItem(options) {
    var self = this;
//    console.log('--------------start--------------')
//    console.log('OPTIONS UUID: ' + options.uuid);
//    console.log('--------------end--------------')

    defaultOptions = {
        uuid:     createUUID(),
        id: 0,
        parent_id:[],
        type:     "ResourceItem",
        heading:  "Heading",
        content:  "Type some instructions in here.",
        buildHTML:null,
        obj: null
    }

    if (typeof options == 'object') {
        options = _.extend(defaultOptions, options);
    } else {
        options = defaultOptions;
    }

    self.uuid = options.uuid;
    self.id = options.id;
    //console.log('SELF UUID: ' + self.uuid);
    self.type = options.type;
    //console.log('SELF TYPE: ' + self.type);
    self.heading = options.heading;
    self.content = options.content;
    self.parent_id = options.parent_id;
    self.buildHTML = ResourceRegistry[self.type].buildHTML;
    self.obj = options.obj;

    self.buildJSON = function (ui) {
        jui = $(ui);
        self.heading = jui.find('.heading').html();
        self.content = jui.find('.content').html();
        self.uuid = jui.attr('id');
        var parent = jui.parents('.content_item')[0];
        var parent_id = null;

        if($(parent).attr('type') != 'LessonConcept'){
            if(typeof $(parent).attr('id') != 'undefined') {
                parent_id = $(parent).attr('id');
            }
        }

        self.parent_id = parent_id;
        self.type = jui.attr('type');
        return self;
    };
};

var ResourceRegistry = {
    LessonContentItem:                {
        type:     "LessonContentItem",
        heading:  "Heading",
        content:  "Content",
        buildHTML:buildHTML
    },
    ResourceItem:                {
        type:     "ResourceItem",
        heading:  "Heading",
        content:  "Content",
        buildHTML:buildHTML
    },
    StandardHeader:             {
        type:     "StandardHeader",
        heading:  "Standard",
        content:  "Description goes here.",
        buildHTML:StandardHTML
    },
    LessonHeader:               {
        type:     "LessonHeader",
        heading:  "Title Goes Here",
        content:  "Description goes here.",
        buildHTML:buildHTML
    },
    LessonPart:                 {
        type:     "LessonPart",
        heading:  "Heading",
        content:  "Instructions go here.",
        buildHTML:buildHTML
    },
    StrategiesEmphasized:       {
        type:     "StrategiesEmphasized",
        heading:  "Strategies Emphasized",
        content:  "Instructions go here.",
        buildHTML:buildHTML
    },
    InterdisciplinaryConnection:{
        type:     "InterdisciplinaryConnection",
        heading:  "Interdisciplinary Connection",
        content:  "Instructions go here.",
        buildHTML:buildHTML
    },
    PriorToTheLesson:           {
        type:     "PriorToTheLesson",
        heading:  "Prior to the Lesson",
        content:  "Instructions go here.",
        buildHTML:buildHTML
    },
    ConductTheLesson:           {
        type:     "ConductTheLesson",
        heading:  "Conduct the Lesson",
        content:  "Instructions go here.",
        buildHTML:buildHTML
    },
    LessonNote:                 {
        type:     "LessonNote",
        heading:  "Note",
        content:  "Put some notes here.",
        buildHTML:buildHTML
    },
    LessonCheckup:              {
        type:     "LessonCheckup",
        heading:  "Checkup",
        content:  "Put some notes here.",
        buildHTML:buildHTML
    },
    PausePoint:                 {
        type:     "PausePoint",
        heading:  "Pause Point",
        content:  "This is a likely pause point of the lesson.",
        buildHTML:buildHTML
    },
    LessonEnd:                  {
        type:     "LessonEnd",
        heading:  "End of Lesson",
        content:  "...",
        buildHTML:buildHTML
    },
    LessonFocus:                {
        type:     "LessonFocus",
        heading:  "Lesson Focus",
        content:  "Whatever you put in here will be sent to the whiteboard when the button is clicked.",
        buildHTML:LessonFocusHTML
    },
    StudentCheckup:             {
        type:     "StudentCheckup",
        heading:  "whiteboard",
        content:  "Whatever you put in here will be sent to the whiteboard when the button is clicked.",
        buildHTML:WhiteboardHTML
    },
    LessonWhiteboard:           {
        type:     "LessonWhiteboard",
        heading:  "whiteboard",
        content:  "Whatever you put in here will be sent to the whiteboard when the button is clicked.",
        buildHTML:WhiteboardHTML
    },
    LessonTeacherSays:          {
        type:     "LessonTeacherSays",
        heading:  "Teacher",
        content:  "What should the teacher say?",
        buildHTML:TeacherSaysHTML
    },
    LessonClassSays:            {
        type:     "LessonClassSays",
        heading:  "Class",
        content:  "What should the class say?",
        buildHTML:ClassSaysHTML
    },
    ExitTicket:                 {
        type:     "ExitTicket",
        heading:  "FACT",
        content:  "...",
        buildHTML:buildHTML
    },
    LessonConcept:              {
        type:     "LessonConcept",
        heading:  "Day",
        content:  "Content goes here.",
        buildHTML:ConceptHTML
    },
    TeacherWidget:              {
        type:     "TeacherWidget",
        heading:  "",
        content:  "",
        buildHTML:TeacherWidgetHTML
    },
    Perception:              {
        type:     "Perception",
        heading:  "Perception Title",
        content:  "Perception Content",
        buildHTML:PerceptionHTML
    },
    Display:              {
        type:     "Display",
        heading:  "Note",
        content:  "",
        buildHTML:DisplayHTML
    },
    LessonStarter:              {
        type:     "LessonStarter",
        heading:  "Lesson Starter Title",
        content:  "Lesson Starter Content",
        buildHTML:LessonStarterHTML
    },
    TeacherGuide:              {
        type:     "TeacherGuide",
        heading:  "Teacher Guide",
        content:  "",
        buildHTML:TeacherGuideHTML
    },
    ConceptNote:              {
        type:     "ConceptNote",
        heading:  "Teacher Guide",
        content:  "",
        buildHTML:ConceptNoteHTML
    },
    Vocabulary:              {
        type:     "Vocabulary",
        heading:  "Vocabulary",
        content:  "",
        buildHTML:VocabularyHTML
    },
    Engage:              {
        type:     "Engage",
        heading:  "Engage",
        content:  "",
        buildHTML:EngageHTML
    }
};
