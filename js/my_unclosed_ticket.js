// 機能の有効、無効状態のフラグを取得
var unclosedFilter = true;

var userAgent = window.navigator.userAgent.toLowerCase();

if (isSupported(['chrome', 'opera'])) {
	chrome.storage.sync.get([
			"unclosedFilter"
		], function(items) {

		unclosedFilter = items.unclosedFilter;
	});
}

// 変数定義
var filterCompany;
var filterPri;

// Plugin が動作しているかのチェック

$(function(){
	$('#aspnetForm > div:nth-child(12) > table:nth-child(1)').after('<p class="plugin_working">FortiCare Custom Plugin Working now...</p>');
});



// Filter 機能

$(function(){

	if (isSupported(['chrome', 'opera', 'firefox'])) {
		if (unclosedFilter) {
			_mainFilter(true);
			_mainFilterExist();		
		}
	}
});


function _mainFilter(init, filterCompany, filterPri) {


	// Filter 対象の列に Class を付与
	var tableIds = [
		'#ctl00_MainContent_UC_SpecialistTicketList_DG_TicketList',
		'#ctl00_MainContent_UC_ImportantTicketList_DG_TicketList',
		'#ctl00_MainContent_UC_RegularTicketList_DG_TicketList',
		'#ctl00_MainContent_UC_PendingBugFix_DG_TicketList',
		'#ctl00_MainContent_UC_OtherTicketList_DG_TicketList',
	];

	$.each(tableIds, function(index, value) {
		_addClassForFilter(value);
	});





	// Filter 対象の情報を取得
	//  - Company 情報を取得

	var companyNames = $('.target_company').map(function(index, element) {
		return $(element).text();
	}).get();
	companyNames = companyNames.filter(function (x, i, self) {
		return self.indexOf(x) === i;
	});

	var priNames = $('.target_pri').map(function(index, element) {
		return $(element).text();
	}).get();
	priNames = priNames.filter(function (x, i, self) {
		return self.indexOf(x) === i;
	});



	// Filter 用 HTML の作成
	var filterHtml = '<div id="custom_filter_container"><div class="filter_part"><span class="filter_column_name">Company:</span><select name="filter_company" class="select_sumoselect_filter" multiple>;'
// 	var filterHtml = `
// <div id="custom_filter_container">
// 	<div class="filter_part">
// 		<span class="filter_column_name">Company:</span>
// 		<select name="filter_company" class="select_sumoselect_filter" multiple>`;

	$.each(companyNames, function(index, value) {
		var companyOptionHtml = '<option value="' + value + '">' + value + '</option>';
		filterHtml += companyOptionHtml;
	});

	filterHtml += '</select></div>';
	// filterHtml += `
	// 	</select>
	// </div>`;

	filterHtml += '<div class="filter_part"><span class="filter_column_name">Priority:</span><select name="filter_pri" class="select_sumoselect_filter" multiple>';
	// filterHtml += `
	// <div class="filter_part">
	// 	<span class="filter_column_name">Priority:</span>
	// 	<select name="filter_pri" class="select_sumoselect_filter" multiple>`;

	$.each(priNames, function(index, value) {
		var priOptionHtml = '<option value="' + value + '">' + value + '</option>';
		filterHtml += priOptionHtml;
	});

	filterHtml += '</select></div></div>';
// 	filterHtml += `
// 		</select>
// 	</div>
// </div>`;


	$('#TitleTable').after(filterHtml);

	// セレクトボックスのデザインに以下を利用
	// <http://hemantnegi.github.io/jquery.sumoselect/>
	 $(document).ready(function () {
	 	$('.select_sumoselect_filter').SumoSelect({
	 		search: true,
	 		searchText: 'Enter here.',
	 		selectAll: true,
		});
	});

	// 初回のページ表示時はすべて表示
	if (init) {
		$(document).ready(function () {
        	$('.select-all').click();
    	});
	}

	// Filter 実行処理
	$('[name="filter_company"],[name="filter_pri"]').on('change', function() {
		_execFilter(tableIds);
	});


	// バックグラウンド処理による更新時の Filter 再適用
	if (filterCompany) {
		if (jQuery.isArray(filterCompany)) {
			$('[name="filter_company"]').val(filterCompany);
			$('[name="filter_pri"]').val(filterPri);
			_execFilter(tableIds);
		}
	}
}


function _addClassForFilter(id) {

	var lenElement = id + ' tbody';
	var len = $(lenElement).children().length;

	for (var i = 2; i <= len; i++) {

		var element = id + ' > tbody > tr:nth-child(' + i + ') > td:nth-child(10)';
		$(element).addClass('target_company');

		var element = id + ' > tbody > tr:nth-child(' + i + ') > td:nth-child(6)';
		$(element).addClass('target_pri');
	}
}

function _execFilter(tableIds) {
	var filterCompanyNames = $('[name="filter_company"]').val();
	filterCompany = filterCompanyNames;

	var filterPriNames = $('[name="filter_pri"]').val();
	filterPri = filterPriNames;

	// FIlter 前にすべての項目を一旦非表示にする
	$.each(tableIds, function(index, value) {
		_allTableHide(value);
	});

	// 選択された項目のみ表示する
	$.each(tableIds, function(index, value) {
		_visibleTableFilterSelect(value, filterCompanyNames, filterPriNames);
	});
}

function _allTableHide(id) {

	var lenElement = id + ' tbody';
	var len = $(lenElement).children().length;

	for (var i = 2; i <= len; i++) {
		var element = id + ' > tbody > tr:nth-child(' + i + ')';
		$(element).addClass('hide');
	}
}

function _visibleTableFilterSelect(id, selectComanyNames, selectPriNames) {

	var lenElement = id + ' tbody';
	var len = $(lenElement).children().length;

	for (var i = 2; i <= len; i++) {

		var elementParenet = id + ' > tbody > tr:nth-child(' + i + ')';
		var elementCompany = id + ' > tbody > tr:nth-child(' + i + ') > td:nth-child(10)';
		var elementPri = id + ' > tbody > tr:nth-child(' + i + ') > td:nth-child(6)';
		var companyName = $(elementCompany).text();
		var priName = $(elementPri).text();

		if (selectComanyNames.indexOf(companyName) >= 0 && selectPriNames.indexOf(priName) >= 0 ) {
			$(elementParenet).removeClass('hide');
		}
	}
}



// バックグラウンド更新が実行された後に再度処理を適用するメソッド
function _mainFilterExist() {
	if (!$("#custom_filter_container")[0]) {
		_mainFilter(false, filterCompany, filterPri);
	}
	setTimeout(_mainFilterExist, 1000);
}



