import React from 'react';

interface IconProp {
    icon: any;
    size: number;
}

const Icon = ({icon, size}: IconProp) => {
    return (
        <div 
            style={{display: "flex", cursor: "pointer", fontSize: size}}
        >
            {icon}
        </div>
    );
}

export default Icon;