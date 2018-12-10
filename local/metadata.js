/* eslint-disable max-len */
const asset = require('../lib/asset');

const event = {
    body: {
        "filename": `${Math.random().toString(36).substring(7)}-image.png`
    }
};

event.body = JSON.stringify(event.body);

const context = {};

process.env.DYNAMODB_TABLE = 'jeremie-asset-service-xoxo';

asset.metadataHandler(event, context, (err, data) => {
    console.log(data.body);
    console.log(data);
});
