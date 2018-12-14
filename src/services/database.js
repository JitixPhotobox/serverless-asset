const AWS = require('aws-sdk');

module.exports = new AWS.DynamoDB.DocumentClient({ service: new AWS.DynamoDB() });