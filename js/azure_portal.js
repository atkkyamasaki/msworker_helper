

// Font Awesome
$(function() {
    _sshConnectIdWather();
});



// SSH Connection ID Wather
function _sshConnectIdWather(){
	var panelId = '#fxsContextPaneTitle';

    if (!$(panelId).next().children('i').hasClass("custom_new_link")) {
        if ($(panelId).length) {
            if ($(panelId).text('仮想マシンに接続する') || $(panelId).text('Connect to virtual machine')) {
                var sshValue = $(panelId).closest('section').find('.fxc-copyablelabel-textbox').find('input').attr("title");
                var newLink = _sshLinkCreater(sshValue);

                if (newLink.slice(0, 4) == "ssh:") {
                    var linkHtml = '<a href="' + newLink + '" target="_blank"><i class="fa fa-external-link custom_new_link" aria-hidden="true" style="padding:0 8px 0px; font-size:24px;"></i></a>';
                    $(panelId).after(linkHtml);	
                }
            }
        }
    }
	setTimeout(_sshConnectIdWather, 2000);
}

function _sshLinkCreater(value){
    if (value.slice(0, 3) == "ssh") {
        var result = 'ssh://' + value.slice(3).trim();
        return result;
    }
}




// Font Awesome
$(function() {
	$('body').after('<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">');
});


