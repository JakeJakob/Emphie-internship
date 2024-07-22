import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChessTitle } from "@types";
import { toast } from "react-toastify";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function TitleToColor(title: ChessTitle): string {
	const titleColors: Record<ChessTitle, string> = {
		GM: "#B92B2B",
		IM: "#2BB953",
		FM: "#2B30B9",
		CM: "#B92B91",
		WGM: "#B92B2B",
		WIM: "#2BB953",
		WFM: "#2B30B9",
		WCM: "#B92B91",
		[ChessTitle.NONE]: ""
	};

	return titleColors[title];
}

export function getErrorMessage(error: any): string {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}

export function showErrorToast(message: string) {
	const prefix = "Zgłoś ten błąd do obsługi technicznej turnieju! ";
	toast.error(`${prefix}${message}`);
}