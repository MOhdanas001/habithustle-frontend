import { headers as nextHeaders } from "next/headers";

export async function backendfetch(endpoint: string, options: RequestInit = {}) {
  const apiUrl = process.env.NEXT_API_URL || 'http://localhost:8081/api';
  const url = `${apiUrl}${endpoint}`;

  const requestHeaders = await nextHeaders();

  const cookieHeader = requestHeaders.get("cookie") ?? "";

  const baseHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(cookieHeader ? { 'Cookie': cookieHeader } : {}),
  };

  const merged = new Headers(baseHeaders);
  if (options.headers) {
    const opt = options.headers as HeadersInit;
    if (opt instanceof Headers) {
      opt.forEach((v, k) => merged.set(k, v));
    } else if (Array.isArray(opt)) {
      opt.forEach(([k, v]) => merged.set(k, String(v)));
    } else {
      Object.entries(opt).forEach(([k, v]) => merged.set(k, String(v)));
    }
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers: merged,
    // `cache` is a top-level RequestInit option, not a header
    cache: 'no-store',
  };

  // If body is an object (and not FormData), stringify it for JSON requests
  if (
    fetchOptions.body &&
    typeof fetchOptions.body === 'object' &&
    !(fetchOptions.body instanceof FormData)
  ) {
    try {
      fetchOptions.body = JSON.stringify(fetchOptions.body);
    } catch (e) {
      // leave body as-is if it can't be stringified
    }
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Error fetching ${endpoint}: ${response.status} ${response.statusText} ${text}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}