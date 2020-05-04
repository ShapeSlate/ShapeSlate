var stompClient = null;
window.onload = connect;

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        // Send data to the server.
        stompClient.subscribe('/topic/chatlog', function (outputMessage) {
            displayReceivedMessage(JSON.parse(outputMessage.body).receivedTextMessage);
        });
    });
}

// Gets content from the inputMessage tag and sends it to server.
function sendUserMessage() {
    stompClient.send("/app/hello", {}, JSON.stringify({'userTypedTextMessage': $("[name=textareamessage]").val()}));
}

function displayReceivedMessage(message) {
    $("#chatlog").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $( "#send" ).click(function() { sendUserMessage(); });
});