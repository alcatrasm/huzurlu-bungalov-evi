
import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NightSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const NightSelector: React.FC<NightSelectorProps> = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 30 
}) => {
  const handleChange = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center border rounded-md">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-r-none"
        onClick={() => handleChange(value - 1)}
        disabled={value <= min}
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={(e) => handleChange(parseInt(e.target.value) || min)}
        className="w-16 h-10 text-center border-0 rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        min={min}
        max={max}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-l-none"
        onClick={() => handleChange(value + 1)}
        disabled={value >= max}
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NightSelector;
