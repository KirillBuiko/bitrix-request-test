import {BaseEntityActions} from "./base-entity";
import Bitrix, {Method} from "@2bad/bitrix";
import {requisitesFieldKeys} from "../field-keys";
import {DealsMethods} from "@2bad/bitrix/build/main/services/deals/methods";

export class Requisites extends BaseEntityActions<RequisitesFields, keyof DealsMethods>{
    constructor(bitrix: ReturnType<typeof Bitrix>) {
        bitrix.contacts
        super(bitrix, requisitesFieldKeys, {
            listMethod: "crm.requisite.list",
            getMethod: "crm.requisite.get"
        });
    }
}