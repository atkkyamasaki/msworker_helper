// 機能の有効、無効状態のフラグを取得
var messageColor = true;
var productSummary = true;
var customerSummary = true;
var duration = true;
var durationFooter = true;

var userAgent = window.navigator.userAgent.toLowerCase();

if (isSupported(['chrome', 'opera'])) {
	chrome.storage.sync.get([
			"messageColor",
			"productSummary",
			"customerSummary",
			"duration",
			"durationFooter"
		], function(items) {

		messageColor = items.messageColor;
		productSummary = items.productSummary;
		customerSummary = items.customerSummary;
		duration = items.duration;
		durationFooter = items.durationFooter;
	});
}

// 各要素の取得、変数の定義
var titleId = '#ctl00_MainContent_TB_TicketTitle';
var titleCheckFrag = false;
var statusId = '#ctl00_MainContent_DDL_TicketStatus';
var statusChangeFrag = false;
var partnerRatingId = '#ctl00_MainContent_UC_PartnerRating_DDL_NoDocs';
var partnerRatingCheckFrag = true;
var bugId = '#ctl00_MainContent_TB_BugId';
var bugCheckFrag = true;
var waitGaReleaseId = '#ctl00_MainContent_TB_WaitGARelease';
var waitGaReleaseCheckFrag = true;
var solutionId = '#ctl00_MainContent_DDL_Solution';
var solutionCheckFrag = true;
var problemSummaryId = '#ctl00_MainContent_TB_ProDesc';
var problemSummaryCheckFrag = true;
var solutionDescriptionId = '#ctl00_MainContent_T_SolutinText';
var solutionDescriptionCheckFrag = true;
var workaroundId = '#ctl00_MainContent_TB_Workaround';
var workaroundCheckFrag = true;

var categoryProductId = '[name=\'ctl00$MainContent$UC_CategorySelector$DDL_ProductType\'] option:selected';
var categoryContentId = '[name=\'ctl00$MainContent$UC_CategorySelector$DDL_Category\'] option:selected';
var serialNumberId = '#ctl00_MainContent_txtSN';
var swVersionId = '[name=\'ctl00$MainContent$UC_Version$DDL_SWVersion\'] option:selected';
var swPatchId = '[name=\'ctl00$MainContent$DDL_Build\'] option:selected';

var internalButton = '#ctl00_MainContent_UC_AddComment_RB_Internal';
var externalButton = '#ctl00_MainContent_UC_AddComment_RB_EXternal';
var notepadButton = '#ctl00_MainContent_UC_AddComment_RB_NotePad';

var emailNew = '#ctl00_MainContent_UC_AddComment_CB_NeedSendEmail';
var emailAttach = '#ctl00_MainContent_UC_AddComment_CB_NeedEmailAttachment';
var onlyEmailAttach = '#ctl00_MainContent_UC_AddComment_CB_AttachToEmailOnly';

var emailFrom = '#ctl00_MainContent_UC_AddComment_TB_EmailFrom';
var emailTo = '#ctl00_MainContent_UC_AddComment_TB_EmailTo';
var emailCc = '#ctl00_MainContent_UC_AddComment_TB_EmailCC';
var emailBcc = '#ctl00_MainContent_UC_AddComment_TB_EmailBCC';

var submitButton = "#ctl00_MainContent_B_TicketSubmit";
var submitBackButton = "#ctl00_MainContent_B_SubmitAndBack";
var newSubmitButton = "#new_ctl00_MainContent_B_TicketSubmit";
var newSubmitBackButton = "#new_ctl00_MainContent_B_SubmitAndBack";


// Plugin が動作しているかのチェック

$(function(){
	$('#aspnetForm > div:nth-child(13) > table:nth-child(1)').after('<p class="plugin_working">FortiCare Custom Plugin Working now...</p>');
});



// Default のチェック状態を外し、Email CC に追加

$(function(){
	_emailCheckRemove();
	$(emailBcc).val('support_jp@fortinet.com');
	_radioStatusChange('disable');
});

