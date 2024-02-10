// standings.test.js
const supertest = require('supertest');
let chai;

before(async () => {
    chai = await import('chai');
});

const app = require('../server');
const request = supertest(app);

let expect;

before(async () => {
    const chai = await import('chai');
    expect = chai.expect;
});

describe('Football League Standings Backend Server', () => {
    let createdStandingId;

    it('should delete any standing by competition code exited in the database', (done) => {
        request.delete(`/standings/PL`)
            .end((err, res) => {
                done();
            });
    });

    it('should create a new standing', (done) => {
        request.post('/standings/PL')
            .send({ /* Your standing data here */ })
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('data');
                createdStandingId = res.body.data._id; // Assuming your response includes the ID
                done();
            });
    });

    it('should retrieve a standing by competition code', (done) => {
        request.get('/standings/PL')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('object');
                done();
            });
    });

    it('should update a standing', (done) => {
        request.put('/standings/PL')
            .send({ /* Your standing data here */ })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('data');
                createdStandingId = res.body.data._id; // Assuming your response includes the ID
                done();
            });
    });

    it('should delete a standing by competition code', (done) => {
        request.delete(`/standings/PL`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message', 'Standing successfully deleted');
                done();
            });
    });

});

describe('Conflict when creating a new standing with an existing code', () => {
    const competitionCode = 'PL'; // Use a valid competition code for the first call

    it('should create a new standing successfully on the first attempt', async () => {
        const response = await request.post(`/standings/${competitionCode}`).send({ /* Your standing data here */ });
        expect(response.status).to.equal(201); // Expecting the first attempt to succeed
    });

    it('should return a 409 Conflict on the second attempt with the same code', async () => {
        const response = await request.post(`/standings/${competitionCode}`).send({ /* Your standing data here */ });
        expect(response.status).to.equal(409); // Expecting a conflict on the second attempt
    });
});

describe('Not Found Error when fetching data with an incorrect or not existed in database code', () => {
    const invalidCompetitionCode = 'OO'; // An intentionally incorrect code

    it('should return a 404 Not Found Error for an invalid competition code', async () => {
        const response = await request.post(`/standings/${invalidCompetitionCode}`).send({ /* Your standing data here, if needed */ });
        expect(response.status).to.equal(404); // Expecting a Not Found error
    });

    it('should return a 404 Not Found Error for an not existed competition code', async () => {
        const response = await request.get(`/standings/${invalidCompetitionCode}`).send({ /* Your standing data here, if needed */ });
        expect(response.status).to.equal(404); // Expecting a Not Found error
    });

    it('should return a 404 Not Found Error for an not existed competition code', async () => {
        const response = await request.put(`/standings/${invalidCompetitionCode}`).send({ /* Your standing data here, if needed */ });
        expect(response.status).to.equal(404); // Expecting a Not Found error
    });

    it('should return a 404 Not Found Error for an not existed competition code', async () => {
        const response = await request.delete(`/standings/${invalidCompetitionCode}`).send({ /* Your standing data here, if needed */ });
        expect(response.status).to.equal(404); // Expecting a Not Found error
    });
});