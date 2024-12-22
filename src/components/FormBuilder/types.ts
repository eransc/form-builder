export interface Validator {
    errorMessage: string;
    validate: (value: any) => boolean;
}

export interface FieldInfo {
    name: string;
    type: string;
    value?: string;
    label: string;
    validators?: Validator[]; // Updated to support validation
}