function _emailCheckRemove(){
	$(emailNew).prop('checked', false);
	$(emailAttach).prop('checked', false);
	$(onlyEmailAttach).prop('checked', false);
}

function _radioStatusChange(status) {

	var changeList = [emailNew,
		emailAttach,
		onlyEmailAttach,
	];

	if (status == 'enable') {
		$.each(changeList, function(index, value) {
			$(value).prop('disabled', false);
			$(value).removeClass('radio_disabled').addClass('radio_enabled');
		});
	} else {
		$.each(changeList, function(index, value) {
			$(value).prop('disabled', true);
			$(value).removeClass('radio_enabled').addClass('radio_disabled');
		});
	}
}




// Internal、External、Notepad 選択時にチェック状態の変更

$(function(){
	$(internalButton).click(function() {
		_emailCheckRemove();
		_radioStatusChange('disable');
		$(internalButton).text('Update (Internal)');
	});
});

$(function(){

	var buttonList = [
		externalButton,
		notepadButton,
	];

	$.each(buttonList, function(index, value) {
		$(value).click(function() {
			_radioStatusChange('enable');
			if (value == externalButton) {
				$(newSubmitButton).text('Update (External)');
			} else {
				$(newSubmitButton).text('Update (NotePad)');
			}
		});
	});
});








// Status が変更されたかチェック

$(function(){
	$(statusId).addClass('title_warning');

	// var closeCheckList = [
	// 	[bugId, 'bugCheckFrag'],
	// 	[solutionId, 'solutionCheckFrag'],
	// ];


	$(document).on('change', statusId, function() {
		$(statusId).removeClass('title_warning');
		statusChangeFrag = true;

		// Close を選択した場合の動作
		_checkCloseStatus();
	});	

	$(document).on('keyup', bugId, function() {
		if ($(statusId).val() == 'CL') {
			if ($(bugId).val()) {
				$(bugId).removeClass('title_warning');
				bugCheckFrag = true;					
			} else {				
				if (!$(bugId).hasClass('title_warning')) {
					$(bugId).addClass('title_warning');
					bugCheckFrag = false;
				}
			}
		}
	});
	$(document).on('keyup', waitGaReleaseId, function() {
		if ($(statusId).val() == 'CL') {
			if ($(waitGaReleaseId).val()) {
				$(waitGaReleaseId).removeClass('title_warning');
				waitGaReleaseCheckFrag = true;
			} else {				
				if (!$(waitGaReleaseId).hasClass('title_warning')) {
					$(waitGaReleaseId).addClass('title_warning');
					waitGaReleaseCheckFrag = false;
				}
			}
		}
	});
	$(document).on('change', solutionId, function() {
		if ($(statusId).val() == 'CL') {
			if ($(solutionId).val()) {
				$(solutionId).removeClass('title_warning');
				solutionCheckFrag = true;
			} else {				
				$(solutionId).addClass('title_warning');
				solutionCheckFrag = false;
			}
		}
	});
	$(document).on('keyup', problemSummaryId, function() {
		if ($(statusId).val() == 'CL') {
			if ($(problemSummaryId).val()) {
				$(problemSummaryId).removeClass('title_warning');
				problemSummaryCheckFrag = true;
			} else {
				if (!$(problemSummaryId).hasClass('title_warning')) {
					$(problemSummaryId).addClass('title_warning');
					problemSummaryCheckFrag = false;
				}
			}
		}
	});
	$(document).on('keyup', solutionDescriptionId, function() {
		if ($(statusId).val() == 'CL') {
			if ($(solutionDescriptionId).val()) {
				$(solutionDescriptionId).removeClass('title_warning');
				solutionDescriptionCheckFrag = true;
			} else {				
				if (!$(solutionDescriptionId).hasClass('title_warning')) {
					$(solutionDescriptionId).addClass('title_warning');
					solutionDescriptionCheckFrag = false;
				}
			}
		}
	});
	$(document).on('keyup', workaroundId, function() {
		if ($(statusId).val() == 'CL') {
			if ($(workaroundId).val()) {
				$(workaroundId).removeClass('title_warning');
				workaroundCheckFrag = true;
			} else {				
				if (!$(workaroundId).hasClass('title_warning')) {
					$(workaroundId).addClass('title_warning');
					workaroundCheckFrag = false;
				}
			}
		}
	});
});


