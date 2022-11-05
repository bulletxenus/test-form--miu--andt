
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/graphQL/schema.graphql",
  documents: "./src/queries.ts",
  generates: {
    "./src/graphQL/types/": {
      preset: "client",
      plugins: ['typescript']
    }
  }
};

export default config;
