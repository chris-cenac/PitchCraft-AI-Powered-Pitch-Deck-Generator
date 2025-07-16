// Select dropdown
export interface SelectDropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}
export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  error,
  children,
  ...props
}) => (
  <div className="mb-4">
    <label
      className="block mb-1 font-medium text-primary dark:text-accent"
      htmlFor={props.id}
    >
      {label}
    </label>
    <select
      {...props}
      className="w-full px-4 py-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent text-text-base dark:text-text-inverted"
    >
      {children}
    </select>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);
