import React from 'react';
import ReactTooltip from 'react-tooltip';

interface SvgGoContractProps {
    index: string;
}

export const SvgGoContract: React.FC<SvgGoContractProps> = ({ index }) => (
    <>
        <svg
            data-testid="svg-gocontract"
            data-tip="Ir al contrato"
            data-for={`tooltip-go-contract-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#2B388F">
            <path d="m720-120-56-57 63-63H480v-80h247l-63-64 56-56 160 160-160 160Zm120-400h-80v-240h-80v120H280v-120h-80v560h200v80H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v240ZM480-760q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z" />
        </svg>
        <ReactTooltip 
            id={`tooltip-go-contract-${index}`} 
            effect="solid" 
            place="top"
            backgroundColor="#2B388F"
            textColor="#ffffff"
            padding="10px"
            delayShow={100}
        />
    </>
);
