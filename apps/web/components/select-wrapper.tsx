import { createDefaultValue, errorMessage, hasError } from "../lib/form";
import { ZodIssue } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";

type Props = {
  name: string;
  formData: FormData | undefined;
  errors: ZodIssue[] | undefined;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
} & React.ComponentProps<"input">;

export const SelectWrapper = ({
  name,
  formData,
  errors,
  defaultValue,
  options,
}: Props) => {
  const message = errorMessage({
    errors,
    name,
  });
  return (
    <>
      <Select
        name={name}
        defaultValue={createDefaultValue({
          formData,
          name,
          defaultValue,
        })}
      >
        <SelectTrigger
          error={hasError({
            errors,
            name,
          })}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => {
              return (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      {message !== undefined && (
        <p className="text-red-500 text-sm font-medium">{message}</p>
      )}
    </>
  );
};
