// File: utils/db.js

const { MongoClient } = require('mongodb');

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        const uri = `mongodb://${host}:${port}`;

        this.client = new MongoClient(uri, { useUnifiedTopology: true });
        this.dbName = database;
        this.client.connect().then(() => {
            console.log('Successfully connected to MongoDB');
        }).catch((err) => {
            console.error('Failed to connect to MongoDB:', err);
        });
    }
    isAlive() {
        return this.client.isConnected();
    }
    async nbUsers() {
        const db = this.client.db(this.dbName);
        const usersCollection = db.collection('users');
        return usersCollection.countDocuments();
    }
    async nbFiles() {
        const db = this.client.db(this.dbName);
        const filesCollection = db.collection('files');
        return filesCollection.countDocuments();
    }
}

const dbClient = new DBClient();
module.exports = dbClient;
