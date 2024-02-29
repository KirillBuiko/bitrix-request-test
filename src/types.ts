type IdField = {id: string}

interface BaseFields extends IdField {

}

interface DealsFields extends BaseFields {
    customsClearance: string,
    stage: "new" | "whatEverElse",
    companyId: string
}

interface RequisitesFields extends BaseFields {
    entityId: string,
    entityTypeId: string,
    inn: string
}

type FieldKeys<T> = {[field in keyof T]: string}

type FieldValues<T> = {[field in keyof T]?: T[field]}

type OrderFields<T> = {[field in keyof T]?: "asc" | "desc"}
