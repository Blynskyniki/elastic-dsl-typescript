import { AbstractBulder } from '../..';
import { TextSchema } from './types';

export class TEXT<BASE_SCHEMA extends TextSchema> extends AbstractBulder {
    private _query: object = {};

    /**
     * Проверка на наличие добавленых критериев
     * @return {boolean}
     */
    public isNotEmty(): boolean {
        return Object.keys(this._query).filter(field => field.length).length > 0;
    }

    /**
     * Add conditions for Bool
     * @param filter
     * @param data
     * @returns {this<BASE_SCHEMA>}
     */
    public add<K extends keyof BASE_SCHEMA>(filter: K, data: BASE_SCHEMA[K]): Omit<this, 'add'> {
        if (data.field) {
            this._query = {
                [filter]: {
                    [data.field]: { ...(data.params as object), ...(data.opts as object) }
                }
            };
        } else {
            this._query = {
                [filter]: { ...(data.params as object), ...(data.opts as object) }
            };
        }

        return this;
    }

    /**
     * Generate Json
     * @returns {object}
     */
    public build() {
        return this._query;
    }
}
