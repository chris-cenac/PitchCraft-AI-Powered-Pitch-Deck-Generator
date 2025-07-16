// Radio group
export interface RadioOption {
  label: string;
  value: string;
}
export interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  selected?: string;
  onChange: (value: string) => void;
}
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  selected,
  onChange,
}) => (
  <fieldset className="mb-4">
    <legend className="block mb-1 font-medium text-primary dark:text-accent">
      {label}
    </legend>
    <div className="flex flex-col space-y-2">
      {options.map((opt) => (
        <label key={opt.value} className="inline-flex items-center">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => onChange(opt.value)}
            className="text-primary dark:text-accent focus:ring-primary dark:focus:ring-accent"
          />
          <span className="ml-2 text-text-base dark:text-text-inverted">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  </fieldset>
);
