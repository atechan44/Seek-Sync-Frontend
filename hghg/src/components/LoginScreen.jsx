import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { User } from 'lucide-react';

const avatars = [
  'https://api.dicebear.com/8.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/8.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/8.x/avataaars/svg?seed=Luna',
  'https://api.dicebear.com/8.x/avataaars/svg?seed=Max',
  'https://api.dicebear.com/8.x/avataaars/svg?seed=Bella',
  'https://api.dicebear.com/8.x/avataaars/svg?seed=Charlie',
];

export default function LoginScreen({ onNext }) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!name.trim()) {
      setError('Lütfen bir isim girin.');
      return;
    }
    if (selectedAvatar === null) {
      setError('Lütfen bir avatar seçin.');
      return;
    }
    setError('');
    
    // Kullanıcı bilgilerini localStorage'a kaydet
    const userData = {
      name: name.trim(),
      avatar: avatars[selectedAvatar],
      userId: `user_${Date.now()}`
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    
    onNext(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Logo ve Başlık */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">TV+ Sosyal İzleme</h1>
            <p className="text-gray-300 text-sm">Arkadaşlarınla birlikte izlemenin keyfini çıkar</p>
          </div>

          {/* İsim Girişi */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
              İsim
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adınızı girin..."
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
              maxLength={20}
            />
          </div>

          {/* Avatar Seçimi */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-200 mb-3">
              Avatar Seç
            </label>
            <div className="grid grid-cols-3 gap-3">
              {avatars.map((avatarUrl, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAvatar(index)}
                  className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedAvatar === index
                      ? 'ring-4 ring-purple-500 shadow-lg shadow-purple-500/50'
                      : 'ring-2 ring-white/20 hover:ring-white/40'
                  }`}
                >
                  <img
                    src={avatarUrl}
                    alt={`Avatar ${index + 1}`}
                    className="w-full h-full object-cover bg-white/20"
                  />
                  {selectedAvatar === index && (
                    <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Hata Mesajı */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-200 text-center">{error}</p>
            </div>
          )}

          {/* Next Butonu */}
          <Button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
          >
            Devam Et
          </Button>
        </div>
      </div>
    </div>
  );
}
