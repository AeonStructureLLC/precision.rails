// Localstorage to store
// - Overall list
// - Last success
// - List of successful
//      - Pop successful off the top of Overall list.


function getAllConceptIds(){
    var concepts_path = '/fix_concept_uuids.json';
    var concepts_json = {};
    var concepts_overall_list = $.totalStorage('concepts_overall_list');
    var last_concept_fetch = $.totalStorage('last_concept_fetch');
    var refetch = moment().subtract('days', 2).format();

    if(last_concept_fetch == null){
        last_concept_fetch = $.totalStorage('last_concept_fetch', moment().subtract('days', 7).format());
    }

    function fetch_data(){
        $.ajax({
            url: concepts_path,
            dataType: 'json',
            async:false,
            success:function(data){
                $.totalStorage('concepts_overall_list', data);
                $.totalStorage('last_concept_fetch', moment().format());
            }
        });
    }

    if(last_concept_fetch < refetch){
        fetch_data();
    }

    if( typeof concepts_overall_list != 'array') {
        fetch_data();
    }

    window['concepts_overall_list'] = $.totalStorage('concepts_overall_list');
}

function fetchConceptsCompleteList(){
    window['concepts_complete_list'] = $.totalStorage('concepts_complete_list');
    if((window['concepts_complete_list'] == null) || (typeof window['concepts_complete_list'] == 'undefined')){
        window['concepts_complete_list'] = [];
    }
    if(typeof window['concepts_complete_list'] == 'number'){
        window['concepts_complete_list'] = [window['concepts_complete_list']];
    }
    return window['concepts_complete_list'];
}

function pushConceptProcessingComplete(id){
    // Add to list of successful
    // Subtract this array from concepts_overall_list to determine work to be done.
    var concepts_complete_list = fetchConceptsCompleteList();
    concepts_complete_list.push(id);
    $.totalStorage('concepts_complete_list', concepts_complete_list);
    window['concepts_complete_list'] = $.totalStorage('concepts_complete_list');
    console.log('Complete List: ' + $.totalStorage('concepts_complete_list'));

    $('#ProcessedCount').html(window['concepts_complete_list'].length);
}

function buildConceptWorkQueue(){
    var complete = window['concepts_complete_list'];
    var all_concepts = window['concepts_overall_list'];
    var work = _.difference(all_concepts,complete)
    if(work.length == 0){
        location='http://xkcd.com';
    }
    $.totalStorage('concepts_work_queue', work);
    window['concepts_work_queue'] = $.totalStorage('concepts_work_queue');
}

function processConceptWorkQueue(id){
    // Step through each item in concepts_work_queue
    // Build out the item as if we were in a content editing session
    // Make the changes needed to the UUIDs
    // Save it back
    // On success add it to the concepts_complete_list
    // Move on to the next one.
    // When the concepts_work_queue is empty display a message to the user stating the process is complete.
    if(typeof id == 'undefined'){
        var work_unit = window['concepts_work_queue'][0]; // Each time we come back we work on ONE item.
    } else {
        var work_unit = id;
    }
    var concept = null;
    var concept_path = '/concepts/' + work_unit + '.json';
    $.ajax({
        url: concept_path,
        dataType: 'json',
        async:false,
        success:function(data){
            concept = data;
        }
    });

    window['current_concept_id'] = concept.id;
    addConceptToPage(concept);
}


function fixUUIDSetup(){
    getAllConceptIds();
    fetchConceptsCompleteList();
    $('#ProcessedCount').html(window['concepts_complete_list'].length);
    buildConceptWorkQueue();
    processConceptWorkQueue();
}

function fixupParentUUIDs(){
    var current_concept_id = window['current_concept_id'];
    var concept_array = build_concept_array(current_concept_id);
    var concept_uri = "/concepts/" + current_concept_id + '.json';
    var concept = {
        data:concept_array
    }

    $.ajax({
        headers:{ 'X-CSRF-Token':xcsrf_token },
        async:  false,
        url:    concept_uri,
        dataType: 'json',
        data:   {concept:concept},
        type:   'put',
        statusCode:{
               200: function(data) {
                $('#Concept').html("fixupParentUUIDs complete for " + current_concept_id);
                pushConceptProcessingComplete(current_concept_id);
                location.reload(true);
            }
        }
    });
}
// --------------------------

function addConceptToPage(concept) {
    var concept_wrapper = '';

    if(typeof concept.data == 'string'){
        var concept_array = eval(concept.data);
    } else {
        var concept_array = concept.data;
    }
    var concept_id = concept.id;
    var concept_ui = $('#Concept');


    concept_wrapper = "<div id='ConceptWrapper_" + concept_id + "' concept_id='" + concept_id + "' class='concept_wrapper' contenteditable='true' onblur='onDivBlur();' onblur='onDivBlur();' onmouseup='saveSelection();' onkeyup='saveSelection();'>";
    concept_wrapper += "<div class='concept_selectors'><div class='listing_selector StrategiesSelector' concept_id='" + concept_id + "'>PSETs</div><div class='listing_selector FactsSelector' concept_id='" + concept_id + "'>FACTs</div></div>";
    concept_wrapper += "</div>";
    concept_ui.html(concept_wrapper);

    var concept_wrapper_ui = $('#ConceptWrapper_' + concept_id);

    _.each(concept_array, function (i) {
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
    fixupParentUUIDs();
}




