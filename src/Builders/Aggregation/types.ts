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
}

export interface FilterAggregation {
  [key: string]: object;
}
