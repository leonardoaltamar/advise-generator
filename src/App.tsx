/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import './App.css'
import divider from './assets/pattern-divider-desktop.svg'
import diceIcon from './assets/icon-dice.svg'
import { useEffect, useState } from 'react'

interface Quote {
  a: string
  c: string
  h: string
  q: string
}

/* https://zenquotes.io/api/quotes */

function App() {

  const [quotes, setQuotes] = useState<Quote[]>([])

  const [appointment, setAppointment] = useState({
    id: 1233,
    phrase: "It is easy to sit up and take notice, what's difficult is getting up and taking action.",
    autor: "Robert Greene"
  })

  useEffect(() => {
    fetch('/api/api/quotes').then((resp => resp.json())).then((quotes: Quote[]) => {
      setQuotes(quotes)
    })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const randomIntInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateNewAppointment = () => {
    const indexRandom: number = randomIntInRange(0, (quotes.length - 1));
    const quote: Quote = quotes[indexRandom];
    setAppointment({
      id: Number(quote.c),
      autor: quote.a,
      phrase: quote.q
    })

  }

  return (
    <div className="container">

      <div className="content-card bg-dark-grayish-blue">
        <span className='color-neon-green'>ADVICE #{appointment.id}</span>
        <div className='content-appointment'>
          <p className="manrope-bold fz-28 color-light-cyan">
            “{appointment.phrase}”
          </p>

          <img src={divider} alt="" />

          <span className='color-neon-green'>{appointment.autor}</span>
        </div>

        <div className='die' onClick={generateNewAppointment}>
          <img src={diceIcon} alt="" className='icon-die' />
        </div>
      </div>
    </div>
  )
}

export default App
