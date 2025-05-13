export interface MessageExitModalProps {
    show: boolean;
    onHide: () => void;
    onExit: () => void;
    title: string;
    message: string;
    textButtonCancel?: string;
    textButtonConfirm: string;
  }