import { AbstractBulder } from '../../Abstract/AbstractBuilder';
import { BoolFields } from '../../Types';
import { BoolSchema } from './types';

type BoolQueryData = Partial<Record<BoolFields, object[]>>;

export class Bool<BASE_SCHEMA extends BoolSchema = BoolSchema> extends AbstractBulder {
  private _query: BoolQueryData = {};

  public Should<K extends keyof BASE_SCHEMA>(filter: K, data: BASE_SCHEMA[K]) {
    this.add('should', filter, data);
    return this;
  }

  public Filter<K extends keyof BASE_SCHEMA>(filter: K, data: BASE_SCHEMA[K]) {
    this.add('filter', filter, data);
    return this;
  }

  public Must<K extends keyof BASE_SCHEMA>(filter: K, data: BASE_SCHEMA[K]) {
    this.add('must', filter, data);
    return this;
  }

  public Must_Not<K extends keyof BASE_SCHEMA>(filter: K, data: BASE_SCHEMA[K]) {
    this.add('must_not', filter, data);
    return this;
  }

  /**
   * Add bool
   * @param type
   * @param bool - empty data will skip
   * @return {this<BASE_SCHEMA>}
   */
  public addBuilder(type: BoolFields, bool: AbstractBulder): this {
    this.checkField(type);
    bool.isNotEmty() && this._query[type]?.push(bool.build());
    return this;
  }

  /**
   * Проверка на наличие добавленых критериев
   * @return {boolean}
   */
  public isNotEmty(): boolean {
    return Object.keys(this._query).filter(field => field.length).length > 0;
  }

  /**
   * Add conditions for Bool
   * @param type
   * @param filter
   * @param data
   * @returns {this<BASE_SCHEMA>}
   */
  public add<K extends keyof BASE_SCHEMA>(type: BoolFields, filter: K, data: BASE_SCHEMA[K]) {
    this.checkField(type);

    switch (filter) {
      case 'exists': {
        this._query[type]?.push({
          [filter]: { field: (data.params as BASE_SCHEMA['exists']['params']).fieldName },
        });
        break;
      }
      case 'term':
      case 'terms': {
        this._query[type]?.push({
          [filter]: { [data['field']!]: (data.params as any)['value'], ...(data.opts as object) },
        });
        break;
      }
      case 'match_all': {
        this._query[type]?.push({
          [filter]: {},
        });
        break;
      }

      default: {
        let payload = { ...(data.params as object) };
        if (data?.opts) {
          payload = { ...payload, ...(data.opts as object) };
        }

        this._query[type]?.push({
          [filter]: { [data['field']!]: payload },
        });
      }
    }

    return this;
  }

  /**
   * Generate Json
   * @returns {{bool: BoolQueryData}}
   */
  public build() {
    const bool: BoolQueryData = {};
    let field: keyof BoolQueryData;
    for (field in this._query) {
      if (this._query?.[field]?.length) {
        bool[field] = this._query[field];
      }
    }
    return { bool };
  }

  private checkField(type: BoolFields) {
    if (!(type in this._query)) {
      this._query[type] = [];
    }
  }
}
