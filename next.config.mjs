/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
          {
            protocol: 'https',
            hostname: 'www.onlinesavaari.com',
            port: '',
            pathname: '/static/**',
          },
        // Add your image source hostname here
      ]
}
}

export default nextConfig;
