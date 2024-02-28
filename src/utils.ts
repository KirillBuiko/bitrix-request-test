export function valuesWithKeys<T>(values: FieldValues<T> | OrderFields<T>, keys: FieldKeys<T>): Record<string, string> {
    const fields = Object.keys(values);
    const result = {};
    fields.forEach((field) => {
        if(field in keys && field in values) {
            result[keys[field] as string] = values[field];
        } else {
            throw new Error("Keys or values are invalid!");
        }
    });
    return result;
}
