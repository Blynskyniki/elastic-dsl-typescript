import { AbstractBulder } from '../Abstract/AbstractBuilder';
import { Bool } from '../Builders/Bool';
import { BoolSchema } from '../Builders/Bool/types';
import { RawQuery } from './types';

/**
 * @Class Query
 * @Classdesc Generator queries for Elastic search
 */
export class Query<BOOL_SCHEMA extends BoolSchema> extends AbstractBulder {
  private _props: Omit<RawQuery, 'query'> = {};
  private _query: RawQuery['query'] = {};

  /**
   * Add basic props to Query (size,from,_source,etc...)
   * @param prop
   * @param data
   * @returns {this<BOOL_SCHEMA>}
   */
  public addProps<K extends keyof Omit<RawQuery, 'query'>>(prop: K, data: RawQuery[K]) {
    this._props[prop] = data;
    return this;
  }

  /**
   * Create query (match,bool, etc...)
   * @param type
   * @param val
   * @returns {this<BOOL_SCHEMA>}
   */
  public addQuery<K extends keyof RawQuery['query']>(type: K, val: RawQuery['query'][K]) {
    this._query[type] = val;
    return this;
  }

  /**
   * Auto init bool in query and get object ref
   * @returns {Bool<BoolSchema>}
   */
  get bool(): Bool<BOOL_SCHEMA> {
    if (this.isNotExistInQuery('bool')) {
      this._query.bool = new Bool();
    }
    return this._query.bool!;
  }

  private isNotExistInQuery(prop: keyof RawQuery['query']) {
    return !(prop in this._query);
  }

  /**
   * Generate Json
   * @returns {{}}
   */
  public build(): object {
    const obj = {};
    for (const [prop, val] of Object.entries(this._props)) {
      switch (prop) {
        case 'query': {
          break;
        }
        case 'aggs': {
          obj[prop] = (val as AbstractBulder).build();
          break;
        }
        default: {
          obj[prop] = val;
        }
      }
    }
    let query = {};
    for (const [prop, val] of Object.entries(this._query)) {
      console.log(prop);
      if (val instanceof AbstractBulder) {
        query = { ...query, ...(val as AbstractBulder).build() };
        continue;
      }
      query[prop] = val;
    }
    obj['query'] = query;
    return obj;
  }

  public isNotEmty(): boolean {
    return Object.values({ ...(this._query as object), ...(this._query as object) }).flat().length > 0;
  }
}
