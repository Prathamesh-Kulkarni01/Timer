import React from "react";
import { useTimerStore } from "../store/useTimerStore";
import { validateTimerForm } from "../utils/validation";
import { Modal } from "./Model";
import { TimerForm } from "./TimerForm";

interface AddTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTimerModal: React.FC<AddTimerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addTimer } = useTimerStore();

  const handleSubmit = ({
    title,
    description,
    hours,
    minutes,
    seconds,
  }: {
    title: string;
    description: string;
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    if (!validateTimerForm({ title, description, hours, minutes, seconds })) {
      return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    addTimer({
      title: title.trim(),
      description: description.trim(),
      duration: totalSeconds,
      remainingTime: totalSeconds,
      isRunning: false,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Timer">
      <TimerForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitButtonText="Add Timer"
      />
    </Modal>
  );
};
