// /** @type {import('next').NextConfig} */
// // const nextConfig = {};

// export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     webpack(config) {
//       config.module.rules.push({
//         test: /\.(mp4|webm|ogg)$/i, // پسوندهای فایل‌های ویدئویی
//         type: 'asset/resource', // نوع مدیریت فایل
//       });
//       return config;
//     },
//   };
  
//   module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      config.module.rules.push({
        test: /\.(mp4|webm|ogg)$/i, // پسوندهای فایل‌های ویدئویی
        type: 'asset/resource', // نوع مدیریت فایل
      });
      return config;
    },
  };
  
  export default nextConfig;