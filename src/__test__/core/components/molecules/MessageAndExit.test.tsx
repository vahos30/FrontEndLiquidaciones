import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MessageAndExit } from "../../../../core/components/molecules/MessageAndExit";
import { CustomButton } from "@components/atoms";
const { handleExit } = require("@/core/utils");

jest.mock("@components/atoms", () => ({
    CustomButton: jest.fn(({ onClick, children }) => (
        <button onClick={onClick}>{children}</button>
    )),
}));

jest.mock("@/core/utils", () => ({
    handleExit: jest.fn(),
}));

describe("MessageAndExit Component", () => {

    it("should render error message when errorMessage prop is provided", () => {
        render(<MessageAndExit errorMessage="Error occurred" successMessage="" />);

        expect(screen.getByText("Error occurred")).toBeInTheDocument();
        expect(screen.getByText("Error occurred").closest("div")).toHaveClass("text-danger");
    });

    it("should render success message when successMessage prop is provided", () => {
        render(<MessageAndExit errorMessage="" successMessage="Operation successful" />);

        expect(screen.getByText("Operation successful")).toBeInTheDocument();
        expect(screen.getByText("Operation successful").closest("div")).toHaveClass("text-success");
    });

    it("should render both error and success messages when both props are provided", () => {
        render(
            <MessageAndExit
                errorMessage="Error occurred"
                successMessage="Operation successful"
            />
        );

        expect(screen.getByText("Error occurred")).toBeInTheDocument();
        expect(screen.getByText("Operation successful")).toBeInTheDocument();
    });

    it("should call handleExit when the button is clicked", async () => {
        render(<MessageAndExit errorMessage="" successMessage="" />);

        const button = screen.getByText("Salir");
        await userEvent.click(button);

        expect(handleExit).toHaveBeenCalledTimes(1);
    });

    it("should render the CustomButton component", () => {
        render(<MessageAndExit errorMessage="" successMessage="" />);

        expect(CustomButton).toHaveBeenCalledWith(
            expect.objectContaining({
                onClick: expect.any(Function),
                variant: "secundary",
                disabled: false,
            }),
            expect.anything()
        );
    });
});