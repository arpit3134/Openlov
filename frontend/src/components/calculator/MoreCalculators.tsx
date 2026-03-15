'use client';

import { useState, useMemo } from 'react';
import { CalculatorInput, CalculatorResult, CalculatorSelect } from './CalculatorUI';

// Word Counter
export function WordCounterCalculator() {
  const [text, setText] = useState('');

  const result = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;

    return { words, characters, charactersNoSpaces, sentences, paragraphs };
  }, [text]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Enter your text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-foreground-muted focus:border-brand-primary/50 focus:bg-white/[0.07] outline-none transition-all resize-none"
          placeholder="Type or paste your text here..."
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <CalculatorResult label="Words" value={result.words} highlight />
        <CalculatorResult label="Characters" value={result.characters} />
        <CalculatorResult label="No Spaces" value={result.charactersNoSpaces} />
        <CalculatorResult label="Sentences" value={result.sentences} />
        <CalculatorResult label="Paragraphs" value={result.paragraphs} />
      </div>
    </div>
  );
}

// JSON Formatter
export function JSONFormatterCalculator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
      setOutput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-foreground font-mono text-sm placeholder:text-foreground-muted focus:border-brand-primary/50 outline-none resize-none"
            placeholder='{"key": "value"}'
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Output</label>
          <textarea
            value={output}
            readOnly
            rows={12}
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-foreground font-mono text-sm focus:border-brand-primary/50 outline-none resize-none"
          />
        </div>
      </div>
      
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button onClick={formatJSON} className="btn-primary px-6 py-3 rounded-xl">
          Format (Beautify)
        </button>
        <button onClick={minifyJSON} className="btn-secondary px-6 py-3 rounded-xl">
          Minify
        </button>
      </div>
    </div>
  );
}

// Base64 Encoder/Decoder
export function Base64Calculator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const convert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setOutput('Error: Invalid input');
    }
  };

  return (
    <div className="space-y-6">
      <CalculatorSelect
        label="Mode"
        value={mode}
        onChange={(v) => setMode(v as 'encode' | 'decode')}
        options={[
          { value: 'encode', label: 'Encode to Base64' },
          { value: 'decode', label: 'Decode from Base64' },
        ]}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-foreground font-mono text-sm placeholder:text-foreground-muted focus:border-brand-primary/50 outline-none resize-none"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Output</label>
          <textarea
            value={output}
            readOnly
            rows={6}
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-foreground font-mono text-sm outline-none resize-none"
          />
        </div>
      </div>

      <button onClick={convert} className="btn-primary px-6 py-3 rounded-xl">
        {mode === 'encode' ? 'Encode' : 'Decode'}
      </button>
    </div>
  );
}

