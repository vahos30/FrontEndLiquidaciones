import { Line } from "@components/atoms";

export const NoData: React.FC = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-4 text-center">
            <p className="text-muted fw-bold fs-5">No hay datos disponibles</p>
            <Line />
        </div>
    );
};
