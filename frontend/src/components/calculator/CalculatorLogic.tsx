'use client';

import { useState, useMemo } from 'react';
import { CalculatorInput, CalculatorResult, CalculatorButton, CalculatorSelect } from './CalculatorUI';

// EMI Calculator
export function EMICalculator() {
  const [principal, setPrincipal] = useState('1000000');
  const [rate, setRate] = useState('10');
  const [tenure, setTenure] = useState('12');
  const [tenureType, setTenureType] = useState<'months' | 'years'>('months');

  const result = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 12 / 100;
    const n = tenureType === 'years' ? (parseFloat(tenure) || 0) * 12 : parseFloat(tenure) || 0;

    if (p <= 0 || r <= 0 || n <= 0) {
      return { emi: 0, totalPayment: 0, totalInterest: 0 };
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
    };
  }, [principal, rate, tenure, tenureType]);

  const formatCurrency = (num: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CalculatorInput
          label="Loan Amount"
          value={principal}
          onChange={setPrincipal}
          prefix="₹"
          placeholder="Enter loan amount"
        />
        <CalculatorInput
          label="Interest Rate (% per annum)"
          value={rate}
          onChange={setRate}
          suffix="%"
          placeholder="Enter interest rate"
        />
        <CalculatorInput
          label="Loan Tenure"
          value={tenure}
          onChange={setTenure}
          placeholder="Enter tenure"
        />
        <CalculatorSelect
          label="Tenure Type"
          value={tenureType}
          onChange={(v) => setTenureType(v as 'months' | 'years')}
          options={[
            { value: 'months', label: 'Months' },
            { value: 'years', label: 'Years' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <CalculatorResult
          label="Monthly EMI"
          value={formatCurrency(result.emi)}
          highlight
        />
        <CalculatorResult
          label="Total Interest"
          value={formatCurrency(result.totalInterest)}
        />
        <CalculatorResult
          label="Total Payment"
          value={formatCurrency(result.totalPayment)}
        />
      </div>
    </div>
  );
}

// SIP Calculator
export function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState('10000');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [tenure, setTenure] = useState('10');

  const result = useMemo(() => {
    const p = parseFloat(monthlyInvestment) || 0;
    const r = (parseFloat(expectedReturn) || 0) / 12 / 100;
    const n = (parseFloat(tenure) || 0) * 12;

    if (p <= 0 || r <= 0 || n <= 0) {
      return { invested: 0, returns: 0, total: 0 };
    }

    const futureValue = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = p * n;
    const returns = futureValue - invested;

    return {
      invested: Math.round(invested),
      returns: Math.round(returns),
      total: Math.round(futureValue),
    };
  }, [monthlyInvestment, expectedReturn, tenure]);

  const formatCurrency = (num: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CalculatorInput
          label="Monthly Investment"
          value={monthlyInvestment}
          onChange={setMonthlyInvestment}
          prefix="₹"
        />
        <CalculatorInput
          label="Expected Return (% p.a.)"
          value={expectedReturn}
          onChange={setExpectedReturn}
          suffix="%"
        />
        <CalculatorInput
          label="Time Period (Years)"
          value={tenure}
          onChange={setTenure}
          suffix="Yrs"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <CalculatorResult
          label="Total Invested"
          value={formatCurrency(result.invested)}
        />
        <CalculatorResult
          label="Estimated Returns"
          value={formatCurrency(result.returns)}
        />
        <CalculatorResult
          label="Total Value"
          value={formatCurrency(result.total)}
          highlight
        />
      </div>
    </div>
  );
}

// BMI Calculator
export function BMICalculator() {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const result = useMemo(() => {
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;

    if (w <= 0 || h <= 0) {
      return { bmi: 0, category: 'Enter valid values' };
    }

    let bmi: number;
    if (unit === 'metric') {
      bmi = w / Math.pow(h / 100, 2);
    } else {
      bmi = (w * 703) / Math.pow(h, 2);
    }

    let category: string;
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    return { bmi: Math.round(bmi * 10) / 10, category };
  }, [weight, height, unit]);

  return (
    <div className="space-y-6">
      <CalculatorSelect
        label="Unit System"
        value={unit}
        onChange={(v) => setUnit(v as 'metric' | 'imperial')}
        options={[
          { value: 'metric', label: 'Metric (kg, cm)' },
          { value: 'imperial', label: 'Imperial (lbs, inches)' },
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CalculatorInput
          label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
          value={weight}
          onChange={setWeight}
          suffix={unit === 'metric' ? 'kg' : 'lbs'}
        />
        <CalculatorInput
          label={unit === 'metric' ? 'Height (cm)' : 'Height (inches)'}
          value={height}
          onChange={setHeight}
          suffix={unit === 'metric' ? 'cm' : 'in'}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <CalculatorResult
          label="Your BMI"
          value={result.bmi}
          highlight
        />
        <CalculatorResult
          label="Category"
          value={result.category}
        />
      </div>
    </div>
  );
}

// Percentage Calculator
export function PercentageCalculator() {
  const [number, setNumber] = useState('200');
  const [percentage, setPercentage] = useState('15');

  const result = useMemo(() => {
    const n = parseFloat(number) || 0;
    const p = parseFloat(percentage) || 0;
    
    const percentageOf = (n * p) / 100;
    const increase = n + percentageOf;
    const decrease = n - percentageOf;

    return {
      percentageOf: Math.round(percentageOf * 100) / 100,
      increase: Math.round(increase * 100) / 100,
      decrease: Math.round(decrease * 100) / 100,
    };
  }, [number, percentage]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CalculatorInput
          label="Number"
          value={number}
          onChange={setNumber}
          placeholder="Enter a number"
        />
        <CalculatorInput
          label="Percentage"
          value={percentage}
          onChange={setPercentage}
          suffix="%"
          placeholder="Enter percentage"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <CalculatorResult
          label={`${percentage}% of ${number}`}
          value={result.percentageOf}
          highlight
        />
        <CalculatorResult
          label={`${number} + ${percentage}%`}
          value={result.increase}
        />
        <CalculatorResult
          label={`${number} - ${percentage}%`}
          value={result.decrease}
        />
      </div>
    </div>
  );
}

// Compound Interest Calculator
export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('100000');
  const [rate, setRate] = useState('8');
  const [time, setTime] = useState('5');
  const [compound, setCompound] = useState('12');

  const result = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(time) || 0;
    const n = parseFloat(compound) || 1;

    if (p <= 0 || r <= 0 || t <= 0) {
      return { amount: 0, interest: 0 };
    }

    const amount = p * Math.pow(1 + r / n, n * t);
    const interest = amount - p;

    return {
      amount: Math.round(amount),
      interest: Math.round(interest),
    };
  }, [principal, rate, time, compound]);

  const formatCurrency = (num: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CalculatorInput
          label="Principal Amount"
          value={principal}
          onChange={setPrincipal}
          prefix="₹"
        />
        <CalculatorInput
          label="Interest Rate (% p.a.)"
          value={rate}
          onChange={setRate}
          suffix="%"
        />
        <CalculatorInput
          label="Time Period (Years)"
          value={time}
          onChange={setTime}
          suffix="Yrs"
        />
        <CalculatorSelect
          label="Compounding Frequency"
          value={compound}
          onChange={setCompound}
          options={[
            { value: '1', label: 'Annually' },
            { value: '2', label: 'Semi-Annually' },
            { value: '4', label: 'Quarterly' },
            { value: '12', label: 'Monthly' },
            { value: '365', label: 'Daily' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <CalculatorResult
          label="Interest Earned"
          value={formatCurrency(result.interest)}
        />
        <CalculatorResult
          label="Total Amount"
          value={formatCurrency(result.amount)}
          highlight
        />
      </div>
    </div>
  );
}

// GST Calculator
export function GSTCalculator() {
  const [amount, setAmount] = useState('1000');
  const [gstRate, setGstRate] = useState('18');
  const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');

  const result = useMemo(() => {
    const a = parseFloat(amount) || 0;
    const r = parseFloat(gstRate) || 0;

    if (a <= 0) {
      return { gst: 0, total: 0, original: 0 };
    }

    if (type === 'exclusive') {
      const gst = (a * r) / 100;
      return {
        gst: Math.round(gst * 100) / 100,
        total: Math.round((a + gst) * 100) / 100,
        original: a,
      };
    } else {
      const original = a / (1 + r / 100);
      const gst = a - original;
      return {
        gst: Math.round(gst * 100) / 100,
        total: a,
        original: Math.round(original * 100) / 100,
      };
    }
  }, [amount, gstRate, type]);

  const formatCurrency = (num: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(num);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CalculatorInput
          label={type === 'exclusive' ? 'Amount (Excl. GST)' : 'Amount (Incl. GST)'}
          value={amount}
          onChange={setAmount}
          prefix="₹"
        />
        <CalculatorSelect
          label="GST Rate"
          value={gstRate}
          onChange={setGstRate}
          options={[
            { value: '0', label: '0%' },
            { value: '5', label: '5%' },
            { value: '12', label: '12%' },
            { value: '18', label: '18%' },
            { value: '28', label: '28%' },
          ]}
        />
        <CalculatorSelect
          label="Calculation Type"
          value={type}
          onChange={(v) => setType(v as 'exclusive' | 'inclusive')}
          options={[
            { value: 'exclusive', label: 'Add GST' },
            { value: 'inclusive', label: 'Extract GST' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <CalculatorResult
          label="Original Amount"
          value={formatCurrency(result.original)}
        />
        <CalculatorResult
          label="GST Amount"
          value={formatCurrency(result.gst)}
        />
        <CalculatorResult
          label="Total Amount"
          value={formatCurrency(result.total)}
          highlight
        />
      </div>
    </div>
  );
}

// Age Calculator
export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');

  const result = useMemo(() => {
    if (!birthDate) {
      return { years: 0, months: 0, days: 0, totalDays: 0 };
    }

    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays };
  }, [birthDate]);

  return (
    <div className="space-y-6">
      <div className="max-w-md">
        <label className="block text-sm font-medium text-foreground mb-2">Date of Birth</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-brand-primary/50 focus:bg-white/[0.07] outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        <CalculatorResult
          label="Years"
          value={result.years}
          highlight
        />
        <CalculatorResult
          label="Months"
          value={result.months}
        />
        <CalculatorResult
          label="Days"
          value={result.days}
        />
        <CalculatorResult
          label="Total Days"
          value={result.totalDays.toLocaleString()}
        />
      </div>
    </div>
  );
}

// Discount Calculator
export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState('1000');
  const [discountPercent, setDiscountPercent] = useState('20');

  const result = useMemo(() => {
    const price = parseFloat(originalPrice) || 0;
    const discount = parseFloat(discountPercent) || 0;

    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;

    return {
      discountAmount: Math.round(discountAmount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
    };
  }, [originalPrice, discountPercent]);

  const formatCurrency = (num: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(num);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CalculatorInput
          label="Original Price"
          value={originalPrice}
          onChange={setOriginalPrice}
          prefix="₹"
        />
        <CalculatorInput
          label="Discount"
          value={discountPercent}
          onChange={setDiscountPercent}
          suffix="%"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <CalculatorResult
          label="You Save"
          value={formatCurrency(result.discountAmount)}
        />
        <CalculatorResult
          label="Final Price"
          value={formatCurrency(result.finalPrice)}
          highlight
        />
      </div>
    </div>
  );
}
