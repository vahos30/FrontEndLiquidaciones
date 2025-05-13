export const handleExit = () => {
    const event = new CustomEvent('navigateToHome');
    window.dispatchEvent(event);
};

export const handleEditContract = (contractId: string) => {
    const event = new CustomEvent("navigateToEditContract", {
        detail: { id: contractId }
    });
    window.dispatchEvent(event);
}