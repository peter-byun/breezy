import { DndItem } from "@/ui-components/dnd/DnDItem/DnDItem";
import { DndItemLayout } from "@/ui-components/dnd/DnDItem/DndItemLayout";
import { Text } from "@radix-ui/themes";

export const ActiveDraggableDndItem = ({ title }: { title: string }) => {
  return (
    <DndItem
      title={
        <DndItemLayout>
          <Text>{title}</Text>
        </DndItemLayout>
      }
      wrapperStyle={{
        padding: 5,
      }}
      dragOverlay={true}
    />
  );
};
