/**
 * Типы поиска
 * @enum
 */
export type BoolFields = 'must' | 'must_not' | 'should' | 'filter';

/**
 * Критерии для поиска диапазонов
 * @interface
 */
export interface Range {
    gt?: number | Date;
    gte?: number | Date;
    lt?: number | Date;
    lte?: number | Date;
}

/**
 * Sorting object
 * @type Sort
 */
export type Sort = Record<string, Record<'order', 'asc' | 'desc'>>;

/**
 * Indicates how scores for matching  affect the document’s relevance score.
 * @type ScoreMode
 */
export type ScoreMode = 'avg' | 'max' | 'min' | 'none' | 'sum';

export type RangeAggregation = Array<{ to: number } | { from: number }>;

export interface PainLessScript {
    source: string;
    params: object;
}
