import React, { useState, useEffect } from "react";
import { Button } from "./Button";

interface TimerFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  onSubmit: (data: {
    title: string;
    description: string;
    hours: number;
    minutes: number;
    seconds: number;
  }) => void;
  onCancel: () => void;
  submitButtonText: string;
}

export const TimerForm: React.FC<TimerFormProps> = ({
  initialTitle = "",
  initialDescription = "",
  initialHours = 0,
  initialMinutes = 0,
  initialSeconds = 0,
  onSubmit,
  onCancel,
  submitButtonText,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [touched, setTouched] = useState({
    title: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setTouched({
      title: false,
      hours: false,
      minutes: false,
      seconds: false,
    });
  }, [initialTitle, initialDescription, initialHours, initialMinutes, initialSeconds]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, hours, minutes, seconds });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched({ ...touched, title: true })}
          maxLength={50}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 `}
          placeholder="Enter timer title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter timer description (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Duration <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Hours</label>
            <input
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(Math.min(23, parseInt(e.target.value) || 0))}
              onBlur={() => setTouched({ ...touched, hours: true })}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Minutes</label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(Math.min(59, parseInt(e.target.value) || 0))}
              onBlur={() => setTouched({ ...touched, minutes: true })}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Seconds</label>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Math.min(59, parseInt(e.target.value) || 0))}
              onBlur={() => setTouched({ ...touched, seconds: true })}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};
