import React, { useState } from "react";
import { Accordion, Card, Container } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CustomAccordionProps {
    header: React.ReactNode;
    children: React.ReactNode;
    clas: string;
}

export const CustomAccordion: React.FC<CustomAccordionProps> = ({ header, children, clas }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Accordion activeKey={isOpen ? "0" : ""} className={clas}>
            <Card className="border-0 shadow-sm">
                <Accordion.Item eventKey="0">
                    <div
                        className="p-3 d-flex align-items-center justify-content-between bg-white border rounded"
                        style={{ cursor: "pointer", width: "100%" }}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div style={{ flexGrow: 1 }}>{header}</div>
                        <div>{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
                    </div>
                    <Accordion.Collapse eventKey="0">
                        <Container fluid className="bg-light p-3">
                            {children}
                        </Container>
                    </Accordion.Collapse>
                </Accordion.Item>
            </Card>
        </Accordion>
    );
};
