# TV+ Sosyal İzleme Projesi

Diyarbakır Codenight Yarışması için geliştirilmiş TV+ Sosyal İzleme uygulaması.

## 🎯 Proje Özeti

Bu proje, arkadaşlarla birlikte TV+ içeriklerini senkronize bir şekilde izlemeyi sağlayan sosyal bir web uygulamasıdır. Kullanıcılar oda oluşturabilir, içerik oylaması yapabilir, sohbet edebilir ve masrafları paylaşabilir.

## ✨ Özellikler

### MVP Özellikleri (Tamamlandı)

1. **Oda & Davet**
   - Oda oluşturma (başlık, tarih/saat)
   - 6 haneli oda kodu ile davet sistemi
   - Host ve member rolleri

2. **İçerik Oylaması**
   - TV+ kataloğundan (mock) içerik seçimi
   - Kullanıcı oylaması
   - En çok oy alan içeriğin seçilmesi
   - Host tarafından oylamanın kapatılması

3. **Senkron Oynatma (Mock)**
   - Host kontrolünde play/pause/seek
   - Zaman göstergesi ve progress bar
   - Senkronizasyon durumu gösterimi
   - Ses kontrolü

4. **Sohbet & Emoji Tepkileri**
   - Metin mesajları
   - Hızlı emoji gönderme
   - 2 saniye rate-limit koruması
   - Gerçek zamanlı mesaj akışı

5. **Masraf Paylaşımı (Split)**
   - Gider ekleme (tutar, açıklama)
   - Eşit bölüşüm
   - Kişi bazlı net bakiye hesaplama
   - Toplam ve kişi başı gösterimi

6. **Kullanıcı Deneyimi**
   - İsim ve avatar seçimi
   - Responsive tasarım
   - Modern ve kullanıcı dostu arayüz
   - Smooth animasyonlar ve geçişler

## 🛠️ Teknoloji Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: localStorage

## 📦 Kurulum

### Gereksinimler

- Node.js 18+ 
- pnpm (veya npm/yarn)

### Adımlar

1. Proje dizinine gidin:
```bash
cd tv-plus-social
```

2. Bağımlılıkları yükleyin:
```bash
pnpm install
```

3. Geliştirme sunucusunu başlatın:
```bash
pnpm run dev
```

4. Tarayıcınızda açın:
```
http://localhost:5173
```

## 🚀 Production Build

Production için build almak:

```bash
pnpm run build
```

Build çıktısı `dist/` klasöründe oluşturulur.

Preview için:

```bash
pnpm run preview
```

## 📁 Proje Yapısı

```
tv-plus-social/
├── public/              # Statik dosyalar
├── src/
│   ├── assets/         # Görseller ve medya dosyaları
│   ├── components/     # React bileşenleri
│   │   ├── ui/        # shadcn/ui bileşenleri
│   │   ├── LoginScreen.jsx      # Giriş ekranı
│   │   ├── RoomSetup.jsx        # Oda oluşturma/katılma
│   │   ├── RoomScreen.jsx       # Ana oda ekranı
│   │   ├── VideoPlayer.jsx      # Video oynatıcı
│   │   ├── VotingPanel.jsx      # Oylama paneli
│   │   ├── ChatPanel.jsx        # Sohbet paneli
│   │   └── SplitPanel.jsx       # Masraf paylaşımı
│   ├── App.jsx         # Ana uygulama bileşeni
│   ├── App.css         # Global stiller
│   └── main.jsx        # Giriş noktası
├── index.html          # HTML şablonu
├── package.json        # Proje bağımlılıkları
└── vite.config.js      # Vite konfigürasyonu
```

## 🎮 Kullanım

### 1. Giriş Yapma
- İsminizi girin
- Bir avatar seçin
- "Devam Et" butonuna tıklayın

### 2. Oda Oluşturma
- "Oda Oluştur" sekmesini seçin
- Oda başlığı girin
- Başlangıç saati seçin (opsiyonel)
- "Oda Oluştur" butonuna tıklayın
- Oluşturulan oda kodunu arkadaşlarınızla paylaşın

### 3. Odaya Katılma
- "Odaya Katıl" sekmesini seçin
- 6 haneli oda kodunu girin
- "Odaya Katıl" butonuna tıklayın

### 4. Oda İçinde
- **Oylama**: İzlemek istediğiniz içeriğe oy verin
- **Sohbet**: Mesaj gönderin veya emoji tepkisi verin
- **Split**: Gider ekleyin ve masrafları paylaşın
- **Video Player**: Host ise oynatma kontrollerini kullanın

## 🎨 Tasarım Özellikleri

- Modern gradient arka planlar
- Glassmorphism efektleri
- Smooth animasyonlar
- Responsive tasarım (mobil uyumlu)
- Dark theme
- Hover efektleri ve micro-interactions

## 📊 Veri Modeli

### Kullanıcı (User)
```javascript
{
  userId: string,
  name: string,
  avatar: string (URL)
}
```

### Oda (Room)
```javascript
{
  roomId: string,
  title: string,
  startAt: string (ISO date),
  hostId: string,
  code: string (6 karakter),
  members: User[],
  isHost: boolean
}
```

### İçerik (Content)
```javascript
{
  id: number,
  title: string,
  type: 'movie' | 'series' | 'sports',
  duration: number (dakika),
  tags: string[]
}
```

### Gider (Expense)
```javascript
{
  id: number,
  userId: string,
  userName: string,
  amount: number,
  note: string,
  timestamp: Date
}
```

## 🔮 Gelecek Geliştirmeler

- WebSocket entegrasyonu (gerçek zamanlı senkronizasyon)
- Backend API entegrasyonu
- Gerçek TV+ API entegrasyonu
- Push notification sistemi
- Mini anketler
- Bağlantı kalitesi göstergesi
- Alt yazı dili senkronu
- Kullanıcı profilleri
- Oda geçmişi

## 🏆 Yarışma Kriterleri

### Çalışabilirlik (30 puan)
✅ Oda → Oy → Senkron → Split akışı tam çalışıyor

### Gerçek Zamanlılık (20 puan)
✅ Mock WebSocket eventleri simüle edildi
✅ Rate-limiting uygulandı

### Veri Modeli (20 puan)
✅ Oy ve split hesaplamaları doğru çalışıyor
✅ localStorage ile veri kalıcılığı

### UI/UX (20 puan)
✅ Modern, profesyonel tasarım
✅ Mobil uyumlu
✅ Kullanıcı dostu arayüz

### Bonus (10 puan)
⚠️ Mini anket, ping göstergesi, altyazı senkronu eklenebilir

## 📝 Notlar

- Bu proje mock verilerle çalışmaktadır
- Gerçek backend entegrasyonu için API endpoint'leri hazırlanmalıdır
- WebSocket bağlantısı için Socket.IO veya benzeri bir kütüphane kullanılabilir
- localStorage kullanıldığı için veriler tarayıcıya özeldir

## 👨‍💻 Geliştirici

Diyarbakır Codenight Yarışması için geliştirilmiştir.

## 📄 Lisans

Bu proje yarışma amaçlı geliştirilmiştir.
