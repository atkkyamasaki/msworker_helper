// 各要素の取得、変数の定義
var sr_num
var sr_title
var sr_email
var sr_contract

// var updateCustomerInfoHash = {};
// var tileMarkId = '';

// URL による切り替え

$(function() {

    var url = location.href;

    if (url.match(/email/)) {
        // _forMail();
    } else if (url.match(/customer\/commercial/) || url.match(/customer\/case/)) {
        _forCase();
        _forMail();
    } else if (url.match(/home/)) {
        _forHome();
    } else {

    }

	// 付箋の Open/Close 処理
	$(document).on("dblclick", "#summary_note", function () {
		$(this).toggleClass('post_it_close');
	});
	$(document).on("dblclick", "#summary_note2", function () {
		$(this).toggleClass('post_it_close');
	});

   	// クリップボードへコピー
	$(".my_clip_board").on("click", function () {
		var copy_strings = $(this).prev('input').val();
		_copyTextToClipboard(copy_strings);
	});

});


// Email helper

function _forMail(){

    var clipHtml = '<i class="fa fa-files-o my_clip_board" aria-hidden="true"></i>';

	var summaryNote = '<div id="summary_note2" class="post_it">[Function for EMAIL]' +
		'<p class="post_it_item">Japan Azure Support : </p>' +
		'<p class="post_it_item"><input id="post_it_input_cc" type="text" name="cc" maxlength="40" value="jpazrst@microsoft.com">' + clipHtml + '</p>' +
		'<p class="post_it_item">Title : </p>' +
		'<p class="post_it_item"><input id="post_it_input_title" type="text" name="title" maxlength="30" value="">' + clipHtml + '</p>' +
        '</div>';

	var loadingField = '<div class="all_loading hide"></div>';

	if (true) {
		$('body').after(summaryNote);	
		$('body').after(loadingField);
	}

    setInterval(function(){
        _getAfterLoadForMail();
    }, 2000);
}

function _getAfterLoadForMail(){
    elementSrNum = $("#content > div > ui-view > case-integrated-layout > div > div.head-bar.bg-color > mc-case-basic-info > div > div > div.section-1 > div.row-1 > div:nth-child(1) > div.value > span");
    // elementCc = $("#content > div > ce-email > div > email-content > email-header > div > address-field:nth-child(2) > div > address-list > div > address-search > input");
    elementTitle = $("#content > div > ui-view > case-integrated-layout > div > div.head-bar.bg-color > mc-case-basic-info > div > div > div.section-1 > div.row-2 > div > div.value.block-with-text.bg-color > span");
    newTitle = '[REG:' + elementSrNum.text() + '] ' + elementTitle.text();

    $('#post_it_input_title').val(newTitle);

}

// https://www.tam-tam.co.jp/tipsnote/javascript/post12323.html
// function _checkMailValidWatcher(){
//     subject = $("#content > div > ce-email > div > email-content > email-header > div > div > input") 

// }



// Case helper

