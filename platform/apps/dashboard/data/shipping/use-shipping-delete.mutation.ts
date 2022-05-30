import { useMutation, useQueryClient } from "react-query";
import Shipping from "apps/dashboard/repositories/product";
import { API_ENDPOINTS } from "apps/dashboard/utils/api/endpoints";

export const useDeleteShippingClassMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Shipping.delete(`${API_ENDPOINTS.SHIPPINGS}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.SHIPPINGS);
      },
    }
  );
};
