// ORPC client composable for type-safe API calls
import type { AppType } from '../../d1-example/src/worker';

type RpcRequest = {
  method: string;
  params?: any;
};

type RpcResponse<T = any> = {
  result?: T;
  error?: string;
};

export const useRpc = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl || '';

  const call = async <T = any>(method: string, params?: any): Promise<T> => {
    const baseUrl = apiUrl === '/' || apiUrl === '' ? '' : apiUrl;
    const url = `${baseUrl}/rpc`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method,
        params,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const data: RpcResponse<T> = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    if (data.result === undefined) {
      throw new Error('No result in response');
    }

    return data.result;
  };

  return {
    call,
    // Convenience methods
    comments: {
      get: async (slug: string) => {
        const result = await call<{ data: Array<{
          id: number;
          author: string;
          body: string;
          post_slug: string;
          created_at: string;
        }> }>('comments.get', { slug });
        return result.data;
      },
      create: (slug: string, author: string, body: string) => 
        call<{ success: boolean; id: number }>('comments.create', { slug, author, body }),
    },
  };
};
