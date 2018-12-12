const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-1' });
const s3 = new AWS.S3();

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
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `key/${body.filename}`,
        Body: Buffer.from(body.body, 'base64'),
        ContentType: 'image/png'
    };

    const s3Response = await s3.upload(params).promise();

    return done(null, s3Response, callback);
}