import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import playIcon from '../assets/icons/play.svg'
import PlayerControllers from "./PlayerControlers";

interface videoData {
  title?: string
  description?: string
  callToActionUrl?: string
  callToActionText?: string
}

interface Props {
  videoUrl: string
  videoData?: videoData
}

const Player = (props: Props) => {
  const { videoUrl, videoData } = props
  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const [isFull, setFull] = useState(false)
  const [duration, setDuration] = useState(0)

  const playerRef = useRef<ReactPlayer | null>(null)
  const config = {
    muted: true,
    youtube: {
      playerVars: { showinfo: 0 },
      embedOptions: {
        controls: 0,
      }
    },
  }
  const height = '100%'
  const width = '100%'

  const handleOpenPlayer = () => {
    setFull(true)
  }
  const handleHidePlayer = () => {
    setFull(false)
  }
  const playerDuration = playerRef.current?.getDuration()
  const handleMute = () => setMuted(!muted)
  const handlePlaying = () => setPlaying(!playing)
  useEffect(() => {
    if (playerRef.current?.getSecondsLoaded()) {
      const duration = playerDuration || 0
      setDuration(duration)
    }
  },
    [playerDuration])

  const playedPercents = Math.round(playedSeconds / duration * 100)

  const rewindVideo = (percents: number) => {
    const seconds = Math.round(percents / 100 * duration)
    playerRef.current?.seekTo(seconds)
    setPlayedSeconds(seconds)
  }

  return (
    <div className={`player ${isFull ? 'player-lg' : 'player-sm'}`} style={{ opacity: playerRef.current?.getSecondsLoaded() || duration || true ? '100%' : '0%' }}>
      <ReactPlayer
        ref={playerRef}
        muted={!isFull || muted}
        url={videoUrl}
        width={width}
        playing={playing || !isFull}
        onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
        height={height}
        loop
        onError={e => {
          console.log(playerRef.current?.context)
        }}
        config={config}
      />
      {!isFull ? <div className="player-button" onClick={handleOpenPlayer}>
        <img src={playIcon} alt="" className="play-button" />
      </div> : ""}
      {isFull ? <PlayerControllers
        isPlaying={playing}
        isMuted={muted}
        videoData={videoData}
        setMuted={handleMute}
        hideVideo={handleHidePlayer}
        setPlaying={handlePlaying}
        playedPercents={playedPercents}
        duration={playedPercents}
        setPlayedSeconds={rewindVideo}
      /> : ""}
      {/* {!duration ? <div className="player-button text-white text-center">Loading...</div> : ""} */}
    </div>
  );
}

export default Player;
