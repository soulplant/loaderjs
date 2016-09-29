/// <reference path="../typings/index.d.ts" />

import {Importer} from './Importer';
import {XhrFetcher} from './Fetcher';

var a = new Importer(new XhrFetcher());

a.import('src/Main.js')
    .then((str) => console.log(str))
    .catch((reason) => console.log("failed: " + reason));