import { AbstractBulder } from '../Abstract/AbstractBuilder';
import { Bool, BoolSchema, FunctionScore } from '../Builders';
import { RawQuery } from './types';

export * from './types';

/**
 * @Class Query
 * @Classdesc Generator queries for Elastic search
 */
export class Query<BOOL_SCHEMA extends BoolSchema> extends AbstractBulder {
  private _props: Omit<RawQuery, 'query'> = {};
  private _query: RawQuery['query'] = {};
  private _post_filter: Bool = new Bool<BoolSchema>();

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

  get postFilter(): Bool<BOOL_SCHEMA> {
    return this._post_filter;
  }

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
    switch (type) {
      case 'function_score': {
        this._query = { ...this._query, ...(val as FunctionScore).build() };
        break;
      }
      case 'match_all': {
        this._query[type] = {};
        break;
      }
      default: {
        this._query[type] = val;
        break;
      }
    }

    return this;
  }

  public addPostFilter(bool: Bool<BOOL_SCHEMA>) {
    this._post_filter = bool;
    return this;
  }

  /**
   * Generate Json
   * @returns {{}}
   */
  public build(opts: Partial<{ withoutAggs: boolean }> = {}): object {
    const { withoutAggs } = opts;
    const obj: any = {};
    for (const [prop, val] of Object.entries(this._props)) {
      switch (prop) {
        case 'query': {
          break;
        }
        case 'aggs': {
          if (!withoutAggs) {
            obj[prop] = (val as AbstractBulder).build();
          }

          break;
        }
        default: {
          obj[prop] = val;
        }
      }
    }
    let query: any = {};
    for (const [prop, val] of Object.entries(this._query)) {
      if (val instanceof AbstractBulder) {
        query = { ...query, ...(val as AbstractBulder).build() };
        continue;
      }
      query[prop] = val;
    }
    obj['query'] = query;
    if (this._post_filter.isNotEmty()) {
      obj['post_filter'] = this._post_filter.build();
    }
    return obj;
  }

  public isNotEmty(): boolean {
    return (Object.values({ ...(this._query as object), ...(this._query as object) }) as any[]).flat().length > 0;
  }

  private isNotExistInQuery(prop: keyof RawQuery['query']) {
    return !(prop in this._query);
  }
}
