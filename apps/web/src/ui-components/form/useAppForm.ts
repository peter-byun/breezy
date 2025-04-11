import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { SubmitButton } from "./SubmitButton";
import { FormTextField } from "./FormField";
import { FormNumberField } from "./FormNumberField";
import { FormErrorText } from "./FormErrorText";
import { FormTextArea } from "./FormTextArea";

const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    FormTextField,
    FormTextArea,
    FormNumberField,
    FormErrorText,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
