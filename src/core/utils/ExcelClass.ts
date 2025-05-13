import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export enum TypeColumn {
  Number = "Number",
  Date = "Date",
  DateTime = "DateTime",
  String = "String",
}

interface RowHeaderMapping {
  column: string;
  hide: boolean;
  typeColumn?: TypeColumn;
}

interface ListHeaderMapping {
  [key: string]: RowHeaderMapping;
}

interface HeaderMapping {
  [key: string]: string;
}

export class ExcelClass {
  public static ExportExcel = (
    data: any[],
    fileName: string,
    headerMapping: HeaderMapping = {},
    auxFileName: string = ""
  ) => {
    const transformedData = data.map((item) => {
      const transformedItem: any = {};
      Object.keys(item).forEach((key) => {
        if (item[key] && typeof item[key] === "object") {
          const element = item[key];
          Object.keys(element).forEach((keyInternal) => {
            const header =
              headerMapping[key + "." + keyInternal] || key + "." + keyInternal;
            transformedItem[header] = element[keyInternal];
          });
        } else {
          const header = headerMapping[key] || key;
          transformedItem[header] = item[key];
        }
      });

      return transformedItem;
    });

    this.GenerateExcel(fileName, transformedData, auxFileName);
  };

  public static ExportExcelObject = (
    data: any[],
    fileName: string,
    headerMapping: ListHeaderMapping = {},
    auxFileName: string = ""
  ) => {
    const transformedData = data.map((item) => {
      const transformedItem: any = {};
      Object.keys(item).forEach((key) => {
        if (item[key] && typeof item[key] === "object") {
          const element = item[key];
          Object.keys(element).forEach((keyInternal) => {
            const header =
              headerMapping[key + "." + keyInternal] ||
              ({
                column: key + "." + keyInternal,
                hide: false,
              } as RowHeaderMapping);

            if (!header.hide) {
              transformedItem[header.column] = this.GetValue(
                element[keyInternal],
                header.typeColumn ?? TypeColumn.String
              );
            }
          });
        } else {
          const header =
            headerMapping[key] ||
            ({
              column: key,
              hide: false,
            } as RowHeaderMapping);

          if (!header.hide) {
            transformedItem[header.column] = this.GetValue(
              item[key],
              header.typeColumn ?? TypeColumn.String
            );
          }
        }
      });

      return transformedItem;
    });

    this.GenerateExcel(fileName, transformedData, auxFileName);
  };

  private static GetValue = (valueColumn: any, typeColumn: TypeColumn) => {
    switch (typeColumn) {
      case TypeColumn.Number:
        return Number(valueColumn);
      case TypeColumn.Date:
        return valueColumn
          ? new Date(valueColumn)
              .toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replace(/\//g, "-")
          : "";
      case TypeColumn.DateTime:
        return valueColumn
          ? new Date(valueColumn).toLocaleString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "";
      default:
        return valueColumn;
    }
  };

  private static GenerateExcel<T>(
    fileName: string,
    transformedData: T[],
    auxFileName: string
  ) {
    const currentDate = new Date();
    const formattedDate =
      auxFileName ?? currentDate.toISOString().split("T")[0];
    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const fileNameWithDate = `${fileName}_${formattedDate}.xlsx`;

    saveAs(blob, fileNameWithDate);
  }
}
