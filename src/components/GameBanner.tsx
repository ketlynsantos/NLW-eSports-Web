import { ArrowDown } from 'phosphor-react'

export interface GameBannerProps {
    id: string
    bannerUrl: string
    title: string
    adsCount: number,
    onConnect: () => void
}

export function GameBanner(props: GameBannerProps) {

    return (
        <a className={`group relative rounded-lg overflow-hidden keen-slider__slide number-slide${props.id}`}>
          <label className="w-full h-full absolute bottom-0 left-0 right-0 hover:bg-[#0000009e] z-10
            flex items-center justify-center transition-all duration-500 ease-out"
            onClick={props.onConnect}>
            <ArrowDown size={134} color="white" weight="duotone"
              className="p-10 transition-all duration-500 ease-out hidden group-hover:block hover:rotate-[360deg]"/>
          </label>
          <img src={props.bannerUrl} alt="" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">{ props.title }</strong>
            <span className="text-zinc-300 text-sm block">{ props.adsCount } anúncio(s)</span>
          </div>
        </a>  
    )
}