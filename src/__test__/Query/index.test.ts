import { Aggregation, Bool, BoolSchema, Query } from '../../index';

describe('ScriptFields tests', () => {
  test('Create aggs', async () => {
    const q = new Query().addProps(
      "aggs",
      new Aggregation().add("sum", "agg_sum", {
        params: {
          field: "price"
        }
      })
    );
    expect(q.build()).toEqual({
      aggs: {
        agg_sum: {
          sum: {
            field: "price"
          }
        }
      },
      query: {}
    });
  });
  test('Create script field ', async () => {
    const q = new Query()
      .addProps("_source", ["field"])
      .addProps("explain", true)
      .addProps("from", 0)
      .addProps("size", 100)
      .addProps("q", "Lucene query string ")
      .addQuery("match", {
        message: {
          query: "query"
        }
      })
      .addQuery("term", {
        field: "f",
        value: "term"
      })
      .addQuery("range", {
        gt: 0,
        gte: 0
      })
      .addPostFilter(
        new Bool<BoolSchema>().Must_Not("exists", {
          params: {
            fieldName: "test"
          }
        })
      );

    q.bool.addBuilder(
      "must",
      new Bool().add("must", "term", {
        field: "articul",
        params: {
          value: "111"
        }
      })
    );
    console.log(JSON.stringify(q.build(), null, 2));
    expect(q.isNotEmty()).toEqual(true);
    expect(q.build()).toHaveProperty(
      "post_filter",
      expect.objectContaining({
        bool: {
          must_not: [
            {
              exists: {
                field: "test"
              }
            }
          ]
        }
      })
    );
    const { post_filter, ...data } = q.build() as any;
    expect(data).toEqual({
      _source: ["field"],
      explain: true,
      from: 0,
      q: "Lucene query string ",
      query: {
        bool: {
          must: [
            {
              bool: {
                must: [
                  {
                    term: {
                      articul: "111"
                    }
                  },
                ],
              },
            },
          ],
        },
        match: {
          message: {
            query: 'query',
          },
        },
        range: {
          gt: 0,
          gte: 0,
        },
        term: {
          field: 'f',
          value: 'term',
        },
      },
      size: 100,
    });

    //
  });
});
