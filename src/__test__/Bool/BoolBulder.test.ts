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
      "bool",
      expect.objectContaining({ filter: [{ terms: { articul: ["00001851"], boost: 2 } }] })
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
        field: "price",
        params: {
          gte: 0,
          lte: Number.MAX_VALUE
        },
        opts: {
          boost: 120
        }
      })
      .add('should', 'notExistsFilter', {
        field: "test",
        params: {
          someParams: "some data"
        }
      });

    expect(b.build()).toEqual({
      bool: {
        must: [
          {
            range: {
              price: {
                boost: 120,
                gte: 0,
                lte: 1.7976931348623157e308
              },
            },
          },
        ],
        should: [
          {
            notExistsFilter: {
              test: {
                someParams: "some data"
              }
            }
          }
        ]
      },
    });
  });

  test("Create mutlti query", async () => {
    const b = new Bool()
      .add("must", "fuzzy", {
        field: "f",
        params: {
          value: "some text"
        },
        opts: {
          fuzziness: "1",
          max_expansions: 1,
          prefix_length: 3,
          rewrite: "constant_score",
          transpositions: true
        }
      })
      .add("must", "regexp", {
        field: "f",
        opts: {
          rewrite: "constant_score"
        },
        params: {
          flags: "ALL",
          value: "qqqqq"
        }
      });

    expect(b.build()).toEqual({
      bool: {
        must: [
          {
            fuzzy: {
              f: {
                fuzziness: "1",
                max_expansions: 1,
                prefix_length: 3,
                rewrite: "constant_score",
                transpositions: true,
                value: "some text"
              }
            }
          },
          {
            regexp: {
              f: {
                flags: "ALL",
                rewrite: "constant_score",
                value: "qqqqq"
              }
            }
          }
        ]
      }
    });
  });
  test("Setters", async () => {
    const testTerm = {
      params: {
        value: "11"
      },
      field: "test"
    };
    const b = new Bool()
      .Filter("term", testTerm)
      .Should("term", testTerm)
      .Must("term", testTerm)
      .Must_Not("term", testTerm);

    expect(b.build()).toEqual({
      bool: {
        filter: [
          {
            term: {
              test: {
                value: "11"
              }
            }
          }
        ],
        must: [
          {
            term: {
              test: {
                value: "11"
              }
            }
          }
        ],
        must_not: [
          {
            term: {
              test: {
                value: "11"
              }
            }
          }
        ],
        should: [
          {
            term: {
              test: {
                value: "11"
              }
            }
          }
        ]
      }
    });
  });
});
