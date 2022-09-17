import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { 
  Check, 
  GameController, 
  CaretDown, 
  CaretUp  } from 'phosphor-react'
import { Input } from './Form/Input'

export interface Game {
  id: string
  title: string
}

export function CreateAdModal() {

  const [ games, setGames ] = useState<Game[]>([])
  const [ weekDays, setWeekDays ] = useState<String[]>([])
  const [ useVoiceChannel, setUseVoiceChannel ] = useState(false)

  useEffect(() => {
      axios('http://localhost:3333/games').then(response => {
          setGames(response.data)
        })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    //forçando o target a ser um formulario
    const formData  = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    // console.log(data)

    if(!data.name) {
      return
    }

    try {
      axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert('Anúncio criado com sucesso!')
    } catch (err) {
      console.log(err)
      alert('Erro ao criar o anúncio!')
    }
  }

  return (
    // Permite que o conteudo dentro dele aparece em outro lugar da tela, 
    // que não esteja acoplado a essa div
    <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2
          left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black-25">
          <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">Qual o game?</label>
              <Select.Root name="game">
                <Select.Trigger className="inline-flex items-center justify-between gap-5 bg-zinc-900 
                  py-3 px-4 rounded text-sm text-zinc-500">
                  <Select.Value placeholder="Selecione o game que deseja jogar" />

                  <Select.Icon>
                    <CaretDown />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal className="bg-zinc-900 py-3 px-1 rounded text-sm text-white cursor-default">
                  <Select.Content className="rounded overflow-hidden">
                    <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-zinc-900 cursor-default">
                      <CaretUp />
                    </Select.ScrollUpButton>
                    
                    <Select.Viewport className="p-1">
                      <Select.Group>
                        <Select.Label className="px-2 text-zinc-400">Games</Select.Label>
                        { games.map(game => {
                          return (
                            <Select.Item key={game.id} value={game.id}
                              className="flex relative items-center hover:bg-violet-500 rounded h-6 px-2">
                              <Select.ItemText>{game.title}</Select.ItemText>
                              <Select.ItemIndicator className="absolute select-none right-0 w-6 inline-flex items-center justify-center">
                                <Check />
                              </Select.ItemIndicator>
                            </Select.Item>
                          )
                        })}
                      </Select.Group>
                    </Select.Viewport>
                    <Select.SelectScrollDownButton className="flex items-center justify-center 
                      h-6 bg-zinc-900 cursor-default">
                      <CaretDown />
                    </Select.SelectScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
              <Input id="name" name="name" placeholder="Como te chamam dentro do game?"/> 
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying" className="font-semibold">Joga há quantos anos?</label>
                <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO"/>  
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="discord" className="font-semibold">Qual seu Discord?</label>
                <Input id="discord" name="discord" placeholder="Usuario#0000"/>   
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>
                <ToggleGroup.Root  
                  name="weekDays"
                  type="multiple" 
                  className="grid grid-cols-4 gap-1"
                  value={weekDays}
                  onValueChange={setWeekDays}>
                  <ToggleGroup.Item value="0" title="Domingo"
                    className={`w-10 h-10 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item value="1" title="Segunda" 
                    className={`w-10 h-10 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item value="2" title="Terça" 
                    className={`w-10 h-10 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item value="3" title="Quarta" 
                    className={`w-10 h-10 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item value="4" title="Quinta" 
                    className={`w-10 h-10 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item value="5" title="Sexta" 
                    className={`w-10 h-10 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item value="6" title="Sábado" 
                    className={`w-10 h-10 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>

              <label className="flex flex-1 flex-col gap-2">
                <label htmlFor="hourStart" className="font-semibold">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input id="hourStart" name="hourStart" type="time" placeholder="De"/>  
                  <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até"/>  
                </div>
              </label>
            </div>

            <label className="mt-2 flex gap-2 text-sm items-center">
              <Checkbox.Root 
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if(checked === true) {
                    setUseVoiceChannel(true)
                  } else setUseVoiceChannel(false)
                }}
                className="w-6 h-6 p-1 rouded bg-zinc-900"> 
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costume me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close type="button" 
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                  Cancelar
              </Dialog.Close>

              <button type="submit"
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3
                  hover:bg-violet-600">
                  <GameController size={24}/>
                  Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
    </Dialog.Portal>
  )
}