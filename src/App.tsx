import './styles/main.css'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from './assets/logo-nlw.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useState, useEffect } from 'react'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
      fetch('http://localhost:3333/games')
        .then(response => response.json())
        .then(data => {
          setGames(data)
        })
  }, [])
  

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
       
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        { games.map(game => {
          return (
            <GameBanner 
              key={game.id} 
              bannerUrl={game.bannerUrl} 
              title={game.title} 
              adsCount={game._count.ads} />
          )
        }) }
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        {/* Permite que o conteudo dentro dele aparece em outro lugar da tela, 
        que não esteja acoplado a essa div */}
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2
              left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-480px] shadow-lg shadow-black-25">
              <Dialog.Title>Publique um anúncio</Dialog.Title>

              <Dialog.Content>
                asasdassdsadsa
              </Dialog.Content>
            </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
