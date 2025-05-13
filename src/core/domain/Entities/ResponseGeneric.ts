export interface ResponseGeneric {
    errors: any;
    success: boolean;
    value: any;
    mensaje?: string | null;
}