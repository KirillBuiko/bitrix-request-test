import Bitrix, {ListableMethod} from "@2bad/bitrix";
import {MethodPayloadType} from "@2bad/bitrix/build/main/methods";
import {valuesWithKeys} from "../utils";
import {ListPayload} from "@2bad/bitrix/build/main/payloads";

export class BaseEntityActions<FieldsT extends BaseFields> {
    constructor(private bitrix: ReturnType<typeof Bitrix>, protected fieldsKeys: FieldKeys<FieldsT>) {

    }

    protected async getList<MT extends ListableMethod>(methodName: MT,
            filterValues?: FieldValues<FieldsT>,
            selectFields?: string[],
            orderValues?: OrderFields<FieldsT>) {

        const callResult = await this.bitrix.list(methodName, {
            filter: filterValues && valuesWithKeys(filterValues, this.fieldsKeys),
            select: selectFields as string[],
            order: orderValues && valuesWithKeys(orderValues, this.fieldsKeys)
        });
        return callResult.result as ListPayload<MethodPayloadType<MT>>["result"];
    }
}