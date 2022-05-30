import Base from "./base";

import { TaxInput, TaxUpdateInput } from "apps/dashboard/src/ts-types/generated";

class Tax extends Base<TaxInput, TaxUpdateInput> {}

export default new Tax();
