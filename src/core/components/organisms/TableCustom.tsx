import { Form, Table } from "react-bootstrap";
import { StatusBadge } from "../molecules";
import { TableCustomProps } from "@/core/domain/InterfacesProps";

export const TableCustom: React.FC<TableCustomProps> = (props: TableCustomProps) => {

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(props.onSelecteds !== undefined){
            if (event.target.checked) {
                props.onSelecteds(props.list.map((item) => item.id!));
            } else {
                props.onSelecteds([]);
            }
        }
    };

    const handleSelect = (id: string) => {
        if(props.onSelecteds !== undefined) {
         props.onSelecteds(
            props.selectedIds?.includes(id)
                ? props.selectedIds.filter((selectedId: string) => selectedId !== id)
                : [...props.selectedIds!, id]
            );
        }
    };

    return (
        <Table responsive className="nominations-table text-center">
            <thead>
                <tr>
                    { props.multiSelected &&
                        <th >
                            <Form.Check
                                disabled={props.multiSelectedDisabled}
                                className="cursor-pointer"
                                type="checkbox"
                                checked={props.selectedIds?.length === props.list.length}
                                onChange={handleSelectAll}
                            />
                        </th>
                    }
                    { props.columns.map((column, i) => (<th key={i}>{column.header}</th>))}
                </tr>
            </thead>
            <tbody>
                {props.list.map((item) => (
                    <tr key={item.id}>
                        { props.multiSelected && 
                            <td className="cursor-pointer">
                                <Form.Check
                                    disabled={props.multiSelectedDisabled}
                                    className="cursor-pointer"
                                    type="checkbox"
                                    checked={props.selectedIds?.includes(item.id!)}
                                    onChange={() => handleSelect(item.id!)}
                                />
                            </td>
                        }
                        { props.columns.map((column, i) => {
                            if(column["type"] == "STATE") return (<td key={i}><StatusBadge status={item[column.key]} tooltip={item["errorMessage"]} /></td>);
                            return (<td key={i}>{item[column.key]}</td>);
                        })}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}