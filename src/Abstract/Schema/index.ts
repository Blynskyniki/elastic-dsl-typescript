/**
 * Base schema from builders
 * @Schema
 */
export interface Schema {
  [key: string]: {
    /**
     * Query conditions
     */
    params: unknown;
    /**
     * Query options
     */
    opts?: unknown;
    /**
     * The field by which the request will be
     */
    field?: string;
  };
}

/**
 * Base schema from builders Aggregations
 * @Schema
 */
export interface AggSchema {
  [key: string]: {
    params?: unknown;
    opts?: unknown;
    field?: unknown;
  };
}
