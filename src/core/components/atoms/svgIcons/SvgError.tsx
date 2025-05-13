import React from 'react';
import ReactTooltip from "react-tooltip";
import { TooltipProps } from '@/core/domain/InterfacesProps';
import { ExclamationCircleFill } from 'react-bootstrap-icons';

export const SvgError: React.FC<TooltipProps> = ({ message, index }) => {
    return (
        <>
            {message?.length > 0 && (
                <>
                    <ExclamationCircleFill
                        size={25}
                        color="red"
                        data-tip={message}
                        data-for={`error-${index}`}
                        className="error-icon mt-1"
                        data-testid="error-icon"
                    />
                    <ReactTooltip
                        id={`error-${index}`}
                        effect="solid"
                        type="error"
                        className="custom-tooltip"
                        role="tooltip"
                    >
                        <div className="tooltip-header">Error presentado</div>
                        <div className="tooltip-body">{message}</div>
                    </ReactTooltip>
                </>
            )}
        </>
    );
};
