import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite abrir o dev server pelo túnel (celular) e pela rede local:
  // sem isso o Next bloqueia os scripts de dev e a página não hidrata.
  allowedDevOrigins: ["*.trycloudflare.com", "192.168.68.113"],
};

export default nextConfig;
