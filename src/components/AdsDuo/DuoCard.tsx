import React from 'react';
import { GameController, Thermometer } from 'phosphor-react';

import { DuoInfo } from './DuoInfo';

export interface DuoCardProps {
  id: string
  hourEnd: string
  hourStart: string
  name: string
  useVoiceChannel: boolean
  weekDays: string[]
  yearsPlaying: number
}

interface Props {
  data: DuoCardProps,
  // onConnect: () => void
}

export function DuoCard({ data }: Props) {
  return (
    <div className="flex flex-col items-center w-60 rounded-lg p-5 bg-zinc-900">
       <DuoInfo 
        label="Nome" 
        value={data.name} />

      <DuoInfo 
        label="Tempo de jogo" 
        value={`${data.yearsPlaying} anos`} />

      <DuoInfo 
        label="Disponibilidade" 
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`} />

      <DuoInfo 
        label="Chamada de áudio" 
        value='Sim'
        colorValue={ data.useVoiceChannel ? 'text-[#34D399]' : 'text-[#F87171]'} />

      <button 
        // onClick={onConnect} 
        className="w-full h-9 rounded-md bg-violet-500 flex flex-row items-center justify-center">
          <GameController size={24} color="white"/>
          <span className="text-white font-semibold text-md ml-2">Conectar</span>
      </button>
  </div>
  );
}