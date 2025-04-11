import { css } from "@emotion/react";
import { Flex, Skeleton } from "@radix-ui/themes";
import { ITEM_SIZE, LIST_WIDTH } from "./DACardList";

const itemInvisiblePadding = 10;
const itemHeight = `${ITEM_SIZE - itemInvisiblePadding}px`;

export const DACardListLoading = () => {
  return (
    <Flex
      direction={"column"}
      width={`${LIST_WIDTH}px`}
      gap={"2"}
      css={css`
        padding: 20px;
      `}
    >
      <Skeleton width={"100%"} height={itemHeight}></Skeleton>
      <Skeleton width={"100%"} height={itemHeight}></Skeleton>
      <Skeleton width={"100%"} height={itemHeight}></Skeleton>
      <Skeleton width={"100%"} height={itemHeight}></Skeleton>
      <Skeleton width={"100%"} height={itemHeight}></Skeleton>
      <Skeleton width={"100%"} height={itemHeight}></Skeleton>
    </Flex>
  );
};
