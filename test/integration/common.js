// TODO: license

const chai = require('chai');
const chaiHTTP = require('chai-http');

const { app: server, emitter } = require('../../app');

let serverStarted = false;
let token;

const { expect } = chai;
chai.use(chaiHTTP);

const waitForServerStart = () => {
    return new Promise((resolve) => {
        if (serverStarted) {
            resolve();
            return;
        }
        emitter.on(
            "appStarted",
            () => {
                serverStarted = true;
                resolve();
            }
        )
    });
}


const login = () => {
    return new Promise((resolve) => {
        chai.request(server)
            .post('/users/login')
            .send({
                username: 'admin',
                password: 'admin',
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);

                token = res.body.token;
                resolve();
            });
    });
}

const getToken = () => {
    return token;
}

module.exports = {
    waitForServerStart,
    login,
    getToken,
};
