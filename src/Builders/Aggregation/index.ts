import { AbstractBulder } from '../../Abstract/AbstractBuilder';
import { AggregationSchema } from './types';

export class Aggregation<SCHEMA extends AggregationSchema> extends AbstractBulder {
    private _data: any = {};

    public add<Type extends keyof SCHEMA>(aggType: Type, name: string, d: SCHEMA[Type]) {
        const { filter, subAgg, ...all } = d.params as { filter?: any; subAgg?: any };
        let sub = {};
        if (subAgg) {
            sub = {
                aggs: {
                    ...subAgg,
                },
            };
        }
        if (filter) {
            this._data[name] = {
                filter,
                aggs: {
                    [`${name}_filtered`]: {
                        [aggType]: { ...all, ...((d.opts as object) || {}) },
                        ...sub,
                    },
                },
            };
            return this;
        }

        this._data[name] = {
            [aggType]: { ...all, ...((d.opts as object) || {}) },
            ...sub,
        };
        return this;
    }

    public addCustom(name: string, cutsomAgg: object) {
        this._data[name] = cutsomAgg;
    }


    public build(): object {
        return this._data;
    }

    public isNotEmty(): boolean {
        return Object.keys(this._data).length > 0;
    }
}
