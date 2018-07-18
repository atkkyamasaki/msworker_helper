

// Font Awesome
$(function() {

    _sshConnectIdWather();
    
});



// SSH Connection ID Wather
function _sshConnectIdWather(){

	var sshId = '#fxsContextPaneTitle';
    if ($(sshId).length) {
        if ($(sshId).text('仮想マシンに接続する')) {
            $(sshId).closest('section').parent().children('.fxc-copyablelabel-textbox').children('input').css('background-color','red');
            $(sshId).closest('section').parent().children("div:has(.fxc-copyablelabel-textbox)").css('background-color','red');
            $(sshId).closest('section').parent().css('background-color','red');
            var sshValue = $(sshId).closest('section').parent().children('.fxc-copyablelabel-textbox').children('input').attr("title");
            console.log(sshValue);
        }
    
    }

	setTimeout(_sshConnectIdWather, 2000);

}





// Font Awesome
$(function() {
	$('body').after('<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">');
});


