/// <reference path="../typings/index.d.ts" />

import {Module} from './Module';

describe("Module", () => {
    it("parses dependencies", () => {
        var module = new Module(`
        var a = require('this');
        var b = require("is");
        `);
        expect(module.getDeps()).toEqual(['this', 'is']);
    });

    it("can be evaluated", () => {
        var module = new Module(`exports.something = 5;`);
        expect(module.eval(null).something).toBe(5);
    });

    it("allows require in module source code", () => {
        var require = () => {return {'b': 5}};
        var module = new Module(`exports.a = require('b').b;`);
        expect(module.eval(require).a).toBe(5);
    });
});
