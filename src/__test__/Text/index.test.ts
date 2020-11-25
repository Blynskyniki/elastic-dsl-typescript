import { TEXT } from '../../Builders/Text';

describe('TEXT tests', () => {
  test('Create TEXT query ', async () => {
    const t = new TEXT()

      .add('match', {
        field: 'testField',
        params: {
          query: "search text"
        },
        opts: {
          max_expansions: 1,
          analyzer: "russian",
          auto_generate_synonyms_phrase_query: true,
          fuzziness: "6",
          operator: "AND",
          prefix_length: 15,
          fuzzy_transpositions: true
        }
      })

      .build();

    expect(t).toHaveProperty(
      "match",
      expect.objectContaining({
        testField: {
          analyzer: "russian",
          auto_generate_synonyms_phrase_query: true,
          fuzziness: "6",
          fuzzy_transpositions: true,
          operator: "AND",
          prefix_length: 15,
          query: "search text"
        }
      })
    );
  });
});
