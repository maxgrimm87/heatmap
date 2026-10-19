import path from "node:path";
import * as fs from "node:fs";


export function loadElasticCert() {
    const certPath = path.join(process.cwd(), 'certs/ca.crt');
    return fs.readFileSync(certPath, 'utf8');
}
