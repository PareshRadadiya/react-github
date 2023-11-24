module.exports = {
  clearMocks: true,
  resetMocks: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.(ts|tsx)?$": "ts-jest"
  }, 
  moduleNameMapper: {
      "\\.(css|less|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy"
    },
  transformIgnorePatterns: [
    "/node_modules/(?!your-module-to-transpile)"
  ],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
  