/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  basePath: "/gestion-festival",
  async redirects() {
    return [
      {
          source: '/',
          destination: '/gestion-festival',
          basePath: false,
          permanent: false
      }
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.justboil.me',
      },
    ],
  },
}

export default nextConfig