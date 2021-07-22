module.exports = {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    createDefaultProgram: true,
    project: './tsconfig.json',
  },
  rules: {
    "import/prefer-default-export": ["off"],
  }
};
