import { AttributeInput } from "apps/dashboard/src/ts-types/generated";
import { ROUTES } from "apps/dashboard/src/utils/routes";
import Attribute from "apps/dashboard/src/repositories/attribute";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "apps/dashboard/src/utils/api/endpoints";

export interface IAttributeCreateVariables {
  variables: {
    input: AttributeInput;
  };
}

export const useCreateAttributeMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IAttributeCreateVariables) =>
      Attribute.create(API_ENDPOINTS.ATTRIBUTES, input),
    {
      onSuccess: () => {
        router.push(`/${router?.query?.shop}${ROUTES.ATTRIBUTES}`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ATTRIBUTES);
      },
    }
  );
};
