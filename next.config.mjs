/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,  // Enable server actions. This is a temporary flag and will be removed in the future.
    },
    images: {
        domains: ['github.com', 'lh3.googleusercontent.com'],
    }
};

export default nextConfig;
