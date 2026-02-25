const nextConfig = {
  output: 'standalone', // Docker performansı için kritik dip detay!
  // Marka bazlı asset yönetimi için burayı ileride genişleteceğiz
  transpilePackages: ['@nexdecor/ui'],
  reactCompiler: true,
};

export default nextConfig;
