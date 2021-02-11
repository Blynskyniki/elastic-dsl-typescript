import { ScoreMode } from '../../Types';

/**
 * Base nested query
 *
 * @param path Path to the nested object you wish to search.
 * @param query Query you wish to run on nested objects in the path.
 *        If an object matches the search, the nested query returns the root parent document.
 * @param score_mode Indicates how scores for matching child objects affect the root parent document’s relevance score
 * @param inner_hits Params from return nested documents
 *
 * @interface Nested
 */
export interface NestedSchema {
  path: string;
  query?: object;
  score_mode?: ScoreMode;
  inner_hits?: {
    name: string;
    size?: number;
    _source?: string[];
  };
}
