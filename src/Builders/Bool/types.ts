import { Schema } from '../../Abstract/Schema';
import { Range } from '../../Types';

/**
 * Base Boool builder filters shema
 *
 * @param range returns documents that contain terms within a provided range.
 * @param exists returns documents that contain an indexed value for a field.
 * @param term returns documents that contain an exact term in a provided field.
 * @param term returns documents that contain one or more exact terms in a provided field.
 *
 * @interface
 */
export interface BoolSchema extends Schema {
  range: {
    field: string;
    params: Range;
    opts?: {
      /**
       * You can use the time_zone parameter to convert date values to UTC using a UTC offset.
       */
      time_zone?: string;
      /**
       * Floating point number used to decrease or increase the relevance scores of a query. Defaults to 1.0.
       */
      boost?: number;
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
    };
  };
  exists: {
    params: {
      /**
       * Name of the field you wish to search.
       */
      fieldName: string;
    };
  };
  term: {
    field: string;
    params: {
      value: string;
    };
    opts?: {
      /**
       * Floating point number used to decrease or increase the relevance scores of a query. Defaults to 1.0.
       */
      boost?: number;
    };
  };
  terms: {
    field: string;
    params: {
      value: string[];
    };
    opts?: {
      /**
       * Floating point number used to decrease or increase the relevance scores of a query. Defaults to 1.0.
       */
      boost?: number;
    };
  };

  match_all: {
    params: {};
    opts?: {
      boost?: number;
    };
  };
}
