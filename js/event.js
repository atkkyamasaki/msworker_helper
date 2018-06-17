if (messageColor == undefined) {
	var messageColor = true;
}
if (productSummary == undefined) {
	var productSummary = true;
}
if (customerSummary == undefined) {
	var customerSummary = true;
}
if (duration == undefined) {
	var duration = true;
}
if (durationFooter == undefined) {
	var durationFooter = true;
}
if (unclosedFilter == undefined) {
	var unclosedFilter = true;
}
if (closedMessageColor == undefined) {
	var closedMessageColor = true;
}
if (closedSummary == undefined) {
	var closedSummary = true;
}
if (mantisPlugin == undefined) {
	var mantisPlugin = true;
}

chrome.storage.sync.set({
	"messageColor": messageColor,
	"productSummary": productSummary,
	"customerSummary": customerSummary,
	"duration": duration,
	"durationFooter": durationFooter,
	"unclosedFilter": unclosedFilter,
	"closedMessageColor": closedMessageColor,
	"closedSummary": closedSummary,
	"mantisPlugin": mantisPlugin
});