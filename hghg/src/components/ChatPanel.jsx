import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Send, Smile } from 'lucide-react';

const emojis = ['😀', '😂', '❤️', '👍', '🔥', '🎉', '😍', '👏', '🤔', '😎'];

export default function ChatPanel({ roomData, userData }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      userId: 'system',
      userName: 'Sistem',
      message: `${userData.name} odaya katıldı!`,
      timestamp: new Date(),
      type: 'system'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Rate limiting: 2 saniye kontrolü
    const now = Date.now();
    if (now - lastMessageTime < 2000) {
      alert('Lütfen mesajlar arasında en az 2 saniye bekleyin.');
      return;
    }

    const newMessage = {
      id: Date.now(),
      userId: userData.userId,
      userName: userData.name,
      avatar: userData.avatar,
      message: inputMessage.trim(),
      timestamp: new Date(),
      type: 'message'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setLastMessageTime(now);
  };

  const handleEmojiClick = (emoji) => {
    // Rate limiting: 2 saniye kontrolü
    const now = Date.now();
    if (now - lastMessageTime < 2000) {
      alert('Lütfen emoji göndermeleri arasında en az 2 saniye bekleyin.');
      return;
    }

    const newMessage = {
      id: Date.now(),
      userId: userData.userId,
      userName: userData.name,
      avatar: userData.avatar,
      message: emoji,
      timestamp: new Date(),
      type: 'emoji'
    };

    setMessages(prev => [...prev, newMessage]);
    setShowEmojiPicker(false);
    setLastMessageTime(now);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Mesajlar Alanı */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map(msg => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="text-center">
                <p className="text-xs text-gray-400 bg-white/5 inline-block px-3 py-1 rounded-full">
                  {msg.message}
                </p>
              </div>
            );
          }

          const isOwnMessage = msg.userId === userData.userId;

          return (
            <div
              key={msg.id}
              className={`flex gap-2 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <img
                src={msg.avatar}
                alt={msg.userName}
                className="w-8 h-8 rounded-full bg-white/20 flex-shrink-0"
              />
              <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} max-w-[70%]`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-300">
                    {msg.userName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <div
                  className={`px-3 py-2 rounded-2xl ${
                    msg.type === 'emoji'
                      ? 'text-4xl'
                      : isOwnMessage
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="mb-3 p-3 bg-white/5 rounded-xl border border-white/10">
          <div className="grid grid-cols-5 gap-2">
            {emojis.map((emoji, idx) => (
              <button
                key={idx}
                onClick={() => handleEmojiClick(emoji)}
                className="text-2xl hover:scale-125 transition-transform duration-200 p-2 hover:bg-white/10 rounded-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mesaj Gönderme Alanı */}
      <div className="flex gap-2">
        <Button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          size="icon"
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10 flex-shrink-0"
        >
          <Smile className="w-5 h-5" />
        </Button>
        
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Mesaj yaz..."
          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          maxLength={200}
        />
        
        <Button
          onClick={handleSendMessage}
          size="icon"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex-shrink-0"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-2">
        Mesajlar arasında en az 2 saniye beklemelisiniz
      </p>
    </div>
  );
}
