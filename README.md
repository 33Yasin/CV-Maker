# CV Maker



https://github.com/user-attachments/assets/81abf0d0-8fdf-4822-8a35-22b963bd2dc3

## Link: https://cv-maker-woad-nu.vercel.app/


## Özellikler / Features
- Modern, duyarlı (responsive) CV oluşturucu
- PDF olarak dışa aktarım (A4 uyumlu)
- Fotoğraf yükleme ve kırpma (react-easy-crop ile)
- Türkçe arayüz ve form alanları
- Tüm cihazlarda (masaüstü, tablet, mobil) sorunsuz görünüm
- Vercel ile kolay deploy

---

## Kurulum / Installation

1. **Depoyu klonlayın / Clone the repo:**
   ```bash
   git clone https://github.com/kullaniciadi/cv-maker.git
   cd cv-maker/CV-Maker
   ```
2. **Bağımlılıkları yükleyin / Install dependencies:**
   ```bash
   npm install
   ```
3. **Geliştirme sunucusunu başlatın / Start dev server:**
   ```bash
   npm run dev
   ```
   Ardından tarayıcınızda [http://localhost:5173](http://localhost:5173) adresini açın.

---

## Kullanım / Usage

- Sol panelden bilgilerinizi girin (Genel Bilgi, Eğitim, İş Deneyimi, Yetenekler, Aktiviteler, Sertifikalar).
- Fotoğrafınızı yükleyip kırpabilirsiniz.
- "PDF Olarak İndir" butonuyla A4 uyumlu PDF çıktısı alabilirsiniz.
- Tüm metinler ve başlıklar Türkçedir.

---

## Özelleştirme / Customization
- `src/styles/` klasöründeki CSS modülleri ile stilleri değiştirebilirsiniz.
- Bileşenler `src/components/` klasöründedir.
- Türkçe metinleri değiştirmek için ilgili component dosyalarını düzenleyin.

---

## Deploy (Vercel)

1. Vercel hesabınızla projeyi bağlayın.
2. Node.js 18+ kullanın.
3. Tüm bağımlılıkların (`react-easy-crop` dahil) `package.json`'da olduğundan emin olun.
4. Vercel otomatik olarak build ve deploy edecektir.

---

## PDF Export Notları / PDF Export Notes
- PDF çıktısı, ekranda gördüğünüzle birebir aynı olacak şekilde optimize edilmiştir.
- Fotoğraf ve içerik taşması, kırpılması gibi sorunlar çözülmüştür.

---

## Katkı / Contributing
Pull request ve issue'larınızı bekliyoruz!

---

## Lisans / License
MIT
