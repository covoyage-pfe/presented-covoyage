/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/dashboard/my-account',
                permanent: true,
            }
        ]
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*',
            port: '',
            pathname: '/**',
          },
        ],
    },
};

export default nextConfig;
