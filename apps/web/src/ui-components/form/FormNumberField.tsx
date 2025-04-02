import { TextField } from "@radix-ui/themes";

type Props = TextField.RootProps;

export const FormNumberField = (props: Props) => {
  return <TextField.Root size="1" {...props} />;
};
