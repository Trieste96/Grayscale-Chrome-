var state = 0;
//0 means all tabs are in original color.
//1 means all tabs turn to black-white color

function changeToGray(tabId){
    //Sends the current state to the tab having the provided tabID.
    chrome.tabs.sendMessage(
      tabId,                   
      {state: state}
    );
}

function click(e) {
    if(state == 0) state = 1;
    else state = 0;
    console.log("---State " + state);
    var tabs = chrome.tabs.query({currentWindow: true}, function (tabs){
        //Iterates over each tab
        for (let tab of tabs) {
            changeToGray(tab.id);
        }
    });  
}
function handleUpdated(tabId, changeInfo, tabInfo) {
    console.log("Updated tab " + tabId);
    changeToGray(tabId);
}
function handleActivated(activeInfo) {
  console.log("Activated tab " + activeInfo.tabId);
  changeToGray(activeInfo.tabId);
}  
function handleAttached(tabId, attachInfo) {
  console.log("Attached tab " + tabId);
  changeToGray(tabId);
}   

function handleCreated(tab) {
  console.log("Created tab " + tab.id);
  changeToGray(tab.id);
}  
chrome.tabs.onUpdated.addListener(handleUpdated);
chrome.tabs.onAttached.addListener(handleAttached);
chrome.browserAction.onClicked.addListener(click);
chrome.tabs.onCreated.addListener(handleCreated);  
chrome.tabs.onActivated.addListener(handleActivated);
