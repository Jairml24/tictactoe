import { useEffect, useState } from "react"

export const Square = ({ value, jugador, printOption, restart, ganador }) => {
    const [estado, setEstado] = useState(false)
    const [cursor, setCursor] = useState('cursor-pointer')
    const [print, setPrint] = useState(['', ''])

    const selectOption = (e) => {
        if (!ganador) {
            setEstado(true)
            setCursor('')
            printOption(e, estado, value)
        }
    }

    useEffect(() => {
        printOptions()
    }, [estado])

    useEffect(() => {
        setEstado(false)
        setPrint(['', ''])
    }, [restart])

    const printOptions = () => {
        if (estado && !ganador) {
            let conf = jugador ? ['O', 'blue'] : ['X', 'red']
            setPrint([conf[0], conf[1]])
        }
    }

    return (
        <div id={value} className={`flex justify-center items-center 
                         border border-green-50 text-[25px]
                         w-1/3 aspect-[1/1] text-${print[1]}-500
                        ${cursor} `}
            onClick={(e) => selectOption(e)}>
            {print[0]}
        </div>
    )
}