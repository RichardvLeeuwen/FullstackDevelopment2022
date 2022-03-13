import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

// modules can have several named exports
export const useAnotherHook = (firstField, secondField, thirdField) => {
    const event = {
        target: {
            value: ''
        }
    }
    const reset = () => {
        firstField(event)
        secondField(event)
        thirdField(event)
    }
    return {
        onClick: reset
    }
}