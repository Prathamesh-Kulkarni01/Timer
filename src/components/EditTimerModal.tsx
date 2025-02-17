import React from 'react';
import { useTimerStore } from '../store/useTimerStore';
import { validateTimerForm } from '../utils/validation';
import { Timer } from '../types/timer';
import { Modal } from './Model';
import { TimerForm } from './TimerForm';

interface EditTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  timer: Timer;
}

export const EditTimerModal: React.FC<EditTimerModalProps> = ({
  isOpen,
  onClose,
  timer,
}) => {
  const { editTimer } = useTimerStore();

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

    editTimer(timer.id, {
      title: title.trim(),
      description: description.trim(),
      duration: totalSeconds,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Timer">
      <TimerForm
        initialTitle={timer.title}
        initialDescription={timer.description}
        initialHours={Math.floor(timer.duration / 3600)}
        initialMinutes={Math.floor((timer.duration % 3600) / 60)}
        initialSeconds={timer.duration % 60}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitButtonText="Save Changes"
      />
    </Modal>
  );
};