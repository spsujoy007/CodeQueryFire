/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'via.placeholder.com',
      },
      {
        hostname: 'i.pravatar.cc',
      },
    ]
    
  },
};

export default nextConfig;
