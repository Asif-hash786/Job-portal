import React from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { SlidersHorizontal } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'Location',
    array: [
      'Delhi NCR',
      'Banglore',
      'Hyderabad',
      'Noida',
      'Mumbai',
      'Pune',
    ],
  },
  {
    filterType: 'Industry',
    array: [
      'Frontend Developer',
      'Backend Developer',
      'Ai Enginner',
    ],
  },
  {
    filterType: 'Salary',
    array: [
      '0-40k',
      '42-100k',
      '100k-200k',
    ],
  },
];

const FilterOptions = () => {
  const [selectedValue, setSelectedValue] = React.useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    const [filterType, filterValue] = value.split('::');

    setSelectedValue(value);

    dispatch(
      setSearchedQuery({
        type: filterType,
        value: filterValue,
      })
    );
  };

  return (
    <div className="w-full">
      <h1 className="font-bold text-lg">
        Filter Jobs
      </h1>

      <hr className="my-3" />

      <RadioGroup
        onValueChange={changeHandler}
        value={selectedValue}
      >
        {filterData.map((item) => (
          <div key={item.filterType}>
            <h2 className="font-semibold text-base mt-4 mb-2">
              {item.filterType}
            </h2>

            {item.array.map((data) => {
              const itemId = `${item.filterType}-${data}`;

              return (
                <div
                  key={itemId}
                  className="flex items-center space-x-2 my-2"
                >
                  <RadioGroupItem
                    value={`${item.filterType}::${data}`}
                    id={itemId}
                  />

                  <Label
                    htmlFor={itemId}
                    className="cursor-pointer"
                  >
                    {data}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

const FilterCard = () => {
  return (
    <>
      <div className="hidden lg:block">
        <div className="w-full rounded-md border p-4 shadow-sm">
          <FilterOptions />
        </div>
      </div>
      <div className="lg:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto gap-2"
              type="button"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="w-75 sm:w-87.5 max-h-[70vh] overflow-y-auto"
          >
            <FilterOptions />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default FilterCard;