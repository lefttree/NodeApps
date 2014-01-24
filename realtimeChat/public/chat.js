window.onload = function() {

	var messages = [];
	var socket = io.connect('http://localhost:3700');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");

	socket.on('message', function (data) {
		if(data.message) {
			messages.push(data);
			var html = '';
			console.log(messages);
			for(var i=0; i<messages.length; i++) {
				html += '<b>' + messages[i].username + ":</b>";
				html += ' ' + messages[i].message + '<br />';
			}
			content.innerHTML = html;
		} else {
			console.log("There is a problem:", data);
		}
	});

	sendButton.onclick = function() {
		if(name.value == ""){
			alert("please enter your name!");
		}else{
			var text = field.value;
			socket.emit('send', { message: text, username: name.value });
		}
	};

}
