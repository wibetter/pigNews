const isDevelopmentEnv = () => process.env.NODE_ENV === 'development';
const isProductionEnv = () => process.env.NODE_ENV === 'production';

export { isDevelopmentEnv, isProductionEnv };
