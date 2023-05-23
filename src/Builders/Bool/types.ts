import { Schema } from '../../Abstract/Schema';
import { Range } from '../../Types';
import {
  Analyzer,
  AutoGenerateSynonymsPhraseQuery,
  Boost,
  Fuzziness,
  FuzzyTranspositions,
  Lenient,
  MaxExpansions,
  MinimumShouldMatch,
  Operator,
  PrefixLength,
  Relation,
  Rewrite,
  TimeZone,
  Transpositions,
  ZeroTermsQuery,
} from '../../Types/QueryOptions';
import { TextSchema } from '../Text/types';

/**
 * Base Boool builder filters shema
 *
 * @property range returns documents that contain terms within a provided range.
 * @property exists returns documents that contain an indexed value for a field.
 * @property term returns documents that contain an exact term in a provided field.
 * @property term returns documents that contain one or more exact terms in a provided field.
 * @property fuzzy returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance.
 * @property ids returns documents based on their IDs. This query uses document IDs stored in the _id field
 * @property prefix returns documents that contain a specific prefix in a provided field.
 * @property regexp returns documents that contain terms matching a regular expression.
 * @property wildcard returns documents that contain terms matching a wildcard pattern.
 * @interface BoolSchema
 */
export interface IBoolSchema extends Schema {
  range: {
    field: string;
    params: Range;
    opts?: Boost | Relation | TimeZone;
  };
  exists: {
    params: {
      /**
       * Name of the field you wish to search.
       */
      fieldName: string;
    };
  };
  match: {
    field: string;
    params: {
      /**
       * (Required) Text, number, boolean value or date you wish to find in the provided <field>.
       */
      query: string | number | boolean;
    };
    opts?:
      | Analyzer
      | AutoGenerateSynonymsPhraseQuery
      | Fuzziness
      | MaxExpansions
      | PrefixLength
      | FuzzyTranspositions
      | Lenient
      | Operator
      | MinimumShouldMatch
      | ZeroTermsQuery;
  };
  term: {
    field: string;
    params: {
      value: string | number | boolean;
    };
    opts?: Boost;
  };
  terms: {
    field: string;
    params: {
      value: string[] | number[] | boolean[];
    };
    opts?: Boost;
  };
  fuzzy: {
    field: string;
    params: {
      value: string;
    };
    opts?: Fuzziness | MaxExpansions | PrefixLength | Transpositions | Rewrite;
  };
  ids: {
    params: {
      values: string[];
    };
  };
  prefix: {
    field: string;

    params: {
      value: string;
    };
    opts?: Rewrite;
  };
  regexp: {
    field: string;
    params: {
      value: string;
      /**
       * ALL (Default)
       * Enables all optional operators.
       * COMPLEMENT
       * Enables the ~ operator. You can use ~ to negate the shortest following pattern. For example:
       *
       * a~bc   # matches 'adc' and 'aec' but not 'abc'
       * INTERVAL
       * Enables the <> operators. You can use <> to match a numeric range. For example:
       *
       * foo<1-100>      # matches 'foo1', 'foo2' ... 'foo99', 'foo100'
       * foo<01-100>     # matches 'foo01', 'foo02' ... 'foo99', 'foo100'
       * INTERSECTION
       * Enables the & operator, which acts as an AND operator. The match will succeed if patterns on both the left side AND the right side matches. For example:
       *
       * aaa.+&.+bbb  # matches 'aaabbb'
       * ANYSTRING
       * Enables the @ operator. You can use @ to match any entire string.
       *
       * You can combine the @ operator with & and ~ operators to create an "everything except" logic. For example:
       *
       * @&~(abc.+)  # matches everything except terms beginning with 'abc'
       */
      flags: 'ALL' | 'COMPLEMENT' | 'INTERSECTION' | 'ANYSTRING';
    };
    opts?: Rewrite;
  };
}

export type BoolSchema = IBoolSchema & TextSchema;
