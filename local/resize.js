/* eslint-disable max-len */

const asset = require('../lib/asset');
const event = require('./s3-event.json');

process.env.S3_BUCKET = 'jeremie-asset-service-xoxo';

const context = {};

try {
  asset.resizeHandler(event, context, (err, data) => {
    console.log(data);
  });
} catch (err) {
  console.log(err);
}