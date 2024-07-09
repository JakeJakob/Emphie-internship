import { useState } from "react";
import { Button } from "@/lib/components/shadcn/button";
import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/lib/components/shadcn/drawer";
import { Input } from "@/lib/components/shadcn/input";

export interface FormField {
	name: string;
	type?: string;
	id: string;
	placeholder?: string;
	className?: string;
	pattern?: string;
	required?: boolean;
}

export function CreateDrawer(props: {
	header: string;
	description: string;
	fields: FormField[];
	onSubmit: (formData: Record<string, any>) => void;
}) {
	const [formData, setFormData] = useState<Record<string, any>>({});

	const handleInputChange = (id: string, value: any) => {
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleSubmit = () => {
		props.onSubmit(formData);
	};

	return (
		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle>{props.header}</DrawerTitle>
				<DrawerDescription>{props.description}</DrawerDescription>
			</DrawerHeader>

			<div className="p-4 ml-12 mr-12">
				{props.fields.map((field: FormField) => (
					<div className="flex items-center mb-4" key={field.id}>
						<label htmlFor={field.id} className="mr-1 w-1/5">
							<p className="font-medium">{field.name}</p>
						</label>
						<Input
							type={field.type || "text"}
							id={field.id}
							placeholder={field.placeholder}
							className={
								field.className ||
								"w-4/5 peer invalid:[&:not(:placeholder-shown):not(:focus)]"
							}
							pattern={field.pattern}
							required={field.required}
							onChange={(e) =>
								handleInputChange(field.id, e.target.value)
							}
						/>
					</div>
				))}
			</div>

			<DrawerFooter>
				<Button className="w-full" onClick={handleSubmit}>
					Zapisz
				</Button>
				<DrawerClose>
					<Button variant="outline" className="w-full">
						Anuluj
					</Button>
				</DrawerClose>
			</DrawerFooter>
		</DrawerContent>
	);
}
