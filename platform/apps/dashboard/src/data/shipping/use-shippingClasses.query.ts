import { QueryParamsType, QueryOptionsType } from "apps/dashboard/src/ts-types/custom.types";
import { stringifySearchQuery } from "apps/dashboard/src/utils/data-mappers";
import { useQuery } from "react-query";
import Shipping from "apps/dashboard/src/repositories/shipping";
import { API_ENDPOINTS } from "apps/dashboard/src/utils/api/endpoints";

const fetchShippingClasses = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    text,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as QueryOptionsType;
  const searchString = stringifySearchQuery({
    name: text,
  });
  const url = `${API_ENDPOINTS.SHIPPINGS}?search=${searchString}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const { data } = await Shipping.all(url);
  return { shippingClasses: data };
};

const useShippingClassesQuery = (options: QueryOptionsType = {}) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.SHIPPINGS, options],
    fetchShippingClasses,
    {
      keepPreviousData: true,
    }
  );
};

export { useShippingClassesQuery, fetchShippingClasses };
