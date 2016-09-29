/// <reference path="../typings/index.d.ts" />

import {Fetcher} from './Fetcher';

export class Importer {
    private fetcher: Fetcher;

    constructor(fetcher: Fetcher) {
        this.fetcher = fetcher;
    }

    // Imports the named module by extracting its dependencies and importing them.
    // TODO: Have the eval the module, rather than just returning its source.
    import(module: string): Promise<string> {
        var url = this.lookupModuleUrl(module);
        return this.fetcher.fetch(module).then((source) => {
            var deps = Importer.getDeps(source);
            var loadingDeps: Promise<string>[] = [];
            for (var i = 0; i < deps.length; i++) {
                loadingDeps.push(this.import(deps[i]));
            }
            return Promise.all(loadingDeps).then((sources) => {
                return source;
            });
        });
    }

    // Converts module names to URLs.
    // TODO: Add configurability.
    private lookupModuleUrl(module: string): string {
        return module;
    }

    // Visible for testing.
    static getDeps(script: string): string[] {
        var re = /.*require\(['"]([^'"]*)['"]\)/g;
        var m: RegExpExecArray;
        var result: string[] = [];
        while (m = re.exec(script)) {
            result.push(m[1]);
        }
        return result;
    }
}