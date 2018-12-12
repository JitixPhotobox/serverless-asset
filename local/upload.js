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
process.env.BUCKET_NAME = 'ecom-design-interim-bucket-development';

upload.handler(event, context, (err, data) => {
    if (err) {
        console.error(err);
    }

    console.log(data);
});
