import ErrorMessage from "apps/dashboard/src/components/ui/error-message";
import Loader from "apps/dashboard/src/components/ui/loader/loader";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ShopForm from "apps/dashboard/src/components/shop/shop-form";
import ShopLayout from "apps/dashboard/src/components/layouts/shop";
import { adminAndOwnerOnly } from "apps/dashboard/src/utils/auth-utils";
import { useShopQuery } from "apps/dashboard/src/data/shop/use-shop.query";

export default function UpdateShopPage() {
  const { query } = useRouter();
  const { shop } = query;
  const { t } = useTranslation();
  const { data, isLoading: loading, error } = useShopQuery(shop as string);
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-shop")}
        </h1>
      </div>
      <ShopForm initialValues={data?.shop} />
    </>
  );
}
UpdateShopPage.authenticate = {
  permissions: adminAndOwnerOnly,
};
UpdateShopPage.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
