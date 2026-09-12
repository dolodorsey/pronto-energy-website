import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/videos/portal.mp4',
        destination: '/api/media/drive/10c_cA4sXLR36eE2JnFy6A9cidgDPSXPU',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
