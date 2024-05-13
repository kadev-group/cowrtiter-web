import React, {useState} from 'react';

type Option = {
    value: string;
    label: string;
};

type IProps = {
    options: Option[];
    onClick?: (value: string) => void;
};

const Select = ({options, onClick}: IProps) => {
    const [selectedValue, setSelectedValue] = useState(options[0].value);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        if (onClick) onClick(newValue);
    };

    return (
        <select
            value={selectedValue}
            onChange={handleChange}
            className="px-4 py-2 rounded-full border-2 border-gray-300 bg-blue-500 text-white"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
};

export default Select;
