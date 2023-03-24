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
  max_boost?: string;
  min_score?: string;
  functions?: any[];
  score_mode?: 'multiply' | 'sum' | 'avg' | 'first' | 'max' | 'min';
  boost_mode?: 'multiply' | 'sum' | 'avg' | 'replace' | 'max' | 'min';
  field_value_factor?: {
    field: string;
    missing: string;
    factor: string;
    modifier: 'none' | 'log' | 'log1p' | 'log2p' | 'ln' | 'ln1p' | 'ln2p' | 'square' | 'sqrt' | 'reciprocal';
  };
  script_score?: {
    script: {
      source: string;
    };
  };
  gauss?: DecayFn;
  exp?: DecayFn;
  linear?: DecayFn;
}

type DecayFn = {
  [key: string]: Partial<{
    origin: string;
    scale: string;
    offset: string;
    decay: string;
  }>;
};

// "script_score": {
//   "script": {
//     "source": "if(doc['quantity'].value > 0){return 1;}else{return 0;}"
//   }
// },
