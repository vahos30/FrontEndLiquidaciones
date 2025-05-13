import { useState, useEffect } from "react";
import { loadingService } from "@/services/loadingService";

const useLoading = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const subscription = loadingService.loading$.subscribe(setIsLoading);
		return () => subscription.unsubscribe();
	}, []);

	return isLoading;
};

export default useLoading;