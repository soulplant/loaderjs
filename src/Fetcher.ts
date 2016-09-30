/// <reference path="../typings/index.d.ts" />

export interface Fetcher {
    fetch(url: string): Promise<string>;
}

export class XhrFetcher implements Fetcher {
    public fetch(url: string): Promise<string> {
        return new Promise<string>((resolve, fail) => {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState != XMLHttpRequest.DONE) {
                    return;
                }
                if (xhr.status != 200) {
                    fail("Status not OK:" + xhr.status);
                    return;
                }
                resolve(xhr.responseText);
            }
            xhr.onabort = fail;
            xhr.onerror = fail;
            xhr.open('GET', url);
            xhr.send();
        });
    }
}

export class FakeFetcher implements Fetcher {
    private data: {[url: string]: string} = {};

    public fetch(url: string): Promise<string> {
        return new Promise((resolve, fail) => {
            resolve(this.data[url]);
        });
    }
    
    public setData(url: string, content: string) {
        this.data[url] = content;
    }
}