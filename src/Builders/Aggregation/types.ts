import { AggSchema } from "../../Abstract/Schema";
import { RangeAggregation, PainLessScript } from "../../Types";

export interface SubAggregation {
  subAgg?: FilterAggregation;
}

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
      filter?: FilterAggregation;
      /**
       * @property subAgg Вложенные sub аггрегации
       */
    } & SubAggregation;
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
  range: {
    params: {
      field: string;
      filter?: FilterAggregation;
      ranges: RangeAggregation;
    };
  };

  avg: {
    params: {
      field: string;
      filter?: FilterAggregation;
      script?: PainLessScript;
    };
  };
  max: {
    params: {
      field: string;
      filter?: FilterAggregation;
      script?: PainLessScript;
    };
  };
  min: {
    params: {
      field: string;
      filter?: FilterAggregation;
      script?: PainLessScript;
    };
  };
  sum: {
    params: {
      field: string;
      filter?: FilterAggregation;
      script?: PainLessScript;
    };
  };
  percentiles: {
    params: {
      field: string;
      filter?: FilterAggregation;
      percents?: [number, number, number];
    };
  };
  value_count: {
    params: {
      field: string;
      filter?: FilterAggregation;
      script?: PainLessScript;
    };
  };
  nested: {
    params: {
      path: string;

      aggs: { [field: string]: object };
    };
  };
  histogram: {
    params: {
      field: string;
      min_doc_count?: number;
      /**
       * The interval must be a positive decimal.
       */
      interval: number;
      /**
       * With extended_bounds setting, you now can "force" the histogram aggregation to start building buckets on a specific min value and also keep on building buckets up to a max value .
       * Using extended_bounds only makes sense when min_doc_count is 0 (the empty buckets will never be returned if min_doc_count is greater than 0).
       */
      extended_bounds?: {
        min: number;
        max: number;
      };
      missing?: number | any;
    };
  };
}

export interface FilterAggregation {
  [key: string]: object;
}
