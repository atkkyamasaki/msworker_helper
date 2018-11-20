// 各要素の取得、変数の定義

// var updateCustomerInfoHash = {};
// var tileMarkId = '';

// URL による切り替え

$(function() {

    var url = location.href;

    if (url.match(/email/)) {
        _forMail();
    } else if (url.match(/customer\/commercial/) || url.match(/customer\/case/)) {
        _forCase();
    } else {

    }

	// 付箋の Open/Close 処理
	$(document).on("dblclick", "#summary_note", function () {
		$(this).toggleClass('post_it_close');
	});
	$(document).on("dblclick", "#customer_info_note", function () {
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

	var summaryNote = '<div id="summary_note" class="post_it">[Function for EMAIL]' +
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
    elementSrNum = $("#content > div > ce-email > div > case-header > div > mc-case-basic-info-email > div > div > div.section-1 > div.row-1 > div:nth-child(1) > div.value > span");
    elementCc = $("#content > div > ce-email > div > email-content > email-header > div > address-field:nth-child(2) > div > address-list > div > address-search > input");
    elementTitle = $("#content > div > ce-email > div > case-header > div > mc-case-basic-info-email > div > div > div.section-1 > div.row-2 > div > div.value.block-with-text.bg-color > span");
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
        '<p class="post_it_item"><i id="clip_date" class="fa fa-clock-o fa-lg icon_clip_board" aria-hidden="true"></i>' +
            '<i id="clip_asc" class="fa fa-commenting fa-lg icon_clip_board" aria-hidden="true"></i>' +
            '<i id="clip_tell" class="fa fa-volume-control-phone fa-lg icon_clip_board" aria-hidden="true"></i>' +
            '<i id="clip_mail" class="fa fa-envelope-open-o fa-lg icon_clip_board" aria-hidden="true"></i>' +
            '<i id="clip_close" class="fa fa-check-circle fa-lg icon_clip_board" aria-hidden="true"></i></p>' +
        '<p class="post_it_item">Status Update : </p>' +
        '<p class="post_it_item"><input type="text" name="my_subscription" size="20" maxlength="40" value="- Status Update">' + clipHtml + '</p>' +
		'</div>';
	
	var loadingField = '<div class="all_loading hide"></div>';

	if (true) {
		$('body').after(summaryNote);	
		$('body').after(loadingField);
    }

    setInterval(function(){
        _validateForCase();
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
        
        result = '- ' + format_str;
        _copyTextToClipboard(result);
	});

    // ASC
	$("#clip_asc").on("click", function () {
        result = '- ASC OK';
        _copyTextToClipboard(result);
	});

    // TELL
	$("#clip_tell").on("click", function () {
        result = '- Tell to customer';
        _copyTextToClipboard(result);
	});

    // Mail
	$("#clip_mail").on("click", function () {
        result = '- Mail to customer';
        _copyTextToClipboard(result);
	});

    // Mail
	$("#clip_close").on("click", function () {
        result = '- Close this SR';
        _copyTextToClipboard(result);
	});
}

function _validateForCase(){
    // errorMsg = '<div class="validate_warning"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>';

    assignedTo = $("sd-label[data-automation-id='AssignedTo_Value']");
    caseStatus = $('#content > div > ui-view > case-integrated-layout > div > div.head-bar.bg-color > mc-case-basic-info > div > div > div.section-2 > div.status > sd-select > div > a');
    labor = $('#mc-case-section > div > sd-tile-layout > div > div > div:nth-child(7) > mc-case-labor-list > div > div:nth-child(2) > sd-progress > div > div, #mc-case-section > div > sd-tile-layout > div > div:nth-child(1) > div:nth-child(4) > mc-case-labor-list > div > div:nth-child(2) > sd-progress > div > div');
    task = $('#mc-case-section > div > sd-tile-layout > div > div > div:nth-child(5) > mc-case-tasks > div > div:nth-child(2) > div > span, #mc-case-section > div > sd-tile-layout > div > div:nth-child(1) > div:nth-child(3) > mc-case-tasks > div > div:nth-child(2) > div > span');

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




