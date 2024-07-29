chrome.runtime.onInstalled.addListener(() => {
    console.log('VPN Extension Installed');
});

let v2rayConfig = {};

chrome.storage.sync.get(['v2rayConfig'], function (result) {
    if (result.v2rayConfig) {
        v2rayConfig = result.v2rayConfig;
    }
});

function connectToV2ray() {
    if (!v2rayConfig.server || !v2rayConfig.port) {
        console.error('V2ray configuration is missing');
        return;
    }
    // Example of a fetch call to start a connection to the V2ray server
    fetch(`http://${v2rayConfig.server}:${v2rayConfig.port}/connect`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            protocol: v2rayConfig.protocol,
            uuid: v2rayConfig.uuid,
            encryption: v2rayConfig.encryption,
            security: v2rayConfig.security,
            sni: v2rayConfig.sni,
            fp: v2rayConfig.fp,
            type: v2rayConfig.type,
            host: v2rayConfig.host,
            path: v2rayConfig.path
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Connected to V2ray server', data);
            // Additional logic to handle connection state
        })
        .catch(error => {
            console.error('Error connecting to V2ray server:', error);
        });
}

function disconnectFromV2ray() {
    // Example of a fetch call to disconnect from the V2ray server
    fetch(`http://${v2rayConfig.server}:${v2rayConfig.port}/disconnect`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Disconnected from V2ray server', data);
            // Additional logic to handle disconnection state
        })
        .catch(error => {
            console.error('Error disconnecting from V2ray server:', error);
        });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'connect') {
        connectToV2ray();
    } else if (request.action === 'disconnect') {
        disconnectFromV2ray();
    }
    sendResponse({ status: 'done' });
});
