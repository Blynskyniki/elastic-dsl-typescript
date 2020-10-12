import { Bool } from '../../Builders/Bool';
import { BoolSchema } from '../../Builders/Bool/types';

describe('BoolBulder tests', () => {
  test('Create term query', async () => {
    const b = new Bool().add(
      'must',
      'term',

      {
        params: { value: '00001851' },
        opts: {
          boost: 1.0,
        },
        field: 'articul',
      },
    );

    expect(b.build()).toHaveProperty(
      'bool',
      expect.objectContaining({
        must: [
          {
            term: {
              articul: {
                boost: 1,
                value: '00001851',
              },
            },
          },
        ],
      }),
    );
  });
  test('Create range query', async () => {
    const b = new Bool().add(
      'filter',
      'range',

      {
        field: 'price',
        opts: {
          boost: 1.0,
          relation: 'CONTAINS',
          time_zone: 'utc+1',
        },
        params: { gt: 0, lte: 100500 },
      },
    );

    expect(b.build()).toHaveProperty(
      'bool',
      expect.objectContaining({
        filter: [{ range: { price: { boost: 1, gt: 0, lte: 100500, relation: 'CONTAINS', time_zone: 'utc+1' } } }],
      }),
    );
  });
  test('Create exists query', async () => {
    const b = new Bool().add('filter', 'exists', {
      params: {
        fieldName: 'price',
      },
    });

    expect(b.build()).toHaveProperty('bool', expect.objectContaining({ filter: [{ exists: { field: 'price' } }] }));
  });
  test('Create terms query', async () => {
    const b = new Bool().add('filter', 'terms', {
      params: {
        value: ['00001851'],
      },
      field: 'articul',
      opts: {
        boost: 2,
      },
    });

    expect(b.build()).toHaveProperty(
      'bool',
      expect.objectContaining({ filter: [{ terms: { articul: { boost: 2, value: ['00001851'] } } }] }),
    );
  });

  test('Create extend schema', async () => {


    interface IQQ extends BoolSchema {
      notExistsFilter: {
        params: {
          someParams: string;
        };
        field: string;
      };
    }

    const b = new Bool<IQQ>()
      .add('must', 'range', {
        field: 'price',
        params: {
          gte: 0,
          lte: Number.MAX_VALUE
        },
        opts: {
          boost: 120
        }
      })
      .add('should', 'notExistsFilter', {
        field: 'test',
        params: {
          someParams: 'some data'
        }
      });


    expect(b.build()).toEqual({
      bool: {
        filter: [
          {
            exists: {
              field: 'media.photo',
            },
          },
          {
            match_all: {
              undefined: {
                boost: 0,
              },
            },
          },
        ],
        must: [
          {
            range: {
              price: {
                boost: 120,
                gte: 0,
                lte: 1.7976931348623157e308,
              },
            },
          },
          {
            term: {
              'articul.keyword': {
                boost: 300,
                value: '00001851',
              },
            },
          },
        ],
        should: [
          {
            test: {
              test: {
                qq: 10
              }
            }
          },
        ],
      },
    });
  });


  test('qq', async () => {
    const b = new Bool()
      .add('filter', 'range', {
        params: {
          gt: 0
        }
      });

    console.log(JSON.stringify(b.build(), null, 2));
  });
});
