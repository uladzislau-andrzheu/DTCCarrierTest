var uiConfig = {
"show_nav_panel": false
};
if(!window.global)
	window.global = {
		App: {}
	};

global.App.uiConfig = uiConfig;
var data = { cossFORMS_FORMS_LastScreenName: "About You" };
global.App.cases = data;

function createGlobalEventHandlersExtension(ExtensionClass) {
	//Override saveData
	ExtensionClass.prototype.saveData = function() {
    	const runtimeData = this.coreApi.getRuntimeData();
    	const state = this.coreApi.getRuntimeState();
    	
    	//Enable top-navigation
    	if(typeof(runtimeData.PINonMed_Physician)!=="undefined"){
    		$("li.nav-health").removeClass("section-not-valid").addClass("section-valid");
    	}
    	if(!(typeof(runtimeData.PIFirstName)==="undefined" || runtimeData.PIFirstName.value === "")){
    		$("li.nav-personal").removeClass("section-not-valid").addClass("section-valid");
    	}
    	else{
    		$("li.nav-personal").removeClass("section-valid").addClass("section-not-valid");
    	}
    	if(!(typeof(runtimeData.PB_FirstName)==="undefined" || runtimeData.PB_FirstName.value === "")){
		    $("li.nav-medicare").removeClass("section-not-valid").addClass("section-valid");
    	}
    	else{
		    $("li.nav-medicare").removeClass("section-valid").addClass("section-not-valid");
    	}

    	//Update tabs in host page
    	switch(state.previousScreenName){
    	case "About You":
    		tab = "nav-medicare";
    		break;
    	case "Permission to Underwrite":
    		tab = "nav-health";
    		break;
    	case "Retrieving Decision":
    		tab = "nav-payment";
    		break;
    	}
    	switchActiveTab(tab, false);

    	//Log data to console
    	console.log(runtimeData);
    	
    	//Save data in iGO
    	return this.superclass.saveData();
    };
}

var navBar = false;

function switchScreen(name) 
{
	//Post message for Screen Designer Runtime to switch screens
	parent.postMessage({type: "OPEN_SCREEN_REQUEST", screenName: name}, '*');

	
	//Update tabs in host page
	var tab = "";
	
	switch(name){
	case "About You":
		tab = "nav-personal";
		break;
	case "Beneficiary":
		tab = "nav-medicare";
		break;
	case "HealthQuestionnaire":
		tab = "nav-health";
		break;
	}
	switchActiveTab(tab, true);
}

function switchActiveTab(tab, navBar){
	if(navBar || (navBar === this.navBar)){
			$("li.active").removeClass("active").addClass("section-visited");
			$("li."+tab).removeClass("section-not-visited").addClass("section-visited").addClass("active");
		
		this.navBar = navBar;
	}
	else{
		this.navBar = false;
	}
}

