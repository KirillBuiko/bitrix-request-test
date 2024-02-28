import {BaseEntityActions} from "./base-entity";
import Bitrix, {Deal, Method} from "@2bad/bitrix";
import {dealsFieldKeys} from "../field-keys";

export class Deals extends BaseEntityActions<DealsFields> {
    constructor(bitrix: ReturnType<typeof Bitrix>) {
        super(bitrix, dealsFieldKeys);
    }

    async getDealsList(filterValues?: FieldValues<DealsFields>,
                  selectFields?: string[],
                  orderValues?: OrderFields<DealsFields>): Promise<readonly Deal[] | null> {
        return super.getList(Method.CRM_DEAL_LIST, filterValues, selectFields, orderValues);
    }
}