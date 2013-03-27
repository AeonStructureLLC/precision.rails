String.prototype.capitalize = function () {
    return this.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
        return p1 + p2.toUpperCase();
    });
};

(function($) {
    $.fn.flatten = function() {
        return $(this).clone().wrap('<div></div>').parent().html();
    }
})(jQuery);

function getHostWithoutPort(){
    var rawHost = location.host;
    var host = rawHost.split(':')[0]
    return host;
}

function stripPastedContent(OriginalString){
    var StrippedString = OriginalString.replace(/(<([^>]+)>)/ig,"");
    return StrippedString;
}

//$(".content").live("paste", function(e) {
//    var data = e.originalEvent.clipboardData.getData('text');
//    alert(data); // [object Clipboard]
//});

//$(".content").bind('paste', function(e) {
//    console.log('In Paste method.');
//    var el = $(this);
//    setTimeout(function() {
//        var text = $(el).val();
//        alert(text);
//    }, 100);
//});

//function insertNodeAtCursor(node) {
//    console.log(node);
//    var range, html;
//    if (window.getSelection && window.getSelection().getRangeAt) {
//        range = window.getSelection().getRangeAt(0);
//        range.insertNode(node);
//    } else if (document.selection && document.selection.createRange) {
//        range = document.selection.createRange();
//        html = (node.nodeType == 3) ? node.data : node.outerHTML;
//        range.pasteHTML(html);
//    }
//}

