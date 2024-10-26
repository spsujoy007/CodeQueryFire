/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'res.cloudinary.com',
          'via.placeholder.com',
          '/favicon.ico'
        ], // Add Cloudinary's domain here
      },
};

export default nextConfig;