import { createContext, useState, } from 'react';
import type { ReactNode } from 'react';
type TimerContextType = {
  minutes: number;
  seconds: number;
  isActive: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

type TimerProviderProps = {
  children: ReactNode;
};

export const TimerProvider = ({ children }: TimerProviderProps) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <TimerContext.Provider
      value={{ minutes, seconds, isActive, startTimer, pauseTimer, resetTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export { TimerContext };
