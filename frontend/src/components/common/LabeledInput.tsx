import { Input } from "@shadcn/input";

interface LabeledInputProps {
	id: string;
	label: string;
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	errorMessage?: string;
	pattern?: string;
	inline?: boolean;
	className?: string;
}

export function LabeledInput({
	id,
	label,
	placeholder,
	value,
	onChange,
	errorMessage,
	pattern,
	inline = false,
	className,
}: LabeledInputProps) {
	return (
		<div className={`mb-4 ${inline ? "flex items-center" : ""}`}>
			<label
				htmlFor={id}
				className={`font-medium ${inline ? "mr-1 w-1/5" : "block mb-1"}`}
			>
				{label}
			</label>
			<div className={inline ? "w-4/5" : ""}>
				<Input
					id={id}
					value={value}
					onChange={onChange}
					type="text"
					placeholder={placeholder}
					className={`peer invalid:[&:not(:placeholder-shown):not(:focus)] ${className || ""}`}
					required
					pattern={pattern}
				/>
				{errorMessage && (
					<span
						id="error-msg"
						className="mt-1 hidden font-normal text-project_error peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
					>
						{errorMessage}
					</span>
				)}
			</div>
		</div>
	);
}
