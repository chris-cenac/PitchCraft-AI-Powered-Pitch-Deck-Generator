// Toggle switch
export interface ToggleSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id,
  label,
  checked,
  onChange,
}) => (
  <div className="mb-4 flex items-center">
    <label
      htmlFor={id}
      className="mr-3 font-medium text-primary dark:text-accent"
    >
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-200 ${
          checked ? "bg-primary dark:bg-accent" : "bg-gray-200 dark:bg-gray-700"
        }`}
      />
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white dark:bg-surface-dark rounded-full shadow transform transition-transform duration-200 ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </div>
  </div>
);
