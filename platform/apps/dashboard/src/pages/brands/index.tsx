import Card from "apps/dashboard/src/components/common/card";
import Layout from "apps/dashboard/src/components/layouts/admin";
import Search from "apps/dashboard/src/components/common/search";
import TypeList from "apps/dashboard/src/components/brand/brand-list";
import ErrorMessage from "apps/dashboard/src/components/ui/error-message";
import LinkButton from "apps/dashboard/src/components/ui/link-button";
import Loader from "apps/dashboard/src/components/ui/loader/loader";
import { SortOrder } from "apps/dashboard/src/ts-types/generated";
import { useState } from "react";
import { useTypesQuery } from "apps/dashboard/src/data/type/use-types.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "apps/dashboard/src/utils/routes";

export default function TypesPage() {
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState("created_at");
  const [page, setPage] = useState(1);
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data,
    isLoading: loading,
    error,
  } = useTypesQuery({
    limit: 20,
    page,
    text: searchTerm,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }

  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {t("common:sidebar-nav-item-groups")}
          </h1>
        </div>

        <div className="w-full xl:w-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <Search onSearch={handleSearch} />

          <LinkButton
            href={`${ROUTES.BRANDS}/create`}
            className="h-12 md:ms-6 w-full md:w-auto"
          >
            <span className="block md:hidden xl:block">
              + {t("form:button-label-add-group")}
            </span>
            <span className="hidden md:block xl:hidden">
              + {t("form:button-label-add")}
            </span>
          </LinkButton>
        </div>
      </Card>
      <TypeList types={data?.types} onOrder={setOrder} onSort={setColumn} onPagination={handlePagination} />
    </>
  );
}

TypesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
