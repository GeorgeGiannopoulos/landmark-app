module.exports = {
    apps: [
        {
            serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
            appId: process.env.APP_ID || 'myAppId',
            masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
            appName: process.env.APP_NAME || 'myAppName',
        },
    ],
    users: [
        {
            user: process.env.APP_USER || 'admin',
            pass: process.env.APP_PASS || 'admin',
        },
    ],
};
