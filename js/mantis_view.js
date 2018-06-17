// 機能の有効、無効状態のフラグを取得
var mantisPlugin = true;

var userAgent = window.navigator.userAgent.toLowerCase();

if (isSupported(['chrome', 'opera'])) {
	chrome.storage.sync.get([
			"mantisPlugin"
		], function(items) {

		mantisPlugin = items.mantisPlugin;
	});
}

// 各要素の取得、変数の定義
var category = 'body > table:nth-child(7) > tbody > tr:nth-child(3) > td:nth-child(2)';
var dateSubmitted = 'body > table:nth-child(7) > tbody > tr:nth-child(3) > td:nth-child(5)';

var reproducedBy = 'body > table:nth-child(7) > tbody > tr:nth-child(9) > td.category';
if ($(reproducedBy).text().indexOf('Reproduced By') != -1) {
	var summary = 'body > table:nth-child(7) > tbody > tr:nth-child(15) > td:nth-child(2)';
	var status = 'body > table:nth-child(7) > tbody > tr:nth-child(11) > td:nth-child(2)';
	var earliestBuildNumber = 'body > table:nth-child(7) > tbody > tr:nth-child(14) > td:nth-child(2)';
	var reportedVersion = 'body > table:nth-child(7) > tbody > tr:nth-child(13) > td:nth-child(2)';	
} else {
	var summary = 'body > table:nth-child(7) > tbody > tr:nth-child(14) > td:nth-child(2)';
	var status = 'body > table:nth-child(7) > tbody > tr:nth-child(10) > td:nth-child(2)';
	var earliestBuildNumber = 'body > table:nth-child(7) > tbody > tr:nth-child(13) > td:nth-child(2)';
	var reportedVersion = 'body > table:nth-child(7) > tbody > tr:nth-child(12) > td:nth-child(2)';	
}

var bugDetail = 'body > table:nth-child(7) > tbody > tr:nth-child(1) > td.form-title';
var bugNote ='#bugnotes';
var bugHistory = '#history';



// 付箋

$(function() {
	if (mantisPlugin) {
		var summaryValue = $(summary).text();
		var categoryValue = $(category).text();
		var dateSubmittedValue = $(dateSubmitted).text();
		var statusValue = $(status).text();
		var earliestBuildNumberValue = $(earliestBuildNumber).text();
		var reportedVersionValue = $(reportedVersion).text();
		var ecoValue = 'No';
		if ( $('#bugnotes > table > tbody > tr > td.bugnote-note-public').is(":contains('=== ECO Information ===')") ) {
	    	ecoValue = 'Yes';
		}

		var summaryNote = '<div id="summary_note" class="post_it">[Summary]' +
			'<p class="post_it_item">Summary : <span class="post_it_value">' + summaryValue + '</span></p>' +
			'<p class="post_it_item">Category : <span class="post_it_value">' + categoryValue + '</span></p>' +
			'<p class="post_it_item">Create Date : <span class="post_it_value">' + dateSubmittedValue + '</span></p>' +
			'<p class="post_it_item">Version : <span class="post_it_value">' + earliestBuildNumberValue + ' (' + reportedVersionValue + ')</span></p>' +
			'<p class="post_it_item">Status : <span class="post_it_value">' + statusValue + '</span></p>' +
			'<p class="post_it_item">ECO Info : <span class="post_it_value">' + ecoValue + '</span></p>' +
			'</div>';

		$('body').after(summaryNote);	

		$(document).on("click", "#summary_note", function () {
			$(this).toggleClass('post_it_close');
		});		
	}
});




// ページの移動

$(function(){
	$('body').after('<p id="page-top" class="page_move"><a href="#wrap">Go TOP</a></p>');
	$('body').after('<p id="page-bug_note" class="page_move"><a href="#wrap">Go Bug Note</a></p>');
	$('body').after('<p id="page-bug_history" class="page_move"><a href="#wrap">Go Bug History</a></p>');

	$(document).on("click", "#page-top", function () {
		$("html,body").animate({scrollTop:$('body').offset().top});
	});

	$(document).on("click", "#page-bug_note", function () {
		console.log('click');
		$("html,body").animate({scrollTop:$(bugNote).offset().top});
	});

	$(document).on("click", "#page-bug_history", function () {
		console.log('click');
		$("html,body").animate({scrollTop:$(bugHistory).offset().top});
	});
});



