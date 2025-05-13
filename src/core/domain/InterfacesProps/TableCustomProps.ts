export interface TableCustomProps {
    list: any[];
    columns: CustomColumnTable[];
    multiSelected?: boolean;
    multiSelectedDisabled?: boolean;
    selectedIds?: string[];
    onSelecteds?: (ids: string[]) => void;
}

export interface CustomColumnTable{
    header: string;
    key: string;
    type?: string;
}
