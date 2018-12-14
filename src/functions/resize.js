const Sharp = require('sharp');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-1' });
const s3 = new AWS.S3();

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
  const originalKey = event.Records[0].s3.object.key;

  if (originalKey.includes('resized')) {
    return done({ "message": "image is resized" });
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

  return done();
}