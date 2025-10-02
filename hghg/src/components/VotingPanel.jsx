import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Check, Film, Tv, Trophy } from 'lucide-react';

const mockContent = [
  { id: 1, title: 'Inception', type: 'movie', duration: 148, tags: ['Bilim Kurgu', 'Aksiyon'] },
  { id: 2, title: 'Breaking Bad', type: 'series', duration: 45, tags: ['Drama', 'Suç'] },
  { id: 3, title: 'Şampiyonlar Ligi Finali', type: 'sports', duration: 120, tags: ['Futbol', 'Canlı'] },
  { id: 4, title: 'The Dark Knight', type: 'movie', duration: 152, tags: ['Aksiyon', 'Suç'] },
  { id: 5, title: 'Stranger Things', type: 'series', duration: 50, tags: ['Bilim Kurgu', 'Korku'] },
];

export default function VotingPanel({ roomData, userData, isHost }) {
  const [votes, setVotes] = useState({});
  const [selectedContent, setSelectedContent] = useState(null);
  const [votingClosed, setVotingClosed] = useState(false);

  const handleVote = (contentId) => {
    if (votingClosed) return;
    
    setVotes(prev => {
      const newVotes = { ...prev };
      
      // Önceki oyunu kaldır
      Object.keys(newVotes).forEach(id => {
        newVotes[id] = newVotes[id].filter(userId => userId !== userData.userId);
      });
      
      // Yeni oy ekle
      if (!newVotes[contentId]) {
        newVotes[contentId] = [];
      }
      newVotes[contentId].push(userData.userId);
      
      return newVotes;
    });
  };

  const handleCloseVoting = () => {
    if (!isHost) return;
    
    // En çok oy alan içeriği bul
    let maxVotes = 0;
    let winnerContent = null;
    
    Object.keys(votes).forEach(contentId => {
      const voteCount = votes[contentId].length;
      if (voteCount > maxVotes) {
        maxVotes = voteCount;
        winnerContent = mockContent.find(c => c.id === parseInt(contentId));
      }
    });
    
    setSelectedContent(winnerContent);
    setVotingClosed(true);
  };

  const getVoteCount = (contentId) => {
    return votes[contentId]?.length || 0;
  };

  const hasUserVoted = (contentId) => {
    return votes[contentId]?.includes(userData.userId) || false;
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'movie': return <Film className="w-4 h-4" />;
      case 'series': return <Tv className="w-4 h-4" />;
      case 'sports': return <Trophy className="w-4 h-4" />;
      default: return <Film className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'movie': return 'Film';
      case 'series': return 'Dizi';
      case 'sports': return 'Spor';
      default: return 'İçerik';
    }
  };

  if (votingClosed && selectedContent) {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Seçilen İçerik</h3>
          <p className="text-2xl font-bold text-green-400 mb-2">{selectedContent.title}</p>
          <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
            {getTypeIcon(selectedContent.type)}
            <span>{getTypeLabel(selectedContent.type)}</span>
            <span>•</span>
            <span>{selectedContent.duration} dk</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {selectedContent.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <Button
          onClick={() => {
            setVotingClosed(false);
            setSelectedContent(null);
            setVotes({});
          }}
          variant="outline"
          className="w-full border-white/20 text-white hover:bg-white/10"
        >
          Yeniden Oyla
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">İçerik Oylaması</h3>
        {isHost && (
          <Button
            onClick={handleCloseVoting}
            size="sm"
            className="bg-green-500 hover:bg-green-600"
          >
            Oylamayı Kapat
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {mockContent.map(content => {
          const voteCount = getVoteCount(content.id);
          const userVoted = hasUserVoted(content.id);
          
          return (
            <div
              key={content.id}
              onClick={() => handleVote(content.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                userVoted
                  ? 'bg-purple-500/20 border-purple-500 ring-2 ring-purple-500'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getTypeIcon(content.type)}
                    <h4 className="font-semibold text-white">{content.title}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{getTypeLabel(content.type)}</span>
                    <span>•</span>
                    <span>{content.duration} dk</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    userVoted ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-300'
                  }`}>
                    {voteCount} oy
                  </div>
                  {userVoted && (
                    <Check className="w-5 h-5 text-purple-400" />
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {content.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-sm text-blue-200 text-center">
          İzlemek istediğin içeriğe tıklayarak oy verebilirsin
        </p>
      </div>
    </div>
  );
}
