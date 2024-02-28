import Bitrix from "@2bad/bitrix";
import {dealsFieldKeys} from "./src/field-keys";
import {Deals} from "./src/entities/deals";

const bitrix = Bitrix('https://profcons.bitrix24.ru/rest/1/ad742urjij2ktoy0');

const dealsFilterValues: FieldValues<DealsFields> = {
    customsClearance: '1',
    stage: "new"
};

(new Deals(bitrix)).getDealsList(dealsFilterValues, [dealsFieldKeys.companyId], {
    companyId: "asc"
}).then(res => {
    console.log(res);
})