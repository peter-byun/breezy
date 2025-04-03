import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { useAppForm } from "@/ui-components/form/useAppForm";

import { z } from "zod";
import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

type SavedCard = {
  title: string;
  content: string;
};

export const AddCardDialog = ({
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
      onChange: z.object({
        title: z.string().min(1).max(50),
        content: z.string().min(1).max(500),
      }),
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
        <Button>
          <PlusIcon width="18" height="18" />
          Add Card
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <Dialog.Title>Add Card</Dialog.Title>
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
                Description
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
