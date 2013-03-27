var xcsrf_token = '<%= form_authenticity_token.to_s %>';

var standard_name = null;
var standard_subject = null;
var standard_grade = null;
var standard_unit = null;
var standard_description = null;
var ordered_array = null;

var current_subject = null;
var current_grade = null;

function navWrapper(name, path, type) {
  var type_lower = type.toLowerCase();
  var type_caps = type_lower.capitalize();
  var nav_wrapper = $("<li></li>");
  nav_wrapper.attr('id', type_caps + "_" + makeSafeForCSS(name));
  nav_wrapper.addClass('nav_' + type_lower);
  var nav = $("<a></a>");
  
  nav.text(name);
  nav.attr('href', path);
  
  nav_wrapper.append(nav);
  
  var delete_path_button = $('<div></div>');
  delete_path_button.addClass('delete_path_button');
  delete_path_button.attr('path', name);
  
  delete_path_button.text("X"); //Make this an image
  
  nav_wrapper.append(delete_path_button);
  
  return nav_wrapper;
}

function makeUnit(name, path, days) {
  var nav_wrapper = $("<li></li>");
  nav_wrapper.attr('id', "Unit_" + makeSafeForCSS(name));
  nav_wrapper.addClass('nav_unit');
  nav_wrapper.attr('directory', name);

  var nav = $("<a></a>");
  nav.text(name);
  nav.attr('href', path);
  nav_wrapper.append(nav);

  var edit_wrapper = $('<div></div>');
  edit_wrapper.addClass('edit_wrapper');

  var number_of_days = $('<input/>');
  number_of_days.addClass('number_of_days');
  number_of_days.attr('maxlength', '2');
  number_of_days.attr('value', days);
  edit_wrapper.append(number_of_days);

  var delete_path_button = $('<div></div>');
  delete_path_button.addClass('delete_path_button');
  delete_path_button.attr('path', path);
  delete_path_button.text("X"); //Make this an image
  edit_wrapper.append(delete_path_button);

  nav_wrapper.append(edit_wrapper);

  return nav_wrapper;
}

function emptyElements(elementArray){
  _.each(elementArray, function(item){
    $(item).html('');
  })
}

var Workspace = Backbone.Router.extend({

  routes: {
    "":                                 "start",    
    ":subject":                         "subject",  
    ":subject/:grade":                  "grade",   
    ":subject/:grade/:unit":            "unit",
  },

  start: function() {
    $('#SaveDescription').hide();
    $('.navigation_crumb').removeClass('current_nav');
    var elements = [
      "#NavigationSubject",
      "#NavigationGrade",
      "#NavigationUnit",
      "#NavigationStandard",
      "#SubjectEdit"
      ];
    emptyElements(elements);
    
    _.each(content_array, function(subject, name){
      var path = "#" + name;
      var nav_wrapper = navWrapper(name, path, 'subject');
      
      $("#NavigationSubject").append(nav_wrapper);
    });
    $("#NavigationSubject").addClass('current_nav');
  },

  subject: function(subject) {
    $('#SaveDescription').hide();
    $('.navigation_crumb').removeClass('current_nav');
    var elements = [
      "#NavigationGrade",
      "#NavigationUnit",
      "#NavigationStandard",
      "#SubjectEdit"
      ];
    emptyElements(elements);
    
    $('.nav_subject').removeClass('selected_nav_item');
    $("#Subject_" + makeSafeForCSS(subject)).addClass('selected_nav_item');
    
    _.each(content_array[subject], function(grade, name){
      var path = "#" + subject + "/" + name;
      var nav_wrapper = navWrapper(name, path, 'grade');
      
      $("#NavigationGrade").append(nav_wrapper);
    });
    $("#NavigationGrade").addClass('current_nav');
  },
  
  grade: function(subject, grade) {
    this.subject(subject);
    $('#SaveDescription').hide();
    $('.navigation_crumb').removeClass('current_nav');
    var elements = [
      "#NavigationUnit",
      "#NavigationStandard",
      "#SubjectEdit"
      ];
    emptyElements(elements);

    $('.nav_grade').removeClass('selected_nav_item');
    $("#Grade_" + makeSafeForCSS(grade)).addClass('selected_nav_item');
  
    var pace_url = "/content/" + subject + "/" + grade + "/data.js";
    
    current_subject = subject;
    current_grade = grade;
    
    $.ajax({
      url: pace_url,
      dataType: 'json',
      async: false,
      statusCode: {
        200: function(data){
          eval(data.responseText);
          _.each(pacing_guide, function(unit){
            if(unit.directory != "data.js"){
              var path = "#" + subject + "/" + grade + "/" + unit.directory;
              var nav_wrapper = makeUnit(unit.directory, path, unit.days);
             $("#NavigationUnit").append(nav_wrapper); 
            }
          });
        },
        
       404: function(){
         _.each(content_array[subject][grade], function(unit, name){
           var path = "#" + subject + "/" + grade + "/" + name;
           var nav_wrapper = makeUnit(name, path, 1);
           $("#NavigationUnit").append(nav_wrapper);
         });
       }
       
      },
    });
    
    
    $("#NavigationUnit").addClass('current_nav');
    
    $("#NavigationUnit").sortable({
      update: function(event, ui){
        save_pacing_guide();
      },
    });
    
  },
  
  unit: function(subject, grade, unit) {
    this.grade(subject, grade);
    $('#SaveDescription').hide();
    $('.navigation_crumb').removeClass('current_nav');
    
    var elements = [
      "#NavigationStandard",
      "#SubjectEdit"
      ];
    emptyElements(elements);

    $('.nav_unit').removeClass('selected_nav_item');
    $("#Unit_" + makeSafeForCSS(unit)).addClass('selected_nav_item');

    _.each(content_array[subject][grade][unit], function(standard, name){
      var path = "#" + subject + "/" + grade + "/" + unit + "/" + name;
      var nav_wrapper = navWrapper(name, path, 'standard');
      
      $("#NavigationStandard").append(nav_wrapper);
    });
    $("#NavigationStandard").addClass('current_nav');
  },
  


});

