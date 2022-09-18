import axios from 'axios'
import { useEffect, useState } from 'react'
import FlatList from 'flatlist-react'
import { X } from 'phosphor-react'

import { DuoCard, DuoCardProps } from './DuoCard'

interface Props {
    gameId: string
}

export function DuoContainer({ gameId }: Props) {
    
    const [duos, setDuos] = useState<DuoCardProps[]>([])
    const [emptyResponse, setEmptyResponse] = useState(false)

    function handleOpenGame() {

    }

    console.log(gameId)

    useEffect(() => {  
            axios(`http://192.168.15.109:3333/games/${gameId}/ads`)
                .then(response =>  {
                    setDuos(response.data)
                    if(!response.data) {
                        setEmptyResponse(true)
                    } else {
                        setEmptyResponse(false)
                    }
                })
    }, [gameId])

    return (
        <div className="pb-1 mt-8 bg-nlw-gradient rounded-lg overflow-hidden self-stretch">
            <div className="bg-[#2A2634]">
                <div className="flex justify-end px-4 pt-4 text-zinc-300 hover:text-violet-500">
                    <X size={30}  className="cursor-pointer" weight="bold"/>
                </div>
                <div className="px-8 pt-1 pb-8 flex justify-center align-center gap-4">
                    <FlatList 
                        list={duos}
                        renderItem={(item: any) => 
                            (<DuoCard key={item.id} data={item}/>)}
                        renderWhenEmpty={() =>
                            (<div className="w-full text-center text-zinc-300 font-semibold text-xl">
                                <span>Ainda não há anuncios publicados.</span>
                            </div>)
                        } />
                </div>
            </div>
        </div>
    );
}