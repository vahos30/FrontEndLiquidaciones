import { useState } from "react";
import { PointsApi } from "@/core/infrastructure/api";
import { DeliveryPoint } from "@/core/domain/Entities";

export const usePowerVersioning = (setErrorMessage: (msg: string) => void, setSuccessMessage: (msg: string) => void, loadPoints: () => void) => {
    const pointsApi = new PointsApi();

    const [isConfirm, setIsConfirm] = useState(false);
    const [poderList, setPoderList] = useState<DeliveryPoint[]>([
        { id: 0, codigoGDM: "", nombre: "", fecha: "", poder: "" }
    ]);

    const validateDuplicateDates = (list: DeliveryPoint[]) => {
        const dates = list.map(item => item.fecha).filter(Boolean);
        const hasDuplicates = new Set(dates).size !== dates.length;
        setErrorMessage(hasDuplicates ? "No se permiten fechas duplicadas." : "");
    };

    const handleAdd = () => {
        setPoderList(prev => [...prev, { ...prev[0], fecha: "", poder: "" }]);
    };

    const handleRemove = (index: number) => {
        const updatedList = poderList.filter((_, i) => i !== index);
        setPoderList(updatedList);
        validateDuplicateDates(updatedList);
    };

    const handleChange = (index: number, fieldName: keyof DeliveryPoint, value: string) => {
        setPoderList(prev => {
            const updated = [...prev];
            updated[index][fieldName] = value;
            return updated;
        });

        if (fieldName === "fecha") {
            validateDuplicateDates(poderList);
        }
    };

    const openModalAndLoadData = async (id: number) => {
        setErrorMessage("");
        setSuccessMessage("");
        try {
            const response = await pointsApi.getPointById(id);
            if (response) {
                setPoderList(response);
                setIsConfirm(true);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Error al cargar el punto de entrega.");
        }
    };

    const handleSaveVersion = async () => {
        try {
            const response = await pointsApi.updatePoint(poderList);
            if (response) {
                setSuccessMessage("Punto de entrega guardado correctamente.");
                handleClose();
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Error al guardar el punto de entrega.");
        }
    };

    const handleClose = () => {
        setIsConfirm(false);
        setTimeout(() => {
            loadPoints();
        }, 300);
    };

    return {
        isConfirm,
        poderList,
        handleAdd,
        handleRemove,
        handleChange,
        openModalAndLoadData,
        handleSaveVersion,
        handleClose
    };
};
