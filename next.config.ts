import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */

    // for historical image domains on timeline
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'archivesonline.wcc.govt.nz',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'thumbnailer.digitalnz.org',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
