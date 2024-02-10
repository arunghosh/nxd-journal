export default {
  // compilerOptions: {
  //   module: "es2020",
  //   moduleResolution: "node",
  // },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
