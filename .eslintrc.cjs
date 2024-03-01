
require("dotenv").config()

/** @type {import('eslint').Linter.Config} */
module.exports = {
    "ignorePatterns": ["*.config.ts", "*.config.js", ".eslintrc.cjs"],
    "extends": ["clarity/vue-typescript"],
    "plugins": ["@ts-safeql/eslint-plugin"],
    "parserOptions": {
        "project": true,
        "tsconfigRootDir": __dirname,
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    rules: {
        '@ts-safeql/check-sql': [
          'error',
          {
            connections: [
              {
                connectionUrl: process.env.NUXT_DATABASE_URL,
                migrationsDir: './prisma/migrations',
                targets: [
                  { tag: 'prisma.+($queryRaw|$executeRaw)', transform: '{type}[]' },
                ],
              },
            ],
          },
        ],
        'indent': ["error", 4],
    },
    overrides: [
      {
        files: ['*.ts', '*.mts', '*.cts', '*.tsx', '*.vue'],
        rules: {
          'no-undef': 'off'
        }
      }
    ]
}