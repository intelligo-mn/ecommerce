import { QueryParamsType, QueryOptionsType } from "apps/dashboard/src/ts-types/custom.types";
import { stringifySearchQuery } from "apps/dashboard/src/utils/data-mappers";
import { useQuery } from "react-query";
import Attribute from "apps/dashboard/src/repositories/attribute";
import { API_ENDPOINTS } from "apps/dashboard/src/utils/api/endpoints";

const fetchAttributes = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    text,
    shop_id,
    orderBy = "updated_at",
    sortedBy = "desc",
  } = params as QueryOptionsType;
  const searchString = stringifySearchQuery({
    name: text,
    shop_id: shop_id,
  });
  const url = `${API_ENDPOINTS.ATTRIBUTES}?search=${searchString}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const { data } = await Attribute.all(url);
  return { attributes: data };
};

const useAttributesQuery = (
  params: QueryOptionsType = {},
  options: any = {}
) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.ATTRIBUTES, params],
    fetchAttributes,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

export { useAttributesQuery, fetchAttributes };
