export interface CalculatorField {
  id: string;
  label: string;
  type: 'number' | 'text' | 'date' | 'select';
  placeholder?: string;
  unit?: string;
  options?: { label: string; value: string }[];
  help?: string;
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: 'finance' | 'tax' | 'health' | 'date' | 'math' | 'developer' | 'utility';
  icon: string;
  fields: CalculatorField[];
  calculate: (values: Record<string, number | string>) => Record<string, number | string>;
  resultTemplate: (result: Record<string, number | string>) => string;
  tips?: string[];
}

// Finance Calculators
const emiCalculator: Calculator = {
  id: 'emi-calculator',
  name: 'EMI Calculator',
  description: 'Calculate monthly EMI for loans with flexible interest rates',
  category: 'finance',
  icon: '💰',
  fields: [
    { id: 'principal', label: 'Loan Amount', type: 'number', placeholder: '500000', unit: '₹' },
    { id: 'rate', label: 'Annual Interest Rate', type: 'number', placeholder: '8.5', unit: '%' },
    { id: 'tenure', label: 'Loan Tenure', type: 'number', placeholder: '5', unit: 'years' },
  ],
  calculate: (values) => {
    const principal = Number(values.principal) || 0;
    const rate = Number(values.rate) || 0;
    const tenure = Number(values.tenure) || 0;

    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;

    if (monthlyRate === 0) {
      const emi = principal / months;
      return { emi: parseFloat(emi.toFixed(2)), total: parseFloat((principal).toFixed(2)), interest: 0 };
    }

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    const total = emi * months;
    const interest = total - principal;

    return {
      emi: parseFloat(emi.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      interest: parseFloat(interest.toFixed(2)),
    };
  },
  resultTemplate: (result) => {
    return `Monthly EMI: ₹${result.emi} | Total Amount: ₹${result.total} | Total Interest: ₹${result.interest}`;
  },
  tips: [
    'Lower interest rates reduce your monthly EMI',
    'Shorter tenure means higher EMI but less total interest',
    'Check if you can make prepayments to reduce tenure',
  ],
};

const sipCalculator: Calculator = {
  id: 'sip-calculator',
  name: 'SIP Calculator',
  description: 'Calculate returns on Systematic Investment Plan',
  category: 'finance',
  icon: '📈',
  fields: [
    { id: 'monthly', label: 'Monthly Investment', type: 'number', placeholder: '5000', unit: '₹' },
    { id: 'rate', label: 'Annual Return (%)', type: 'number', placeholder: '12', unit: '%' },
    { id: 'years', label: 'Investment Period', type: 'number', placeholder: '10', unit: 'years' },
  ],
  calculate: (values) => {
    const monthly = Number(values.monthly) || 0;
    const rate = Number(values.rate) || 0;
    const years = Number(values.years) || 0;

    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    let futureValue = 0;
    if (monthlyRate === 0) {
      futureValue = monthly * months;
    } else {
      futureValue = monthly * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    }

    const invested = monthly * months;
    const gains = futureValue - invested;

    return {
      invested: parseFloat(invested.toFixed(2)),
      gains: parseFloat(gains.toFixed(2)),
      total: parseFloat(futureValue.toFixed(2)),
    };
  },
  resultTemplate: (result) => {
    return `Invested: ₹${result.invested} | Gains: ₹${result.gains} | Total Value: ₹${result.total}`;
  },
};

const fdCalculator: Calculator = {
  id: 'fd-calculator',
  name: 'FD Calculator',
  description: 'Calculate Fixed Deposit returns with compound interest',
  category: 'finance',
  icon: '🏦',
  fields: [
    { id: 'principal', label: 'Principal Amount', type: 'number', placeholder: '100000', unit: '₹' },
    { id: 'rate', label: 'Interest Rate', type: 'number', placeholder: '6.5', unit: '%' },
    { id: 'years', label: 'Tenure', type: 'number', placeholder: '5', unit: 'years' },
    { id: 'frequency', label: 'Compounding', type: 'select', options: [
      { label: 'Quarterly', value: '4' },
      { label: 'Half-Yearly', value: '2' },
      { label: 'Annually', value: '1' },
    ]},
  ],
  calculate: (values) => {
    const principal = Number(values.principal) || 0;
    const rate = Number(values.rate) || 0;
    const years = Number(values.years) || 0;
    const frequency = Number(values.frequency) || 1;

    const amount = principal * Math.pow(1 + rate / 100 / frequency, frequency * years);
    const interest = amount - principal;

    return {
      interest: parseFloat(interest.toFixed(2)),
      total: parseFloat(amount.toFixed(2)),
    };
  },
  resultTemplate: (result) => {
    return `Interest Earned: ₹${result.interest} | Total Amount: ₹${result.total}`;
  },
};

const simpleInterestCalculator: Calculator = {
  id: 'simple-interest-calculator',
  name: 'Simple Interest Calculator',
  description: 'Calculate simple interest on investments or loans',
  category: 'finance',
  icon: '🧮',
  fields: [
    { id: 'principal', label: 'Principal Amount', type: 'number', placeholder: '10000', unit: '₹' },
    { id: 'rate', label: 'Interest Rate', type: 'number', placeholder: '5', unit: '%' },
    { id: 'time', label: 'Time Period', type: 'number', placeholder: '3', unit: 'years' },
  ],
  calculate: (values) => {
    const principal = Number(values.principal) || 0;
    const rate = Number(values.rate) || 0;
    const time = Number(values.time) || 0;

    const interest = (principal * rate * time) / 100;
    const total = principal + interest;

    return {
      interest: parseFloat(interest.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    };
  },
  resultTemplate: (result) => {
    return `Simple Interest: ₹${result.interest} | Total Amount: ₹${result.total}`;
  },
};

const compoundInterestCalculator: Calculator = {
  id: 'compound-interest-calculator',
  name: 'Compound Interest Calculator',
  description: 'Calculate compound interest on savings and investments',
  category: 'finance',
  icon: '📊',
  fields: [
    { id: 'principal', label: 'Principal Amount', type: 'number', placeholder: '10000', unit: '₹' },
    { id: 'rate', label: 'Interest Rate', type: 'number', placeholder: '5', unit: '%' },
    { id: 'time', label: 'Time Period', type: 'number', placeholder: '3', unit: 'years' },
    { id: 'frequency', label: 'Compounding', type: 'select', options: [
      { label: 'Annually', value: '1' },
      { label: 'Semi-Annually', value: '2' },
      { label: 'Quarterly', value: '4' },
      { label: 'Monthly', value: '12' },
      { label: 'Daily', value: '365' },
    ]},
  ],
  calculate: (values) => {
    const principal = Number(values.principal) || 0;
    const rate = Number(values.rate) || 0;
    const time = Number(values.time) || 0;
    const frequency = Number(values.frequency) || 1;

    const amount = principal * Math.pow(1 + rate / 100 / frequency, frequency * time);
    const interest = amount - principal;

    return {
      interest: parseFloat(interest.toFixed(2)),
      total: parseFloat(amount.toFixed(2)),
    };
  },
  resultTemplate: (result) => {
    return `Compound Interest: ₹${result.interest} | Total Amount: ₹${result.total}`;
  },
};

const roiCalculator: Calculator = {
  id: 'roi-calculator',
  name: 'ROI Calculator',
  description: 'Calculate Return on Investment percentage',
  category: 'finance',
  icon: '💹',
  fields: [
    { id: 'initial', label: 'Initial Investment', type: 'number', placeholder: '10000', unit: '₹' },
    { id: 'final', label: 'Final Value', type: 'number', placeholder: '12000', unit: '₹' },
  ],
  calculate: (values) => {
    const initial = Number(values.initial) || 0;
    const final = Number(values.final) || 0;

    const roi = ((final - initial) / initial) * 100;

    return {
      roi: parseFloat(roi.toFixed(2)),
      gain: parseFloat((final - initial).toFixed(2)),
    };
  },
  resultTemplate: (result) => {
    return `ROI: ${result.roi}% | Gain: ₹${result.gain}`;
  },
};

// Health Calculators
const bmiCalculator: Calculator = {
  id: 'bmi-calculator',
  name: 'BMI Calculator',
  description: 'Calculate Body Mass Index',
  category: 'health',
  icon: '⚖️',
  fields: [
    { id: 'height', label: 'Height', type: 'number', placeholder: '170', unit: 'cm' },
    { id: 'weight', label: 'Weight', type: 'number', placeholder: '70', unit: 'kg' },
  ],
  calculate: (values) => {
    const height = Number(values.height) || 0;
    const weight = Number(values.weight) || 0;

    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);

    let category = 'Underweight';
    if (bmi >= 18.5 && bmi < 25) category = 'Normal Weight';
    else if (bmi >= 25 && bmi < 30) category = 'Overweight';
    else if (bmi >= 30) category = 'Obese';

    return {
      bmi: parseFloat(bmi.toFixed(1)),
      category,
    };
  },
  resultTemplate: (result) => {
    return `BMI: ${result.bmi} (${result.category})`;
  },
};

const ageCalculator: Calculator = {
  id: 'age-calculator',
  name: 'Age Calculator',
  description: 'Calculate exact age from date of birth',
  category: 'date',
  icon: '🎂',
  fields: [
    { id: 'dob', label: 'Date of Birth', type: 'date' },
  ],
  calculate: (values) => {
    const dob = new Date(String(values.dob));
    const today = new Date();

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return {
      years: years,
      months: months,
      days: days,
      total_days: Math.floor((today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24)),
    };
  },
  resultTemplate: (result) => {
    return `Age: ${result.years} years, ${result.months} months, ${result.days} days (${result.total_days} days total)`;
  },
};

const dateDifferenceCalculator: Calculator = {
  id: 'date-difference-calculator',
  name: 'Date Difference Calculator',
  description: 'Calculate days between two dates',
  category: 'date',
  icon: '📅',
  fields: [
    { id: 'date1', label: 'Start Date', type: 'date' },
    { id: 'date2', label: 'End Date', type: 'date' },
  ],
  calculate: (values) => {
    const date1 = new Date(String(values.date1));
    const date2 = new Date(String(values.date2));

    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const months = Math.floor(diffDays / 30);
    const years = Math.floor(diffDays / 365);

    return {
      days: diffDays,
      weeks: weeks,
      months: months,
      years: years,
    };
  },
  resultTemplate: (result) => {
    return `Difference: ${result.days} days (${result.weeks} weeks, ${result.months} months, ${result.years} years)`;
  },
};

// Math & Utility Calculators
const percentageCalculator: Calculator = {
  id: 'percentage-calculator',
  name: 'Percentage Calculator',
  description: 'Calculate percentage of a number',
  category: 'math',
  icon: '%',
  fields: [
    { id: 'number', label: 'Number', type: 'number', placeholder: '500' },
    { id: 'percent', label: 'Percentage', type: 'number', placeholder: '20', unit: '%' },
  ],
  calculate: (values) => {
    const number = Number(values.number) || 0;
    const percent = Number(values.percent) || 0;

    const result = (number * percent) / 100;

    return {
      result: parseFloat(result.toFixed(2)),
    };
  },
  resultTemplate: (result) => {
    return `${result.result}`;
  },
};

const discountCalculator: Calculator = {
  id: 'discount-calculator',
  name: 'Discount Calculator',
  description: 'Calculate discounted price and savings',
  category: 'math',
  icon: '🏷️',
  fields: [
    { id: 'original', label: 'Original Price', type: 'number', placeholder: '1000', unit: '₹' },
    { id: 'discount', label: 'Discount', type: 'number', placeholder: '20', unit: '%' },
  ],
  calculate: (values) => {
    const original = Number(values.original) || 0;
    const discount = Number(values.discount) || 0;

    const discountAmount = (original * discount) / 100;
    const finalPrice = original - discountAmount;

    return {
      discount_amount: parseFloat(discountAmount.toFixed(2)),
      final_price: parseFloat(finalPrice.toFixed(2)),
      savings: parseFloat(discountAmount.toFixed(2)),
    };
  },
  resultTemplate: (result) => {
    return `Discount: ₹${result.discount_amount} | Final Price: ₹${result.final_price}`;
  },
};

const tipCalculator: Calculator = {
  id: 'tip-calculator',
  name: 'Tip Calculator',
  description: 'Calculate tip and split bill amount',
  category: 'utility',
  icon: '🧾',
  fields: [
    { id: 'bill', label: 'Bill Amount', type: 'number', placeholder: '500', unit: '₹' },
    { id: 'tip_percent', label: 'Tip Percentage', type: 'number', placeholder: '15', unit: '%' },
    { id: 'people', label: 'Number of People', type: 'number', placeholder: '2' },
  ],
  calculate: (values) => {
    const bill = Number(values.bill) || 0;
    const tipPercent = Number(values.tip_percent) || 0;
    const people = Number(values.people) || 1;

    const tipAmount = (bill * tipPercent) / 100;
    const total = bill + tipAmount;
    const perPerson = total / people;

    return {
      tip: parseFloat(tipAmount.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      per_person: parseFloat(perPerson.toFixed(2)),
    };
  },
  resultTemplate: (result) => {
    return `Tip: ₹${result.tip} | Total: ₹${result.total} | Per Person: ₹${result.per_person}`;
  },
};

// Developer Calculators
const jsonFormatterCalculator: Calculator = {
  id: 'json-formatter',
  name: 'JSON Formatter',
  description: 'Format and validate JSON data',
  category: 'developer',
  icon: '{}',
  fields: [
    { id: 'json', label: 'JSON Input', type: 'text', placeholder: '{"key": "value"}' },
  ],
  calculate: (values) => {
    try {
      const parsed = JSON.parse(String(values.json));
      const formatted = JSON.stringify(parsed, null, 2);
      return {
        valid: true,
        output: formatted,
        lines: formatted.split('\n').length,
      };
    } catch (e) {
      return {
        valid: false,
        output: `Error: Invalid JSON - ${String(e).split('\n')[0]}`,
        error: true,
      };
    }
  },
  resultTemplate: (result) => {
    return `JSON ${result.valid ? 'Valid' : 'Invalid'} - ${result.lines || 'Error'} lines`;
  },
};

const base64Calculator: Calculator = {
  id: 'base64-calculator',
  name: 'Base64 Encoder/Decoder',
  description: 'Encode and decode Base64 strings',
  category: 'developer',
  icon: '🔐',
  fields: [
    { id: 'input', label: 'Input Text', type: 'text', placeholder: 'Enter text to encode/decode' },
    { id: 'mode', label: 'Mode', type: 'select', options: [
      { label: 'Encode', value: 'encode' },
      { label: 'Decode', value: 'decode' },
    ]},
  ],
  calculate: (values) => {
    try {
      const input = String(values.input);
      const mode = String(values.mode);

      let output = '';
      if (mode === 'encode') {
        output = btoa(input);
      } else {
        output = atob(input);
      }

      return {
        output: output,
        success: true,
      };
    } catch (e) {
      return {
        output: `Error: ${String(e)}`,
        success: false,
      };
    }
  },
  resultTemplate: (result) => {
    return result.success ? result.output : 'Error in conversion';
  },
};

const urlEncoderCalculator: Calculator = {
  id: 'url-encoder-decoder',
  name: 'URL Encoder/Decoder',
  description: 'Encode and decode URLs',
  category: 'developer',
  icon: '🔗',
  fields: [
    { id: 'input', label: 'Input URL', type: 'text', placeholder: 'https://example.com?key=value' },
    { id: 'mode', label: 'Mode', type: 'select', options: [
      { label: 'Encode', value: 'encode' },
      { label: 'Decode', value: 'decode' },
    ]},
  ],
  calculate: (values) => {
    try {
      const input = String(values.input);
      const mode = String(values.mode);

      let output = '';
      if (mode === 'encode') {
        output = encodeURIComponent(input);
      } else {
        output = decodeURIComponent(input);
      }

      return {
        output: output,
        success: true,
      };
    } catch (e) {
      return {
        output: `Error: ${String(e)}`,
        success: false,
      };
    }
  },
  resultTemplate: (result) => {
    return result.success ? result.output : 'Error in conversion';
  },
};

const wordCounterCalculator: Calculator = {
  id: 'word-counter',
  name: 'Word Counter',
  description: 'Count words, characters, sentences in text',
  category: 'developer',
  icon: '📝',
  fields: [
    { id: 'text', label: 'Input Text', type: 'text', placeholder: 'Enter your text here...' },
  ],
  calculate: (values) => {
    const text = String(values.text || '');
    
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s+/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;

    return {
      words,
      characters,
      characters_no_spaces: charactersNoSpaces,
      sentences,
      paragraphs,
    };
  },
  resultTemplate: (result) => {
    return `Words: ${result.words} | Characters: ${result.characters} | Sentences: ${result.sentences}`;
  },
};

const slugGeneratorCalculator: Calculator = {
  id: 'slug-generator',
  name: 'Slug Generator',
  description: 'Generate URL-friendly slugs from text',
  category: 'developer',
  icon: '🎯',
  fields: [
    { id: 'text', label: 'Input Text', type: 'text', placeholder: 'This is my article title' },
  ],
  calculate: (values) => {
    const text = String(values.text || '');
    const slug = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    return {
      slug: slug,
    };
  },
  resultTemplate: (result) => {
    return `${result.slug}`;
  },
};

export const calculators: Calculator[] = [
  // Finance
  emiCalculator,
  sipCalculator,
  fdCalculator,
  simpleInterestCalculator,
  compoundInterestCalculator,
  roiCalculator,

  // Health
  bmiCalculator,

  // Date
  ageCalculator,
  dateDifferenceCalculator,

  // Math
  percentageCalculator,
  discountCalculator,

  // Utility
  tipCalculator,

  // Developer
  jsonFormatterCalculator,
  base64Calculator,
  urlEncoderCalculator,
  wordCounterCalculator,
  slugGeneratorCalculator,
];

export const calculatorsByCategory = calculators.reduce((acc, calc) => {
  if (!acc[calc.category]) {
    acc[calc.category] = [];
  }
  acc[calc.category].push(calc);
  return acc;
}, {} as Record<string, Calculator[]>);

export const categoryLabels: Record<string, string> = {
  finance: 'Finance',
  tax: 'Tax & Salary',
  health: 'Health',
  date: 'Date & Time',
  math: 'Math & Utility',
  developer: 'Developer Tools',
  utility: 'Utilities',
};

export const categoryIcons: Record<string, string> = {
  finance: '💰',
  tax: '📊',
  health: '⚕️',
  date: '📅',
  math: '🧮',
  developer: '💻',
  utility: '🛠️',
};
