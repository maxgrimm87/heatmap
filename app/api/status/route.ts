import type { NextApiRequest, NextApiResponse } from "next";
import net from "net";

async function isPortOpen(host: string, port: number, timeout = 2000): Promise<boolean> {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(timeout);

        socket.once("connect", () => {
            socket.destroy();
            resolve(true);
        });

        socket.once("error", () => resolve(false));
        socket.once("timeout", () => resolve(false));

        socket.connect(port, host);
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const [elasticsearch, rest] = await Promise.all([
        isPortOpen("localhost", 9200),
        isPortOpen("localhost", 8080),
    ]);

    res.status(200).json({ elasticsearch, rest });
}
