//Screen Designer Runtime Loader
//Copyright 2018 iPipeline
//
// Loads Screen Designer runtime and dependencies into div with an id of "sdk-runtime"
// Host site must also include jquery
// Looks for the screen designer package to be unzipped in the runtime folder that is in the same location as this script.
//
// This must be served by a web server since XHR does not work with the local filesystem.

// This utility is intended for use as a local testing and exploration utility and not for production systems.

(function(window) {
 var path = './runtime/application';
 
 requestContent = function(file){
    var client = new XMLHttpRequest();
    client.open('GET', path + '/' + file);
    client.onreadystatechange = function() {
    if(client.readyState === 4){
        var response = client.responseText;
            if(response !== null && response !== "")
                loadSDKContent(response);
        }
    }
    client.send();
 }
 
 loadSDKContent = function(text, elementName){
    text = text.replace(/\{\{staticsPath\}\}/g, path);
    text = text.replace(/ defer\>/g, ">");
    parser = new DOMParser();
    xml = parser.parseFromString(text, "text/html");
    var scriptNodes = xml.getElementsByTagName('script');
    var linkNodes = xml.getElementsByTagName('link');
    var headEl = document.getElementsByTagName('head')[0];
 
    while(linkNodes.length > 0){
        var node = linkNodes[0];
        headEl.appendChild(node);
    }
    for(i=0; i < scriptNodes.length; i++){
        var node = scriptNodes[i];
        if(node.type==="application/json"){
            createStateScript(node.innerHTML);
        }
        else{
            load_script(node.src);
        }
    }


 }
 
        var load_css = function(linkUrl) {
            var headEl = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            headEl.appendChild(link);
            link.href = linkUrl;
        };

        var load_script = function(src) {
            var headEl = document.getElementsByTagName('head')[0];
            var s = document.createElement('Script');
            s.src = src;
            s.type = "text/javascript";
            s.defer = true;


            headEl.appendChild(s);
        };

        var createStateScript = function(scriptBody) {
            var headEl = document.getElementsByTagName('head')[0];
            var s = document.createElement('Script');
            s.type = "application/json";
            s.setAttribute('data-state', true);
        s.innerHTML = scriptBody;

        headEl.appendChild(s);
};
 
	window.global = window.global || {};
	window.global.App = window.global.App ||{ };
	window.global.App.appConfig = { logger: { disable: !0,loggerLevel: "debug"} };
	window.global.App.LOGGER_CONTEXT = "runtime";
	window.global.App.getRuntimeEntryPoint = function(){ return document.querySelector("#sdk-runtime") };

 requestContent('body.html');
// requestContent('cases.html');
// requestContent('config.html');
 requestContent('scripts.html');
  requestContent('styles.html');
// requestContent('user-data.html');
 
 
})(window);
