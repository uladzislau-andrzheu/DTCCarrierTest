if(!window.global)
	window.global = {
		App: {}
	};

global.App.uiConfig = {
	"show_nav_panel": false
	};

function _invokeAlphaTrust() {



var x = this.coreApi.getRuntimeData();

var data = JSON.stringify(x);




	var path = 'http://innovationqa.dv.ipipenet.com:51003/api/values';
	var client = new XMLHttpRequest();
	client.open('POST', path);
	client.setRequestHeader('Content-type', 'application/json');
	client.onreadystatechange = function() {
    if(client.readyState === 4){
        var response = client.responseText;
            if(response !== null && response !== "")
			response = response.replace(/"/g, "");	
		
			basicPopup(response);

        }
    }
    client.send(data);




}

global.App.jsCA = { invokeAlphaTrust: _invokeAlphaTrust };

function openInNewTab(url) {
	var win = window.open(url, '_blank');
	win.focus();
  }

function basicPopup(url) {


	popupWindow = window.open(url,'popUpWindow','height=500,width=1000,left=0,top=0,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
		}