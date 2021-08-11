import { TEXT } from '../../Builders/Text';

describe('TEXT tests', () => {
  test('Create match query ', async () => {
    const t = new TEXT()

      .add('match', {
        field: 'testField',
        params: {
          query: 'search text'
        },
        opts: {
          max_expansions: 1,
          analyzer: 'russian',
          auto_generate_synonyms_phrase_query: true,
          fuzziness: '6',
          operator: 'AND',
          prefix_length: 15,
          fuzzy_transpositions: true
        }
      })

      .build();

    expect(t).toHaveProperty(
      'match',
      expect.objectContaining({
        testField: {
          analyzer: 'russian',
          auto_generate_synonyms_phrase_query: true,
          fuzziness: '6',
          fuzzy_transpositions: true,
          max_expansions: 1,
          operator: 'AND',
          prefix_length: 15,
          query: 'search text'
        }
      })
    );
  });
  test('Create query_string ', async () => {
    const t = new TEXT()

      .add('query_string', {
        params: {
          query: 'search text'
        },
        opts: {
          default_field: 'my_text',
          analyzer: 'russian',
          auto_generate_synonyms_phrase_query: true,
          operator: 'AND',
          fuzzy_transpositions: true
        }
      })

      .build();

    expect(t).toHaveProperty(
      'query_string',
      expect.objectContaining({
        analyzer: 'russian',
        auto_generate_synonyms_phrase_query: true,
        default_field: 'my_text',
        fuzzy_transpositions: true,
        operator: 'AND',
        query: 'search text'
      })
    );
  });
});
