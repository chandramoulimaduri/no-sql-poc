// TODO: license

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const helper = require('../../helpers/profile-helper');

const expect = chai.expect;
const assert = chai.assert;
chai.use(chaiAsPromised);

describe('test validateRequestBodyExists()', () => {
    it('happy validateRequestBodyExists', () => {
        helper.validateRequestBodyExists('body');
    });

    it('unhappy validateRequestBodyExists', () => {
        try {
            helper.validateRequestBodyExists();
            assert.isOk(false, 'Exception was not thrown');
        } catch (err) {
            expect(err.message).to.equal(
                'Request body required'
            );
            expect(err.status).to.equal(400);
        }
    });
});