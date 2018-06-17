// 各要素の取得、変数の定義

// var mySubscriptionId = 'E7152397-8E53-4ED8-AA9E-9F22FE111756';
// var subscriptionButton = '#resourceSidebar > loading-area > div > ng-transclude > div > div.add-button-container.ng-scope > button';
// var subscriptionInput = '#add-subscription-input > div > div > input.search-resource.ng-pristine.ng-untouched.ng-valid';
// var subscriptionInput2 = '#add-subscription-input > div > div > input.search-resource.ng-pristine.ng-valid.ng-empty.ng-touched';


// 情報取得
// var resourceSubtitleElement = '#resourceContent > div:nth-child(1) > div > div > div > div.resource-explorer-subtitle.ng-binding';

// $(function() {

//     $(document).on("click", "#summary_note", function () {
//         var resourceSubtitleText = $(resourceSubtitleElement).text();

//         console.log(resourceSubtitleText);


//         // -- VNetGW
//         switch(resourceSubtitleText){
//             case "Microsoft.Network/virtualNetworkGateways":
//                 console.log("1");
//             break;

//             default:
//                 console.log('Error');
//         }

//     });
// });




// 付箋

$(function() {

	// var productCategory = $('#ctl00_MainContent_L_Category').text();
	// var productSN = $('#ctl00_MainContent_L_SN').text();
	// var swVersion = $('#ctl00_MainContent_L_SWVersion').text();
	// var swPatch = $('#ctl00_MainContent_L_BuildNo').text();
	// var country = $('#ctl00_MainContent_UC_PartnerInfo_L_Country').text();
	// var tacRegion = $('#ctl00_MainContent_L_Tac').text();

	var clipHtml = '<i class="fa fa-files-o my_clip_board" aria-hidden="true"></i>'

	var summaryNote = '<div id="summary_note" class="post_it">[Personal Information]' +
		'<p class="post_it_item">My Subscriptioin : </p>' +
		'<p class="post_it_item"><input type="text" name="my_subscription" size="40" maxlength="40" value="' + parameters.my_subscription + '">' + clipHtml + '</p>' +
		'<p class="post_it_item">Work Item ID : ' + '<input type="text" name="work_item_id" size="15" maxlength="40" value="' + parameters.work_item_id + '">' + clipHtml + '</p>' +
		'</div>';

	var exportBtn = '<i class="fa fa-cloud-upload fa-2x conf_export" aria-hidden="true"></i>'
	var importBtn = '<i class="fa fa-cloud-download fa-2x conf_import" aria-hidden="true"></i>'

	var customerInfoNote = '<div id="customer_info_note" class="post_it">[Customer Information]' + importBtn + exportBtn +
		'<p class="post_it_item">Subscriptioin : </p>' +
		'<p class="post_it_item"><input type="text" name="subscription" size="40" maxlength="40">' + clipHtml + '</p>' +
		
			'<div id="container_element"><i class="fa fa-plus-square-o i_vnet" aria-hidden="true">  vNet</i>' +
			'<div id="sub_container_vnet" style="display: none;">' +
			'<p class="post_it_item">Name : <input type="text" name="vnet_name" size="15" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Internal VnetID : </p>' +
			'<p class="post_it_item"><input type="text" name="vnet_internal_vnet_id" size="40" maxlength="40">' + clipHtml + '</p>' +
			'</div>' +
			'</div>' +

			'<div id="container_element"><i class="fa fa-plus-square-o i_vnet_gateway" aria-hidden="true">  vNetGW</i>' +
			'<div id="sub_container_vnet_gateway" style="display: none;">' +
			'<p class="post_it_item">Name : <input type="text" name="vnetgw_name" size="15" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">GatewayID : </p>' +
			'<p class="post_it_item"><input type="text" name="vnetgw_gatewayid" size="40" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Gateway Deployment Id (Tenant ID) : </p>' +
			'<p class="post_it_item"><input type="text" name="vnetgw_gateway-deployment-id" size="40" maxlength="40">' + clipHtml + '</p>' +
			'</div>' +
			'</div>' +

			'<div id="container_element"><i class="fa fa-plus-square-o i_er" aria-hidden="true">  ExpressRoute</i>' +
			'<div id="sub_container_er" style="display: none;">' +
			'<p class="post_it_item">Name : <input type="text" name="er_name" size="15" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Service Key : </p>' +
			'<p class="post_it_item"><input type="text" name="er_service_key" size="40" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Primary Device : </p>' +
			'<p class="post_it_item"><input type="text" name="er_primary_device" size="40" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Secondary Device : </p>' +
			'<p class="post_it_item"><input type="text" name="er_secondary_device" size="40" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Primary VRF Name : </p>' +
			'<p class="post_it_item"><input type="text" name="er_primary_vrf_name" size="40" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Secondary VRF Name : </p>' +
			'<p class="post_it_item"><input type="text" name="er_secondary_vrf_name" size="40" maxlength="40">' + clipHtml + '</p>' +
			'</div>' +
			'</div>' +

			'<div id="container_element"><i class="fa fa-plus-square-o i_tor" aria-hidden="true">  ToR</i>' +
			'<div id="sub_container_tor" style="display: none;">' +
			'<p class="post_it_item">Node ID (GwTenantWorker0) : </p>' +
			'<p class="post_it_item"><input type="text" name="tor_node_id_0" size="40" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Node ID (GwTenantWorker1) : </p>' +
			'<p class="post_it_item"><input type="text" name="tor_node_id_1" size="40" maxlength="40">' + clipHtml + '</p>' +
			'</div>' +
			'</div>' +

		'</div>';

	var importField = '<div class="container_import_field">' +
		'<p>Upload Export Information</p>' +
		'<p><textarea id="export_file_info" name="export_file_info" cols="50" rows="4"></textarea></p>' +
		'<span id="select_import_field_submit" class="select_import_field_btn">Submit</span>' +
		'<span id="select_import_field_cancel" class="select_import_field_btn">Cancel</span>' +
		'</div>' +
		'<div id="container_modal_overlay"></div>';
	
	var loadingField = '<div class="all_loading hide"></div>';

	if (true) {
		$('body').after(summaryNote);	
		$('body').after(customerInfoNote);
		$('body').after(importField);
		$('body').after(loadingField);
	}



	$(document).on("dblclick", "#summary_note", function () {
		$(this).toggleClass('post_it_close');
	});
	$(document).on("dblclick", "#customer_info_note", function () {
		$(this).toggleClass('post_it_close');
	});


	var elementCsses = {
		'.i_vnet': '#sub_container_vnet',
		'.i_vnet_gateway': '#sub_container_vnet_gateway',
		'.i_er': '#sub_container_er',
		'.i_tor': '#sub_container_tor',
	}

	$.each(elementCsses, function(index, value) {
		$(index).on("click", function () {
			if ($(this).hasClass('fa-minus-square-o')) {
				$(this).removeClass('fa-minus-square-o');
				$(this).addClass('fa-plus-square-o');
				$(value).fadeOut();
			} else if($(this).hasClass('fa-plus-square-o')) {
				$(this).removeClass('fa-plus-square-o');
				$(this).addClass('fa-minus-square-o');
				$(value).fadeIn();
			};
		});
	});

	// $(".i_vnet_gateway").on("click", function () {
	// 	if ($(this).hasClass('fa-minus-square-o')) {
	// 		$(this).removeClass('fa-minus-square-o');
	// 		$(this).addClass('fa-plus-square-o');
	// 		$('#sub_container_vnet_gateway').fadeOut();
	// 	} else {
	// 		$(this).removeClass('fa-plus-square-o');
	// 		$(this).addClass('fa-minus-square-o');
	// 		$('#sub_container_vnet_gateway').fadeIn();
	// 	};
	// });

	// $(".i_vnet").on("click", function () {
	// 	if ($(this).hasClass('fa-minus-square-o')) {
	// 		$(this).removeClass('fa-minus-square-o');
	// 		$(this).addClass('fa-plus-square-o');
	// 		$('#sub_container_vnet').fadeOut();
	// 	} else {
	// 		$(this).removeClass('fa-plus-square-o');
	// 		$(this).addClass('fa-minus-square-o');
	// 		$('#sub_container_vnet').fadeIn();
	// 	};
	// });

	// Import / Export 処理
	$(".conf_export").on("click", function () {
		copyTextToClipboard($('#customer_info_note').html());
	});


	$(".conf_import").on("click", function () {

		var motalElement = $('.container_import_field,#container_modal_overlay');
		motalElement.css('display', 'block');

		$("#select_import_field_submit").on("click", function () {

			var replaceCustomerHtml = $('#export_file_info').val();
			$('#customer_info_note').html('');
			$('#customer_info_note').html(replaceCustomerHtml);
			// $('.all_loading').removeClass('hide');
			// $('.all_loading').addClass('hide');


			motalElement.css('display', 'none');
		});

		$("#select_import_field_cancel").on("click", function () {
			motalElement.css('display', 'none');
			$('#export_file_info').val('');
		});
	});

	
	// クリップボードへコピー
	$(".my_clip_board").on("click", function () {
		var copy_strings = $(this).prev('input').val();
		copyTextToClipboard(copy_strings);

	});

});


// クリップボードへのコピー
//   参考 URL
//   https://webllica.com/copy-text-to-clipboard/

function copyTextToClipboard(textVal){
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




