//Copyright 2018 iPipeline
var uiConfig = {
//show or hide the left-nav
    "show_nav_panel": false
};
if(!window.global)
	window.global = {
		App: {}
	};

global.App.uiConfig = uiConfig;

function createGlobalEventHandlersExtension(ExtensionClass) {
	//Override saveData
	ExtensionClass.prototype.saveData = function() {
        
    	return this.superclass.saveData();
    };
}

var navBar = false;

function switchScreen(name) 
{
	//Post message for Screen Designer Runtime to switch screens
	parent.postMessage({type: "OPEN_SCREEN_REQUEST", screenName: name}, '*');

}

