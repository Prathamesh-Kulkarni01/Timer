import { useEffect } from "react";
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Timer } from '../types/timer';

const loadTimersFromLocalStorage = (): Timer[] => {
  const timers = localStorage.getItem('timers');
  return timers ? JSON.parse(timers) : [];
};

const saveTimersToLocalStorage = (timers: Timer[]) => {
  localStorage.setItem('timers', JSON.stringify(timers));
};

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    timers: loadTimersFromLocalStorage(),
  },
  reducers: {
    addTimer: (state, action) => {
      state.timers.push({
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      });
      saveTimersToLocalStorage(state.timers);
    },
    deleteTimer: (state, action) => {
      state.timers = state.timers.filter(timer => timer.id !== action.payload);
      saveTimersToLocalStorage(state.timers);
    },
    toggleTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer) {
        timer.isRunning = !timer.isRunning;
        saveTimersToLocalStorage(state.timers);
      }
    },
    updateTimer: (state, action) => {
      const timer = state.timers.find((timer) => timer.id === action.payload);
      if (timer && timer.isRunning) {
        if (timer.remainingTime > 0) {
          timer.remainingTime -= 1;
        } else {
          timer.isRunning = false;
        }
        saveTimersToLocalStorage(state.timers);
      }
    },
    restartTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer) {
        timer.remainingTime = timer.duration;
        timer.isRunning = false;
        saveTimersToLocalStorage(state.timers);
      }
    },
    editTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload.id);
      if (timer) {
        Object.assign(timer, action.payload.updates);
        timer.remainingTime = action.payload.updates.duration || timer.duration;
        timer.isRunning = false;
        saveTimersToLocalStorage(state.timers);
      }
    },
  },
});

const store = configureStore({
  reducer: timerSlice.reducer,
});

export { store };

export const {
  addTimer,
  deleteTimer,
  toggleTimer,
  updateTimer,
  restartTimer,
  editTimer,
} = timerSlice.actions;

export const useTimerStore = () => {
  const dispatch = useDispatch();
  const timers = useSelector((state: { timers: Timer[] }) => state.timers);
  useEffect(() => {
    const interval = setInterval(() => {
      timers.forEach((timer) => {
        if (timer.isRunning) {
          dispatch(updateTimer(timer.id));
        }
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [dispatch, timers]);

  return {
    timers,
    addTimer: (timer: Omit<Timer, 'id' | 'createdAt'>) => dispatch(addTimer(timer)),
    deleteTimer: (id: string) => dispatch(deleteTimer(id)),
    toggleTimer: (id: string) => dispatch(toggleTimer(id)),
    restartTimer: (id: string) => dispatch(restartTimer(id)),
    editTimer: (id: string, updates: Partial<Timer>) => dispatch(editTimer({ id, updates })),
  };
};