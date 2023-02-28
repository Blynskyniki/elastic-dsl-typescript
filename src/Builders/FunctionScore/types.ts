import { Bool } from 'Builders/Bool';
import { BoolSchema } from 'Builders/Bool/types';
import { Range } from 'Types';

export interface IScoreFunction {
  filter: Record<'string', any>;
  weight: number;
}

export interface IFunctionScoreSchema {
  query: {
    match?: Record<'message', Record<'query', string>>;
    bool?: Bool<BoolSchema>;
    match_all?: {
      boost: number;
    };
    range?: Range;
    term?: {
      field: string;
      value: string;
      boost?: number;
    };
    [key: string]: any;
  };
  boost?: string;
  functions?: any[];
  boost_mode?: 'multiply' | 'sum' | 'avg' | 'first' | 'max' | 'min';
  field_value_factor?: {
    field: string;
    missing: string;
    factor: string;
    modifier: 'none' | 'log' | 'log1p' | 'log2p' | 'ln' | 'ln1p' | 'ln2p' | 'square' | 'sqrt' | 'reciprocal';
  };
}
