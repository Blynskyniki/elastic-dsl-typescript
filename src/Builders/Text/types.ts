import { Schema } from '../../Abstract/Schema';
import {
  AllowLeadingWildcard,
  Analyzer,
  AnalyzeWildcard,
  AutoGenerateSynonymsPhraseQuery,
  Boost,
  CaseInsensitive,
  DefaultField,
  Fuzziness,
  FuzzyPrefixLength,
  FuzzyTranspositions,
  Lenient,
  MaxExpansions,
  MinimumShouldMatch,
  Operator,
  PrefixLength,
  Rewrite,
  ZeroTermsQuery,
} from '../../Types/QueryOptions';

/**
 * Base fulltext search builder  shema
 *
 * @property match_all the most simple query, which matches all documents, giving them all a _score of 1.0
 * @property match the standard query for performing full text queries, including fuzzy matching and phrase or proximity queries.
 * @property match_phrase like the match query but used for matching exact phrases or word proximity matches.
 * @property query_string Supports the compact Lucene query string syntax, allowing you to specify AND|OR|NOT conditions and multi-field search within a single query string. For expert users only.
 * @property combined_fields Matches Over multiple fields as if they had been indexed into one combined field..
 */
export interface TextSchema extends Schema {
  match_all: {
    params: Record<string, unknown>;

    opts?: Boost;
  };
  match: {
    field: string;
    params: {
      query: string | Date | number;
    };

    opts?: Fuzziness &
      MaxExpansions &
      PrefixLength &
      MinimumShouldMatch &
      FuzzyTranspositions &
      Lenient &
      Operator &
      Analyzer &
      ZeroTermsQuery &
      AutoGenerateSynonymsPhraseQuery;
  };
  match_phrase: {
    field: string;

    params: {
      query: string;
    };
    opts?: ZeroTermsQuery | Analyzer;
  };
  query_string: {
    params: {
      query: string;
    };
    opts?: AllowLeadingWildcard &
      AutoGenerateSynonymsPhraseQuery &
      Boost &
      Operator &
      Analyzer &
      DefaultField &
      FuzzyTranspositions &
      FuzzyPrefixLength &
      FuzzyTranspositions &
      FuzzyPrefixLength &
      Lenient &
      AnalyzeWildcard;
  };
  combined_fields: {
    params: {
      query: string;
      fields: string[];
    };
    opts?: Operator & AutoGenerateSynonymsPhraseQuery & MinimumShouldMatch & ZeroTermsQuery;
  };
  wildcard: {
    params: {
      query: string;
      fields: string;
    };
    opts?: Boost & Rewrite & CaseInsensitive;
  };
}