function _checkCloseStatus() {

	if ($(statusId).val() == 'CL') {
		if (!$(bugId).val()) {
			$(bugId).addClass('title_warning');
			bugCheckFrag = false;
		}
		if (!$(waitGaReleaseId).val()) {
			$(waitGaReleaseId).addClass('title_warning');
			waitGaReleaseCheckFrag = false;
		}
		if (!$(solutionId).val()) {
			$(solutionId).addClass('title_warning');
			solutionCheckFrag = false;
		}
		if (!$(problemSummaryId).val()) {
			$(problemSummaryId).addClass('title_warning');
			problemSummaryCheckFrag = false;
		}
		if (!$(solutionDescriptionId).val()) {
			$(solutionDescriptionId).addClass('title_warning');
			solutionDescriptionCheckFrag = false;
		}
		if (!$(workaroundId).val()) {
			$(workaroundId).addClass('title_warning');
			workaroundCheckFrag = false;
		}		

	} else {
		$(bugId).removeClass('title_warning');
		bugCheckFrag = true;
		$(waitGaReleaseId).removeClass('title_warning');
		waitGaReleaseCheckFrag = true;
		$(solutionId).removeClass('title_warning');
		solutionCheckFrag = true;
		$(problemSummaryId).removeClass('title_warning');
		problemSummaryCheckFrag = true;
		$(solutionDescriptionId).removeClass('title_warning');
		solutionDescriptionCheckFrag = true;
		$(workaroundId).removeClass('title_warning');
		workaroundCheckFrag = true;
	}

}




// Partner Rating が空欄でないかチェック

$(function(){
	if ($(partnerRatingId).val() == '') {
		$(partnerRatingId).addClass('title_warning');
		partnerRatingCheckFrag = false;
	}

	$(document).on('change', partnerRatingId,function() {
		if ($(partnerRatingId).val() == '') {
			$(partnerRatingId).addClass('title_warning');
			partnerRatingCheckFrag = false;
		} else {
			$(partnerRatingId).removeClass('title_warning');
			partnerRatingCheckFrag = true;			
		}
	});
});





