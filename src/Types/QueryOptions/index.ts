export interface Boost {
  /**
   *  Floating point number used to decrease or increase the relevance scores of the query. Defaults to 1.0.
   */
  boost?: number;
}

export interface Operator {
  /**
   *  Boolean logic used to interpret text in the query value.
   */
  operator?: 'OR' | 'AND';
}

export interface DefaultOperator {
  /**
   * Default boolean logic used to interpret text in the query string if no operators are specified. Valid values are:
   * OR (Default)
   * For example, a query string of capital of Hungary is interpreted as capital
   * OR of OR Hungary.
   * AND
   * For example, a query string of capital of Hungary is interpreted as capital
   * AND of AND Hungary.
   */
  default_operator?: 'OR' | 'AND';
}

export interface Analyzer {
  /**
   * Analyzer used to convert the text in the query value into tokens. Defaults to the index-time analyzer mapped for the <field>. If no analyzer is mapped, the index’s default analyzer is used.
   */
  analyzer?: string;
}

export interface DefaultField {
  /**
   * Default field you wish to search if no field is provided in the query string
   */
  default_field?: string;
}

export interface AutoGenerateSynonymsPhraseQuery {
  /**
   * If true, match phrase queries are automatically created for multi-term synonyms. Defaults to true.
   */
  auto_generate_synonyms_phrase_query?: boolean;
}

export interface AnalyzeWildcard {
  /**
   * If true, the query attempts to analyze wildcard terms in the query string. Defaults to false.
   */
  analyze_wildcard?: boolean;
}

export interface AllowLeadingWildcard {
  /**
   * If true, the wildcard characters * and ? are allowed as the first character of the query string. Defaults to true.
   */
  allow_leading_wildcard?: boolean;
}

export interface ZeroTermsQuery {
  /**
   * Indicates whether no documents are returned if the analyzer removes all tokens, such as when using a stop filter.
   */
  zero_terms_query?: 'none' | 'all';
}

export interface MinimumShouldMatch {
  /**
   * Minimum number of clauses that must match for a document to be returned. See the minimum_should_match parameter for valid values and more information.
   */
  minimum_should_match?: string;
}

export interface Lenient {
  /**
   *  If true, format-based errors, such as providing a text query value for a numeric field, are ignored. Defaults to false.
   */
  lenient?: boolean;
}

export interface FuzzyTranspositions {
  /**
   * If true, edits for fuzzy matching include transpositions of two adjacent characters (ab → ba). Defaults to true
   */
  fuzzy_transpositions?: boolean;
}

export interface Transpositions {
  /**
   *  Indicates whether edits include transpositions of two adjacent characters (ab → ba). Defaults to true.
   */
  transpositions?: boolean;
}

export interface FuzzyPrefixLength {
  /**
   * Maximum number of terms to which the query expands for fuzzy matching. Defaults to 50.
   */
  fuzzy_prefix_length?: boolean;
}

export interface PrefixLength {
  /**
   *  Number of beginning characters left unchanged for fuzzy matching.
   */
  prefix_length?: number;
}

export interface MaxExpansions {
  /**
   * Maximum number of terms to which the query will expand. Defaults to 50.
   */
  max_expansions?: number;
}

export interface Fuzziness {
  /**
   * Maximum edit distance allowed for matching. See Fuzziness for valid values and more information. See #https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html#query-dsl-match-query-fuzziness in the match query for an example.
   */
  fuzziness?: string;
}

export interface Relation {
  /**
   * Indicates how the range query matches values for range fields. Valid values are:
   *
   * INTERSECTS (Default)
   * Matches documents with a range field value that intersects the query’s range.
   *
   * CONTAINS
   * Matches documents with a range field value that entirely contains the query’s range.
   *
   * WITHIN
   * Matches documents with a range field value entirely within the query’s range.
   */
  relation?: 'INTERSECTS' | 'CONTAINS' | 'WITHIN';
}

export interface TimeZone {
  /**
   * You can use the time_zone parameter to convert date values to UTC using a UTC offset.
   */
  time_zone?: string;
}

export interface Rewrite {
  /**
   * Valid values
   * constant_score (Default)
   * Uses the constant_score_boolean method for fewer matching terms. Otherwise, this method finds all matching terms in sequence and returns matching documents using a bit set.*constant_score_boolean*Assigns each document a relevance score equal to the boost parameter.
   * This method changes the original query to a bool query. This bool query contains a should clause and term query for each matching term.
   * This method can cause the final bool query to exceed the clause limit in the indices.query.bool.max_clause_count setting. If the query exceeds this limit, Elasticsearch returns an error.
   *
   * scoring_boolean
   * Calculates a relevance score for each matching document.
   * This method changes the original query to a bool query. This bool query contains a should clause and term query for each matching term.
   * This method can cause the final bool query to exceed the clause limit in the indices.query.bool.max_clause_count setting. If the query exceeds this limit, Elasticsearch returns an error.
   *
   * top_terms_blended_freqs_N
   * Calculates a relevance score for each matching document as if all terms had the same frequency. This frequency is the maximum frequency of all matching terms.
   * This method changes the original query to a bool query. This bool query contains a should clause and term query for each matching term.
   * The final bool query only includes term queries for the top N scoring terms.
   * You can use this method to avoid exceeding the clause limit in the indices.query.bool.max_clause_count setting.
   *
   * top_terms_boost_N
   * Assigns each matching document a relevance score equal to the boost parameter.
   * This method changes the original query to a bool query. This bool query contains a should clause and term query for each matching term.
   * The final bool query only includes term queries for the top N terms.
   * You can use this method to avoid exceeding the clause limit in the indices.query.bool.max_clause_count setting.
   *
   * top_terms_N
   * Calculates a relevance score for each matching document.
   * This method changes the original query to a bool query. This bool query contains a should clause and term query for each matching term.
   * The final bool query only includes term queries for the top N scoring terms.
   * You can use this method to avoid exceeding the clause limit in the indices.query.bool.max_clause_count setting.
   */
  rewrite?:
    | 'constant_score'
    | 'constant_score_boolean'
    | 'scoring_boolean'
    | 'top_terms_blended_freqs_N'
    | 'top_terms_boost_N'
    | 'top_terms_N';
}

export interface CaseInsensitive {
  /**
   * Allows case insensitive matching of the pattern with the indexed field values when set to true. Default is false which means the case sensitivity of matching depends on the underlying field’s mapping.
   */
  case_insensitive?: boolean;
}

export interface Fields {
  /**
   * (Optional, array of strings) Array of fields you wish to search.
   * This field accepts wildcard expressions. You also can boost relevance scores for matches to particular fields using a caret (^) notation. See Wildcards and per-field boosts in the fields parameter for examples.
   * Defaults to the index.query.default_field index setting, which has a default value of *. The * value extracts all fields that are eligible to term queries and filters the metadata fields. All extracted fields are then combined to build a query if no prefix is specified.
   */
  fields?: string[];
}

export interface AnyOption {
  [key: string]: string | number | boolean;
}
