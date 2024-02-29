import {BaseEntityActions} from "./base-entity";
import Bitrix, {Deal, Method} from "@2bad/bitrix";
import {dealsFieldKeys} from "../field-keys";
import {DealsMethods} from "@2bad/bitrix/build/main/services/deals/methods";

export class Deals extends BaseEntityActions<DealsFields, keyof DealsMethods> {
    constructor(bitrix: ReturnType<typeof Bitrix>) {
        super(bitrix, dealsFieldKeys, {
            getMethod: Method.CRM_DEAL_GET,
            listMethod: Method.CRM_DEAL_LIST
        });
    }
}