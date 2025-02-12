import type { NextConfig } from 'next';
import {NextRequest, NextResponse} from "next/server";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/elastic/:path*',
                destination: 'https://localhost:9200/:path*',
            },
        ];
    },
};

export default nextConfig;
