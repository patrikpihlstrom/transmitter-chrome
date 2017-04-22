function save() {
	chrome.storage.sync.set({
		user: document.getElementById('user').value,
		host: document.getElementById('host').value,
		password: document.getElementById('password').value,
		port: document.getElementById('port').value
	}, function() {
		var status = document.getElementById('savestatus');
		status.textContent = 'saved';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

function restore() {
	chrome.storage.sync.get({
		user: 'transmission-user',
		host: 'host',
		password: 'password',
		port: 9091
	}, function(items) {
		document.getElementById('user').value = items.user;
		document.getElementById('host').value = items.host;
		document.getElementById('password').value = items.password;
		document.getElementById('port').value = items.port;
	});
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);

