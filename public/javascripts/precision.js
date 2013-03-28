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
    $(".attribute").attr('contenteditable', 'true');
    set_categories_navigation("off");
    resetCategoryInteractions();
    // Change Edit Button Status
}

function end_categories_edit(){
    $("#CategoriesList").removeClass('edit_mode');
    $(".attribute").removeAttr('contenteditable');
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