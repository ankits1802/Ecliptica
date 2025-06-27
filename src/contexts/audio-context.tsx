
'use client';

import React, { createContext, useContext, useRef, useState, useCallback, useMemo, type ReactNode } from 'react';

type AudioContextType = {
  isPlaying: boolean;
  isMuted: boolean;
  play: () => void;
  pause: () => void;
  stop: () => void;
  restart: () => void;
  toggleMute: () => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize audio element on the client side
  if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio('/Bgm.mp3');
      audioRef.current.loop = true;
  }

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      setIsPlaying(true);
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);
  
  const restart = useCallback(() => {
    if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        setIsPlaying(true);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMutedState = !audioRef.current.muted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  }, []);

  const value = useMemo(() => ({
    isPlaying,
    isMuted,
    play,
    pause,
    stop,
    restart,
    toggleMute,
  }), [isPlaying, isMuted, play, pause, stop, restart, toggleMute]);

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}
