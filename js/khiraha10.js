

$(function() {
    setInterval(function(){
        _watchPage();
    }, 2000);

});

function _watchPage() {

    if ($('h1', top.frames[1].document.body).text() == 'New Request') {

        if (!($('#update_btn', top.frames[1].document.body).length)) {

            $('h1', top.frames[1].document.body).after('<button id="update_btn" onMouseOut="this.style.opacity=1" onMouseOver="this.style.opacity=0.5" style="margin: 8px; border-radius: 4px; background: lightgreen; cursor: pointer;">Update</button>');

            $('#update_btn', top.frames[1].document.body).on("click", function () {
                putParamToBox();
            });

        }
    }
}

function putParamToBox() {
    num = getParam('num');
    title = getParam('title');
    email = getParam('email');
    contract = getParam('contract');
    
    $('input[name="txtCaseNumber"]', top.frames[1].document.body).val(num);
    $('textarea[name="txtDescription"]', top.frames[1].document.body).val(title);
    $('input[name="txtEmailAddress"]', top.frames[1].document.body).val(email);
    $('#ddlistService', top.frames[1].document.body).after('<span style="color: green; margin-left: 8px; font-weight: bold;">' + contract + '</span>');
    
}

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}




