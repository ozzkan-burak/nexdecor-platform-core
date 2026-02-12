import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone', // Docker performansı için kritik dip detay!
  // Marka bazlı asset yönetimi için burayı ileride genişleteceğiz
};

export default nextConfig;
