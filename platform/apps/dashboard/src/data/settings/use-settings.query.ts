import Settings from "apps/dashboard/src/repositories/settings";
import { useQuery } from "react-query";
import { Settings as TSettings } from "apps/dashboard/src/ts-types/generated";
import { API_ENDPOINTS } from "apps/dashboard/src/utils/api/endpoints";

export const fetchSettings = async () => {
  const { data } = await Settings.all(API_ENDPOINTS.SETTINGS);
  return data;
};

export const useSettingsQuery = () => {
  return useQuery<TSettings, Error>([API_ENDPOINTS.SETTINGS], () =>
    fetchSettings()
  );
};
