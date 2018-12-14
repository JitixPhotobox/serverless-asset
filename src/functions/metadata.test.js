
const uuid = require('uuid');
const database = require('../services/database');

const metadataEvent = require('../../fixtures/event/metadata');

// Test subject.
const { handler } = require('./metadata');

jest.mock('../services/database');
jest.mock('uuid');

describe('metadata', () => {
    let event;

    /** */
    beforeEach(() => {
        event = Object.assign({}, metadataEvent);
        process.env.DYNAMODB_TABLE = 'TableName';
    });
    it('get a new uuid when inserting data', async () => {
        database.put.mockImplementation(jest.fn(() => ({ promise: () => Promise.resolve({ "ree": "FDsfds" }) })));
        uuid.v4.mockImplementation(() => ('my-uuid-v4-string'));

        const result = await handler(event, null);

        expect(database.put).toHaveBeenCalledTimes(1);
        expect(uuid.v4).toHaveBeenCalledTimes(1);
        expect(JSON.parse(result.body).uuid = 'my-uuid-v4-string');
    });

    it('get an error when invalid JSON', async () => {
        await expect(handler({ "body": "invalid json" }))
            .rejects
            .toThrow(SyntaxError);
    });
});