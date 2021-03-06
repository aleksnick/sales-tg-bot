module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base'],
  parserOptions: {
    createDefaultProgram: true,
    project: './tsconfig.json',
  },
  rules: {
    "import/prefer-default-export": ["off"],
  }
};
