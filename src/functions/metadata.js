const AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.update({ region: 'eu-west-1' });

const dynamodb = new AWS.DynamoDB();
const done = (err, res) => {
    console.log(res);
    const result = {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        }
    };

    console.log(result);

    return result;
};

module.exports.handler = async event => {
    const client = new AWS.DynamoDB.DocumentClient({ service: dynamodb });

    const body = JSON.parse(event.body);
    const Item = {
        filename: body.filename,
        uuid: uuid.v4()
    }

    await client.put({ "TableName": process.env.DYNAMODB_TABLE, Item }).promise();
    return done(null, Item);
}