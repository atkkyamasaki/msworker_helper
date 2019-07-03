// 各要素の取得、変数の定義

var updateCustomerInfoHash = {};
var tileMarkId = '';
var analysisLinkArray = [];

// 付箋
$(function() {

	var clipHtml = '<i class="fa fa-files-o my_clip_board" aria-hidden="true"></i>';

	var summaryNote = '<div id="summary_note" class="post_it">[Personal Information]' +
		'<p class="post_it_item">My Subscriptioin : </p>' +
		'<p class="post_it_item"><input type="text" name="my_subscription" size="40" maxlength="40" value="' + parameters.my_subscription + '">' + clipHtml + '</p>' +
		'<p class="post_it_item">Work Item ID : ' + '<input type="text" name="work_item_id" size="15" maxlength="40" value="' + parameters.work_item_id + '">' + clipHtml + '</p>' +
		'</div>';

	var updateFieldBtn = '<i class="fa fa-refresh fa-2x conf_update_field my-tooltip" aria-hidden="true" title="Refresh"></i>';
	var exportBtn = '<i class="fa fa-cloud-upload fa-2x conf_export my-tooltip" aria-hidden="true" title="Export"></i>';
	var importBtn = '<i class="fa fa-cloud-download fa-2x conf_import my-tooltip" aria-hidden="true" title="Import"></i>';

	var customerInfoNote = '<div id="customer_info_note" class="post_it">[Customer Information]' + updateFieldBtn + importBtn + exportBtn +
		'<p class="post_it_item">Subscriptioin : </p>' +
		'<p class="post_it_item"><input type="text" name="subscription" size="40" maxlength="40">' + clipHtml + '</p>' +

			'<div id="container_element"><i class="fa fa-plus-square-o i_vm" aria-hidden="true">  VM</i>' +
			'<div id="sub_container_vm" style="display: none;">' +
			'<p class="post_it_item">Name : <input type="text" name="vm_name" size="15" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Resource Group : <input type="text" name="vm_resource-group" size="15" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Deployment ID (Tenant Name) : </p>' +
			'<p class="post_it_item"><input type="text" name="vm_deployment-id" size="40" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Region : <input type="text" name="vm_region" size="15" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Cluster : <input type="text" name="vm_cluster" size="15" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Node ID : </p>' +
			'<p class="post_it_item"><input type="text" name="vm_node-id" size="40" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Container ID : </p>' +
			'<p class="post_it_item"><input type="text" name="vm_container-id" size="40" maxlength="40">' + clipHtml + '</p>' +
			'</div>' +
			'</div>' +		
		
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

			'<div id="container_element"><i class="fa fa-plus-square-o i_lb" aria-hidden="true">  Load Balancer</i>' +
			'<div id="sub_container_lb" style="display: none;">' +
			'<p class="post_it_item">Name : <input type="text" name="lb_name" size="15" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Region : <input type="text" name="lb_region" size="15" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Resource Group : <input type="text" name="lb_resource-group" size="15" maxlength="40">' + clipHtml + '</p>' +
			'</div>' +
			'</div>' +

			'<div id="container_element"><i class="fa fa-plus-square-o i_appgw" aria-hidden="true">  Application Gateway</i>' +
			'<div id="sub_container_appgw" style="display: none;">' +
			'<p class="post_it_item">Name : <input type="text" name="appgw_name" size="15" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Region : <input type="text" name="appgw_region" size="15" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Resource Group : <input type="text" name="appgw_resource-group" size="15" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Deployment ID : </p>' +
			'<p class="post_it_item"><input type="text" name="appgw_deployment-id" size="40" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Gateway ID : </p>' +
			'<p class="post_it_item"><input type="text" name="appgw_gateway-id" size="40" maxlength="40">' + clipHtml + '</p>' +
			'<p class="post_it_item">Gateway Subscription ID : </p>' +
			'<p class="post_it_item"><input type="text" name="appgw_gateway-subscription-id" size="40" maxlength="40">' + clipHtml + '</p>' +
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

	// 付箋の Open/Close 処理
	$(document).on("dblclick", "#summary_note", function () {
		$(this).toggleClass('post_it_close');
	});
	$(document).on("dblclick", "#customer_info_note", function () {
		$(this).toggleClass('post_it_close');
	});


	// サブ項目の Open/Close 処理
	var elementCsses = {
		'.i_vm': '#sub_container_vm',
		'.i_vnet': '#sub_container_vnet',
		'.i_vnet_gateway': '#sub_container_vnet_gateway',
		'.i_er': '#sub_container_er',
		'.i_tor': '#sub_container_tor',
		'.i_lb': '#sub_container_lb',
		'.i_appgw': '#sub_container_appgw',
	}

	$.each(elementCsses, function(index, value) {
		$(index).on("click", function () {
			if ($(this).hasClass('fa-minus-square-o')) {
				$(this).removeClass('fa-minus-square-o');
				$(this).addClass('fa-plus-square-o');
				$(value).hide();
			} else if($(this).hasClass('fa-plus-square-o')) {
	
				$.each(elementCsses, function(index2, value2){
					if($(index2).hasClass('fa-minus-square-o')) {
						$(index2).removeClass('fa-minus-square-o');
						$(index2).addClass('fa-plus-square-o');
						$(value2).hide();
					} 
				});
	
				$(this).removeClass('fa-plus-square-o');
				$(this).addClass('fa-minus-square-o');
				$(value).show();
			};
		});
	});


	// 自動コピーを利用したアップデート
	$(".conf_update_field").on("click", function () {
		$.each(updateCustomerInfoHash, function(index, value) {
			var elemenIndex = 'input[name="' + index + '"]';
			$(elemenIndex).val(value);
		});		
	});

	// Import / Export 処理
	//  -- Export --
	$(".conf_export").on("click", function () {
		var exportJson = [
			$('input[name="subscription"]').val(),
			$('input[name="vm_name"]').val(),
			$('input[name="vm_resource-group"]').val(),
			$('input[name="vm_deployment-id"]').val(),
			$('input[name="vm_region"]').val(),
			$('input[name="vm_cluster"]').val(),
			$('input[name="vm_node-id"]').val(),
			$('input[name="vm_container-id"]').val(),
			$('input[name="vnet_name"]').val(),
			$('input[name="vnet_internal_vnet_id"]').val(),
			$('input[name="vnetgw_name"]').val(),
			$('input[name="vnetgw_gatewayid"]').val(),
			$('input[name="vnetgw_gateway-deployment-id"]').val(),
			$('input[name="er_name"]').val(),
			$('input[name="er_service_key"]').val(),
			$('input[name="er_primary_device"]').val(),
			$('input[name="er_secondary_device"]').val(),
			$('input[name="er_primary_vrf_name"]').val(),
			$('input[name="er_secondary_vrf_name"]').val(),
			$('input[name="tor_node_id_0"]').val(),
			$('input[name="tor_node_id_1"]').val(),
			$('input[name="lb_name"]').val(),
			$('input[name="lb_region"]').val(),
			$('input[name="lb_resource-group"]').val(),
			$('input[name="appgw_name"]').val(),
			$('input[name="appgw_region"]').val(),
			$('input[name="appgw_resource-group"]').val(),
			$('input[name="appgw_deployment-id"]').val(),
			$('input[name="appgw_gateway-id"]').val(),
			$('input[name="appgw_gateway-subscription-id"]').val(),
		];
		_copyTextToClipboard(exportJson);
	});

	//  -- Import --
	$(".conf_import").on("click", function () {

		var motalElement = $('.container_import_field,#container_modal_overlay');
		motalElement.css('display', 'block');

		$("#select_import_field_submit").on("click", function () {

			var importArray = $('#export_file_info').val().split(",");

			$('input[name="subscription"]').val(importArray[0]),
			$('input[name="vm_name"]').val(importArray[1]),
			$('input[name="vm_resource-group"]').val(importArray[2]),
			$('input[name="vm_deployment-id"]').val(importArray[3]),
			$('input[name="vm_region"]').val(importArray[4]),
			$('input[name="vm_cluster"]').val(importArray[5]),
			$('input[name="vm_node-id"]').val(importArray[6]),
			$('input[name="vm_container-id"]').val(importArray[7]),
			$('input[name="vnet_name"]').val(importArray[8]),
			$('input[name="vnet_internal_vnet_id"]').val(importArray[9]),
			$('input[name="vnetgw_name"]').val(importArray[10]),
			$('input[name="vnetgw_gatewayid"]').val(importArray[11]),
			$('input[name="vnetgw_gateway-deployment-id"]').val(importArray[12]),
			$('input[name="er_name"]').val(importArray[13]),
			$('input[name="er_service_key"]').val(importArray[14]),
			$('input[name="er_primary_device"]').val(importArray[15]),
			$('input[name="er_secondary_device"]').val(importArray[16]),
			$('input[name="er_primary_vrf_name"]').val(importArray[17]),
			$('input[name="er_secondary_vrf_name"]').val(importArray[18]),
			$('input[name="tor_node_id_0"]').val(importArray[19]),
			$('input[name="tor_node_id_1"]').val(importArray[20]),
			$('input[name="lb_name"]').val(importArray[21]),
			$('input[name="lb_region"]').val(importArray[22]),
			$('input[name="lb_resource-group"]').val(importArray[23]),
			$('input[name="appgw_name"]').val(importArray[24]),
			$('input[name="appgw_region"]').val(importArray[25]),
			$('input[name="appgw_resource-group"]').val(importArray[26]),
			$('input[name="appgw_deployment-id"]').val(importArray[27]),
			$('input[name="appgw_gateway-id"]').val(importArray[28]),
			$('input[name="appgw_gateway-subscription-id"]').val(importArray[29]),

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
		_copyTextToClipboard(copy_strings);

	});

	// Tile 要素の取得
	$(document).on("click", ".tile_marker_icon", function () {
		tileMarkId = $(this).next().attr('id');
		$(".tile_marker_icon").removeClass('valid_green');
		$(".tile_marker_icon").removeClass('fa-toggle-off');
		$(".tile_marker_icon").removeClass('fa-toggle-on');
		$(".tile_marker_icon").addClass('fa-toggle-off');
		$(this).addClass('valid_green');
		$(this).addClass('fa-toggle-on');
		$("#analysis_link").remove();
	});

	_ascResourceWather();
	_ascTileMarkerWather();

	// Analysis Link の実行
	$(document).on("click", "#analysis_link", function () {
		// window.open('https://jarvis-west.dc.ad.msft.net/dashboard/BrkProd/BrkGWT/VpnGateway/TenantGeneral?overrides=[{"query":"//*[id=\'DeploymentId\']","key":"value","replacement":"b899f564089d49a0b1b876dda3de10bf"}]%20');
		// window.open('https://jarvis-west.dc.ad.msft.net/dashboard/share/E5FFE4A8?overrides=[{"query":"//dataSources","key":"account","replacement":"BrkProd"},{"query":"//*[id='DeploymentId']","key":"value","replacement":"b899f564089d49a0b1b876dda3de10bf"}]%20');
		// window.open('https://jarvis-west.dc.ad.msft.net/?page=logs&be=DGrep&offset=-1&offsetUnit=Hours&UTC=false&ep=Diagnostics%20PROD&ns=BrkGWT&en=IkeLogsTable,IkePacketLogsTable&scopingConditions=[["Tenant","8ddc393ee54d44379d7448631b0a336b"]]&conditions=[]&clientQuery=orderby%20PreciseTimeStamp%20asc%0A&chartEditorVisible=true&chartType=Line&chartLayers=[["New%20Layer",""]]%20');
		$.each(analysisLinkArray, function(index, value) {
			window.open(value);
		});	
	});

});



// ASC Resource Wather
function _ascResourceWather(){
	if (tileMarkId) {
		// console.log(tileMarkId);
		var tileMarkIdWatcher = '#' + tileMarkId;
		var tileMarkIdWatcherPlusOne = tileMarkIdWatcher.slice(0, -1) + String(Number(tileMarkIdWatcher.substr(-1)) + 1); 
		var tileMarkIdWatcherPlusTwo = tileMarkIdWatcher.slice(0, -1) + String(Number(tileMarkIdWatcher.substr(-1)) + 2); 

	var resourceProvider = $("label[for='resourceTreeGroup2']").text();
	// console.log(resourceProvider);

	if (resourceProvider.length && resourceProvider == "Resource Providers") {

		var resourceSubtitle = $(tileMarkIdWatcher).closest('loading-area').parent().closest('loading-area').prev('div').find(".resource-explorer-subtitle").text();
		// console.log(resourceSubtitle);

		var analysisLink = '<i id="analysis_link" class="fa fa-external-link" aria-hidden="true"></i>'

		switch(resourceSubtitle){
			case 'Microsoft.Compute/virtualMachines':
				var vmNamevalue = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(1) > td > span > span");
				var vmNamevalueText = vmNamevalue.text();
				var vmResourceGroup = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(2) > td > span > span");
				var vmResourceGroupText = vmResourceGroup.text();
				var vmDeploymentId = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(7) > td > span > span");
				var vmDeploymentIdText = vmDeploymentId.text();
				var vmRegion = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(10) > td > span > span");
				var vmRegionText = vmRegion.text();
				var vmCluster = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(4) > td > span > a");
				var vmClusterText = vmCluster.text();
				var vmNodeId = $(tileMarkIdWatcherPlusTwo + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(1) > td > span > span");
				var vmNodeIdText = vmNodeId.text();
				var vmContainerId = $(tileMarkIdWatcherPlusTwo + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(2) > td > span > span");
				var vmContainerIdText = vmContainerId.text();

				var targetHighlighter= [
					vmNamevalue,
					vmResourceGroup,
					vmDeploymentId,
					vmRegion,
					vmCluster,
					vmNodeId,
					vmContainerId,
				];

				updateCustomerInfoHash = {
					"vm_name": vmNamevalueText,
					"vm_resource-group": vmResourceGroupText,
					"vm_deployment-id": vmDeploymentIdText,
					"vm_region": vmRegionText,
					"vm_cluster": vmClusterText,
					"vm_node-id": vmNodeIdText,
					"vm_container-id": vmContainerIdText,
				};

				$.each(targetHighlighter, function(index, value) {
					$(value).addClass('bg_highlighter');
				});

				setTimeout(function(){
					_clearHighlighter(targetHighlighter);
				}, 2000);
			break;

			case 'Microsoft.ClassicCompute/virtualMachines':
				var vmNamevalue = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(1) > td > span > span");
				var vmNamevalueText = vmNamevalue.text();
				var vmResourceGroup = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(3) > td > span > span");
				var vmResourceGroupText = vmResourceGroup.text();
				var vmDeploymentId = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(6) > td > span > span");
				var vmDeploymentIdText = vmDeploymentId.text();
				var vmRegion = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(4) > td > span > span");
				var vmRegionText = vmRegion.text();
				var vmCluster = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(5) > td > span > span");
				var vmClusterText = vmCluster.text();
				var vmNodeId = $(tileMarkIdWatcherPlusTwo + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(1) > td > span > span");
				var vmNodeIdText = vmNodeId.text();
				var vmContainerId = $(tileMarkIdWatcherPlusTwo + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(2) > td > span > span");
				var vmContainerIdText = vmContainerId.text();

				var targetHighlighter= [
					vmNamevalue,
					vmResourceGroup,
					vmDeploymentId,
					vmRegion,
					vmCluster,
					vmNodeId,
					vmContainerId,
				];

				updateCustomerInfoHash = {
					"vm_name": vmNamevalueText,
					"vm_resource-group": vmResourceGroupText,
					"vm_deployment-id": vmDeploymentIdText,
					"vm_region": vmRegionText,
					"vm_cluster": vmClusterText,
					"vm_node-id": vmNodeIdText,
					"vm_container-id": vmContainerIdText,
				};

				$.each(targetHighlighter, function(index, value) {
					$(value).addClass('bg_highlighter');
				});

				setTimeout(function(){
					_clearHighlighter(targetHighlighter);
				}, 2000);
			break;

			case 'Microsoft.Network/virtualNetworks':
				var vnetNamevalue = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(2) > td > span > span");
				var vnetNamevalueText = vnetNamevalue.text();
				var vnetInternalVnetId = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(13) > td > span > span");
				var vnetInternalVnetIdText = vnetInternalVnetId.text();

				var targetHighlighter= [
					vnetNamevalue,
					vnetInternalVnetId,
				];

				updateCustomerInfoHash = {
					"vnet_name": vnetNamevalueText,
					"vnet_internal_vnet_id": vnetInternalVnetIdText,
				};

				$.each(targetHighlighter, function(index, value) {
					$(value).addClass('bg_highlighter');
				});

				setTimeout(function(){
					_clearHighlighter(targetHighlighter);
				}, 2000);
			break;

			case 'Microsoft.ClassicNetwork/virtualNetworks':
				var vnetNamevalue = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(2) > td > span > span");
				var vnetNamevalueText = vnetNamevalue.text();
				var vnetInternalVnetId = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(7) > td > span > span");
				var vnetInternalVnetIdText = vnetInternalVnetId.text();

				var targetHighlighter= [
					vnetNamevalue,
					vnetInternalVnetId,
				];

				updateCustomerInfoHash = {
					"vnet_name": vnetNamevalueText,
					"vnet_internal_vnet_id": vnetInternalVnetIdText,
				};

				$.each(targetHighlighter, function(index, value) {
					$(value).addClass('bg_highlighter');
				});

				setTimeout(function(){
					_clearHighlighter(targetHighlighter);
				}, 2000);
			break;

			case 'Microsoft.Network/virtualNetworkGateways':
				var vnetgwNamevalue = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(2) > td > span > span");
				var vnetgwNamevalueText = vnetgwNamevalue.text();
				var vnetgwGatewayid = $(tileMarkIdWatcherPlusOne + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(4) > td > span > span");
				var vnetgwGatewayidText = vnetgwGatewayid.text();
				var vnetgwGatewayDeploymentId = $(tileMarkIdWatcherPlusOne + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(13) > td > span > span");
				var vnetgwGatewayDeploymentIdText = vnetgwGatewayDeploymentId.text();

				if(!$('#analysis_link').length){
					vnetgwGatewayDeploymentId.append(analysisLink);
					_createAnalysisLink(resourceSubtitle, tileMarkIdWatcher, vnetgwGatewayDeploymentIdText);
				}

				var targetHighlighter= [
					vnetgwNamevalue,
					vnetgwGatewayid,
					vnetgwGatewayDeploymentId,
				];
				
				updateCustomerInfoHash = {
					"vnetgw_name": vnetgwNamevalueText,
					"vnetgw_gatewayid": vnetgwGatewayidText,
					"vnetgw_gateway-deployment-id": vnetgwGatewayDeploymentIdText,
				};

				$.each(targetHighlighter, function(index, value) {
					$(value).addClass('bg_highlighter');
				});

				setTimeout(function(){
					_clearHighlighter(targetHighlighter);
				}, 2000);
			break;

			case 'Microsoft.ClassicNetwork/virtualNetworkGateways':
				var vnetgwNamevalue = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(1) > td > span > span");
				var vnetgwNamevalueText = vnetgwNamevalue.text();
				var vnetgwGatewayid = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(6) > td > span > span");
				var vnetgwGatewayidText = vnetgwGatewayid.text();
				var vnetgwGatewayDeploymentId = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(5) > td > span > span");
				var vnetgwGatewayDeploymentIdText = vnetgwGatewayDeploymentId.text();
				var targetHighlighter= [
					vnetgwNamevalue,
					vnetgwGatewayid,
					vnetgwGatewayDeploymentId,
				];
				
				updateCustomerInfoHash = {
					"vnetgw_name": vnetgwNamevalueText,
					"vnetgw_gatewayid": vnetgwGatewayidText,
					"vnetgw_gateway-deployment-id": vnetgwGatewayDeploymentIdText,
				};

				$.each(targetHighlighter, function(index, value) {
					$(value).addClass('bg_highlighter');
				});

				setTimeout(function(){
					_clearHighlighter(targetHighlighter);
				}, 2000);
			break;

			case 'Microsoft.Network/expressRouteCircuits':
				var erNamevalue = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(2) > td > span > span");
				var erNamevalueText = erNamevalue.text();
				var erServiceKey = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(14) > td > span > span");
				var erServiceKeyText = erServiceKey.text();
				var erPrimaryDevice = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(15) > td > span > span");
				var erPrimaryDeviceText = erPrimaryDevice.text();
				var erSecondaryDevice = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(16) > td > span > span");
				var erSecondaryDeviceText = erSecondaryDevice.text();
				// var erPrimaryVrfName = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(2) > td > span > span");
				// var erPrimaryVrfNameText = erPrimaryVrfName.text();
				// var erSecondaryVrfName = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(2) > td > span > span");
				// var erSecondaryVrfNameText = erSecondaryVrfName.text();

				var targetHighlighter= [
					erNamevalue,
					erServiceKey,
					erPrimaryDevice,
					erSecondaryDevice,
				];

				updateCustomerInfoHash = {
					"er_name": erNamevalueText,
					"er_service_key": erServiceKeyText,
					"er_primary_device": erPrimaryDeviceText,
					"er_secondary_device": erSecondaryDeviceText,
					// "er_primary_vrf_name": erPrimaryVrfNameText,
					// "er_secondary_vrf_name": erSecondaryVrfNameText,
				};

				$.each(targetHighlighter, function(index, value) {
					$(value).addClass('bg_highlighter');
				});

				setTimeout(function(){
					_clearHighlighter(targetHighlighter);
				}, 2000);
			break;

			case 'Microsoft.Network/loadBalancers':
				var lbNameValue = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(2) > td > span > span");
				var lbNameValueText = lbNameValue.text();
				var lbRegion = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(3) > td > span > span");
				var lbRegionText = lbRegion.text();
				var lbResourceGroup = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(4) > td > span > span");
				var lbResourceGroupText = lbResourceGroup.text();

				var targetHighlighter= [
					lbNameValue,
					lbRegion,
					lbResourceGroup,
				];
			
				updateCustomerInfoHash = {
					"lb_name": lbNameValueText,
					"lb_region": lbRegionText,
					"lb_resource-group": lbResourceGroupText,
				};

				$.each(targetHighlighter, function(index, value) {
					$(value).addClass('bg_highlighter');
				});

				setTimeout(function(){
					_clearHighlighter(targetHighlighter);
				}, 2000);
			break;

			case 'Microsoft.Network/applicationGateways':
				var appgwNameValue = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(2) > td > span > span");
				var appgwNameValueText = appgwNameValue.text();
				var appgwRegion = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(3) > td > span > span");
				var appgwRegionText = appgwRegion.text();
				var appgwResourceGroup = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(4) > td > span > span");
				var appgwResourceGroupText = appgwResourceGroup.text();
				var appgwDeploymentId = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(16) > td > span > span");
				var appgwDeploymentIdText = appgwDeploymentId.text();
				var appgwGatewayId = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(22) > td > span > span");
				var appgwGatewayIdText = appgwGatewayId.text();
				var appgwGatewaySubscriptionId = $(tileMarkIdWatcher + " > li > div > div.box-content > div > layout-handler > div > table > tbody > tr:nth-child(23) > td > span > span");
				var appgwGatewaySubscriptionIdText = appgwGatewaySubscriptionId.text();

				var targetHighlighter= [
					appgwNameValue,
					appgwRegion,
					appgwResourceGroup,
					appgwDeploymentId,
					appgwGatewayId,
					appgwGatewaySubscriptionId,
				];
			
				updateCustomerInfoHash = {
					"appgw_name": appgwNameValueText,
					"appgw_region": appgwRegionText,
					"appgw_resource-group": appgwResourceGroupText,
					"appgw_deployment-id": appgwDeploymentIdText,
					"appgw_gateway-id": appgwGatewayIdText,
					"appgw_gateway-subscription-id": appgwGatewaySubscriptionIdText,
				};

				$.each(targetHighlighter, function(index, value) {
					$(value).addClass('bg_highlighter');
				});

				setTimeout(function(){
					_clearHighlighter(targetHighlighter);
				}, 2000);
			break;

			default:
				console.log('default');
			break;
	
	
		}
	

	}
	}

	setTimeout(_ascResourceWather, 2000);

}


// ASC Tile Marker Wather
function _ascTileMarkerWather(){

	// var insertIcon = '<i style="display:none;" class="fa fa-check-circle-o tile_marker_icon" aria-hidden="true"></i>';
	var insertIcon = '<i style="cursor: pointer; padding: 4px; font-size: 30px;" class="fa fa-toggle-off tile_marker_icon" aria-hidden="true"></i>';
	var targetElement = '#Anchor_';

	for (i = 0; i < 100; i++){
		targetElementAdd = targetElement + i;

		if (!$(targetElementAdd).prev().hasClass('tile_marker_icon')) {
			$(targetElementAdd).before(insertIcon);
		}
	}

	setTimeout(_ascTileMarkerWather, 2000);

}


function _clearHighlighter(elements){

	$.each(elements, function(index, value) {
		$(value).removeClass('bg_highlighter');
	});
}


// Analysis Link

function _createAnalysisLink(resourceSubtitle, tileMark, id){
		// window.open('https://jarvis-west.dc.ad.msft.net/dashboard/BrkProd/BrkGWT/VpnGateway/TenantGeneral?overrides=[{"query":"//*[id=\'DeploymentId\']","key":"value","replacement":"b899f564089d49a0b1b876dda3de10bf"}]%20');
		// window.open('https://jarvis-west.dc.ad.msft.net/dashboard/share/E5FFE4A8?overrides=[{"query":"//dataSources","key":"account","replacement":"BrkProd"},{"query":"//*[id='DeploymentId']","key":"value","replacement":"b899f564089d49a0b1b876dda3de10bf"}]%20');
		// window.open('https://jarvis-west.dc.ad.msft.net/?page=logs&be=DGrep&offset=-1&offsetUnit=Hours&UTC=false&ep=Diagnostics%20PROD&ns=BrkGWT&en=IkeLogsTable,IkePacketLogsTable&scopingConditions=[["Tenant","8ddc393ee54d44379d7448631b0a336b"]]&conditions=[]&clientQuery=orderby%20PreciseTimeStamp%20asc%0A&chartEditorVisible=true&chartType=Line&chartLayers=[["New%20Layer",""]]%20');

		switch(resourceSubtitle){
			case 'Microsoft.Compute/virtualMachines':
			break;
			case 'Microsoft.Network/virtualNetworkGateways':
				analysisLinkArray = [
					'https://jarvis-west.dc.ad.msft.net/dashboard/BrkProd/BrkGWT/VpnGateway/TenantGeneral?overrides=[{"query":"//*[id=\'DeploymentId\']","key":"value","replacement":"' + id + '"}]%20',
					'https://jarvis-west.dc.ad.msft.net/dashboard/share/E5FFE4A8?overrides=[{"query":"//dataSources","key":"account","replacement":"BrkProd"},{"query":"//*[id=\'DeploymentId\']","key":"value","replacement":"' + id + '"}]%20',
					'https://jarvis-west.dc.ad.msft.net/?page=logs&be=DGrep&offset=-1&offsetUnit=Hours&UTC=false&ep=Diagnostics%20PROD&ns=BrkGWT&en=IkeLogsTable,IkePacketLogsTable&scopingConditions=[["Tenant","' + id + '"]]&conditions=[]&clientQuery=orderby%20PreciseTimeStamp%20asc%0A&chartEditorVisible=true&chartType=Line&chartLayers=[["New%20Layer",""]]%20',
				];

			break;
		};
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




