import { AbstractBulder } from '../../Abstract/AbstractBuilder';
import { NestedSchema } from './types';

export * from './types';

export class Nested extends AbstractBulder {
  private readonly _query: NestedSchema;

  constructor(path: string) {
    super();
    this._query = {
      path,
    };
  }

  public addProp<K extends keyof Omit<NestedSchema, 'path'>>(prop: K, data: NestedSchema[K]) {
    this._query[prop] = data;

    return this;
  }

  public isNotEmty(): boolean {
    return Boolean(this._query?.path && this._query?.query);
  }

  public build() {
    return {
      nested: this._query,
    };
  }
}
