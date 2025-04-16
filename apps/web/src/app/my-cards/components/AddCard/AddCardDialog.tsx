import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { useAppForm } from "@/ui-components/form/useAppForm";

import { cardSchema } from "@/features/card/validation/cardSchema";
import { DialogBaseProps } from "@/ui-components/dialog/dialogType";

interface Props extends DialogBaseProps {
  onSubmit: (card: SavedCard) => void;
}
type SavedCard = {
  title: string;
  content: string;
};

export const AddCardDialog = ({ open, setOpen, onSubmit }: Props) => {
  const form = useAppForm({
    defaultValues: {
      title: "",
      content: "",
    },
    validators: {
      onSubmit: cardSchema,
    },
    onSubmit: ({ value, formApi }) => {
      onSubmit(value);

      setOpen(false);
      formApi.reset();
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content maxWidth="450px">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <Dialog.Title>Add a card</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Add a card to memorize.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Title
              </Text>
              <form.AppField name="title">
                {(field) => (
                  <>
                    <field.FormTextField
                      placeholder="Enter the title"
                      defaultValue={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <field.FormErrorText>
                      {field.state.meta.errors[0]?.message}
                    </field.FormErrorText>
                  </>
                )}
              </form.AppField>
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Content
              </Text>
              <form.AppField name="content">
                {(field) => (
                  <>
                    <field.FormTextArea
                      placeholder="Enter the content for title"
                      defaultValue={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <field.FormErrorText>
                      {field.state.meta.errors[0]?.message}
                    </field.FormErrorText>
                  </>
                )}
              </form.AppField>
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <form.AppForm>
                <form.SubmitButton>Save</form.SubmitButton>
              </form.AppForm>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