function _forCase(){

    elementCc = $("#content > div > ce-email > div > email-content > email-header > div > address-field:nth-child(2) > div > address-list > div > address-search > input")

    var clipHtml = '<i class="fa fa-files-o my_clip_board" aria-hidden="true"></i>';

	var summaryNote = '<div id="summary_note" class="post_it">[Function for Case]' +
        '<p class="post_it_item"><i id="clip_date" class="fa fa-clock-o fa-lg icon_clip_board" aria-hidden="true" title="now_time"></i>' +
            '<i id="clip_asc" class="fa fa-commenting fa-lg icon_clip_board" aria-hidden="true" title="asc_check"></i>' +
            '<i id="clip_fqr" class="fa fa-heart-o fa-lg icon_clip_board" aria-hidden="true" title="fqr"></i>' +
            '<i id="clip_tell" class="fa fa-volume-control-phone fa-lg icon_clip_board" aria-hidden="true" title="tell"></i>' +
            '<i id="clip_mail" class="fa fa-envelope-open-o fa-lg icon_clip_board" aria-hidden="true" title="call"></i>' +
            '<i id="clip_close" class="fa fa-check-circle fa-lg icon_clip_board" aria-hidden="true" title="close"></i></p>' +
        '<p class="post_it_item">Status Update : </p>' +
        '<p class="post_it_item"><input type="text" size="20" maxlength="40" value="- Status update">' + clipHtml + '</p>' +
        '<p class="post_it_item">NextC Update : </p>' +
        '<p class="post_it_item"><input type="text" size="20" maxlength="40" value="- Next contact update">' + clipHtml + '</p>' +
        '<p class="post_it_item">Close check : </p>' +
        '<p class="post_it_item"><input type="text" size="20" maxlength="40" value="- Asked close check">' + clipHtml + '</p>' +
        '<p class="post_it_item">' + '<span id="close_check_btn"><i class="fa fa-check-square-o" aria-hidden="true"></i>Close Check </span>' + '</p>' +
        '</div>';
	
	var loadingField = '<div class="all_loading hide"></div>';

	if (true) {
		$('body').after(summaryNote);	
		$('body').after(loadingField);
    }

    setInterval(function(){
        _validateForCase();
        _closeCheck();
    }, 2000);

    // Icon クリック時の動作
	// Clock
	$("#clip_date").on("click", function () {
        var date = new Date();

        var year_str = date.getFullYear();
        var month_str = date.getMonth() + 1;
        var day_str = date.getDate();
        var hour_str = date.getHours();
        var minute_str = date.getMinutes();
        var second_str = date.getSeconds();
  
        month_str = ('0' + month_str).slice(-2);
        day_str = ('0' + day_str).slice(-2);
        hour_str = ('0' + hour_str).slice(-2);
        minute_str = ('0' + minute_str).slice(-2);
        second_str = ('0' + second_str).slice(-2);
  
        format_str = 'YYYY/MM/DD hh:mm:ss';
        format_str = format_str.replace(/YYYY/g, year_str);
        format_str = format_str.replace(/MM/g, month_str);
        format_str = format_str.replace(/DD/g, day_str);
        format_str = format_str.replace(/hh/g, hour_str);
        format_str = format_str.replace(/mm/g, minute_str);
        format_str = format_str.replace(/ss/g, second_str);
        
        result = '- ' + format_str + '\n';
        _copyTextToClipboard(result);
	});

    // ASC
	$("#clip_asc").on("click", function () {
        result = '- ASC OK\n';
        _copyTextToClipboard(result);
	});

    // ASC
	$("#clip_fqr").on("click", function () {
        result = '- FQR OK\n1. FQR Achieved? (True/False) T\n2. If false, what was the FQR missed reason: \n  A: Tools (like ASC) did not provide the quick insights on this break/fix situation (Break/fix ケースであったが ASC の insights などのツールから早期に回答が得られなかった)\n  B: The cx asked design related advisory but it was not publicly documented (仕様確認が来たが公開情報には記載されていなかった)\n  C: Needs PG escalation (PG エスカレーションが必要)\n  D: The engineer did not have enough time since he/she was on another urgent case (他の緊急な案件があり、本件に時間が割けなかった)\n  E: The case stayed long in the queue, and the engineer took the case ownership at the last minute (アサインが遅く、SLA を優先せざるを得なかった)\n  F: Other (その他、フリーコメント)\n ';
        _copyTextToClipboard(result);
	});


    // TELL
	$("#clip_tell").on("click", function () {
        result = '- Tell to customer\n';
        _copyTextToClipboard(result);
	});

    // Mail
	$("#clip_mail").on("click", function () {
        result = '- Mail to customer\n';
        _copyTextToClipboard(result);
	});

    // Mail
	$("#clip_close").on("click", function () {
        result = '- Close this SR\n';
        _copyTextToClipboard(result);
	});

    // Close Check
    $("#close_check_btn").on("click", function () {
        window.open('http://khiraha10/?num=' + sr_num + '&title=' + sr_title + '&email=' + sr_email + '&contract=' + sr_contract);
    });

}

