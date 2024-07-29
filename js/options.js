document.getElementById('settingsForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const serverUrl = document.getElementById('serverUrl').value;
    const v2rayConfig = parseV2rayUrl(serverUrl);
    chrome.storage.sync.set({ v2rayConfig: v2rayConfig }, function () {
        alert('Settings saved.');
    });
});

function parseV2rayUrl(url) {
    try {
        const [protocolPart, paramsPart] = url.split('://');
        const protocol = protocolPart;

        const [credentialsPart, queryPart] = paramsPart.split('@');
        const [uuid] = credentialsPart.split('@');

        const [serverPortPart, pathPart] = queryPart.split('/');
        const [server, port] = serverPortPart.split(':');

        const queryParams = new URLSearchParams(pathPart.split('?')[1]);
        const encryption = queryParams.get('encryption');
        const security = queryParams.get('security');
        const sni = queryParams.get('sni');
        const fp = queryParams.get('fp');
        const type = queryParams.get('type');
        const host = queryParams.get('host');
        const path = '/' + pathPart.split('?')[0];

        return {
            protocol,
            uuid,
            server,
            port,
            encryption,
            security,
            sni,
            fp,
            type,
            host,
            path
        };
    } catch (error) {
        console.error('Error parsing V2ray URL:', error);
        return {};
    }
}
