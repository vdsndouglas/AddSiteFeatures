import { useEffect, useState, type CSSProperties } from 'react';

type Operator = '+' | '−' | '×' | '÷';

const formatDisplay = (value: string) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 'Erro';
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 10 }).format(numeric);
};

const operate = (left: number, right: number, operator: Operator) => {
  switch (operator) {
    case '+': return left + right;
    case '−': return left - right;
    case '×': return left * right;
    case '÷': return right === 0 ? Number.NaN : left / right;
    default: return right;
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
      if (previous === '0') return previous;
      return previous.startsWith('-') ? previous.slice(1) : `-${previous}`;
    });
  };

  const applyPercentage = () => setDisplay((previous) => String(Number(previous) / 100));

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
    if (storedValue === null || !operator) return;
    const currentValue = Number(display);
    const result = operate(storedValue, currentValue, operator);
    setHistory(`${formatDisplay(String(storedValue))} ${operator} ${formatDisplay(display)} =`);
    setDisplay(String(result));
    setStoredValue(null);
    setOperator(null);
    setReplaceDisplay(true);
  };

  const handleBackspace = () => {
    if (replaceDisplay) return;
    setDisplay((previous) => {
      if (previous.length <= 1 || (previous.length === 2 && previous.startsWith('-'))) return '0';
      return previous.slice(0, -1);
    });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (/^[0-9]$/.test(event.key)) appendNumber(event.key);
      if (event.key === '.' || event.key === ',') appendDecimal();
      if (event.key === '+') chooseOperator('+');
      if (event.key === '-') chooseOperator('−');
      if (event.key === '*') chooseOperator('×');
      if (event.key === '/') {
        event.preventDefault();
        chooseOperator('÷');
      }
      if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
      }
      if (event.key === 'Backspace') handleBackspace();
      if (event.key.toLowerCase() === 'c') clearAll();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [display, operator, replaceDisplay, storedValue]);

  const baseButton: CSSProperties = {
    border: 'none',
    borderRadius: 14,
    padding: '14px 0',
    fontSize: 22,
    color: '#f4f4f5',
    background: '#27272a',
    cursor: 'pointer',
  };

  const renderButton = (label: string, onClick: () => void, accent = false) => (
    <button
      key={label}
      onClick={onClick}
      type="button"
      style={{ ...baseButton, background: accent ? '#0ea5e9' : baseButton.background }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #09090b 0%, #18181b 100%)', padding: 16, fontFamily: 'Segoe UI, system-ui, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 360, borderRadius: 28, border: '1px solid #3f3f46', background: '#18181bcc', backdropFilter: 'blur(8px)', padding: 20, boxShadow: '0 25px 45px rgba(0,0,0,0.5)', color: '#fff' }}>
        <p style={{ margin: 0, marginBottom: 10, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.24em', color: '#a1a1aa' }}>Calculadora - Windows 11</p>
        <p style={{ minHeight: 20, margin: 0, textAlign: 'right', color: '#a1a1aa', fontSize: 14 }}>{history || 'Pronto para calcular'}</p>
        <p style={{ margin: '8px 0 16px 0', textAlign: 'right', fontSize: 52, fontWeight: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>{formatDisplay(display)}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {renderButton('AC', clearAll)}
          {renderButton('+/-', toggleSign)}
          {renderButton('%', applyPercentage)}
          {renderButton('÷', () => chooseOperator('÷'), true)}

          {renderButton('7', () => appendNumber('7'))}
          {renderButton('8', () => appendNumber('8'))}
          {renderButton('9', () => appendNumber('9'))}
          {renderButton('×', () => chooseOperator('×'), true)}

          {renderButton('4', () => appendNumber('4'))}
          {renderButton('5', () => appendNumber('5'))}
          {renderButton('6', () => appendNumber('6'))}
          {renderButton('−', () => chooseOperator('−'), true)}

          {renderButton('1', () => appendNumber('1'))}
          {renderButton('2', () => appendNumber('2'))}
          {renderButton('3', () => appendNumber('3'))}
          {renderButton('+', () => chooseOperator('+'), true)}

          {renderButton('⌫', handleBackspace)}
          {renderButton('0', () => appendNumber('0'))}
          {renderButton(',', appendDecimal)}
          {renderButton('=', calculate, true)}
        </div>
      </div>
    </div>
  );
}