function _validateForCase(){
    // errorMsg = '<div class="validate_warning"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>';

    assignedTo = $("#mc-case-section > div > sd-tile-layout > div > div:nth-child(1) > div:nth-child(1) > mc-azure-case-details > div > div:nth-child(2) > azure-case-details > div > div:nth-child(1) > div.field-value > div > div:nth-child(1) > span, sd-label[data-automation-id='AssignedTo_Value']");
    caseStatus = $('#content > div > ui-view > case-integrated-layout > div > div.head-bar.bg-color > mc-case-basic-info > div > div > div.section-2 > div.status > sd-select > div > a');
    labor = $('#mc-case-section > div > sd-tile-layout > div > div > div:nth-child(7) > mc-case-labor-list > div > div:nth-child(2) > sd-progress > div > div, #mc-case-section > div > sd-tile-layout > div > div:nth-child(1) > div:nth-child(4) > mc-case-labor-list > div > div:nth-child(2) > sd-progress > div > div');
    task = $('#mc-case-section > div > sd-tile-layout > div > div:nth-child(1) > div:nth-child(3) > mc-case-tasks > div > div:nth-child(2) > sd-progress > div > div > span, #mc-case-section > div > sd-tile-layout > div > div > div:nth-child(5) > mc-case-tasks > div > div:nth-child(2) > sd-progress > div > div > span, #mc-case-section > div > sd-tile-layout > div > div > div:nth-child(5) > mc-case-tasks > div > div:nth-child(2) > div > span, #mc-case-section > div > sd-tile-layout > div > div:nth-child(1) > div:nth-child(3) > mc-case-tasks > div > div:nth-child(2) > div > span');

    validateList = [
        {'element': assignedTo , 'validation': 'Unassigned'},
        {'element': caseStatus , 'validation': 'Select Status', 'validation2': 'Initial Contact Pending'},
        {'element': task , 'validation': 'There are no tasks for this case'},
        {'element': labor, 'validation': 'There is no labor data for this case'},
    ];

    $.each(validateList, function(index, value) {
        if (value.element.text() == value.validation || value.element.text() == value.validation2) {
            if (!value.element.hasClass('validation_check')){
                value.element.addClass('validation_check');
            }
        } else {
            if (value.element.hasClass('validation_check')){
                value.element.removeClass('validation_check');
            }
        }
    });		

    // if (labor.text() == 'Unassigned') {
    //     if (!labor.hasClass('validation_check')){
    //         labor.addClass('validation_check');
    //     }
    // } else {
    //     if (labor.hasClass('validation_check')){
    //         labor.removeClass('validation_check');
    //     }
    // }

}

function _closeCheck(){
    // Close Checker
    element_sr_num = "#content > div > ui-view > case-integrated-layout > div > div.head-bar.bg-color > mc-case-basic-info > div > div > div.section-1 > div.row-1 > div:nth-child(1) > div.value > span";
    element_sr_title = "#content > div > ui-view > case-integrated-layout > div > div.head-bar.bg-color > mc-case-basic-info > div > div > div.section-1 > div.row-2 > div > div.value.block-with-text.bg-color > span";
    element_edit = "#content > div > ui-view > case-integrated-layout > div > div.head-bar.bg-color > mc-case-basic-info > div > div > div.section-2 > div:nth-child(4) > sd-button > button > div > span";
    if($(element_edit).text() == "Edit") {
        element_sr_email = "#mc-case-section > div > sd-tile-layout > div > div:nth-child(2) > div:nth-child(1) > mc-vl-case-contact > div > div.tile-content > sd-progress > div > sd-pivots > section > section:nth-child(2) > div > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr > td:nth-child(3) > div > span";
        element_sr_contract = "#mc-case-section > div > sd-tile-layout > div > div:nth-child(1) > div:nth-child(2) > case-entitlement > div > div.tile-content > sd-progress > div > div > div:nth-child(1) > div:nth-child(2) > div.field-value > sd-label";
    } else {
        element_sr_email = "#mc-case-section > div > sd-tile-layout > div > div:nth-child(2) > div:nth-child(1) > mc-vl-case-contact > div > div.tile-content > sd-progress > div > sd-pivots > section > section:nth-child(2) > div > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr > td:nth-child(3) > div > sd-action-trigger > a > span";
        element_sr_contract = "#mc-case-section > div > sd-tile-layout > div > div:nth-child(1) > div:nth-child(2) > case-entitlement > div > div.tile-content > sd-progress > div > div > div:nth-child(1) > div:nth-child(2) > div.field-value > sd-label";
    }

    sr_num = $(element_sr_num).text();
    sr_title = $(element_sr_title).text();
    sr_email = $(element_sr_email).text();
    sr_contract = $(element_sr_contract).text();
}

