import { TextField } from "@radix-ui/themes";

type Props = TextField.RootProps;

export const FormTextField = (props: Props) => {
  return <TextField.Root size="3" {...props} />;
};
