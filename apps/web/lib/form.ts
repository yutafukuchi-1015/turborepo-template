import { ZodIssue } from "zod";

type ErrorHandlingArgs = {
  errors: ZodIssue[] | undefined;
  name: string;
};
export const targetError = ({ errors, name }: ErrorHandlingArgs) =>
  errors?.find((error) => error.path.includes(name));
export const hasError = ({ errors, name }: ErrorHandlingArgs) =>
  targetError({
    errors,
    name,
  }) !== undefined;
export const errorMessage = ({ errors, name }: ErrorHandlingArgs) =>
  targetError({
    errors,
    name,
  })?.message;

export const createDefaultValue = <T>({
  formData,
  name,
  defaultValue,
}: {
  formData: FormData | undefined;
  name: string;
  defaultValue: T;
}) => (formData ? (formData?.get(name) as T) : defaultValue);
