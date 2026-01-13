import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, label = "Closes in:" }) => {
  const parseDate = (dateString: string): number => {
    if (!dateString) return 0;

    // 1. Try standard Date constructor (handles ISO 8601 with Z, etc.)
    let date = new Date(dateString);
    if (!isNaN(date.getTime())) return date.getTime();

    // 2. Try replacing space with T (for "YYYY-MM-DD HH:MM:SS" on some browsers)
    date = new Date(dateString.replace(' ', 'T'));
    if (!isNaN(date.getTime())) return date.getTime();

    // 3. Manual parsing as last resort (safest for strict Mobile Safari versions)
    // Assumes format YYYY-MM-DD...
    const parts = dateString.split(/[- :T]/);
    if (parts.length >= 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
      const day = parseInt(parts[2], 10);
      const hour = parts.length > 3 ? parseInt(parts[3], 10) : 0;
      const min = parts.length > 4 ? parseInt(parts[4], 10) : 0;
      const sec = parts.length > 5 ? parseInt(parts[5], 10) : 0;
      
      return new Date(year, month, day, hour, min, sec).getTime();
    }

    return 0;
  };

  const calculateTimeLeft = (): TimeLeft | null => {
    const targetTime = parseDate(targetDate);
    if (targetTime === 0) return null;

    const difference = targetTime - Date.now();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  if (!targetDate) {
    return (
      <div className="flex flex-col items-center mt-2 mb-6">
        <div className="bg-green-50 text-green-600 px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest border border-green-100">
          Registration Open
        </div>
      </div>
    );
  }

  if (!timeLeft) {
    return null; // Don't show anything if time is up or parsing failed
  }

  const TimeUnit: React.FC<{ value: number; unit: string }> = ({ value, unit }) => (
    <div className="flex items-baseline space-x-1">
      <span className="font-mono text-lg font-bold text-brand-blue">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[9px] uppercase tracking-tighter text-gray-400 font-bold">
        {unit.charAt(0)}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center mt-2 mb-6">
      <div className="flex items-center space-x-3 bg-gray-50/50 px-3 py-1.5 rounded-full border border-gray-100">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">
          {label}
        </span>
        <div className="flex items-center space-x-2">
          <TimeUnit value={timeLeft.days} unit="Days" />
          <TimeUnit value={timeLeft.hours} unit="Hrs" />
          <TimeUnit value={timeLeft.minutes} unit="Mins" />
          <TimeUnit value={timeLeft.seconds} unit="Secs" />
        </div>
      </div>
    </div>
  );
};

export default Countdown;
