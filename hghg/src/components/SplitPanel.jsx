import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Plus, Trash2, DollarSign } from 'lucide-react';

export default function SplitPanel({ roomData, userData }) {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock: Odadaki kullanıcılar
  const members = [
    { userId: userData.userId, name: userData.name, avatar: userData.avatar },
    { userId: 'user_2', name: 'Ahmet', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Ahmet' },
    { userId: 'user_3', name: 'Ayşe', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Ayse' },
  ];

  const handleAddExpense = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Lütfen geçerli bir tutar girin.');
      return;
    }
    if (!note.trim()) {
      alert('Lütfen bir açıklama girin.');
      return;
    }

    const newExpense = {
      id: Date.now(),
      userId: userData.userId,
      userName: userData.name,
      amount: parseFloat(amount),
      note: note.trim(),
      timestamp: new Date()
    };

    setExpenses(prev => [...prev, newExpense]);
    setAmount('');
    setNote('');
    setShowAddForm(false);
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses(prev => prev.filter(exp => exp.id !== expenseId));
  };

  const calculateBalances = () => {
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const perPerson = totalExpense / members.length;
    
    const balances = members.map(member => {
      const paid = expenses
        .filter(exp => exp.userId === member.userId)
        .reduce((sum, exp) => sum + exp.amount, 0);
      
      const balance = paid - perPerson;
      
      return {
        ...member,
        paid,
        balance
      };
    });

    return { totalExpense, perPerson, balances };
  };

  const { totalExpense, perPerson, balances } = calculateBalances();

  return (
    <div className="space-y-4">
      {/* Toplam Özet */}
      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 text-sm">Toplam Harcama</span>
          <span className="text-2xl font-bold text-white">₺{totalExpense.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Kişi Başı</span>
          <span className="text-lg font-semibold text-cyan-400">₺{perPerson.toFixed(2)}</span>
        </div>
      </div>

      {/* Bakiyeler */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-300">Bakiyeler</h4>
        {balances.map(member => (
          <div
            key={member.userId}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
          >
            <div className="flex items-center gap-2">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full bg-white/20"
              />
              <div>
                <p className="text-white text-sm font-medium">{member.name}</p>
                <p className="text-gray-400 text-xs">Ödedi: ₺{member.paid.toFixed(2)}</p>
              </div>
            </div>
            <div className={`text-sm font-bold ${
              member.balance > 0 
                ? 'text-green-400' 
                : member.balance < 0 
                ? 'text-red-400' 
                : 'text-gray-400'
            }`}>
              {member.balance > 0 ? '+' : ''}{member.balance.toFixed(2)} ₺
            </div>
          </div>
        ))}
      </div>

      {/* Giderler Listesi */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-300">Giderler</h4>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            size="sm"
            className="bg-green-500 hover:bg-green-600"
          >
            <Plus className="w-4 h-4 mr-1" />
            Gider Ekle
          </Button>
        </div>

        {showAddForm && (
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Tutar (₺)</label>
              <Input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Açıklama</label>
              <Input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Örn: Pizza siparişi"
                className="bg-white/10 border-white/20 text-white"
                maxLength={50}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAddExpense}
                className="flex-1 bg-green-500 hover:bg-green-600"
              >
                Ekle
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                İptal
              </Button>
            </div>
          </div>
        )}

        {expenses.length === 0 ? (
          <div className="p-8 text-center">
            <DollarSign className="w-12 h-12 text-gray-600 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Henüz gider eklenmedi</p>
          </div>
        ) : (
          <div className="space-y-2">
            {expenses.map(expense => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{expense.note}</p>
                  <p className="text-gray-400 text-xs">{expense.userName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">₺{expense.amount.toFixed(2)}</span>
                  {expense.userId === userData.userId && (
                    <Button
                      onClick={() => handleDeleteExpense(expense.id)}
                      size="icon"
                      variant="ghost"
                      className="text-red-400 hover:bg-red-500/20 w-8 h-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <p className="text-sm text-yellow-200 text-center">
          Giderler eşit olarak bölüşülür
        </p>
      </div>
    </div>
  );
}
