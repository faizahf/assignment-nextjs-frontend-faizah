import { useState } from "react";

interface UseFetchResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | unknown;
    fetchData: (
        endpoint: string,
        options: RequestInit | undefined
    ) => Promise<void>;
}

const useFetch = <T,>(): UseFetchResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null | unknown>(null);
    const url = 'https://assignment-nextjs-frontend-faizah-json-server.vercel.app'

    const fetchData = async (
        endpoint: string,
        options: RequestInit | undefined
      ) => {
        try {
          const response = await fetch(`${url}/${endpoint}`, options);
    
          if (!response.ok) {
            throw new Error(
              `Failed to feth data: ${response.status} ${response.statusText}`
            ).message;
          }
    
          const result = await response.json();
          setData(result);
        } catch (error: unknown) {
          setError(error || "An error occured while fetching data");
        } finally {
          setLoading(false);
        }
    };

    return {data, loading, error, fetchData};
};

export default useFetch;