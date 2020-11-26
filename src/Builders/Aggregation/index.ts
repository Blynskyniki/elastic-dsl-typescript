import { AbstractBulder } from '../../Abstract/AbstractBuilder';
import { AggregationSchema } from './types';

export class Aggregation<SCHEMA extends AggregationSchema> extends AbstractBulder {
  private _data = {};

  public add<Type extends keyof SCHEMA>(aggType: Type, name: string, d: SCHEMA[Type]) {
    const { filter, ...all } = d.params as { filter?: any };
    if (filter) {
      this._data[name] = {
        filter,
        aggs: {
          [`${name}_filtered`]: {
            [aggType]: { ...(all as object), ...((d.opts as object) || {}) }
          }
        }
      };
      return this;
    }

    this._data[name] = {
      [aggType]: { ...(d.params as object), ...((d.opts as object) || {}) }
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
