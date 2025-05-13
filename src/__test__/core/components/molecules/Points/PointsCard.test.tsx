import React from 'react';
import { render, screen } from '@testing-library/react';
import { PointsCard } from '@/core/components/molecules/Points/PointsCard';
import { DeliveryPoint } from '@/core/domain/Entities';

describe('PointsCard Component', () => {
    const mockHandleOpenModal = jest.fn();
    const mockPoints: DeliveryPoint[] = [
        {
            id: 1,
            codigoGDM: 'GDM001',
            nombre: 'Point 1',
            fecha: '2023-01-01',
            poder: '100',
            idPuntoEntregaGas: 101,
        },
        {
            id: 2,
            codigoGDM: 'GDM002',
            nombre: 'Point 2',
            fecha: '2023-01-02',
            poder: '200',
            idPuntoEntregaGas: 102,
        },
    ];

    it('renders the points correctly', () => {
        render(<PointsCard points={mockPoints} handleOpenModal={mockHandleOpenModal} />);

        mockPoints.forEach((point) => {
            expect(screen.getByText(point.nombre)).toBeInTheDocument();
            expect(screen.getByDisplayValue(point?.codigoGDM ?? "")).toBeInTheDocument();
            expect(screen.getByDisplayValue(point?.fecha ?? "")).toBeInTheDocument();
            expect(screen.getByDisplayValue(point?.poder ?? "")).toBeInTheDocument();
        });
    });
});