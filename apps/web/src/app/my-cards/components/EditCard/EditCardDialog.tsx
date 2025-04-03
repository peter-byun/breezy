import { Button, Dialog, Flex, IconButton, Text } from "@radix-ui/themes";
import { useAppForm } from "@/ui-components/form/useAppForm";

import { useState } from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { cardSchema } from "@/features/card/validation/cardSchema";
import { css } from "@emotion/react";

type SavedCard = {
  title: string;
  content: string;
};

export const EditCardDialog = ({
  onSubmit,
}: {
  onSubmit: (card: SavedCard) => void;
}) => {
  const [open, setOpen] = useState(false);

  const form = useAppForm({
    defaultValues: {
      title: "",
      content: "",
    },
    validators: {
      onChange: cardSchema,
    },
    onSubmit: ({ value, formApi }) => {
      onSubmit(value);

      setOpen(false);
      formApi.reset();
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <IconButton
          color="blue"
          variant="outline"
          css={css`
            cursor: pointer;
          `}
        >
          <Pencil1Icon width="18" height="18" color="blue" />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <Dialog.Title>Edit Card</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Update the title or content.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Title
              </Text>
              <form.AppField name="title">
                {(field) => (
                  <field.FormTextField
                    placeholder="Enter the title"
                    defaultValue={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                )}
              </form.AppField>
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Content
              </Text>
              <form.AppField name="content">
                {(field) => (
                  <field.FormTextField
                    placeholder="Enter the content for title"
                    defaultValue={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
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
