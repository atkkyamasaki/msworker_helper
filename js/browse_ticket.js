// 機能の有効、無効状態のフラグを取得
var closedMessageColor = true;
var closedSummary = true;

var userAgent = window.navigator.userAgent.toLowerCase();

if (isSupported(['chrome', 'opera'])) {
	chrome.storage.sync.get([
			"closedMessageColor",
			"closedSummary"
		], function(items) {

		closedMessageColor = items.closedMessageColor;
		closedSummary = items.closedSummary;
	});
}


// Plugin が動作しているかのチェック

$(function(){
	$('#aspnetForm > div:nth-child(13) > table:nth-child(1)').after('<p class="plugin_working">FortiCare Custom Plugin Working now...</p>');
});




// Partner/Internal/External 毎に色付け

$(function(){

	if (closedMessageColor) {
		var externalTdFrag = $("#Table4 > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:contains('External Message')");
		_addColumColorClass(externalTdFrag, 'external');

		var internalTdFrag = $("#Table4 > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:contains('Internal Message')");
		_addColumColorClass(internalTdFrag, 'internal');

		var partnerTdFrag = $("#Table4 > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:contains('Partner Message')");
		var customerTdFrag = $("#Table4 > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:contains('Customer Message')");
		_addColumColorClass(partnerTdFrag, 'partner');
		_addColumColorClass(customerTdFrag, 'partner');

		// 既存の色付けを削除
		var existColor = $('#Table4 > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td');
		existColor.css('background-color', ''); 
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








// 付箋

$(function() {

	var productCategory = $('#ctl00_MainContent_L_Category').text();
	var productSN = $('#ctl00_MainContent_L_SN').text();
	var swVersion = $('#ctl00_MainContent_L_SWVersion').text();
	var swPatch = $('#ctl00_MainContent_L_BuildNo').text();
	var country = $('#ctl00_MainContent_UC_PartnerInfo_L_Country').text();
	var tacRegion = $('#ctl00_MainContent_L_Tac').text();

	var summaryNote = '<div id="summary_note" class="post_it">[Summary]' +
		'<p class="post_it_item">Category : ' + productCategory + '</p>' +
		'<p class="post_it_item">S/N : ' + productSN + '</p>' +
		'<p class="post_it_item">Version : ' + swVersion + swPatch + '</p>' +
		'<p class="post_it_item">Country : ' + country + '</p>' +
		'<p class="post_it_item">TAC Region : ' + tacRegion + '</p>' +
		'</div>';

	if (closedSummary) {
		$('body').after(summaryNote);	
	}

	$(document).on("click", "#summary_note", function () {
		$(this).toggleClass('post_it_close');
	});
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


