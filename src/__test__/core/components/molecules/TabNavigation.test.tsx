import { render, screen } from "@testing-library/react";
import { TabNavigation } from "../../../../core/components/molecules/TabNavigation";
import { TabsData } from "../../../../core/domain/Entities";
import { TabButton } from "../../../../core/components/atoms";

jest.mock("../../../../core/components/atoms", () => ({
    TabButton: jest.fn(() => <div data-testid="tab-button" />),
}));

describe("TabNavigation", () => {
    const mockTabs: TabsData[] = [
        { id: 1, nombreTab: "Tab 1", activo: true },
        { id: 2, nombreTab: "Tab 2", activo: true },
    ];

    it("renders the correct number of TabButton components", () => {
        render(<TabNavigation tabs={mockTabs} />);

        const tabButtons = screen.getAllByTestId("tab-button");
        expect(tabButtons).toHaveLength(mockTabs.length);
    });

    it("passes the correct props to each TabButton", () => {
        render(<TabNavigation tabs={mockTabs} />);

        mockTabs.forEach((tab) => {
            expect(TabButton).toHaveBeenCalledWith(
                expect.objectContaining({
                    eventKey: tab.id.toString(),
                    title: tab.nombreTab,
                }),
                {}
            );
        });
    });
});