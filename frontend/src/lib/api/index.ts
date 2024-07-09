export const handleResponse = async (response: Response) => {
	if (!response.ok) {
		alert(response.statusText);
		throw new Error(response.statusText);
	}
	return response.json();
};

export const handleError = (error: unknown) => {
	console.error("API Error:", error);
	throw error;
};

export const apiHeaders = (getAuthorization: () => string) => ({
	Accept: "application/json",
	"Content-Type": "application/json",
	Authorization: getAuthorization(),
});

export * from "./tournament";
export * from "./player";
export * from "./game";
export * from "./judge";
