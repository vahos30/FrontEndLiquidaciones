import { NoData, PointsCard } from "@/core/components/molecules";
import { DeliveryPoint } from "@/core/domain/Entities";

interface PointsDataProps {
    points: DeliveryPoint[];
    handleOpenModal: (point: any) => void;
}

export const PointsDataCard: React.FC<PointsDataProps> = ({ points, handleOpenModal }) => {
    return points?.length > 0 ?
        (<PointsCard points={points} handleOpenModal={handleOpenModal} />) : (<NoData />);
}