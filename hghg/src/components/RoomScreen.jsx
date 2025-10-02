import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Button } from '@/components/ui/button.jsx';
import VideoPlayer from './VideoPlayer.jsx';
import VotingPanel from './VotingPanel.jsx';
import ChatPanel from './ChatPanel.jsx';
import SplitPanel from './SplitPanel.jsx';
import { Users, Vote, MessageSquare, DollarSign, LogOut, Copy, Check } from 'lucide-react';

export default function RoomScreen({ roomData, userData, onLeave }) {
  const [copied, setCopied] = useState(false);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-white">
                {roomData.title || 'TV+ Sosyal İzleme'}
              </h1>
              {roomData.isHost && (
                <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">
                  HOST
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Oda Kodu */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg border border-white/20">
                <span className="text-gray-300 text-sm">Kod:</span>
                <code className="text-white font-bold">{roomData.code}</code>
                <Button
                  onClick={copyRoomCode}
                  size="icon"
                  variant="ghost"
                  className="w-6 h-6 text-white hover:bg-white/10"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>

              {/* Katılımcı Sayısı */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg border border-white/20">
                <Users className="w-4 h-4 text-gray-300" />
                <span className="text-white font-semibold">3</span>
              </div>

              {/* Çıkış */}
              <Button
                onClick={onLeave}
                variant="outline"
                size="sm"
                className="border-red-500/50 text-red-400 hover:bg-red-500/20"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Çık
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol Taraf - Video Player */}
          <div className="lg:col-span-2">
            <VideoPlayer roomData={roomData} isHost={roomData.isHost} />
          </div>

          {/* Sağ Taraf - Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 p-4 h-[600px] flex flex-col">
              <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-3 bg-white/10 mb-4">
                  <TabsTrigger 
                    value="vote"
                    className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-sm"
                  >
                    <Vote className="w-4 h-4 mr-1" />
                    Oylama
                  </TabsTrigger>
                  <TabsTrigger 
                    value="chat"
                    className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-sm"
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Sohbet
                  </TabsTrigger>
                  <TabsTrigger 
                    value="split"
                    className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-sm"
                  >
                    <DollarSign className="w-4 h-4 mr-1" />
                    Split
                  </TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-hidden">
                  <TabsContent value="vote" className="h-full overflow-y-auto mt-0 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <VotingPanel 
                      roomData={roomData} 
                      userData={userData}
                      isHost={roomData.isHost}
                    />
                  </TabsContent>

                  <TabsContent value="chat" className="h-full mt-0">
                    <ChatPanel 
                      roomData={roomData} 
                      userData={userData}
                    />
                  </TabsContent>

                  <TabsContent value="split" className="h-full overflow-y-auto mt-0 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <SplitPanel 
                      roomData={roomData} 
                      userData={userData}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
