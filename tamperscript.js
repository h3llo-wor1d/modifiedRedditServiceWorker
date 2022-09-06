// ==UserScript==
// @name        RedditNotifOverride
// @namespace   Test
// @description Overrides the default notification service worker with a custom one that sends post requests to localhost
// @include     http://the.website.com/*
// @version     1
// @grant       GM_xmlhttpRequest
// @run-at      document-start
// ==/UserScript==
function addScript(text) {
    // Actual custom script
    var newScript = document.createElement('script');
    newScript.type = "text/javascript";
    newScript.textContent = ```
    
    ```;
    var head = document.getElementsByTagName('body')[0];
    head.appendChild(newScript);
    text = text.replace("return navigator.serviceWorker.register(\"/sw.1ab8087c79dd3679b0bd38e1c9ebc5de.js\", e)", "return navigator.serviceWorker.register(\"https://raw.githubusercontent.com/willow-rubenstein/modifiedRedditServiceWorker/main/sw.custom.js\", e)");
    // Modified original script
    var newScript = document.createElement('script');
    newScript.type = "text/javascript";
    newScript.textContent = text;
    var head = document.getElementsByTagName('body')[0];
    head.appendChild(newScript);
}

window.addEventListener('beforescriptexecute', function(e) {
    src = e.target.src;
    if (src.search(/Chat~Governance~Reddit.79cabb4de63ea132081d\.js/) != -1) {
        e.preventDefault();
        e.stopPropagation();        
        GM_xmlhttpRequest({
            method: "GET",
            url: e.target.src,
            onload: function(response) {
                addScript(response.responseText);
            }
        });
    }
});

