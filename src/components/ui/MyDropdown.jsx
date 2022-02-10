import React, { useState } from 'react';


function MyDropdown ({selected, setSelected, setSelid}) {
    const [isActive, setIsActive] = useState(false);
    const options = ["1x1 сплит", "2x2 сплит", "3x2 сплит", "3x3 сплит", "3x4 сплит", "4x4 сплит", "4x6 сплит", "5+1 сплит", "12+1 сплит"];
    const icons = [
        <svg width="53" height="33" viewBox="0 0 53 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="52" height="32" stroke="#C4C4C4"/>
        </svg>,
        <svg width="53" height="33" viewBox="0 0 53 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="24.9804" height="15" stroke="#C4C4C4"/>
            <rect x="27.5196" y="0.5" width="24.9804" height="15" stroke="#C4C4C4"/>
            <rect x="27.5196" y="17.5" width="24.9804" height="15" stroke="#C4C4C4"/>
            <rect x="0.5" y="17.5" width="24.9804" height="15" stroke="#C4C4C4"/>
        </svg>,
        <svg width="53" height="33" viewBox="0 0 53 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="15.6275" height="15" stroke="#C4C4C4"/>
            <rect x="18.1664" y="0.5" width="15.6275" height="15" stroke="#C4C4C4"/>
            <rect x="18.1664" y="17.5" width="15.6275" height="15" stroke="#C4C4C4"/>
            <rect x="35.8333" y="0.5" width="16.6667" height="15" stroke="#C4C4C4"/>
            <rect x="35.8333" y="17.5" width="16.6667" height="15" stroke="#C4C4C4"/>
            <rect x="0.5" y="17.5" width="15.6275" height="15" stroke="#C4C4C4"/>
        </svg>,
        <svg width="53" height="33" viewBox="0 0 53 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="15.6275" height="9.3125" stroke="#C4C4C4"/>
            <rect x="0.5" y="11.8438" width="15.6275" height="9.3125" stroke="#C4C4C4"/>
            <rect x="18.1664" y="0.5" width="15.6275" height="9.3125" stroke="#C4C4C4"/>
            <rect x="18.1665" y="11.8438" width="15.6275" height="9.3125" stroke="#C4C4C4"/>
            <rect x="18.1665" y="23.1875" width="15.6275" height="9.3125" stroke="#C4C4C4"/>
            <rect x="35.8333" y="0.5" width="16.6667" height="9.3125" stroke="#C4C4C4"/>
            <rect x="35.8335" y="11.8438" width="16.6667" height="9.3125" stroke="#C4C4C4"/>
            <rect x="35.8335" y="23.1875" width="16.6667" height="9.3125" stroke="#C4C4C4"/>
            <rect x="0.5" y="23.1875" width="15.6275" height="9.3125" stroke="#C4C4C4"/>
        </svg>,
        <svg width="53" height="33" viewBox="0 0 53 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="11.4706" height="9.3125" stroke="#C4C4C4"/>
            <rect x="0.5" y="11.8438" width="11.4706" height="9.3125" stroke="#C4C4C4"/>
            <rect x="0.5" y="23.1875" width="11.4706" height="9.3125" stroke="#C4C4C4"/>
            <rect x="14.0098" y="0.5" width="11.4706" height="9.3125" stroke="#C4C4C4"/>
            <rect x="14.0098" y="11.8438" width="11.4706" height="9.3125" stroke="#C4C4C4"/>
            <rect x="14.0098" y="23.1875" width="11.4706" height="9.3125" stroke="#C4C4C4"/>
            <rect x="27.5196" y="0.5" width="11.4706" height="9.3125" stroke="#C4C4C4"/>
            <rect x="27.5195" y="11.8438" width="11.4706" height="9.3125" stroke="#C4C4C4"/>
            <rect x="27.5195" y="23.1875" width="11.4706" height="9.3125" stroke="#C4C4C4"/>
            <rect x="41.0294" y="0.5" width="11.4706" height="9.3125" stroke="#C4C4C4"/>
            <rect x="41.0293" y="11.8438" width="11.4706" height="9.3125" stroke="#C4C4C4"/>
            <rect x="41.0293" y="23.1875" width="11.4706" height="9.3125" stroke="#C4C4C4"/>
        </svg>,
        <svg width="53" height="33" viewBox="0 0 53 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="14.0098" y="0.5" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="27.5196" y="0.5" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="41.0294" y="0.5" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="0.5" y="8.75" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="14.0098" y="8.75" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="27.5196" y="8.75" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="41.0294" y="8.75" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="0.5" y="17" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="14.0098" y="17" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="27.5196" y="17" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="41.0294" y="17" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="0.5" y="25.25" width="11.4706" height="7.25" stroke="#C4C4C4"/>
            <rect x="14.0098" y="25.25" width="11.4706" height="7.25" stroke="#C4C4C4"/>
            <rect x="27.5196" y="25.25" width="11.4706" height="7.25" stroke="#C4C4C4"/>
            <rect x="41.0294" y="25.25" width="11.4706" height="7.25" stroke="#C4C4C4"/>
        </svg>,
        <svg width="53" height="33" viewBox="0 0 53 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="6.27454" height="6.45161" stroke="#C4C4C4"/>
            <rect x="0.5" y="9.01613" width="6.27454" height="6.45161" stroke="#C4C4C4"/>
            <rect x="0.5" y="17.5323" width="6.27454" height="6.45161" stroke="#C4C4C4"/>
            <rect x="0.5" y="26.0484" width="6.27454" height="6.45161" stroke="#C4C4C4"/>
            <rect x="18.1665" y="0.5" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="18.1665" y="9.01613" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="18.1665" y="17.5323" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="18.1665" y="26.0484" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="36.8723" y="0.5" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="36.8726" y="9.01613" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="36.8726" y="17.5323" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="36.8726" y="26.0484" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="8.81329" y="0.5" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="8.81348" y="9.01613" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="8.81348" y="17.5323" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="8.81348" y="26.0484" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="27.5197" y="0.5" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="27.5195" y="9.01613" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="27.5195" y="17.5323" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="27.5195" y="26.0484" width="7.31376" height="6.45161" stroke="#C4C4C4"/>
            <rect x="46.2256" y="0.5" width="6.27454" height="6.45161" stroke="#C4C4C4"/>
            <rect x="46.2256" y="9.01613" width="6.27454" height="6.45161" stroke="#C4C4C4"/>
            <rect x="46.2256" y="17.5323" width="6.27454" height="6.45161" stroke="#C4C4C4"/>
            <rect x="46.2256" y="26.0484" width="6.27454" height="6.45161" stroke="#C4C4C4"/>
        </svg>,
        <svg width="53" height="33" viewBox="0 0 53 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="34.3336" height="21" stroke="#C4C4C4"/>
            <rect x="36.8724" y="0.5" width="15.6276" height="9" stroke="#C4C4C4"/>
            <rect x="36.8724" y="23.5" width="15.6276" height="9" stroke="#C4C4C4"/>
            <rect x="19.2059" y="23.5" width="15.6276" height="9" stroke="#C4C4C4"/>
            <rect x="0.5" y="23.5" width="16.6668" height="9" stroke="#C4C4C4"/>
            <rect x="36.8724" y="11.5" width="15.6276" height="10" stroke="#C4C4C4"/>
        </svg>,
        <svg width="53" height="33" viewBox="0 0 53 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="0.5" y="8.75" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="41.0293" y="8.75" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="0.5" y="25.25" width="11.4706" height="7.25" stroke="#C4C4C4"/>
            <rect x="0.5" y="17" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="41.0293" y="17" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="14.0098" y="0.5" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="14.0098" y="8.75" width="24.9804" height="14.4688" stroke="#C4C4C4"/>
            <rect x="14.0098" y="25.25" width="11.4706" height="7.25" stroke="#C4C4C4"/>
            <rect x="27.5196" y="0.5" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="27.5195" y="25.25" width="11.4706" height="7.25" stroke="#C4C4C4"/>
            <rect x="41.0294" y="0.5" width="11.4706" height="6.21875" stroke="#C4C4C4"/>
            <rect x="41.0293" y="25.25" width="11.4706" height="7.25" stroke="#C4C4C4"/>
        </svg>
    ];
    return (
        <div className="undertop__dropdown">
            <div className="dropdown__default" onClick={(e) => setIsActive(!isActive)}>
                <span> {selected} </span>
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.94 5.27337L4 2.22004L7.06 5.27337L8 4.33337L4 0.333374L0 4.33337L0.94 5.27337Z" fill="#F4F4F4"/>
                </svg>
            </div>
            { isActive && (
                <ul className="dropdown__list">
                    {options.map((option, index) => 
                        <li onClick = { e => { 
                            setSelected(option)                      
                            setIsActive(false)
                            setSelid(index)
                            }}
                            className="dropdown__item">
                            {icons[index]}

                            {option}
                        </li>
                    )}
                </ul>
            )}
        </div>
    )
}

export default MyDropdown;
