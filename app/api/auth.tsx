
type AuthCredentials = {
  identifier: string;
  password: string;
};

type RegisterPayload = AuthCredentials & {
  name?: string;
};

type AuthResponse<T> = {
  data: T;
  status: number;
};

const getApiBaseUrl = () => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api';
  return apiUrl.replace(/\/$/, '');
};

const request = async <T extends unknown>(path: string, body: object): Promise<AuthResponse<T>> => {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const data = await response.json();

  if (!response.ok) {
    const message = (data && data.message) || 'Request failed';
    throw new Error(message);
  }

  return { data, status: response.status };
};


export const login = (credentials: AuthCredentials) =>
  request<{ token: string; user?: unknown }>('/auth/login', credentials);

export const register = (payload: RegisterPayload) =>
  request<{ token: string; user?: unknown }>('/auth/register', payload);