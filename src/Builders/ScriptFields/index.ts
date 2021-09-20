import { AbstractBulder } from '../../Abstract/AbstractBuilder';

export class ScriptFields extends AbstractBulder {
    private _scripts = {
        script_fields: {},
    };

    public isNotEmty(): boolean {
        return Object.keys(this._scripts.script_fields).length > 0;
    }

    public addScript(fieldName: string, source: string, params: object = {}) {
        this._scripts.script_fields[fieldName] = {
            script: {
                source,
                params,
            },
        };
        return this;
    }

    public build() {
        return this._scripts;
    }
}
