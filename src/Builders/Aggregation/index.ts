import { AbstractBulder } from '../../Abstract/AbstractBuilder';
import { AggregationSchema } from './types';

export class Aggregation<SCHEMA extends AggregationSchema> extends AbstractBulder {
  private _data = {};

  public add<Type extends keyof SCHEMA>(aggType: Type, name: string, d: SCHEMA[Type]) {
    this._data[name] = {
      [aggType]: { ...(d.params as object), ...((d.opts as object) || {}) },
    };
  }

  public addCustom(name: string, cutsomAgg: object) {
    this._data[name] = cutsomAgg;
  }

  public build(): object {
    return {};
  }

  public isNotEmty(): boolean {
    return false;
  }
}

// const qq = new Aggregation();
// qq.add('terms', 'myAgg', {
//   field: 'aaa',
// });
