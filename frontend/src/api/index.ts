import { useAuthStore } from "@/stores/auth.store";
import { showErrorToast } from "@/utils";
export const BASE_URL = "http://localhost:3000";

export const handleResponse = async (response: Response) => {
	if (!response.ok) {
		//alert(response.statusText);
		showErrorToast(response.statusText)
	}
	return handleResponseWithoutAlert(response);
};

export const handleResponseWithoutAlert = async (response: Response) => {
	if (!response.ok) {
		throw new Error(response.statusText + " code: " + response.status);
	}
	return response.json();
};

export const handleError = (error: unknown) => {
	//showErrorToast(error + "");
	//console.error("API Error:", error);
	throw error;
};

export const apiHeaders = (getAuthorization: () => string | undefined) => ({
	Accept: "application/json",
	"Content-Type": "application/json",
	Authorization: getAuthorization() || "",
});

export const apiFetch = async (
	url: string,
	method: string,
	body?: object
): Promise<Response> => {
	const { getAuthorization } = useAuthStore.getState();

	const options: RequestInit = {
		method,
		headers: apiHeaders(getAuthorization),
	};

	if (body) {
		options.body = JSON.stringify(body);
	}

	return fetch(url, options);
};

export * from "./tournament";
export * from "./player";
export * from "./game";
export * from "./judge";
