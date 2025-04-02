import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { SubmitButton } from "./SubmitButton";
import { FormTextField } from "./FormField";
import { FormNumberField } from "./FormNumberField";

const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    FormTextField,
    FormNumberField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
