import { useEffect, useState } from 'react';
import { MultiValue } from 'react-select';
import { DeliveryPoint, Option } from '@/core/domain/Entities';
import { PointsApi } from '@/core/infrastructure/api';

export const useDeliveryPoints = () => {
    const pointsApi = new PointsApi();

    const [points, setPoints] = useState<DeliveryPoint[]>([]);
    const [filteredPoints, setFilteredPoints] = useState<DeliveryPoint[]>([]);
    const [pointsSelected, setPointsSelected] = useState<Option[]>([]);
    const [selectedPoint, setSelectedPoint] = useState<Option[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const loadPoints = async () => {
        try {
            const response = await pointsApi.getPoints();
            if (response) {
                setPoints(response);
                setPointsSelected(response.map((point) => ({ value: point?.id?.toString(), label: point?.nombre })));
                setFilteredPoints(response);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Error al cargar los puntos de entrega.");
        }
    };

    useEffect(() => {
        loadPoints();
    }, []);

    const handlePointChange = (selectedOptions: MultiValue<Option>) => {
        setSelectedPoint(selectedOptions as Option[]);
        if (selectedOptions.length > 0) {
            const selectedIds = selectedOptions.map((opt) => opt.value);
            setFilteredPoints(points.filter((point) => selectedIds.includes(point.id.toString())));
        } else {
            setFilteredPoints(points);
        }
    };

    return {
        filteredPoints,
        pointsSelected,
        selectedPoint,
        errorMessage,
        successMessage,
        setSuccessMessage,
        setErrorMessage,
        handlePointChange,
        loadPoints
    };
};
