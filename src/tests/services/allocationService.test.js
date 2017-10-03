import { fakeServer } from 'sinon';
import allocationService from '../../services/assetAllocationService';
import allocations from '../../mockData/allocations.json';

describe('allocation service', () => {
    let server;

    beforeEach(() => {
        server = fakeServer.create();
        server.respondWith(
            'GET',
            'http://localhost:3000/allocations',
            [
                200,
                { 'Content-type': 'application/json' },
                JSON.stringify(allocations)
            ]
        )
    });

    it ('getAllocations gets a list of allocations', () => {
        beforeEach( done => {
            server.respond();
            setTimeout(done);
        });

        allocationService().getAllocations().then( data => {
            expect(data).toEqual(allocations);
        });
    });
});