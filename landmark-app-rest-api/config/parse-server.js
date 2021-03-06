const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
    console.log('DATABASE_URI not specified, falling back to localhost.');
}

module.exports = {
    databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
    appId: process.env.APP_ID || 'myAppId',
    masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
    serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
    publicServerURL: process.env.PUBLIC_SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
    sessionLength: process.env.SESSION_LENGTH || 1800, // Session Token's Exparation time (in seconds -> 1800 = 30 minutes)
    liveQuery: {
        classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
    },
};
