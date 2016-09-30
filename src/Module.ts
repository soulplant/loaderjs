export class Module {
    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    public getDeps(): string[] {
        var re = /.*require\(['"]([^'"]*)['"]\)/g;
        var m: RegExpExecArray;
        var result: string[] = [];
        while (m = re.exec(this.text)) {
            result.push(m[1]);
        }
        return result;
    }

    public eval(require: (string) => any): any {
        // TODO: Memoize for speed and correctness.
        var f = new Function('exports', 'require', this.text + '\n  return exports;');
        return f({}, require);
    }
}
