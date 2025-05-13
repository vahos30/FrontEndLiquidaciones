import { FC } from "react";
import { Nav } from "react-bootstrap";
import { TabsData } from "@/core/domain/Entities";
import { TabButton } from "@/core/components/atoms";
import { TabNavigationProps } from "@/core/domain/InterfacesProps";

export const TabNavigation: FC<TabNavigationProps> = ({ tabs, justify = "normal" }) => (
    <Nav variant="tabs" className="custom-nav" style={{justifyContent: justify}}>
        {tabs.map((tab: TabsData) => (
            <TabButton key={tab.id} eventKey={tab.id.toString()} title={tab.nombreTab} />
        ))}
    </Nav>
);