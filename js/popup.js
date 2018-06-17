var messageColor;
var productSummary;
var customerSummary;
var duration;
var durationFooter;
var unclosedFilter;
var closedMessageColor;
var closedSummary;
var mantisPlugin;

var allFilterName = [
	"messageColor",
	"productSummary",
	"customerSummary",
	"duration",
	"durationFooter",
	"unclosedFilter",
	"closedMessageColor",
	"closedSummary",
	"mantisPlugin"
];

$(function(){

	chrome.storage.sync.get(allFilterName, function(items) {

		$.each(items, function(index, value) {

			// Default 状態の有効、無効表示
			var elementIndex = '#' + index;
			if (value) {
				$(elementIndex).prop("checked", true);
			} else {
				$(elementIndex).prop("checked", false);
			}

			// 有効、無効の切り替え
			$(document).on('click', elementIndex, function() {
				if($(this).is(':checked')) {
					_chromeStorageItemUpdate(index, true);
				} else {
					_chromeStorageItemUpdate(index, false);
				}
			});

		});

	});
});

function _chromeStorageItemUpdate(name, value) {
	chrome.storage.sync.set({
		[name]: value
	});	
}