// Case Converter
export function CaseConverterCalculator() {
  const [input, setInput] = useState('');

  const conversions = useMemo(() => ({
    lowercase: input.toLowerCase(),
    uppercase: input.toUpperCase(),
    titleCase: input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
    sentenceCase: input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
    camelCase: input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()),
    snakeCase: input.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''),
    kebabCase: input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  }), [input]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Enter your text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-foreground-muted focus:border-brand-primary/50 outline-none resize-none"
          placeholder="Type your text here..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(conversions).map(([key, value]) => (
          <div key={key} className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground-secondary capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <button
                onClick={() => copyToClipboard(value)}
                className="text-xs text-brand-primary hover:text-brand-primary/80"
              >
                Copy
              </button>
            </div>
            <p className="text-foreground font-mono text-sm break-all">{value || '—'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Unit Converter
export function UnitConverterCalculator() {
  const [value, setValue] = useState('1');
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');

  const units: Record<string, { name: string; units: { value: string; label: string; factor: number }[] }> = {
    length: {
      name: 'Length',
      units: [
        { value: 'm', label: 'Meters', factor: 1 },
        { value: 'km', label: 'Kilometers', factor: 0.001 },
        { value: 'cm', label: 'Centimeters', factor: 100 },
        { value: 'mm', label: 'Millimeters', factor: 1000 },
        { value: 'ft', label: 'Feet', factor: 3.28084 },
        { value: 'in', label: 'Inches', factor: 39.3701 },
        { value: 'mi', label: 'Miles', factor: 0.000621371 },
        { value: 'yd', label: 'Yards', factor: 1.09361 },
      ],
    },
    weight: {
      name: 'Weight',
      units: [
        { value: 'kg', label: 'Kilograms', factor: 1 },
        { value: 'g', label: 'Grams', factor: 1000 },
        { value: 'mg', label: 'Milligrams', factor: 1000000 },
        { value: 'lb', label: 'Pounds', factor: 2.20462 },
        { value: 'oz', label: 'Ounces', factor: 35.274 },
      ],
    },
    temperature: {
      name: 'Temperature',
      units: [
        { value: 'c', label: 'Celsius', factor: 1 },
        { value: 'f', label: 'Fahrenheit', factor: 1 },
        { value: 'k', label: 'Kelvin', factor: 1 },
      ],
    },
  };

  const result = useMemo(() => {
    const v = parseFloat(value) || 0;
    const currentUnits = units[category].units;
    
    if (category === 'temperature') {
      // Special handling for temperature
      if (fromUnit === 'c' && toUnit === 'f') return (v * 9/5) + 32;
      if (fromUnit === 'c' && toUnit === 'k') return v + 273.15;
      if (fromUnit === 'f' && toUnit === 'c') return (v - 32) * 5/9;
      if (fromUnit === 'f' && toUnit === 'k') return (v - 32) * 5/9 + 273.15;
      if (fromUnit === 'k' && toUnit === 'c') return v - 273.15;
      if (fromUnit === 'k' && toUnit === 'f') return (v - 273.15) * 9/5 + 32;
      return v;
    }

    const fromFactor = currentUnits.find((u) => u.value === fromUnit)?.factor || 1;
    const toFactor = currentUnits.find((u) => u.value === toUnit)?.factor || 1;
    
    // Convert to base unit (meters/kg) then to target unit
    const baseValue = v / fromFactor;
    return baseValue * toFactor;
  }, [value, category, fromUnit, toUnit]);

  return (
    <div className="space-y-6">
      <CalculatorSelect
        label="Category"
        value={category}
        onChange={(v) => {
          setCategory(v);
          setFromUnit(units[v].units[0].value);
          setToUnit(units[v].units[1].value);
        }}
        options={Object.entries(units).map(([key, val]) => ({ value: key, label: val.name }))}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CalculatorInput
          label="Value"
          value={value}
          onChange={setValue}
        />
        <CalculatorSelect
          label="From"
          value={fromUnit}
          onChange={setFromUnit}
          options={units[category].units.map((u) => ({ value: u.value, label: u.label }))}
        />
        <CalculatorSelect
          label="To"
          value={toUnit}
          onChange={setToUnit}
          options={units[category].units.map((u) => ({ value: u.value, label: u.label }))}
        />
      </div>

      <CalculatorResult
        label="Result"
        value={`${Math.round(result * 10000) / 10000} ${units[category].units.find((u) => u.value === toUnit)?.label}`}
        highlight
      />
    </div>
  );
}

// Tip Calculator
export function TipCalculator() {
  const [billAmount, setBillAmount] = useState('100');
  const [tipPercent, setTipPercent] = useState('15');
  const [people, setPeople] = useState('1');

  const result = useMemo(() => {
    const bill = parseFloat(billAmount) || 0;
    const tip = parseFloat(tipPercent) || 0;
    const numPeople = parseInt(people) || 1;

    const tipAmount = (bill * tip) / 100;
    const total = bill + tipAmount;
    const perPerson = total / numPeople;
    const tipPerPerson = tipAmount / numPeople;

    return {
      tipAmount: Math.round(tipAmount * 100) / 100,
      total: Math.round(total * 100) / 100,
      perPerson: Math.round(perPerson * 100) / 100,
      tipPerPerson: Math.round(tipPerPerson * 100) / 100,
    };
  }, [billAmount, tipPercent, people]);

  const formatCurrency = (num: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CalculatorInput
          label="Bill Amount"
          value={billAmount}
          onChange={setBillAmount}
          prefix="$"
        />
        <CalculatorInput
          label="Tip Percentage"
          value={tipPercent}
          onChange={setTipPercent}
          suffix="%"
        />
        <CalculatorInput
          label="Number of People"
          value={people}
          onChange={setPeople}
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {[10, 15, 18, 20, 25].map((tip) => (
          <button
            key={tip}
            onClick={() => setTipPercent(tip.toString())}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tipPercent === tip.toString()
                ? 'bg-brand-primary text-white'
                : 'bg-white/5 text-foreground-secondary hover:bg-white/10 border border-white/10'
            }`}
          >
            {tip}%
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        <CalculatorResult label="Tip Amount" value={formatCurrency(result.tipAmount)} />
        <CalculatorResult label="Total" value={formatCurrency(result.total)} highlight />
        <CalculatorResult label="Per Person" value={formatCurrency(result.perPerson)} />
        <CalculatorResult label="Tip/Person" value={formatCurrency(result.tipPerPerson)} />
      </div>
    </div>
  );
}
