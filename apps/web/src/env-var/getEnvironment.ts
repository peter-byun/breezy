export const getEnvironment = () => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isTest = process.env.NODE_ENV === "test";

  return {
    isDevelopment,
    isTest,
  };
};
