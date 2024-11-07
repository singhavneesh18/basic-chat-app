$('#chatArea').hide()
$('.consArea').hide()
$('#connectionDetails').hide()
var socket = io();

function createConnection() {
    console.log(`${$('#channelName').val()} &&  ${$('#userName').val()}`);
    $('#chatArea').show();
    $('.consArea').show();
    $('#displayChannelName').text($('#channelName').val())
    $('#displayUserName').text($('#userName').val())
    $('#connectionDetails').show()
    $('#connectionArea').hide();

    // var msg = document.getElementById('message').value;
    const userName = document.getElementById('userName').value;
    const channelName = document.getElementById('channelName').value;
    socket.emit('createConnection', { userName: userName, channelName: channelName })
    addMessageToElement('admin', { message: `Welcome ${userName} to our group ${channelName}`, userName: userName, channelName: channelName })
}

function sendMessage() {
    var msg = document.getElementById('message').value;
    const userName = document.getElementById('userName').value;
    const channelName = document.getElementById('channelName').value;
    console.log(`Message : ${msg}, User: ${userName}, Channel: ${channelName}`)
    const data = { message: msg, userName: userName, channelName: channelName };
    socket.emit('chat-message', data)
    document.getElementById('message').value = '';
    addMessageToElement('messagesSent', data)
}


function addMessageToElement(elementId, data) {
    var htmlToInsert = '';
    switch (elementId) {
        case 'messagesSent':
            htmlToInsert = `
            <p style="text-align: right;"> 
                        <span class="bg-success text-white chatMessage">
                            ${data.message}
                        </span>
                        <span><sub>${data.userName}</sub></span>
                    </p>
            `
            break;
        case 'messagesRecieved':
            htmlToInsert = `
            <p> 
                        <span class="bg-info text-white chatMessage">
                        ${data.message}
                        </span>
                        <sub>${data.userName}</sub>
                    </p>
            `
            break;
        default:
                htmlToInsert = `
                <p> 
                            <span class="bg-danger text-white chatMessage">
                            ${data.message}
                            </span>
                            <sub>System</sub>
                        </p>
                `
                break;    
    }

    $('#consArea').append(htmlToInsert);
}

function callMethodOnEnter(e, methodCall){
    var key= e.which
    if(key == 13)  // the enter key code
    {
        methodCall()
    }
}



socket.on('chat-message', (data) => {
    console.log(`Msg recvd: ${data}`)
    addMessageToElement('messagesRecieved', data)
})



$('#message').keypress((e)=>{
    callMethodOnEnter(e, sendMessage)
});
$('#userName').keypress((e)=>{
    callMethodOnEnter(e, createConnection)
    $('#message').focus()
});