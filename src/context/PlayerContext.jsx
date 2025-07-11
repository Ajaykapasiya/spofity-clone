import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBar = useRef();
  const seekBg = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  }

  const previous = async () => {
    if(track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  }

  const next = async () => {
    if(track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  }

  const seekSong = async (e) => {
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
  }

  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      const updateTime = () => {
        // Check if all required refs exist and duration is valid
        if (audio.duration && !isNaN(audio.duration)) {
          // Update seek bar width if seekBar ref exists
          if (seekBar.current) {
            const progress = (audio.currentTime / audio.duration) * 100;
            seekBar.current.style.width = Math.floor(progress) + "%";
          }
          
          // Update time state with proper formatting
          setTime({
            currentTime: {
              second: Math.floor(audio.currentTime % 60),
              minute: Math.floor(audio.currentTime / 60)
            },
            totalTime: {
              second: Math.floor(audio.duration % 60),
              minute: Math.floor(audio.duration / 60)
            }
          });
        }
      };

      // Set up event listeners
      audio.ontimeupdate = updateTime;
      audio.onloadedmetadata = updateTime; // This ensures we get duration when audio loads
      
      // Cleanup function
      return () => {
        if (audio) {
          audio.ontimeupdate = null;
          audio.onloadedmetadata = null;
        }
      };
    }
  }, []);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
