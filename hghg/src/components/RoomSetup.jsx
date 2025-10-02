import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Plus, LogIn, Copy, Check } from 'lucide-react';

export default function RoomSetup({ userData, onCreateRoom, onJoinRoom }) {
  const [roomTitle, setRoomTitle] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [startTime, setStartTime] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateRoom = () => {
    if (!roomTitle.trim()) {
      setError('Lütfen oda başlığı girin.');
      return;
    }
    
    setError('');
    const code = generateRoomCode();
    setGeneratedCode(code);
    
    const roomData = {
      roomId: `room_${Date.now()}`,
      title: roomTitle.trim(),
      startAt: startTime || new Date().toISOString(),
      hostId: userData.userId,
      code: code,
      members: [userData],
      isHost: true
    };
    
    localStorage.setItem('currentRoom', JSON.stringify(roomData));
    onCreateRoom(roomData);
  };

  const handleJoinRoom = () => {
    if (!roomCode.trim()) {
      setError('Lütfen oda kodunu girin.');
      return;
    }
    
    setError('');
    
    // Mock: Oda kodunu kontrol et ve odaya katıl
    const roomData = {
      roomId: `room_${roomCode}`,
      code: roomCode.toUpperCase(),
      members: [userData],
      isHost: false
    };
    
    localStorage.setItem('currentRoom', JSON.stringify(roomData));
    onJoinRoom(roomData);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Kullanıcı Bilgisi */}
          <div className="flex items-center gap-3 mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <img 
              src={userData.avatar} 
              alt={userData.name}
              className="w-12 h-12 rounded-full bg-white/20"
            />
            <div>
              <p className="text-white font-semibold">{userData.name}</p>
              <p className="text-gray-300 text-sm">Hoş geldin!</p>
            </div>
          </div>

          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 p-1">
              <TabsTrigger 
                value="create"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Oda Oluştur
              </TabsTrigger>
              <TabsTrigger 
                value="join"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Odaya Katıl
              </TabsTrigger>
            </TabsList>

            {/* Oda Oluşturma */}
            <TabsContent value="create" className="space-y-4 mt-6">
              <div>
                <label htmlFor="roomTitle" className="block text-sm font-medium text-gray-200 mb-2">
                  Oda Başlığı
                </label>
                <Input
                  id="roomTitle"
                  type="text"
                  value={roomTitle}
                  onChange={(e) => setRoomTitle(e.target.value)}
                  placeholder="Örn: Cuma Akşamı Film Gecesi"
                  className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  maxLength={50}
                />
              </div>

              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-200 mb-2">
                  Başlangıç Saati
                </label>
                <Input
                  id="startTime"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-white/10 border-white/20 text-white"
                />
              </div>

              {generatedCode && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
                  <p className="text-green-200 text-sm mb-2">Oda Kodu Oluşturuldu!</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-2xl font-bold text-white tracking-wider">
                      {generatedCode}
                    </code>
                    <Button
                      onClick={copyToClipboard}
                      size="sm"
                      variant="outline"
                      className="bg-white/10 border-white/20 hover:bg-white/20"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-green-200 text-xs mt-2">Bu kodu arkadaşlarınla paylaş</p>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-sm text-red-200 text-center">{error}</p>
                </div>
              )}

              <Button
                onClick={handleCreateRoom}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-6 rounded-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Oda Oluştur
              </Button>
            </TabsContent>

            {/* Odaya Katılma */}
            <TabsContent value="join" className="space-y-4 mt-6">
              <div>
                <label htmlFor="roomCode" className="block text-sm font-medium text-gray-200 mb-2">
                  Oda Kodu
                </label>
                <Input
                  id="roomCode"
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="6 haneli oda kodunu girin"
                  className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-center text-2xl tracking-widest font-bold"
                  maxLength={6}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-sm text-red-200 text-center">{error}</p>
                </div>
              )}

              <Button
                onClick={handleJoinRoom}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-6 rounded-xl"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Odaya Katıl
              </Button>

              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-gray-300 text-sm text-center">
                  Arkadaşından aldığın 6 haneli oda kodunu girerek odaya katılabilirsin.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
