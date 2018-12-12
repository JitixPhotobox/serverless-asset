const AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.update({ region: 'eu-west-1' });

const dynamodb = new AWS.DynamoDB();
const client = new AWS.DynamoDB.DocumentClient({ service: dynamodb });

const done = (err, res, callback) => {
    const result = {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        }
    };

    callback(null, result);
};

module.exports.handler = async (event, context, callback) => {
    const body = JSON.parse(event.body);
    const Item = {
        filename: body.filename,
        uuid: uuid.v4()
    }

    await client.put({ "TableName": process.env.DYNAMODB_TABLE, Item }).promise();

    done(null, Item, callback);
}