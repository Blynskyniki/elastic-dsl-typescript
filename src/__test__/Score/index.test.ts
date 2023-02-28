import { Bool } from '../../Builders/Bool';
import { BoolSchema } from '../../Builders/Bool/types';
import { FunctionScore } from '../../Builders/FunctionScore';
import { Query } from '../../Query';

describe('Score tests', () => {
  test('Create score ', async () => {
    const s = new FunctionScore()
      .add('field_value_factor', {
        field: 'test',
        factor: '1.2',
        modifier: 'sqrt',
        missing: '1',
      })
      .add(
        'query',
        new Bool<BoolSchema>().Must('match_all', {
          params: {},
        }),
      )
      .build();

    expect(s).toEqual({
      function_score: {
        field_value_factor: {
          factor: '1.2',
          field: 'test',
          missing: '1',
          modifier: 'sqrt',
        },
        query: {
          bool: {
            must: [
              {
                match_all: {
                  undefined: {},
                },
              },
            ],
          },
        },
      },
    });
  });
  test('Create score Query ', async () => {
    const s = new FunctionScore()
      .add('field_value_factor', {
        field: 'test',
        factor: '1.2',
        modifier: 'sqrt',
        missing: '1',
      })
      .add(
        'query',
        new Bool<BoolSchema>().Must('match_all', {
          params: {},
        }),
      );

    expect(new Query().addQuery('function_score', s).build()).toEqual({
      query: {
        function_score: {
          field_value_factor: {
            factor: '1.2',
            field: 'test',
            missing: '1',
            modifier: 'sqrt',
          },
          query: {
            bool: {
              must: [
                {
                  match_all: {},
                },
              ],
            },
          },
        },
      },
    });
  });
});
