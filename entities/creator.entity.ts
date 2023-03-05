import {CSSProperties} from "vue";

export type BankFields = 'amount' | 'name' | 'bank' | 'account' | 'note' | 'id' | string

export interface BankConfig {
    [key: BankFields]: {
        value: string | number
        style: CSSProperties
    }
}

export interface BankCreatorProps {
    image: string
    config: BankConfig
}
