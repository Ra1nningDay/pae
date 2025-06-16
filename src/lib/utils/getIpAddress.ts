// Get user IP address with multiple fallback services
export const getUserIpAddress = async (): Promise<string> => {
  const ipServices = [
    "https://api.ipify.org?format=json",
    "https://ipapi.co/ip/",
    "https://icanhazip.com",
    "https://ident.me/",
  ];

  for (const service of ipServices) {
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(service, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) continue;

      if (service.includes("ipify.org") || service.includes("ipapi.co/ip/")) {
        const data = await response.json();
        const ip = typeof data === "object" ? data.ip : data;
        if (ip && isValidIp(ip)) return ip;
      } else {
        const ip = (await response.text()).trim();
        if (ip && isValidIp(ip)) return ip;
      }
    } catch (error) {
      console.warn(`IP service ${service} failed:`, error);
      continue;
    }
  }

  // If all services fail, return unknown
  return "unknown";
};

// Simple IP validation
const isValidIp = (ip: string): boolean => {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

export default getUserIpAddress;
