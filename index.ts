import Bitrix, {Company, Deal} from "@2bad/bitrix";
import {dealsFieldKeys, requisitesFieldKeys} from "./src/field-keys";
import {Deals} from "./src/entities/deals";
import {configDotenv} from "dotenv";
import * as process from "process";
import {Requisites} from "./src/entities/requisites";

configDotenv();

const bitrix = Bitrix(process.env.BITRIX_HOST);

const dealsFilterValues: FieldValues<DealsFields> = {
    customsClearance: '1',
    stage: "new"
};

console.log("Deals filter:", dealsFilterValues);

async function getCompanyRequisite(companyId: string) {
    try {
        return (await (new Requisites(bitrix).getList({
            filter: {
                entityId: companyId,
                entityTypeId: '4'
            },
            select: [requisitesFieldKeys.inn, requisitesFieldKeys.entityId, requisitesFieldKeys.entityTypeId]
        }))).result[0]
    } catch (e) {
        return null
    }
}

async function main() {
    try {
        const deals = (await (new Deals(bitrix)).getList({
            filter: dealsFilterValues,
            select: [dealsFieldKeys.companyId]
        })).result;
        console.log("Companies:", deals);

        const requisites = await Promise.all(
            deals.map(async (deal: Deal) => {
                const companyId = deal[dealsFieldKeys.companyId].toString();
                const requisite = (await getCompanyRequisite(companyId)) as RequisitesFields || {};
                delete requisite[requisitesFieldKeys.id];
                return {
                    [dealsFieldKeys.companyId]: companyId,
                    ...requisite
                }
            }))
        console.log("Inns:", requisites);
    } catch (e) {
        console.log("ERROR:", e);
    }
}

main();
