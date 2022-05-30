import {
  QueryParamsType,
  WithdrawsQueryOptionsType,
} from "apps/dashboard/src/ts-types/custom.types";
import { mapPaginatorData } from "apps/dashboard/src/utils/data-mappers";
import { useQuery } from "react-query";
import Withdraw from "apps/dashboard/src/repositories/withdraw";
import { API_ENDPOINTS } from "apps/dashboard/src/utils/api/endpoints";
import { WithdrawPaginator } from "apps/dashboard/src/ts-types/generated";

const fetchWithdraws = async ({
  queryKey,
}: QueryParamsType): Promise<{ withdraws: WithdrawPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    limit = 15,
    shop_id,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as WithdrawsQueryOptionsType;

  const url = `${API_ENDPOINTS.WITHDRAWS}?shop_id=${shop_id}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;

  const {
    data: { data, ...rest },
  } = await Withdraw.all(url);
  return {
    withdraws: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useWithdrawsQuery = (
  params: WithdrawsQueryOptionsType,
  options: any = {}
) => {
  return useQuery<{ withdraws: WithdrawPaginator }, Error>(
    [API_ENDPOINTS.WITHDRAWS, params],
    fetchWithdraws,
    { ...options, keepPreviousData: true }
  );
};

export { useWithdrawsQuery, fetchWithdraws };
