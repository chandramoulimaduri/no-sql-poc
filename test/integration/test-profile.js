const chai = require('chai');
const chaiHTTP = require('chai-http');
const common = require('./common');

const { app: server } = require('../../app');

const { expect } = chai;
chai.use(chaiHTTP);

describe('Profile Controller', function profileTests() {
    this.timeout(10000);
    let token;
    let testProfile = {
        "Group1": {
          "John": "Blue",
          "Peter": "Green"
        },
        "Group2": {
          "Jane": "Red",
          "May": "Green"
        },
        "Group3": {
          "Howard": "Blue",
          "Nguyen": "Red",
          "Lim": "Green"
        }
    };
    //before(common.waitForServerStart);
    before(common.login);
    before((done) => {
        token = common.getToken();
        done();
    });

    describe('POST /profiles', () => {
        it('happy create profile', (done) => {
            chai.request(server)
                .post(`/profiles`)
                .set('x-access-token', `${token}`)
                .send(testProfile)
                .end((err, res) => {
                    expect(err).to.be.null;
                    if (res.status === 409) {
                        done();
                        return;
                    }
                    expect(res).to.have.status(201);
                    done();
                });
        });

        it('unhappy create profile - missing body', (done) => {
            chai.request(server)
                .post(`/profiles`)
                .set('x-access-token', `${token}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.equal(
                        'Request body required'
                    );
                    done();
                });
        });

        it('unhappy create profile - missing objects inside body', (done) => {
            chai.request(server)
                .post(`/profiles`)
                .set('x-access-token', `${token}`)
                .send({})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.equal(
                        'Request body required'
                    );
                    done();
                });
        });

        it('unhappy create profile - Inside attribute must be an object', (done) => {
            chai.request(server)
                .post(`/profiles`)
                .set('x-access-token', `${token}`)
                .send({"test": "test"})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.equal(
                        'Inside attribute must be an object'
                    );
                    done();
                });
        });
       
    });

    describe('GET /profiles', function test() {
        it('happy get all profiles', (done) => {
            chai.request(server)
                .get(`/profiles`)
                .set('x-access-token', `${token}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(Object.keys(res.body).length).to.not.equal(0);
                    done();
                });
        });
        it('happy get all profiles organize by color ', (done) => {
            chai.request(server)
                .get(`/profiles`)
                .set('x-access-token', `${token}`)
                .query({ organize: 'color', value: 'group' })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(Object.keys(res.body).length).to.not.equal(0);
                    done();
                });
        });
    });

    describe('GET /profiles/color/Red', function test() {
        it('happy get all profiles by color', (done) => {
            chai.request(server)
                .get(`/profiles/color/Red`)
                .set('x-access-token', `${token}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(Object.keys(res.body).length).to.not.equal(0);
                    done();
                });
        });
        it('happy get all profiles by non existing color', (done) => {
            chai.request(server)
                .get(`/profiles/color/dummy`)
                .set('x-access-token', `${token}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(Object.keys(res.body).length).to.equal(0);
                    done();
                });
        });
    });

    describe('GET /profiles/group/Group1', function test() {
        it('happy get all profiles by color', (done) => {
            chai.request(server)
                .get(`/profiles/group/Group1`)
                .set('x-access-token', `${token}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(Object.keys(res.body).length).to.not.equal(0);
                    done();
                });
        });
        it('happy get all profiles by non existing group', (done) => {
            chai.request(server)
                .get(`/profiles/group/dummy`)
                .set('x-access-token', `${token}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(Object.keys(res.body).length).to.equal(0);
                    done();
                });
        });
    });

});
