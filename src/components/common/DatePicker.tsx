
import React from 'react';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  placeholder?: string;
  value?: Date | undefined;
  onChange?: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  placeholder = 'Tarih seçin',
  value,
  onChange 
}) => {
  const [date, setDate] = React.useState<Date | undefined>(value);
  
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onChange) onChange(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'w-full flex justify-start px-0 text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          className="p-3"
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
