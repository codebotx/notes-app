import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import "../assets/css/chatApp.css";
function Datepicker(dateChange) {
    const [selected, setSelected] = React.useState(new Date());
    return (
        <DayPicker
            mode="single"
            showOutsideDays
            selected={selected}
            onSelect={setSelected}
        />
    )
}

export default Datepicker