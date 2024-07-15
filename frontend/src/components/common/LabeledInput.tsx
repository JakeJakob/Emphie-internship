import { Input } from "@shadcn/input";

export function LabeledInput({
	label,
	id,
	placeholder,
	value,
	onChange,
	errorMessage,
	pattern,
}: {
	label: string;
	id: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	errorMessage: string;
	pattern?: string;
}) {
	return (
		<label htmlFor={id}>
			<p className="mb-1 font-medium">{label}</p>
			<Input
				value={value}
				onChange={onChange}
				type="text"
				id={id}
				placeholder={placeholder}
				className="peer invalid:[&:not(:placeholder-shown):not(:focus)]"
				required
				pattern={pattern}
			/>
			<span
				id="error-msg"
				className="mt-1 mb-1 hidden font-normal text-project_error peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
			>
				{errorMessage}
			</span>
		</label>
	);
}
