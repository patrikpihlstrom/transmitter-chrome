function transmit(info, tab) {
	var magnet = info.linkUrl;
	chrome.storage.sync.get({
		user: '',
		host: '',
		password: '',
		port: 9091
	}, function(items) {
		$.ajax({
			method: "POST",
			headers: {'X-Transmission-Session-Id': window.session_id },
			url: 'http://' + items.user + ':' + items.password + '@' + items.host + ':' + items.port + '/transmission/rpc',
			data: JSON.stringify({arguments:{filename: magnet}, method: "torrent-add", tag: 8}),
			success: function (xhr, status, error) {
				console.log(status, xhr.arguments);
			},
			dataType: 'json',
			tryCount: 0,
			retryLimit: 3,
			statusCode: {
				409: function (xhr, status, error) {
					this.tryCount++;

					if (this.tryCount <= this.retryLimit) {
						var begin = xhr.responseText.indexOf('X-Transmission-Session-Id:');
						var end = xhr.responseText.indexOf('</code>');
						this.headers['X-Transmission-Session-Id'] = xhr.responseText.slice(begin, end).split('X-Transmission-Session-Id: ')[1];
						window.session_id = this.headers['X-Transmission-Session-Id'];
						$.ajax(this);
						return;
					}

					return;
				}
			}
		});
	});
}

if (typeof chrome.contextMenus != 'undefined') {
	chrome.contextMenus.create({
		title: "transmit", 
		contexts:["link"], 
		onclick: transmit,
	});
}

