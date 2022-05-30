import { CreateTypeInput } from "apps/dashboard/ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Type from "apps/dashboard/repositories/type";
import { API_ENDPOINTS } from "apps/dashboard/utils/api/endpoints";
import { useTranslation } from "next-i18next";
export interface ITypeUpdateVariables {
  variables: {
    id: string;
    input: CreateTypeInput;
  };
}

export const useUpdateTypeMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: ITypeUpdateVariables) =>
      Type.update(`${API_ENDPOINTS.TYPES}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.TYPES);
      },
    }
  );
};
