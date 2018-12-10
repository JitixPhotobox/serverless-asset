const Sharp = require('sharp');
const AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.update({ region: 'eu-west-1' });
const s3 = new AWS.S3();

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

export const uploadHandler = async (event, context, callback) => {
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


export const metadataHandler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const Item = {
    filename: body.filename,
    uuid: uuid.v4()
  }

  await client.put({ "TableName": process.env.DYNAMODB_TABLE, Item }).promise();

  done(null, Item, callback);
}

export const resizeHandler = async (event, context, callback) => {
  const originalKey = event.Records[0].s3.object.key;

  if (originalKey.includes('resized')) {
    return done({ "message": "image is resized" }, {}, callback);
  }

  const originalPhoto = await s3.getObject({ Bucket: process.env.S3_BUCKET, Key: originalKey }).promise();
  const buffer = await Sharp(originalPhoto.Body)
    .resize(100, 100)
    .toBuffer();

  await s3.putObject({
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: 'image/png',
    Key: `resized/${originalKey}`,
  }).promise();

  return done(null, {}, callback);
}