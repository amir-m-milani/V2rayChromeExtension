document.getElementById('connectBtn').addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'connect' }, function (response) {
        console.log('Response:', response);
    });
});

document.getElementById('disconnectBtn').addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'disconnect' }, function (response) {
        console.log('Response:', response);
    });
});

document.getElementById('settingsBtn').addEventListener('click', function () {
    chrome.runtime.openOptionsPage();
});
