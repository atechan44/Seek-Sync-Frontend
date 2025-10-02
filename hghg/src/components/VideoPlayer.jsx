import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize } from 'lucide-react';

export default function VideoPlayer({ roomData, isHost }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(7200); // 2 saat mock süre
  const [volume, setVolume] = useState(70);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (isHost) {
      setIsPlaying(!isPlaying);
      // Mock: WebSocket ile diğer kullanıcılara gönder
    }
  };

  const handleSeek = (e) => {
    if (isHost) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = Math.floor(percentage * duration);
      setCurrentTime(newTime);
      // Mock: WebSocket ile diğer kullanıcılara gönder
    }
  };

  const handleSkip = (seconds) => {
    if (isHost) {
      setCurrentTime(prev => Math.max(0, Math.min(duration, prev + seconds)));
    }
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
      {/* Video Alanı (Mock) */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-12 h-12 text-purple-400" />
            ) : (
              <Play className="w-12 h-12 text-purple-400 ml-1" />
            )}
          </div>
          <p className="text-white text-xl font-semibold mb-2">
            {roomData.selectedContent?.title || 'İçerik Seçilmedi'}
          </p>
          <p className="text-gray-400 text-sm">
            {isPlaying ? 'Oynatılıyor...' : 'Duraklatıldı'}
          </p>
        </div>

        {/* Host Badge */}
        {isHost && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
            HOST
          </div>
        )}

        {/* Sync Status */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-green-500/80 text-white text-xs font-semibold rounded-full flex items-center gap-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          Senkronize
        </div>
      </div>

      {/* Kontroller */}
      <div className="bg-gray-900 p-4">
        {/* Progress Bar */}
        <div 
          className="w-full h-2 bg-gray-700 rounded-full mb-4 cursor-pointer overflow-hidden"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Zaman Göstergeleri */}
        <div className="flex justify-between text-sm text-gray-400 mb-4">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Kontrol Butonları */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleSkip(-10)}
              disabled={!isHost}
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <SkipBack className="w-5 h-5" />
            </Button>

            <Button
              onClick={handlePlayPause}
              disabled={!isHost}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full w-12 h-12 p-0"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" />
              )}
            </Button>

            <Button
              onClick={() => handleSkip(10)}
              disabled={!isHost}
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-gray-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-20 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>

            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {!isHost && (
          <p className="text-center text-gray-500 text-xs mt-3">
            Sadece host oynatma kontrollerini kullanabilir
          </p>
        )}
      </div>
    </div>
  );
}
