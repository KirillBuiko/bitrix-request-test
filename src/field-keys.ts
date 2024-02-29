const BaseFieldsKeys: FieldKeys<BaseFields> = {
    id: "ID"
}

export const dealsFieldKeys: FieldKeys<DealsFields> = {
    customsClearance: "UF_CRM_1707840911124",
    stage: "STAGE_ID",
    companyId: "COMPANY_ID",
    ...BaseFieldsKeys
}

export const requisitesFieldKeys: FieldKeys<RequisitesFields> = {
    entityId: "ENTITY_ID",
    entityTypeId: "ENTITY_TYPE_ID",
    inn: "RQ_INN",
    ...BaseFieldsKeys
}