// Title 先頭にフラグが記入しているかチェック
$(function(){
	
	var titleTxt = $(titleId).val();

	if (!titleTxt.match(/^#[a-zA-Z]{2}-[a-zA-Z]+#.*\[.*\].*/) && !titleTxt.match(/^#[a-zA-Z]{2}#.*\[.*\].*/)) {
		$(titleId).addClass('title_warning');
		$(titleId).after('<span id="title_err_msg" class="title_err_msg fa fa-exclamation-triangle">  Please check <a href="http://lab.jp.fortinet.com/dokuwiki/tac:workbook:forticare_ticket_naming" target="_blank">wiki</a> about input rules of title</span>');
		titleCheckFrag = false;
	} else {
		titleCheckFrag = true;
	}

	$(document).on('keyup', titleId, function() {
	var titleTxt = $(titleId).val();

		if (!titleTxt.match(/^#[a-zA-Z]{2}-[a-zA-z]+#.*\[.*\].*/) && !titleTxt.match(/^#[a-zA-Z]{2}#.*\[.*\].*/)) {
			if (!$(titleId).hasClass('title_warning')) {
				$(titleId).addClass('title_warning');
				$(titleId).after('<span id="title_err_msg" class="title_err_msg fa fa-exclamation-triangle">  Please check <a href="http://lab.jp.fortinet.com/dokuwiki/tac:workbook:forticare_ticket_naming" target="_blank">wiki</a> about input rules of title</span>');
				titleCheckFrag = false;				
			}
		} else {
			$(titleId).removeClass('title_warning');
			$('#title_err_msg').remove();
			titleCheckFrag = true;
		}
	});

});








// Partner/Internal/External 毎に色付け

$(function(){

	if (messageColor) {
		var externalTdFrag = $("#Table5 > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:contains('External Message')");
		_addColumColorClass(externalTdFrag, 'external');

		var internalTdFrag = $("#Table5 > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:contains('Internal Message')");
		_addColumColorClass(internalTdFrag, 'internal');

		var partnerTdFrag = $("#Table5 > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:contains('Partner Message')");
		var customerTdFrag = $("#Table5 > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:contains('Customer Message')");
		_addColumColorClass(partnerTdFrag, 'partner');
		_addColumColorClass(customerTdFrag, 'partner');
	}

});


function _addColumColorClass(columId, colum) {
	var MessageColum = colum + 'MessageColum';
	var MessageBody = colum + 'MessageBody';

	columId.each(function(index, element){
		$(element).addClass(MessageColum);
		if ($(element).parent('tr').next('tr').children('td').is(":contains('Attachment:')")) {
			$(element).parent('tr').next('tr').next('tr').children('td').addClass(MessageBody);
		} else {
			$(element).parent('tr').next('tr').children('td').addClass(MessageBody);
		}
	});
}




// Submit 前に確認処理を追加

$(function() {

	// 既存ボタンを隠す
	$(submitButton).hide();
	$(submitBackButton).hide();

	// ダミーボタンを追加
	$(submitButton).parent('td').after('<td><span id="new_ctl00_MainContent_B_TicketSubmit" class="new_update_btn">Update (Internal)</span></td>');
	$(submitBackButton).parent('td').after('<td><span id="new_ctl00_MainContent_B_SubmitAndBack" class="new_update_btn" style="width:120px">Update & Back</span></td>');
});


$(function(){

	$(document).on("click", "#new_ctl00_MainContent_B_TicketSubmit", function () {
		_beforeSubmitPopUp('submit');
	});

	$(document).on("click", "#new_ctl00_MainContent_B_SubmitAndBack", function () {
		_beforeSubmitPopUp('submit_back');
	});


});

function _beforeSubmitPopUp(submitType, type) {

	var type = $('input[name="ctl00$MainContent$UC_AddComment$G_DescriptionType"]:checked').val();

	if (type == 'RB_Internal') {
		_submitOrBackClick(submitType);
		return true;
	}

	var msg = _createConfirmMsg(type);

	$.confirm({
	    title: '[Confirm]',
	    content: msg,
	    buttons: {
	        ok: function () {
	        	_submitOrBackClick(submitType);
	        	return true;
	        },
	        cancel: function () {
	            return true;
	        }
	    }
	});

}

function _createConfirmMsg(type) {
	var actionEmailNew = $('input[name="ctl00$MainContent$UC_AddComment$CB_NeedSendEmail"]').prop('checked');
	var actionEmailAttach = $('input[name="ctl00$MainContent$UC_AddComment$CB_NeedEmailAttachment"]').prop('checked');
	var actionOnlyEmailAttach = $('input[name="ctl00$MainContent$UC_AddComment$CB_AttachToEmailOnly"]').prop('checked');;
	var action = '';

	if (actionEmailNew) {
		action = 'Email New Comment';
		if (actionEmailAttach) {
			action += '<br>' + 'Email Attachment(s)';
		}
		if (actionOnlyEmailAttach) {
			action += '<br>' + 'Only Email Attachment(s)';
		}
	} else {
		if (actionEmailAttach) {
			action = 'Email Attachment(s)';
			if (actionOnlyEmailAttach) {
				action += '<br>' + 'Only Email Attachment(s)';
			}
		} else {
			if (actionOnlyEmailAttach) {
				action = 'Only Email Attachment(s)';
			}
		}
	}

	var msg = '<div style="color: lightgreen; font-size:1.5em">' + '=== Title/Status ===' + '</div>' + 
		'Title   :   ' + $(titleId).val() + '<br>' + 
		'Status   :   ' + $('[name=\'ctl00$MainContent$DDL_TicketStatus\'] option:selected').text() + '<br><br>' + 
		'<div style="color: lightgreen; font-size:1.5em">' + '=== Output ===' + '</div>' + 
		type + '<br><br>' + 
		'<div style="color: lightgreen; font-size:1.5em">' + '=== Email ===' + '</div>' + 
		'email From  :  ' + $(emailFrom).val() + '<br>' + 
		'email To  :  ' + $(emailTo).val() + '<br>' +
		'email Bcc  :  ' + $(emailBcc).val() + '<br><br>' +
		'<div style="color: lightgreen; font-size:1.5em">' + '=== Action ===' + '</div>' + 
		action + '<br><br>';

	if (!titleCheckFrag || !statusChangeFrag || !partnerRatingCheckFrag || !bugCheckFrag ||
		!waitGaReleaseCheckFrag || !solutionCheckFrag || !problemSummaryCheckFrag ||
		!solutionDescriptionCheckFrag || !workaroundCheckFrag) {
		msg += '<div style="color: red; font-size:1.5em">' + '!!!!! Caution !!!!!' + '</div>';

		if (!titleCheckFrag) {
			msg += '+ Title header is irregularity!' + '<br>';
		}
		if (!statusChangeFrag) {
			msg += '+ You didn\'t change  Status!' + '<br>';
		}
		if (!partnerRatingCheckFrag) {
			msg += '+ Partner Rating is empty!' + '<br>';
		}
		if (!bugCheckFrag) {
			msg += '+ Bug ID is empty! (But, not required)' + '<br>';
		}
		if (!waitGaReleaseCheckFrag) {
			msg += '+ Wait GA Release is empty! (But, not required)' + '<br>';
		}
		if (!solutionCheckFrag) {
			msg += '+ Solution is empty!' + '<br>';
		}
		if (!problemSummaryCheckFrag) {
			msg += '+ Problem Summary is empty!' + '<br>';
		}
		if (!solutionDescriptionCheckFrag) {
			msg += '+ Solution Description is empty!' + '<br>';
		}
		if (!workaroundCheckFrag) {
			msg += '+ Workaround is empty! (But, not required)' + '<br>';
		}

		msg += '<br>' + 'Please check before you submit.' + '<br>';
	}

	return msg;	
}



function _submitOrBackClick(submitType) {
	switch (submitType) {
		case "submit":
			$(submitButton).click();
			break;
		case "submit_back":
			$(submitBackButton).click();
			break;				
	}
}



// 付箋

$(function() {

	var categoryProductName = $(categoryProductId).text();
	var categoryContentName = $(categoryContentId).text();
	var serialNumber = $(serialNumberId).val();
	var swVersion = $(swVersionId).text();
	var swPatch = $(swPatchId).text();

	var summaryNote = '<div id="summary_note" class="post_it">[Summary]' +
		'<p class="post_it_item">Category : ' + categoryProductName + '</p>' +
		'<p class="post_it_item">Type : ' + categoryContentName + '</p>' +
		'<p class="post_it_item">S/N : ' + serialNumber + '</p>' +
		'<p class="post_it_item">Version : ' + swVersion + swPatch + '</p>' +
		'</div>';

	if (productSummary) {
		$('body').after(summaryNote);	
	}

	var firstPatnerHeaderId = $('#Table5 > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td');

	if (firstPatnerHeaderId.parent('tr').next('tr').children('td').is(":contains('Attachment:')")) {
		var masterInfo = _createMasterInfoString(true);
	} else {
		var masterInfo = _createMasterInfoString(false);
	}

	var masterInfoNote = '<div id="master_info_note" class="post_it">[Master Information]' + masterInfo + '</div>';

	if (customerSummary) {
		$('body').after(masterInfoNote);
	}

	$(document).on("click", "#summary_note", function () {
		$(this).toggleClass('post_it_close');
	});

	$(document).on("click", "#master_info_note", function () {
		$(this).toggleClass('post_it_close');
	});
});

function _createMasterInfoString(hasAttachFile) {

	if (hasAttachFile) {
		var summaryMasterInfoId = $('#Table5 > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td');
	} else {
		var summaryMasterInfoId = $('#Table5 > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td');
	}

	if (summaryMasterInfoId.is(":contains('Master info')")) {

		// Master Info 情報を取得
		var tmpCustomerInfo = summaryMasterInfoId.text();
		var tmpString = tmpCustomerInfo.substring(tmpCustomerInfo.indexOf('Master info'), tmpCustomerInfo.indexOf('End User'));

		// 各項目毎の情報を取得
		var tmpPartnerName = tmpString.substring(tmpString.indexOf('Partner name'), tmpString.indexOf('Person in charge')).replace("Partner name", "");
		var tmpPersonInCharge = tmpString.substring(tmpString.indexOf('Person in charge'), tmpString.indexOf('E-mail')).replace("Person in charge", "");
		var tmpMail = tmpString.substring(tmpString.indexOf('E-mail'), tmpString.indexOf('Phone')).replace("E-mail", "");
		var tmpPhone = tmpString.substring(tmpString.indexOf('Phone')).replace("Phone", "");

		var result = '<p class="post_it_item">' + _sortMasterInfoString(tmpPartnerName) + '</p>' +
			'<p class="post_it_item">' + _sortMasterInfoString(tmpPersonInCharge) + '</p>' +
			'<p class="post_it_item">' + _sortMasterInfoString(tmpMail) + '</p>' +
			'<p class="post_it_item">' + _sortMasterInfoString(tmpPhone) + '</p>';

	} else {
		var result = '<p class="post_it_item">' + "keyword 'Master Info' can't find" + '</p>';
	}

	return result;
}

function _sortMasterInfoString(string) {

	var result = string.trim();
	result = result.replace(/:/g, '');
	result = result.replace(/：/g, '');
	result = result.replace(/\*/g, '');
	if (result.slice(-1) == '-') {
		result = result.slice(0, -1);
	}
	result = result.trim();

	return result;
}



// ページを開いてからの経過時間
$(function(){

	if (duration) {
		$('#ctl00_MainContent_P_Ticket_Content > table:nth-child(12) > tbody > tr > td:nth-child(7)').after('<p id="open_time">Duration:<span id="open_time_count"></span>s</p>');
	}

	if (durationFooter) {
		$('body').after('<p id="open_time_footer">Duration:<span id="open_time_count_footer"></span>s</p>');
	}

    var n = 0;
    setInterval(function(){
    	$('#open_time_count,#open_time_count_footer').text(++n);
    }, 1000);
});





// Font Awesome
$(function() {
	$('body').after('<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">');
});






// ページトップへ戻るボタン

$(function() {
	$('body').after('<p id="page-top" class="page_top_bottom"><a href="#wrap">PAGE TOP</a></p>');
	$('body').after('<p id="page-bottom" class="page_top_bottom"><a href="#wrap">PAGE BOTTOM</a></p>');
});

$(function() {
    var topshowFlag = false;
    var bottomshowFlag = false;
    var topBtn = $('#page-top');
    var bottomBtn = $('#page-bottom');
    topBtn.css('bottom', '-100px');
    bottomBtn.css('bottom', '-100px');

    var topshowFlag = false;
    $(window).scroll(function () {
    	if ($(this).scrollTop() > 200) {
    	    if (topshowFlag == false) {
    	        topshowFlag = true;
    	        topBtn.stop().animate({'bottom' : '62px'}, 200); 
    	    }
    	} else {
    	    if (topshowFlag) {
    	      topshowFlag = false;
    	      topBtn.stop().animate({'bottom' : '-100px'}, 200); 
    	    }
    	}
    });
    topBtn.click(function () {
        $('body,html').animate({
          scrollTop: 0
    	}, 500);
    	return false;
  	});

    var bottomshowFlag = false;
    $(window).scroll(function () {
    	if (1200 < $(document).height() - $(this).scrollTop()) {
    	    if (bottomshowFlag == false) {
    	        bottomshowFlag = true;
    	        bottomBtn.stop().animate({'bottom' : '20px'}, 200); 
    	    }
    	} else {
    	    if (bottomshowFlag) {
    	      bottomshowFlag = false;
    	      bottomBtn.stop().animate({'bottom' : '-100px'}, 200); 
    	    }
    	}
    });
    bottomBtn.click(function () {
        $('body,html').animate({
          scrollTop: $(document).height()
    	}, 500);
    	return false;
  	});

});






