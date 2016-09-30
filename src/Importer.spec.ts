/// <reference path="../typings/index.d.ts" />

import {Importer} from './Importer';
import {FakeFetcher} from './Fetcher';

describe("javascript", () => {
    it("is consistent", () => {
        expect(true).toBe(true);
    });
});

describe("Importer", () => {
    var fetcher = new FakeFetcher();
    fetcher.setData('a', `exports.a = require('b').b;`);
    fetcher.setData('b', `exports.b = 5;`);

    var importer = new Importer(fetcher);

    it("can import modules recursively", (done) => {
        importer.import('a').then((obj) => {
            expect(obj.a).toBe(5);
            done();
        });
    });
});