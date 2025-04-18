import { breezyApiClient } from "@/features-shared/breezy-api/breezy-api-client";
import { getCardQueryOptions } from "@/features/card/api/queryOptions";
import { Card, CardId } from "@/features/card/api/type";
import { Toast } from "@/ui-components/toast/Toast";
import { useOpenToast } from "@/ui-components/toast/useOpenToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CardReorderParams {
  id: CardId;
  toIdx: number;
  localCards: Card[];
}

export const useOptimisticReorderCards = () => {
  const queryClient = useQueryClient();

  const openToast = useOpenToast();

  const cardReorderMutation = useMutation({
    mutationFn: ({ id, toIdx }: CardReorderParams) =>
      breezyApiClient.patch(`/card/${id}/reorder`, {
        toIdx,
      }),
    onMutate: async (requestBody) => {
      await queryClient.cancelQueries(getCardQueryOptions);
      queryClient.setQueryData(getCardQueryOptions.queryKey, () => {
        return requestBody.localCards;
      });

      return {
        prevCards: queryClient.getQueryData(getCardQueryOptions.queryKey),
      };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        getCardQueryOptions.queryKey,
        () => context?.prevCards
      );
      openToast((props) => (
        <Toast {...props} title="An error occurred while moving a card." />
      ));
    },
    onSettled: () => queryClient.invalidateQueries(getCardQueryOptions),
  });

  const reorderCard = (params: CardReorderParams) => {
    cardReorderMutation.mutate(params);
  };

  return reorderCard;
};
