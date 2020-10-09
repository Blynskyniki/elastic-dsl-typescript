import { Bool } from '../Builders/Bool';
import { BoolSchema } from '../Builders/Bool/types';
import { Sort, Range } from '../Types';

/**
 *
 * @param size Defines the number of hits to return. Defaults to 10
 * @param from Starting document offset. Defaults to 0
 * @param explain If true, returns detailed information about score computation as part of a hit. Defaults to false.
 * @param query Defines the search definition using the Query DSL.
 * @param sort
 * @param aggs Aggregations
 * @param q Query in the Lucene query string syntax.
 * @param _source Source select data
 *
 * @type RawQuery
 */
export interface RawQuery {
  size?: number;
  from?: number;
  explain?: boolean;
  q?: string;
  query: {
    match?: Record<'message', Record<'query', string>>;
    bool?: Bool<BoolSchema>;
    match_all?: {
      boost: number;
    };
    range?: Range;
    term?: {
      field:string,
      value:string,
      boost?:number;
    };
  };
  sort?: Sort[];
  aggs?: object;
  _source?: string[];
}
