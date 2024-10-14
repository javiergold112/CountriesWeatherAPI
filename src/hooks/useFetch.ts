import { useState, useEffect } from 'react';

const useFetch = <T = unknown>(url: string): [T | null, string | null, boolean] => {
	const [data, setData] = useState<T | null>(null),
		[error, setError] = useState<string | null>(null),
		[isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const controller = new AbortController();
		const fetchAPI = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(url, { signal: controller.signal });
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const json = await response.json();
				setData(json);
				setError(null);
			} catch (err) {
				setError((err as Error).message);
				setData(null);
			} finally {
				setIsLoading(false);
			}
		};
		fetchAPI();
		return () => controller.abort();
	}, [url]);

	return [data, error, isLoading];
}

export default useFetch;
