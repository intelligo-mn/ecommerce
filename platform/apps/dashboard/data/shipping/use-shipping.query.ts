import Shipping from "apps/dashboard/repositories/shipping";
import { useQuery } from "react-query";
import { Shipping as TShipping } from "apps/dashboard/ts-types/generated";
import { API_ENDPOINTS } from "apps/dashboard/utils/api/endpoints";

export const fetchShipping = async (id: string) => {
  const { data } = await Shipping.find(`${API_ENDPOINTS.SHIPPINGS}/${id}`);
  return data;
};

export const useShippingQuery = (id: string) => {
  return useQuery<TShipping, Error>([API_ENDPOINTS.SHIPPINGS, id], () =>
    fetchShipping(id)
  );
};
