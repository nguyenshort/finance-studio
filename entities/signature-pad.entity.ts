interface OutValue {
    isEmpty: boolean
    data: string
}

export interface SignaturePadEntity {
    // return isEmpty, data
    saveSignature(): OutValue
    clearSignature(): void
}
