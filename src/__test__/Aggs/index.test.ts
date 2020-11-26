import { Aggregation } from '../../Builders/Aggregation';

describe('Check aggs builder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Create avg', async () => {
    const a = new Aggregation().add('avg', 'my_avg', {
      params: {
        field: "price",
        script: {
          params: {},
          source: "doc.my_avg.value * 2"
        }
      }
    });

    expect(a.build()).toEqual({
      my_avg: {
        avg: {
          field: "price",
          script: {
            params: {},
            source: "doc.my_avg.value * 2"
          }
        }
      }
    });
  });
  test('Create max min', async () => {
    const a = new Aggregation()
      .add('max', 'my_max', {
        params: {
          field: "price",

          script: {
            params: {},
            source: "doc.my_max.value * 2"
          }
        }
      })
      .add('min', 'my_min', {
        params: {
          field: "price",

          script: {
            params: {},
            source: "doc.my_min.value * 2"
          }
        }
      });

    expect(a.build()).toEqual({
      my_max: {
        max: {
          field: "price",
          script: {
            params: {},
            source: "doc.my_max.value * 2"
          }
        }
      },
      my_min: {
        min: {
          field: "price",
          script: {
            params: {},
            source: "doc.my_min.value * 2"
          }
        }
      }
    });
  });

  test('Create terms', async () => {
    const a = new Aggregation().add('terms', 'my_terms', {
      params: {
        field: "color"
      },
      opts: {
        exclude: ["red"],
        include: ["black", "green"],
        min_doc_count: 2,
        size: 100
      }
    });

    expect(a.build()).toEqual({
      my_terms: {
        terms: {
          exclude: ["red"],
          field: "color",
          include: ["black", "green"],
          min_doc_count: 2,
          size: 100
        }
      }
    });
  });

  test('Create range', async () => {
    const a = new Aggregation().add('range', 'my_range', {
      params: {
        field: "price",
        ranges: [
          {
            from: 100
          },
          {
            to: 1000
          }
        ]
      }
    });

    expect(a.build()).toEqual({
      my_range: {
        range: {
          field: "price",
          ranges: [
            {
              from: 100
            },
            {
              to: 1000
            }
          ]
        }
      }
    });
  });
  test('Check isNotEmty func', async () => {
    const a = new Aggregation();
    expect(a.isNotEmty()).toBeFalsy();

    a.add('range', 'my_range', {
      params: {
        field: "price",
        ranges: [
          {
            from: 100
          },
          {
            to: 1000
          }
        ]
      }
    });

    expect(a.isNotEmty()).toBeTruthy();
  });

  test("Create filtered terms agg", async () => {
    const a = new Aggregation().add("terms", "availStoreSizes", {
      params: {
        field: "availSizes.sizes.keyword",
        filter: { terms: { "availSizes.IStoreId.keyword": ["0000"] } }
      },
      opts: {
        size: 50
      }
    });
    // availStoreSizes: {
    //   aggs: { sizes: { terms: { field: 'availSizes.sizes.keyword', size: 50 } } },
    //   filter: { terms: { 'availSizes.IStoreId.keyword': ['0000'] } },
    // },

    expect(a.build()).toEqual({
      availStoreSizes: {
        aggs: { availStoreSizes_filtered: { terms: { field: "availSizes.sizes.keyword", size: 50 } } },
        filter: { terms: { "availSizes.IStoreId.keyword": ["0000"] } }
      }
    });
  });
});
