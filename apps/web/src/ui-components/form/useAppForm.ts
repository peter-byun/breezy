import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { SubmitButton } from "./SubmitButton";
import { FormTextField } from "./FormField";
import { FormNumberField } from "./FormNumberField";
import { FormErrorText } from "./FormErrorText";

const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    FormTextField,
    FormNumberField,
    FormErrorText,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
