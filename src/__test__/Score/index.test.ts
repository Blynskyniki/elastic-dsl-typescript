import { Bool, BoolSchema, FunctionScore, Query } from '../../';

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
                match_all: {},
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
  test('Create script score ', async () => {
    const s = new FunctionScore()
      .add('script_score', {
        script: {
          source: 'test painless script',
        },
      })
      .add(
        'query',
        new Bool<BoolSchema>().Must('match_all', {
          params: {},
        }),
      );

    expect(s.build()).toEqual({
      function_score: {
        query: {
          bool: {
            must: [
              {
                match_all: {},
              },
            ],
          },
        },
        script_score: {
          script: {
            source: 'test painless script',
          },
        },
      },
    });
  });
  test('Create gaus score ', async () => {
    const s = new FunctionScore()
      .add('gauss', {
        testField: {
          decay: '1d',
          offset: '1',
          origin: '2',
          scale: '2',
        },
      })
      .add(
        'query',
        new Bool<BoolSchema>().Must('match_all', {
          params: {},
        }),
      );

    expect(s.build()).toEqual({
      function_score: {
        gauss: {
          testField: {
            decay: '1d',
            offset: '1',
            origin: '2',
            scale: '2',
          },
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
    });
  });
});
