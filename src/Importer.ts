/// <reference path="../typings/index.d.ts" />

import {Fetcher} from './Fetcher';
import {Module} from './Module';

export class Importer {
    private fetcher: Fetcher;
    private modules: {[name: string]: Module} = {};

    constructor(fetcher: Fetcher) {
        this.fetcher = fetcher;
    }

    // Imports the named module by extracting its dependencies and importing them.
    import(moduleName: string): Promise<any> {
        return this.recursivelyLoadDeps(moduleName).then(() => {
            return this.require(moduleName);
        });
    }

    // Recursively load the dependencies of the module with the given name.
    // After this call every module that is a direct or indirect dependency
    // of moduleName should be present in the modules map.
    private recursivelyLoadDeps(moduleName: string): Promise<void> {
        var url = this.lookupModuleUrl(moduleName);
        return this.fetcher.fetch(url).then((source) => {
            var module = new Module(source);
            this.modules[moduleName] = module;
            var deps = module.getDeps();
            var loadingDeps: Promise<void>[] = [];
            for (var i = 0; i < deps.length; i++) {
                loadingDeps.push(this.recursivelyLoadDeps(deps[i]));
            }
            return Promise.all(loadingDeps).then((sources) => {
                return null;
            });
        });
    }

    private require(moduleName: string): any {
        return this.modules[moduleName].eval(this.require.bind(this));
    }

    // Converts module names to URLs.
    // TODO: Add configurability.
    private lookupModuleUrl(module: string): string {
        return module;
    }
}