function insertHtmlAtCursor(html) {
    var range, node;
    if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0);
        //node = range.createContextualFragment(html);
        node = html.get(0);
        range.insertNode(node);
    } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().pasteHTML(html);
    }
}


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

        addDeleteIcon:function () {
            var ui = this;
            var parentId = ui.parent().attr('id');
            //var id = _.uniqueId('DeleteButton')

            var Delete = $('<div/>');
            Delete.addClass('DeleteIcon');

            Delete.addClass('ui-icon ui-icon-closethick')
            //Delete.attr('id',id);
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

function makeSafeForCSS(name) {
    return name.replace(/[^a-z0-9]/g, function (s) {
        var c = s.charCodeAt(0);
        if (c == 32) return '-';
        if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
        return '__' + ('000' + c.toString(16)).slice(-4);
    });
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

function build_lunar_1() {
    var id = _.uniqueId('Lunar1_');
    var container = "<div id='" + id + "' contenteditable='false'>";
    container += "<br>";
    container += "<div class='start_simulation_wrapper lesson_section'>";
    container += '<div class="button start_simulation_button start_lunar_1">Start</div>';
    container += "<div class='start_simulation_image'>";
    container += '<img src="/images/simulation_begin.png" />';
    container += "</div>";
    container += "</div>";
    container += "<br/>\n";

    return $(container);
}

function build_lunar_2() {
    var id = _.uniqueId('Lunar2_');
    var container = "<div id='" + id + "' contenteditable='false'>";
    container += "<br>";
    container += "<div class='start_simulation_wrapper lesson_section'>";
    container += '<div class="button start_simulation_button start_lunar_2">Start</div>';
    container += "<div class='start_simulation_image'>";
    container += '<img src="/images/simulation2_begin.png" />';
    container += "</div>";
    container += "</div>";
    container += "<br/>\n";

    return $(container);
}

function build_weather_1() {
    var id = _.uniqueId('Weather1_');
    var container = "<div id='" + id + "' contenteditable='false'>";
    container += "<br>";
    container += "<div class='start_simulation_wrapper lesson_section'>";
    container += '<div class="button start_simulation_button start_weather_1">Start</div>';
    container += "<div class='start_simulation_image'>";
    container += '<img src="/images/weather_simulation_begin.png" />';
    container += "</div>";
    container += "</div>";
    container += "<br/>\n";

    return $(container);
}

function build_weather_2() {
    var id = _.uniqueId('Weather2_');
    var container = "<div id='" + id + "' contenteditable='false'>";
    container += "<br>";
    container += "<div class='start_simulation_wrapper lesson_section'>";
    container += '<div class="button start_simulation_button start_weather_2">Start</div>';
    container += "<div class='start_simulation_image'>";
    container += '<img src="/images/weather_simulation_begin.png" />';
    container += "</div>";
    container += "</div>";
    container += "<br/>\n";

    return $(container);
}

function build_shadow_1() {
    var id = _.uniqueId('Shadow1_');
    var container = "<div id='" + id + "' contenteditable='false'>";
    container += "<br>";
    container += "<div class='start_simulation_wrapper lesson_section'>";
    container += '<div class="button start_simulation_button start_shadow_1">Start</div>';
    container += "<div class='start_simulation_image'>";
    container += '<img src="/images/shadow_simulation_begin.png" />';
    container += "</div>";
    container += "</div>";
    container += "<br/>\n";

    return $(container);
}

function build_shadow_2() {
    var id = _.uniqueId('Shadow2_');
    var container = "<div id='" + id + "' contenteditable='false'>";
    container += "<br>";
    container += "<div class='start_simulation_wrapper lesson_section'>";
    container += '<div class="button start_simulation_button start_shadow_2">Start</div>';
    container += "<div class='start_simulation_image'>";
    container += '<img src="/images/shadow_simulation_begin.png" />';
    container += "</div>";
    container += "</div>";
    container += "<br/>\n";

    return $(container);
}

function build_season_1() {
    var id = _.uniqueId('Season1_');
    var container = "<div id='" + id + "' contenteditable='false'>";
    container += "<br>";
    container += "<div class='start_simulation_wrapper lesson_section'>";
    container += '<div class="button start_simulation_button start_season_1">Start</div>';
    container += "<div class='start_simulation_image'>";
    container += '<img src="/images/season_simulation_begin.png" />';
    container += "</div>";
    container += "</div>";
    container += "<br/>\n";

    return $(container);
}

function build_season_2() {
    var id = _.uniqueId('Season2_');
    var container = "<div id='" + id + "' contenteditable='false'>";
    container += "<br>";
    container += "<div class='start_simulation_wrapper lesson_section'>";
    container += '<div class="button start_simulation_button start_season_2">Start</div>';
    container += "<div class='start_simulation_image'>";
    container += '<img src="/images/season_simulation_begin.png" />';
    container += "</div>";
    container += "</div>";
    container += "<br/>\n";

    return $(container);
}

function build_chemistry_1() {
    var id = _.uniqueId('Chemistry1_');
    var container = "<div id='" + id + "' contenteditable='false'>";
    container += "<br>";
    container += "<div class='start_simulation_wrapper lesson_section'>";
    container += '<div class="button start_simulation_button start_chemistry_1">Start</div>';
    container += "<div class='start_simulation_image'>";
    container += '<img src="/images/chemistry_simulation_begin.png" />';
    container += "</div>";
    container += "</div>";
    container += "<br/>\n";

    return $(container);
}

function build_chemistry_2() {
    var id = _.uniqueId('Chemistry2_');
    var container = "<div id='" + id + "' contenteditable='false'>";
    container += "<br>";
    container += "<div class='start_simulation_wrapper lesson_section'>";
    container += '<div class="button start_simulation_button start_chemistry_2">Start</div>';
    container += "<div class='start_simulation_image'>";
    container += '<img src="/images/chemistry_simulation_begin.png" />';
    container += "</div>";
    container += "</div>";
    container += "<br/>\n";

    return $(container);
}

function build_chemistry_3() {
    var id = _.uniqueId('Chemistry3_');
    var container = "<div id='" + id + "' contenteditable='false'>";
    container += "<br>";
    container += "<div class='start_simulation_wrapper lesson_section'>";
    container += '<div class="button start_simulation_button start_chemistry_3">Start</div>';
    container += "<div class='start_simulation_image'>";
    container += '<img src="/images/chemistry_simulation_begin.png" />';
    container += "</div>";
    container += "</div>";
    container += "<br/>\n";

    return $(container);
}

function build_chemistry_4() {
    var id = _.uniqueId('Chemistry4_');
    var container = "<div id='" + id + "' contenteditable='false'>";
    container += "<br>";
    container += "<div class='start_simulation_wrapper lesson_section'>";
    container += '<div class="button start_simulation_button start_chemistry_4">Start</div>';
    container += "<div class='start_simulation_image'>";
    container += '<img src="/images/chemistry_simulation_begin.png" />';
    container += "</div>";
    container += "</div>";
    container += "<br/>\n";

    return $(container);
}


function insertVideo(url, title, duration) {
    var id = _.uniqueId('Video');
    var container = "<div id='" + id + "' class='media_item media_video lesson_section' media='" + url + "' contenteditable='false'>";
    container += "<div class='play_video_on_whiteboard button' target_div='#" + id + "'>Whiteboard</div>";
    container += "<div class='caption'>'" + title + "'<br/>(" + duration + ")</div>";
    container += "<div class='video_icon'></div>";
    container += "</div>\n";
    return $(container);
}

var pad = function (num, totalChars) {
    var pad = '0';
    num = num + '';
    while (num.length < totalChars) {
        num = pad + num;
    }
    return num;
};

// Ratio is between 0 and 1
var changeColor = function (color, ratio, darker) {
    var difference = Math.round(ratio * 255) * (darker ? -1 : 1),
        minmax = darker ? Math.max : Math.min,
        decimal = color.replace(
            /^#?([a-z0-9][a-z0-9])([a-z0-9][a-z0-9])([a-z0-9][a-z0-9])/i,
            function () {
                return parseInt(arguments[1], 16) + ',' +
                    parseInt(arguments[2], 16) + ',' +
                    parseInt(arguments[3], 16);
            }
        ).split(/,/);
    return [
        '#',
        pad(minmax(parseInt(decimal[0], 10) + difference, 0).toString(16), 2),
        pad(minmax(parseInt(decimal[1], 10) + difference, 0).toString(16), 2),
        pad(minmax(parseInt(decimal[2], 10) + difference, 0).toString(16), 2)
    ].join('');
};
var lighterColor = function (color, ratio) {
    return changeColor(color, ratio, false);
};
var darkerColor = function (color, ratio) {
    return changeColor(color, ratio, true);
};

function trim(str) {
    var newstr;
    newstr = str.replace(/^\s*/, "").replace(/\s*$/, "");
    newstr = newstr.replace(/\s{2,}/, " ");
    return newstr;
}

var savedRange, isInFocus;
function saveSelection() {
    console.log('Saving Selection!');
    if (window.getSelection)//non IE Browsers
    {
        savedRange = window.getSelection().getRangeAt(0);
    }
    else if (document.selection)//IE
    {
        savedRange = document.selection.createRange();
    }
}

function restoreSelection() {
    isInFocus = true;
    document.getElementById("LessonWrapper").focus();
    if (savedRange != null) {
        if (window.getSelection)//non IE and there is already a selection
        {
            var s = window.getSelection();
            if (s.rangeCount > 0)
                s.removeAllRanges();
            s.addRange(savedRange);
        }
        else
        if (document.createRange)//non IE and no selection
        {
            window.getSelection().addRange(savedRange);
        }
        else
        if (document.selection)//IE
        {
            savedRange.select();
        }
    }
}
//this part onwards is only needed if you want to restore selection onclick
var isInFocus = false;
function onDivBlur() {
    console.log('In onDivBlur')
    isInFocus = false;
}

function cancelEvent(e) {
    if (isInFocus == false && savedRange != null) {
        if (e && e.preventDefault) {
            //alert("FF");
            e.stopPropagation(); // DOM style (return false doesn't always work in FF)
            e.preventDefault();
        }
        else {
            window.event.cancelBubble = true;//IE stopPropagation
        }
        restoreSelection();
        return false; // false = IE style
    }
}


$('#OpenInsertVideoDialog').on('click', function () {
    var ui = $('#InsertVideoDialog');
    if (ui.dialog('isOpen')) {
        ui.dialog('close');
    } else {
        ui.dialog('open');
    }

});

$('#Simulations').dialog({
    width:    150,
    autoOpen: false,
    title:    'Simulations',
    position: ['right', 'top'],
    resizable:false
});


$('#InsertVideoDialog').dialog({
    width:    500,
    autoOpen: false,
    title:    'Insert Video',
    position: ['right', 'top'],
    resizable:false
});

$('#SaveVideoToContent').on('click', function () {
    var url = $('input[name="url"]').val();
    var title = $('input[name="title"]').val();
    var duration = $('input[name="duration"]').val() || 'UNK';
    var part = insertVideo(url, title, duration);
    console.log(part);
    var noded = part.get(0);
    savedRange.deleteContents();
    savedRange.insertNode(noded);
});

function ContentItem(options) {
    var self = this;
//    console.log('--------------start--------------')
//    console.log('OPTIONS UUID: ' + options.uuid);
//    console.log('--------------end--------------')

    defaultOptions = {
        uuid:     createUUID(),
        parent_id:[],
        type:     "ContentItem",
        heading:  "Heading",
        content:  "Type some instructions in here.",
        buildHTML:null
    }

    if (typeof options == 'object') {
        options = _.extend(defaultOptions, options);
    } else {
        options = defaultOptions;
    }

    self.uuid = options.uuid;
    //console.log('SELF UUID: ' + self.uuid);
    self.type = options.type;
    //console.log('SELF TYPE: ' + self.type);
    self.heading = options.heading;
    self.content = options.content;
    self.parent_id = options.parent_id;
    //console.log('PARENT UUID: ' + self.parent_id);
    self.buildHTML = options.buildHTML;
    self.buildHTML = ContentTypeRegistry[self.type].buildHTML;

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
        console.log(self.parent_id);
        return self;
    };
};

$(document).on('click', '.DeleteIcon', function (event) {
    $(this).closest('.content_item').remove();
});

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

var ContentTypeRegistry = {
    LessonContentItem:                {
        type:     "LessonContentItem",
        heading:  "Heading",
        content:  "Content",
        buildHTML:buildHTML
    },
    ContentItem:                {
        type:     "ContentItem",
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
    }
};

$(document).on('click', '.editorSections', function (event) {
    var part_options = ContentTypeRegistry[$(this).attr('type')];
    var part = new ContentItem(part_options).buildHTML();

    var wrapper = $("<div></div>");
    wrapper.append("<br/>");
    wrapper.append(part);
    wrapper.append("<br/>");

    var noded = wrapper.get(0);
    savedRange.deleteContents();
    savedRange.insertNode(noded);
});

$('.editorControls').button();

$('.Close').on('click', function () {
    window.location = close_location;
});

function add_lesson_header(title, description) {
    var header_options = ContentTypeRegistry["LessonHeader"];
    header_options.heading = title;
    header_options.content = description;
    var lesson_header = new ContentItem(header_options).buildHTML();
    $("#LessonHeaderWrapper").prepend(lesson_header);
}


function new_lesson_template(title) {

    var header_options = ContentTypeRegistry["LessonHeader"];
    header_options.heading = title;
    var lesson_header = new ContentItem(header_options).buildHTML();

    var html = "<div id='LessonWrapper' class='lesson_wrapper' contenteditable='true' onblur='onDivBlur();' onblur='onDivBlur();' onmouseup='saveSelection();' onkeyup='saveSelection();'>\n";
    html += "<div id='LessonContent' class='lesson_content' contenteditable='true'>Content goes here.</div>\n";
    html += "</div>\n";
    jhtml = $(html);
    jhtml.prepend(lesson_header);
    return jhtml;
}

function new_concept_template(title, concept_id) {

    var header_options = ContentTypeRegistry["LessonConcept"];
    header_options.heading = title;
    var lesson_header = new ContentItem(header_options).buildHTML();

    var html = "<div id='ConceptWrapper_" + concept_id + "' concept_id='" + concept_id + "' class='concept_wrapper' contenteditable='true' onblur='onDivBlur();' onblur='onDivBlur();' onmouseup='saveSelection();' onkeyup='saveSelection();'>\n";
    html += "<div class='concept_selectors'><div class='listing_selector StrategiesSelector' concept_id='" + concept_id + "'>PSETs</div><div class='listing_selector FactsSelector' concept_id='" + concept_id + "'>FACTs</div></div>";
    html += "</div>\n";
    jhtml = $(html);
    jhtml.prepend(lesson_header);
    return jhtml;
}

var json_array = [];

function build_concept_array(concept_id) {
    var concept_array = [];
    var content_items = $('#ConceptWrapper_' + concept_id).find('.content_item');
    console.log(content_items);

    _.each(content_items, function (i) {
        var content_item = $(i);
        var content_options = ContentTypeRegistry[content_item.attr('type')];
        var json_string = JSON.stringify(new ContentItem(content_options).buildJSON(content_item));
        concept_array.push(json_string);
    });
    return concept_array;
}

function expand_content_array() {
    lesson_wrapper = "<div id='LessonWrapper' class='lesson_wrapper' contenteditable='true' onblur='onDivBlur();' onblur='onDivBlur();' onmouseup='saveSelection();' onkeyup='saveSelection();'></div>";
    $('#Content').html(lesson_wrapper);

    _.each(concept_data, function (o) {
        var i = JSON.parse(o);
        var contentType = i.type;
        var html = new ContentItem(i).buildHTML();
        if (typeof i.parent_id == 'undefined') {
            $('#LessonWrapper').append(html);
            $('#LessonWrapper').append('<br/>\n');
        } else {
            $('#' + i.parent_id).append(html)
                .append('<br/>\n');
        }

    });

}

function expand_concept_array(concept_array, concept_id, concept_order) {
    concept_wrapper = "<div id='ConceptWrapper_" + concept_id + "' concept_id='" + concept_id + "' class='concept_wrapper' contenteditable='true' onblur='onDivBlur();' onblur='onDivBlur();' onmouseup='saveSelection();' onkeyup='saveSelection();'>";
    concept_wrapper += "<div class='concept_selectors'><div class='listing_selector StrategiesSelector' concept_id='" + concept_id + "'>PSETs</div><div class='listing_selector FactsSelector' concept_id='" + concept_id + "'>FACTs</div></div>";
    concept_wrapper += "</div>";
    var concept_ui = $('#Concept_' + concept_order);
    concept_ui.html(concept_wrapper);
    var concept_wrapper_ui = $('#ConceptWrapper_' + concept_id);
    //console.log(concept_array);
    _.each(concept_array, function (o) {
//        var i = JSON.parse(o); // Use this for old data format
        var i = eval(o); // Use this for the Nokogiri parsed data
        //console.log(i);
        var contentType = i.type;

        if (contentType != "LessonHeader") {

            var html = new ContentItem(i).buildHTML();
            if ((i.parent_id != null) && (typeof i.parent_id != 'undefined')) {
                if(i.type == 'LessonFocus'){
                    html.remove();
                    concept_wrapper_ui.append(html);
                    concept_wrapper_ui.append('<br/>\n');
                } else {
                    var has_my_id = $('#' + i.uuid);
                    $(has_my_id).replaceWith(html.flatten());
                }
            } else {
                html.remove();
                concept_wrapper_ui.append(html);
                concept_wrapper_ui.append('<br/>\n');
            }

        }

    });

}

var save_clicked = false;

$(document).on('click', '.SaveEdits', function (event) {
    if (save_clicked == false) {

        var concepts = $('.concept_wrapper:visible');
        _.each(concepts, function (o) {
            //console.log(o);
            //build_concept_array();
            var concept_id = $(o).attr('concept_id');
            var concept_uri = "/concepts/" + concept_id;
            var concept_array = build_concept_array(concept_id);
            var concept = {
                data:concept_array
            }
            $.ajax({
                headers:{ 'X-CSRF-Token':xcsrf_token },
                async:  false,
                url:    concept_uri,
                data:   {concept:concept},
                type:   'put'
            });
        });


        var lesson_id = $(this).attr('lesson_id');
        var lesson_uri = "/lessons/" + lesson_id;
        var lesson_name = $('.LessonHeader').find('.heading').html();
        var lesson_description = $('.LessonHeader').find('.content').html();
        var lesson = {
            title:      lesson_name,
            description:lesson_description
        }
        $.ajax({
            headers:{ 'X-CSRF-Token':xcsrf_token },
            async:  false,
            url:    lesson_uri,
            data:   {lesson:lesson},
            type:   'put'
        });


        save_clicked = true;
        setTimeout(function () {
            save_clicked = false
        }, 500);
    }

});


function new_standard_template() {

    var header_options = ContentTypeRegistry["StandardHeader"];

    var standard_header = new ContentItem(header_options).buildHTML();

    var html = "<div id='LessonWrapper' class='lesson_wrapper' contenteditable='true' onblur='onDivBlur();' onblur='onDivBlur();' onmouseup='saveSelection();' onkeyup='saveSelection();'>\n";
    html += "</div>\n";
    var jhtml = $(html);
    jhtml.prepend(standard_header);
    return jhtml;
}

$(document).on('click', '.SaveStandard', function (event) {

    var editorUi = $(this).attr('target');
    var content = $(editorUi).html();
    var name = $('.StandardHeader').find('.heading').html();
    var subject = $('#MetaSubject').attr('value');
    var grade = $('#MetaGrade').attr('value');
    var unit = $('#MetaUnit').attr('value');
    var description = $('.StandardHeader').find('.content').html();

    var standard = {
        name:       name,
        description:description,
        subject:    subject,
        grade:      grade,
        unit:       unit,
        json_array: json_array
    }
    $.ajax({
        headers:{ 'X-CSRF-Token':xcsrf_token },
        url:    '/content_admin',
        data:   {standard:standard},
        type:   'post',
        success:function () {
            console.log('Standard Data saved to server.')
        }
    })
});

$(document).on('click', '.new_lesson_button', function (event) {
    var standard_path = $(this).attr('standard_path');
    var new_lesson_url = "/content_entry/edit?standard_path=" + standard_path + "&file_name=new_lesson";
    window.location = new_lesson_url;
});

function prepend_standard(standard_path) {

    var place_holder = new ContentItem({type:"StandardHeader", heading:"", content:""}).buildHTML();
    $("#LessonWrapper").prepend(place_holder);

    var data_path = "/content/" + standard_path + "/data.js";

    $.ajax({
        url:    data_path,
        success:function (data) {
            eval(data);

            $(".StandardHeader").remove();

            var standard_options = {
                type:   "StandardHeader",
                heading:standard.name,
                content:standard.description
            }

            var standard_header = new ContentItem(standard_options).buildHTML();

            $("#LessonWrapper").prepend(standard_header);
        }
    });
}