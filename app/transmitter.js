function transmit(info, tab) {
	var magnet = 'magnet:?xt=urn:btih:02ca77a6a047fd37f04337437d18f82e61861084&dn=archlinux-2017.04.01-x86_64.iso&tr=udp://tracker.archlinux.org:6969&tr=http://tracker.archlinux.org:6969/announce';//info.linkUrl;

	chrome.storage.sync.get({
		user: '',
		host: '',
		password: '',
		port: null
	}, function(items) {
		var transmission = require('transmission');
		console.log(transmission);

		transmission.addFile(magnet, function(error, arg){});
	});
}

chrome.contextMenus.create({
	title: "transmit", 
	contexts:["link"], 
	onclick: transmit,
});

