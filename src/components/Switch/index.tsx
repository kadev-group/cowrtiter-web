import React, {useState} from 'react';

type IProps = {
    onClick?: () => void
}

const Switch = (data: IProps) => {
    const [isActive, setIsActive] = useState(false);

    const toggleSwitch = () => {
        setIsActive(!isActive);
        if (data.onClick !== undefined) data.onClick()
    };

    return (
        <div
            className={`flex items-center w-14 h-8 rounded-full border-2 border-gray-300 
            ${isActive ? 'bg-white' : 'bg-blue-500'}`}
            onClick={toggleSwitch}
        >
            <div
                className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                    isActive ? 'transform translate-x-full bg-blue-500' : 'ml-1 bg-white'}`}
            />
        </div>
    );
};

export default Switch;
