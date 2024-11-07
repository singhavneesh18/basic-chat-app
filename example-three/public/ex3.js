$('#chatArea').hide()
$('.consArea').hide()
$('#connectionDetails').hide()
var socket= io();

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

    socket.emit('createConnection', {userName: userName, channelName: channelName})
}

function sendMessage() {
    var msg = document.getElementById('message').value;
    const userName = document.getElementById('userName').value;
    const channelName = document.getElementById('channelName').value;
    console.log(`Message : ${msg}, User: ${userName}, Channel: ${channelName}`)
    socket.emit('chat-message', { message: msg, userName: userName, channelName: channelName })
    document.getElementById('message').value = '';
    addMessageToElement('messagesSent', msg)
}

function addMessageToElement(elementId, msg) {
    const msgList = document.getElementById(elementId)
    const item = document.createElement('li')
    item.textContent = msg
    msgList.appendChild(item)
}


socket.on('chat-message', (msg) => {
    console.log(`Msg recvd: ${msg}`)
    addMessageToElement('messagesRecieved', msg)
})