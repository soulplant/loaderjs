/// <reference path="../typings/index.d.ts" />

import {Importer} from './Importer';
import {FakeFetcher} from './Fetcher';

describe("javascript", () => {
    it("is consistent", () => {
        expect(true).toBe(true);
    });
});

describe("Importer", () => {
    it("can extract deps", () => {
        var deps = Importer.getDeps(`
        var a = require('this');
        var b = require("is");
        `);
        expect(deps).toEqual(['this', 'is']);
    });
});
