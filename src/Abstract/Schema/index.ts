/**
 * Base schema from builders
 * @Schema
 */
export interface Schema {
  [key: string]: {
    params: unknown;
    opts?: unknown;
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
