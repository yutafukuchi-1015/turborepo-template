import { ZodIssue } from "zod";

type ErrorHandlingArgs = {
  errors: ZodIssue[] | undefined;
  key: string;
};
export const targetError = ({ errors, key }: ErrorHandlingArgs) =>
  errors?.find((error) => error.path.includes(key));
export const hasError = ({ errors, key }: ErrorHandlingArgs) =>
  targetError({
    errors,
    key,
  }) !== undefined;
export const errorMessage = ({ errors, key }: ErrorHandlingArgs) =>
  targetError({
    errors,
    key,
  })?.message;

export const createDefaultValue = <T>({
  formData,
  key,
  defaultValue,
}: {
  formData: FormData | undefined;
  key: string;
  defaultValue: T;
}) => (formData ? (formData?.get(key) as T) : defaultValue);
