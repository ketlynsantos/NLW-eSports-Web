import './styles/main.css'
import 'keen-slider/keen-slider.min.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useKeenSlider } from 'keen-slider/react' 

import logoImg from './assets/logo-nlw.svg'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'
import { DuoContainer } from './components/AdsDuo/DuoContainer'

export interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {

  const [ games, setGames ] = useState<Game[]>([])
  const [ gameId, setGameId ] = useState('')
  const [ countAds, setCountAds ] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 5.3,
      spacing: 15
    },
  }, [])

  useEffect(() => {
      axios('http://localhost:3333/games').then(response => {
        setGames(response.data)
      })
  }, [])

  function handleShowAdsToGame(id: string) {
    setGameId(id)
  }


  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
       
      <h1 className="text-6xl text-white font-black mt-20 mb-16">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div ref={sliderRef} className="keen-slider">
        { games.map(game => {
          return (
            <GameBanner 
              id={game.id}
              key={game.id} 
              bannerUrl={game.bannerUrl} 
              title={game.title} 
              adsCount={game._count.ads}
              onConnect={() => handleShowAdsToGame(game.id)} />
          )
        }) }
      </div>

        { gameId.length > 0 ?
          <DuoContainer gameId={gameId}/>
          : ''
        }

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
