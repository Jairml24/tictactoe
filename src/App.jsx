import { useEffect, useState } from 'react'
import './App.css'
import { Square } from './components/Square'

function App() {
  const [jugador, setJugador] = useState(true)
  const [restart, setRestart] = useState(false)
  const [countMoves, SetCountMoves] = useState(0)
  const [ganador, setGanador] = useState([false, ''])
  const [data, setData] = useState({ 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9" })

  const squareValues = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const printOption = (e, estado, value) => {
    if (!estado) {
      setJugador(!jugador)
      SetCountMoves(countMoves + 1)
      setData(data => ({
        ...data,
        [value]: jugador ? 1 : 2
      }));
    }
  }

  const restartGame = (() => {
    setRestart(!restart)
    SetCountMoves(0)
    setJugador(true)
    setGanador(false, '')
    setData({ 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9" })
  })

  useEffect(() => {
    if(countMoves==9){
      setGanador([true, 'Empate']);
    }
    for (const combinacion of comb) {
      const [a, b, c] = combinacion;
      if (data[a] !== null && data[a] === data[b] && data[b] === data[c]) {
        // Determina quién es el ganador
        setGanador([true, data[a] === 1 ? 'Ganador 1' : 'Ganador 2']);
      }
    }   
  }, [data])

  const comb = [
    [1, 2, 3], // Fila 1
    [4, 5, 6], // Fila 2
    [7, 8, 9], // Fila 3
    [1, 4, 7], // Columna 1
    [2, 5, 8], // Columna 2
    [3, 6, 9], // Columna 3
    [1, 5, 9], // Diagonal principal
    [3, 5, 7]  // Diagonal secundaria
  ];


  return (
    <div className='flex justify-center bg-gray-950 h-screen w-full'>
      <div className='text-gray-50 text-center w-2/3 lg:w-1/6'>
        <h1 className=' text-[40px]'>Tic Tac Toe</h1>
        <h2>TURN PLAYER <span className={jugador ? 'text-red-600' : 'text-blue-500'}>{jugador ? 1 : 2}</span></h2>
        <div className='flex flex-wrap'>
          {
            squareValues.map((value) => (
              <Square value={value} jugador={jugador} printOption={(e, estado) => printOption(e, estado, value)} restart={restart} ganador={ganador[0]} />
            ))
          }
        </div>
        {
          ganador[0] &&
          <h2 className='text-yellow-500 mt-4'>Final del juego {ganador}</h2>
        }

        <button onClick={restartGame} className=' bg-lime-400 mt-4 text-black p-2 cursor-pointer hover:bg-lime-500 rounded-lg'>Restart game</button>

      </div>
    </div>

  )
}

export default App
