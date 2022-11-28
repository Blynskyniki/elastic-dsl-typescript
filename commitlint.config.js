module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [1, 'always', 120],
    'type-enum': [
      1,
      'always',
      ['docs', 'style', 'ci', 'debug', 'refactor', 'perf', 'fix', 'test', 'chore', 'build', 'revert', 'feat'],
    ],
    'type-case': [1, 'always', 'lower-case'],
    'type-empty': [1, 'never'],
    'subject-case': [0, 'always', 'lower-case'],
    'scope-case': [1, 'always', 'lower-case'],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
  },
};
