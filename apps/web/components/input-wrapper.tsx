import { Input } from "@repo/ui/src/components/input";
import { createDefaultValue, errorMessage, hasError } from "../lib/form";
import { ZodIssue } from "zod";

type Props<T> = {
  name: string;
  formData: FormData | undefined;
  errors: ZodIssue[] | undefined;
  defaultValue?: T;
} & React.ComponentProps<"input">;

export const InputWrapper = <T,>({
  name,
  formData,
  errors,
  defaultValue,
  ...props
}: Props<T>) => {
  const message = errorMessage({
    errors,
    name,
  });
  return (
    <>
      <Input
        {...props}
        id={name}
        name={name}
        defaultValue={createDefaultValue({
          formData,
          name,
          defaultValue,
        })}
        error={hasError({
          errors,
          name,
        })}
      />
      {message !== undefined && (
        <p className="text-red-500 text-sm font-medium">{message}</p>
      )}
    </>
  );
};
