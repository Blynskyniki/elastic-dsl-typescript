import { AbstractBulder } from '../../Abstract/AbstractBuilder';
import { Bool } from '../../Builders/Bool';
import { IFunctionScoreSchema } from './types';

export class FunctionScore<BASE_SCHEMA extends IFunctionScoreSchema = IFunctionScoreSchema> extends AbstractBulder {
  private _query: any = {};

  public add<K extends keyof BASE_SCHEMA>(filter: K, data: BASE_SCHEMA[K]): FunctionScore {
    if (data instanceof Bool) {
      this._query[filter] = data.build();
    } else {
      this._query[filter] = data;
    }

    return this;
  }

  build(): object {
    return {
      function_score: this._query,
    };
  }

  isNotEmty(): boolean {
    return !!Object.keys(this._query).length;
  }
}
