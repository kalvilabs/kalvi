import { Input } from "../../../src/partials/input";
import { Label } from "../../../src/partials/label";
/**
 * It is wrapper class for the input fields in which the inputs should be passed as children.
 *
 * Preferrably the children should be InputField components
 *
 */
export function InputsWrapper({ children }: { children: React.ReactNode }) {
  return <ul className="w-full max-w-md">{children}</ul>;
}

/**
 * This is input field which is aligned with the design of the auth page
 *
 */
export function InputField({
  fieldName,
  type,
  placeholder,
}: {
  fieldName: string;
  type: string;
  placeholder?: string;
}) {
  return (
    <li>
      <Label htmlFor={fieldName}>{fieldName}</Label>
      <Input
        id={fieldName}
        type={type}
        placeholder={placeholder && placeholder}
      />
    </li>
  );
}