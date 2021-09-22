module.exports = {
  extends: ['airbnb', 'airbnb-typescript'],
  parserOptions: {
    createDefaultProgram: true,
    project: './tsconfig.json',
  },
  rules: {
    "import/prefer-default-export": ["off"],
  }
};
