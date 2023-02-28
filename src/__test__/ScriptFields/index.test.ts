import { ScriptFields } from '../../Builders/ScriptFields';

describe('ScriptFields tests', () => {
  test('Create script field ', async () => {
    const s = new ScriptFields()
      .addScript('myScriptField', "doc['price'].value * params.factor", {
        factor: 2.0,
      })
      .build();

    expect(s).toHaveProperty(
      'script_fields',
      expect.objectContaining({
        myScriptField: { script: { params: { factor: 2 }, source: "doc['price'].value * params.factor" } },
      }),
    );
  });
});
