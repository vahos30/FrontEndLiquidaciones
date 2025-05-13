import { TabButtonProps } from "@/core/domain/InterfacesProps";
import { Nav } from "react-bootstrap";
import { FC } from "react";

export const TabButton: FC<TabButtonProps> = ({ eventKey, title }) => (
    <Nav.Item>
        <Nav.Link eventKey={eventKey}>{title}</Nav.Link>
    </Nav.Item>
);