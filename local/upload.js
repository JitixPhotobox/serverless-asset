
const upload = require('../src/functions/upload');

const event = {
    "pathParameters": {
        "designId": "abdel"
    },
    "httpMethod": "GET",
    "headers": {
        "Accept": "application/vnd.photobox.design.v1+json"
    },
    "body": JSON.stringify({
        "filename": "fdsfdsfds",
        "body": "dffdsfsd"
    })
};

const context = {};
process.env.S3_BUCKET = 'jeremie-asset-service-xoxo';

upload.handler(event, context, (err, data) => {
    console.log('fdfdsfsd');
    if (err) {
        console.error(err);
    }

    console.log(data);
});
