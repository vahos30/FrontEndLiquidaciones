import React from 'react';
import { PointsDataCard } from '@/core/components/organisms';
import { ModalBase, StrongLine } from '@/core/components/atoms';
import { HeaderDeliveryPoint, MessageAndExit } from '@/core/components/molecules';
import { EditDeliveryPoint } from '@/core/components/molecules/Points/EditDeliveryPoint';
import { useDeliveryPoints, usePowerVersioning } from "@/pages/points/hooks";

const DeliveryPointsManager: React.FC = () => {
    const { filteredPoints, pointsSelected, selectedPoint, errorMessage, successMessage,
        setSuccessMessage, setErrorMessage, handlePointChange, loadPoints } = useDeliveryPoints();

    const { isConfirm, poderList, handleAdd, handleRemove, handleChange, openModalAndLoadData, handleSaveVersion, handleClose } = usePowerVersioning(setErrorMessage, setSuccessMessage, loadPoints);

    return (
        <>
            <header>
                <HeaderDeliveryPoint pointsSelected={pointsSelected} selectedPoint={selectedPoint} handlePointChange={handlePointChange} />
                <StrongLine />
            </header>
            <main>
                <PointsDataCard points={filteredPoints} handleOpenModal={openModalAndLoadData} />
            </main>
            <MessageAndExit errorMessage={errorMessage} successMessage={successMessage} />
            <ModalBase show={isConfirm} onHide={() => handleClose()} title="Versionamiento poder calorífico">
                <EditDeliveryPoint
                    powerList={poderList}
                    handleChange={handleChange}
                    handleAdd={handleAdd}
                    handleRemove={handleRemove}
                    handleSave={handleSaveVersion}
                    handleCloseModal={handleClose}
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                />
            </ModalBase>
        </>
    );
};

export default DeliveryPointsManager;
