import { Nested } from '../../Builders/Nested';

describe('Nested tests', () => {
  test('Create nested query', async () => {
    const n = new Nested('myNestedField')
      .addProp('query', {
        matchAll: {},
      })
      .addProp('score_mode', 'avg')
      .addProp('inner_hits', {
        _source: ['mySourceFiled'],
        name: 'nestedData',
        size: 100500,
      });

    expect(n.build()).toHaveProperty(
      'nested',
      expect.objectContaining({
        inner_hits: { _source: ['mySourceFiled'], name: 'nestedData', size: 100500 },
        path: 'myNestedField',
        query: { matchAll: {} },
        score_mode:'avg'
      }),
    );
  });
});
