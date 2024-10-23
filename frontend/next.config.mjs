/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'res.cloudinary.com',
          'via.placeholder.com'
        ], // Add Cloudinary's domain here
      },
};

export default nextConfig;