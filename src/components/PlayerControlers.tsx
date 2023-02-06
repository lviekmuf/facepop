import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import playIcon from '../assets/icons/play.svg'
import hideIcon from '../assets/icons/hide.svg'
import unmutedIcon from '../assets/icons/unmuted.svg'
import mutedIcon from '../assets/icons/muted.svg'
import pauseIcon from '../assets/icons/pause.svg'
import Description from "./Description";

interface videoData {
    title?: string
    description?: string
    callToActionUrl?: string
    callToActionText?: string
}

interface Props {
    setPlaying: () => void
    setMuted: () => void
    hideVideo: () => void
    isPlaying: boolean
    isMuted: boolean
    videoData?: videoData
    playedPercents: number
    duration: number
    setPlayedSeconds: (seconds: number) => void
}

const PlayerControllers = (props: Props) => {
    const {
        setPlaying,
        setMuted,
        hideVideo,
        isMuted,
        isPlaying,
        videoData,
        playedPercents,
        setPlayedSeconds,
    } = props
    const scrollRef = useRef<HTMLDivElement | null>(null)

    const onPlayedClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target instanceof HTMLElement) {
            const progressWidth = scrollRef.current?.clientWidth || 0
            const playedPercents = event.clientX - event.target.getBoundingClientRect().left
            setPlayedSeconds(playedPercents / progressWidth * 100)
        }
    }
    return (
        <div className="player-controls flex flex-col justify-end " >
            <div className="flex justify-end w-full absolute p-2 top-0"><img className="button-icon" src={hideIcon} alt="" onClick={hideVideo} /></div>
            <div className="p-4 flex justify-between flex-row">
                <Description title={videoData?.title} description={videoData?.description} />
                <div className="w-40 flex justify-center flex-col items-end	">
                    <img src={isMuted ? unmutedIcon : mutedIcon} className="button-icon" alt="" onClick={(e) => {
                        e.preventDefault()
                        setMuted()
                        }} />
                    <img src={isPlaying ? pauseIcon : playIcon} className="button-icon" alt="" onClick={setPlaying} />
                </div>
            </div>
            <a href={videoData?.callToActionUrl} className="text-center bg-blue-800 p-4 text-white text-2xl m-4 box-border rounded-full">{videoData?.callToActionText}</a>
            <div ref={scrollRef}className="w-full rounded-full h-2.5  hover:bg-gray-800/50" onClick={onPlayedClick}>
                <div className="bg-white h-2.5 rounded-full" style={{ width: `${playedPercents}%` }}></div>
            </div>
        </div>
    );             

}

export default PlayerControllers;
