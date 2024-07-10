/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@shadcn/button";
import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@shadcn/drawer";
import { Input } from "@shadcn/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shadcn/select";

export interface FormField {
	name: string;
	type?: string;
	id: string;
	placeholder?: string;
	className?: string;
	pattern?: string;
	required?: boolean;
	options?: { id: string; text: string }[];
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
		setFormData({});
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
						{field.type == "select" ? (
							<Select
								onValueChange={(value) =>
									handleInputChange(field.id, value)
								}
								required={field.required}
							>
								<SelectTrigger
									id={field.id}
									className={
										field.className ||
										"w-4/5 peer invalid:[&:not(:placeholder-shown):not(:focus)]"
									}
								>
									<SelectValue
										placeholder={field.placeholder}
									/>
								</SelectTrigger>
								<SelectContent position="popper">
									{field.options?.map((option) => (
										<SelectItem
											key={option.id}
											value={option.id}
										>
											{option.text}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : (
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
						)}
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
