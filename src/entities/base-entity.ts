import Bitrix, {Deal, GettableMethod, ListableMethod, Method} from "@2bad/bitrix";
import {MethodParams, MethodPayloadType, Methods} from "@2bad/bitrix/build/main/methods";
import {valuesWithKeys} from "../utils";
import {ListPayload} from "@2bad/bitrix/build/main/payloads";
import {DealsMethods} from "@2bad/bitrix/build/main/services/deals/methods";

interface MethodNames<EntityMT extends Method> {
    listMethod: EntityMT & ListableMethod | string,
    getMethod: EntityMT & GettableMethod | string,
}

export interface RequestOptions<FieldsT> {
    filter?: FieldValues<FieldsT>,
    select?: string[],
    order?: OrderFields<FieldsT>,
    id?: string
}

export type MethodOptionsFields<M extends Method> = keyof MethodParams<M>
export type MethodOptions<FieldsT, M extends Method> =
    { [field in (keyof RequestOptions<FieldsT> & MethodOptionsFields<M>)]?: RequestOptions<FieldsT>[field] }

export class BaseEntityActions<
    FieldsT extends BaseFields,
    EntityMT extends Method> {
    constructor(protected bitrix: ReturnType<typeof Bitrix>,
                protected fieldsKeys: FieldKeys<FieldsT>,
                protected methodNames: MethodNames<EntityMT>) {
    }

    async getList(options: MethodOptions<FieldsT, EntityMT & ListableMethod>) {
        return await this.baseRequest(this.methodNames.listMethod, options);
    }

    async get(options: MethodOptions<FieldsT, EntityMT & GettableMethod>) {
        try {
            return await this.baseRequest(this.methodNames.getMethod, options);
        } catch (e) {
            return null;
        }
    }

    protected async baseRequest<M extends Method | string>(method: M, options: RequestOptions<FieldsT>) {
        const callResult = await this.bitrix.call(method as any, {
            filter: options.filter && valuesWithKeys(options.filter, this.fieldsKeys),
            select: options.select as string[],
            order: options.order && valuesWithKeys(options.order, this.fieldsKeys)
        });
        return callResult as ListPayload<MethodPayloadType<M extends Method ? M : Method>>;
    }
}
