import React from "react";

export default ({
                    value: initialValue,
                    row: {index, cells, original},
                    column: {id},
                    updateMyData,
                    preFilteredRows
                }) => {

    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        updateMyData(original.id, id, value)
    }

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    if (['name', 'duration', 'distance'].includes(id)) {
        return <input value={value} onChange={onChange} onBlur={onBlur}/>
    } else if (['lineNumber'].includes(id)) {
        return <select>
            <option>{value}</option>
        </select>
    } else {
        return value;
    }
}