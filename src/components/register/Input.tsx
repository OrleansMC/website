import React from "react"


type InputProps = {
    id?: string,
    type: React.HTMLInputTypeAttribute,
    placeholder: string,
    className?: string
}

export default function Input(props: InputProps) {
    const { type, placeholder, className } = props;

    return (
        <input
            id={props.id}
            required
            type={type}
            placeholder={placeholder}
            className={'p-4 bg-dark-850 text-zinc-200 rounded-lg hover:bg-dark-800 duration-300 outline-none' +
                (className ? ' ' + className : '')}
        />
    )
}