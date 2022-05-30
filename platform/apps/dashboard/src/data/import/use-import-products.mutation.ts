import { useMutation, useQueryClient } from "react-query";
import Import from "apps/dashboard/src/repositories/import";
import { API_ENDPOINTS } from "apps/dashboard/src/utils/api/endpoints";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";

type Input = {
  shop_id: string;
  csv: any;
};
export const useImportProductsMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("common");

  return useMutation(
    (input: Input) => {
      return Import.importCsv(API_ENDPOINTS.IMPORT_PRODUCTS, input);
    },
    {
      onSuccess: () => {
        toast.success(t("common:product-imported-successfully"));
      },
      onError: (error: any) => {
        toast.error(t(`common:${error?.response?.data.message}`));
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS);
      },
    }
  );
};
