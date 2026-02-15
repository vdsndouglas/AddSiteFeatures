import { useEffect, useState } from 'react';

type Operator = '+' | '−' | '×' | '÷';

type CalcButton = {
  label: string;
  className?: string;
  action: () => void;
};

const formatDisplay = (value: string) => {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return 'Erro';
  }

  return new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 10,
  }).format(numeric);
};

const operate = (left: number, right: number, operator: Operator) => {
  switch (operator) {
    case '+':
      return left + right;
    case '−':
      return left - right;
    case '×':
      return left * right;
    case '÷':
      if (right === 0) {
        return Number.NaN;
      }
      return left / right;
    default:
      return right;
  }
};

export default function App() {
  const [display, setDisplay] = useState('0');
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [history, setHistory] = useState('');
  const [replaceDisplay, setReplaceDisplay] = useState(false);

  const appendNumber = (value: string) => {
    if (replaceDisplay) {
      setDisplay(value);
      setReplaceDisplay(false);
      return;
    }

    setDisplay((previous) => (previous === '0' ? value : previous + value));
  };

  const appendDecimal = () => {
    if (replaceDisplay) {
      setDisplay('0.');
      setReplaceDisplay(false);
      return;
    }

    setDisplay((previous) => (previous.includes('.') ? previous : `${previous}.`));
  };

  const clearAll = () => {
    setDisplay('0');
    setStoredValue(null);
    setOperator(null);
    setHistory('');
    setReplaceDisplay(false);
  };

  const toggleSign = () => {
    setDisplay((previous) => {
      if (previous === '0') {
        return previous;
      }

      return previous.startsWith('-') ? previous.slice(1) : `-${previous}`;
    });
  };

  const applyPercentage = () => {
    setDisplay((previous) => String(Number(previous) / 100));
  };

  const chooseOperator = (nextOperator: Operator) => {
    const currentValue = Number(display);

    if (storedValue !== null && operator && !replaceDisplay) {
      const result = operate(storedValue, currentValue, operator);
      setStoredValue(result);
      setDisplay(String(result));
      setHistory(`${formatDisplay(String(result))} ${nextOperator}`);
    } else {
      setStoredValue(currentValue);
      setHistory(`${formatDisplay(display)} ${nextOperator}`);
    }

    setOperator(nextOperator);
    setReplaceDisplay(true);
  };

  const calculate = () => {
    if (storedValue === null || !operator) {
      return;
    }

    const currentValue = Number(display);
    const result = operate(storedValue, currentValue, operator);

    setHistory(`${formatDisplay(String(storedValue))} ${operator} ${formatDisplay(display)} =`);
    setDisplay(String(result));
    setStoredValue(null);
    setOperator(null);
    setReplaceDisplay(true);
  };

  const handleBackspace = () => {
    if (replaceDisplay) {
      return;
    }

    setDisplay((previous) => {
      if (previous.length <= 1 || (previous.length === 2 && previous.startsWith('-'))) {
        return '0';
      }

      return previous.slice(0, -1);
    });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (/^[0-9]$/.test(event.key)) {
        appendNumber(event.key);
      }

      if (event.key === '.') {
        appendDecimal();
      }

      if (event.key === '+') {
        chooseOperator('+');
      }

      if (event.key === '-') {
        chooseOperator('−');
      }

      if (event.key === '*') {
        chooseOperator('×');
      }

      if (event.key === '/') {
        event.preventDefault();
        chooseOperator('÷');
      }

      if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
      }

      if (event.key === 'Backspace') {
        handleBackspace();
      }

      if (event.key.toLowerCase() === 'c') {
        clearAll();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const buttons: CalcButton[] = [
    { label: 'AC', className: 'bg-zinc-700 hover:bg-zinc-600', action: clearAll },
    { label: '+/-', className: 'bg-zinc-700 hover:bg-zinc-600', action: toggleSign },
    { label: '%', className: 'bg-zinc-700 hover:bg-zinc-600', action: applyPercentage },
    { label: '÷', className: 'bg-sky-500 hover:bg-sky-400', action: () => chooseOperator('÷') },

    { label: '7', action: () => appendNumber('7') },
    { label: '8', action: () => appendNumber('8') },
    { label: '9', action: () => appendNumber('9') },
    { label: '×', className: 'bg-sky-500 hover:bg-sky-400', action: () => chooseOperator('×') },

    { label: '4', action: () => appendNumber('4') },
    { label: '5', action: () => appendNumber('5') },
    { label: '6', action: () => appendNumber('6') },
    { label: '−', className: 'bg-sky-500 hover:bg-sky-400', action: () => chooseOperator('−') },

    { label: '1', action: () => appendNumber('1') },
    { label: '2', action: () => appendNumber('2') },
    { label: '3', action: () => appendNumber('3') },
    { label: '+', className: 'bg-sky-500 hover:bg-sky-400', action: () => chooseOperator('+') },

    { label: '⌫', className: 'bg-zinc-700 hover:bg-zinc-600', action: handleBackspace },
    { label: '0', action: () => appendNumber('0') },
    { label: ',', action: appendDecimal },
    { label: '=', className: 'bg-sky-500 hover:bg-sky-400', action: calculate },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-950 to-zinc-900 px-4 text-white">
      <div className="w-full max-w-sm rounded-3xl border border-zinc-700 bg-zinc-900/95 p-5 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="mb-6">
          <p className="mb-2 text-xs uppercase tracking-[0.24em] text-zinc-400">Calculadora - Windows 11</p>
          <p className="min-h-6 text-right text-sm text-zinc-400">{history || 'Pronto para calcular'}</p>
          <p className="mt-2 truncate text-right text-5xl font-light">{formatDisplay(display)}</p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button) => (
            <button
              key={button.label}
              onClick={button.action}
              className={`rounded-2xl bg-zinc-800 py-4 text-lg font-medium transition active:scale-95 ${button.className || 'hover:bg-zinc-700'}`}
              type="button"
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
