chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var body=document.body;
    body.style['filter']='progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)';
    var state = message.state;
    if(state == 1)
    {
        if (!body.style['-webkit-filter']){
            body.style['-webkit-filter']='grayscale(100)';
            body.style['filter']='grayscale(100)';
        }
        sendResponse({info:"Changed to black"});
        return true;
    }
    else{
        if (body.style['-webkit-filter'])
        {
            body.style['-webkit-filter']=null;
            body.style['filter']=null;
        }
        sendResponse({info: "Changed to white"});
        return true;
    }

});

