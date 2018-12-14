const AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.update({ region: 'eu-west-1' });
const database = require('../services/database');
const done = (err, res) => {
    const result = {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        }
    };

    return result;
};

module.exports.handler = async event => {
    const body = JSON.parse(event.body);
    const Item = {
        filename: body.filename,
        uuid: uuid.v4()
    }

    await database.put({ "TableName": process.env.DYNAMODB_TABLE, Item }).promise();
    return done(null, Item);
}