function _forHome(){
    setInterval(function(){
        var url = location.href;
        if (url.match(/mycases\/viewAllTasks/)) {
            console.log('test1');
            if (!($('#summary_note').length)) {
                console.log('test2');
                _forViewAllTask();
            }
        } else if (url.match(/home/)) {
            if ($('#summary_note').length) {
                $('#summary_note').remove();
                $('.all_loading').remove();
            }            
        }
    }, 2000);
}

function _forViewAllTask(){

    $('body').css('overflow-y', 'visible');

    var summaryNote = '<div id="summary_note" class="post_it">[Function for viewAllTasks]   ' +
        '<p class="post_it_item">Filter (State) : </p>' +
        '<p class="post_it_item"><input type="checkbox" name="my_task_state_filter" class="my_task_state_filter" value="Completed">Completed</p>' +
        '<p class="post_it_item"><input type="checkbox" name="my_task_state_filter" class="my_task_state_filter" value="Cancelled">Cancelled</p>' +
        '<p class="post_it_item"><input type="checkbox" name="my_task_state_filter" class="my_task_state_filter" value="Open" checked>Open</p>' +
        '<p class="post_it_item"><i id="my_task_state_filter_submit" class="fa fa-play-circle" aria-hidden="true"></i><p>'
        '</div>';

    var loadingField = '<div class="all_loading hide"></div>';

	if (true) {
		$('body').after(summaryNote);	
        $('body').after(loadingField);        
    }
    
    $('#my_task_state_filter_submit').on("click", function () {
        $('.all_loading').removeClass('hide');

        var filterVal = $('[name="my_task_state_filter"]:checked').map(function(){
            return $(this).val();
        }).get();

        taskLength = $('#content > div > div > mc-view-tasks > div > div > div > div > table > tbody > tr').length;    
        for (var i = 2; i < taskLength; i = i + 3) {
            taskState = '#content > div > div > mc-view-tasks > div > div > div > div > table > tbody > tr:nth-child(' + i + ') > td:nth-child(5) > span';
            elementTaskState = $(taskState);    
            elementTaskState.parents('tr').css('display', 'table-row');
            elementTaskState.parents('tr').next('tr').css('display', 'table-row');
            elementTaskState.parents('tr').next('tr').next('tr').css('display', 'table-row');
        }

        for (var i = 2; i < taskLength; i = i + 3) {
            taskState = '#content > div > div > mc-view-tasks > div > div > div > div > table > tbody > tr:nth-child(' + i + ') > td:nth-child(5) > span';
            elementTaskState = $(taskState);
    
            if ($.inArray(elementTaskState.text(), filterVal) < 0) {
                elementTaskState.parents('tr').css('display', 'none');
                elementTaskState.parents('tr').next('tr').css('display', 'none');
                elementTaskState.parents('tr').next('tr').next('tr').css('display', 'none');
            }
        }
        setTimeout(function(){
            $('.all_loading').addClass('hide');
        },500);
    });



}



// クリップボードへのコピー
//   参考 URL
//   https://webllica.com/copy-text-to-clipboard/

function _copyTextToClipboard(textVal){
	var copyFrom = document.createElement("textarea");
	copyFrom.textContent = textVal;
   
	var bodyElm = document.getElementsByTagName("body")[0];
	bodyElm.appendChild(copyFrom);
   
	copyFrom.select();
	var retVal = document.execCommand('copy');
	bodyElm.removeChild(copyFrom);
	return retVal;
  }



// Font Awesome
$(function() {
	$('body').after('<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">');
});




