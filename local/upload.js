/* eslint-disable max-len */
const fs = require('fs');
const asset = require('../lib/asset');

function base64Encode(file) {
  return Buffer.from(fs.readFileSync(file)).toString('base64');
}

const filename = '/Users/jthomassey/Desktop/Screenshot 2018-11-29 at 14.38.14.png';

const event = {
  "body": {
    "body": base64Encode(filename),
    "filename": `${Math.random().toString(36).substring(7)}-image.png`
  }
};

event.body = JSON.stringify(event.body);

process.env.S3_BUCKET = 'jeremie-test';

const context = {};

asset.uploadHandler(event, context, (err, data) => {
  console.log(data.body);
  console.log(data);
});
