import { AggSchema } from 'Abstract/Schema';

export interface AggregationSchema extends AggSchema {
  /**
   * @property A multi-bucket value source based aggregation where buckets are dynamically built - one per unique value.
   */
  terms: {
    params: {
      /**
       * @property  Field for aggs
       */
      field: string;
    };
    opts?: {
      /**
       * @property  Return basket size
       */
      size?: number;
      /**
       * @property It is possible to only return terms that match more than a configured number of hits
       */
      min_doc_count?: number;
      /**
       * @property Filtering Values
       */
      include?: string | string[];
      exclude?: string | string[];
    };
  };
}
