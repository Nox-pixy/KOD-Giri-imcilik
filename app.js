const express = require('express');
const app = express();
const path = require('path');

// Görüntü motoru ayarı
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Statik dosya yolu (Resimler ve CSS için)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Ürün Listesi (Gelişmiş Detay Özellikleri Eklendi)
const products = [
    { 
        name: "Print(Growth Restore)", 
        type: "Kaş ve Kirpik serumu ", 
        price: 310, 
        image: "KOD urunler/print  growth restore.png", 
        tagline: "Yeni sürüm kirpikler.",
        description: "Kıl köklerini uyararak daha gür ve uzun bir görünüm sağlayan özel formül.",
        details: "Provitamin B5, Keratin, Peptit Kompleksi",
        usage: "Temiz kirpik diplerine günde bir kez uygulayın."
    },
    { 
        name: "Print(Reset)", 
        type: "Yüz Temizleme Jeli", 
        price: 345, 
        image: "KOD urunler/print (reset).jpeg", 
        tagline: "Sistemi baştan yaz.",
        description: "Cildi kurutmadan gözenekleri derinlemesine temizleyen arındırıcı jel.",
        details: "%2 Salisilik Asit, Çay Ağacı Yağı",
        usage: "Islak cilde masaj yaparak uygulayın ve durulayın."
    },
    { 
        name: "Print(Cache Reset)", 
        type: "Kuru Şampuan", 
        price: 320, 
        image: "KOD urunler/print cache reset.png", 
        tagline: "Saçları tazeleyen temizlik.",
        description: "Yıkama gerektirmeden saçtaki yağı anında absorbe eden formül.",
        details: "Pirinç Nişastası, Canlandırıcı Koku Özleri",
        usage: "20 cm uzaktan saç diplerine sıkın ve tarayın."
    },
    { 
        name: "Print(Clear Cache)", 
        type: "Diş Macunu", 
        price: 190, 
        image: "KOD urunler/print clear cache.png", 
        tagline: "Gereksiz tüm verilerden arın.",
        description: "Plak oluşumunu engelleyen ve doğal beyazlık sağlayan gelişmiş koruma.",
        details: "Florür, Nane Özü, Beyazlatıcı Kristaller",
        usage: "Günde en az iki kez fırçalayın."
    },
    { 
        name: "Print(Cloude Storage)", 
        type: "Nemlendirici", 
        price: 310, 
        image: "KOD urunler/print cloude storage.png", 
        tagline: "Yoğun nem depolama ünitesi.",
        description: "Cildin nem bariyerini güçlendiren 24 saat etkili depolama sistemi.",
        details: "Hiyalüronik Asit, Seramidler, Aloe Vera",
        usage: "Temizlenmiş yüze sabah ve akşam uygulayın."
    },
    { 
        name: "Print(Drag and Drop)", 
        type: "Saç Kremi", 
        price: 215, 
        image: "KOD urunler/print drag and drop.jpeg", 
        tagline: "Bakımını sürükle ve bırak.",
        description: "Saçları yumuşatan ve kolay taranmasını sağlayan hafif yapılı bakım.",
        details: "Argan Yağı, İpek Proteini",
        usage: "Şampuan sonrası uçlara uygulayın, 2 dakika bekletip durulayın."
    },
    { 
        name: "Print(Factory Reset)", 
        type: "Yüz Maskesi", 
        price: 220, 
        image: "KOD urunler/print factory reset.jpeg", 
        tagline: "Pürüzsüz fabrika ayarları.",
        description: "Cildi ölü deriden arındırarak pürüzsüz bir doku kazandırır.",
        details: "Kaolin Kili, AHA/BHA Asitleri",
        usage: "Haftada 2 kez uygulayıp 10 dakika bekletin."
    },
    { 
        name: "Print(Firewall)", 
        type: "Güneş Kremi", 
        price: 350, 
        image: "KOD urunler/print firewall.jpeg", 
        tagline: "UV saldırılarına karşı duvar.",
        description: "Güneşin zararlı ışınlarına karşı yüksek spektrumlu güvenlik duvarı.",
        details: "SPF 50+, Çinko Oksit, E Vitamini",
        usage: "Güneşe çıkmadan 20 dakika önce uygulayın."
    },
    { 
        name: "Print(Hotfix)", 
        type: "Sivilce Patcher", 
        price: 275, 
        image: "KOD urunler/print hotfix.png", 
        tagline: "Acil cilt yaması.",
        description: "Sivilceleri kısa sürede kurutan şeffaf hidrokolloid yamalar.",
        details: "Çay Ağacı Yağı, Hidrokolloid",
        usage: "Sorunlu bölgeye yapıştırın ve 6-8 saat bekletin."
    },
    { 
        name: "Print(Hotfixx)", 
        type: "Şampuan", 
        price: 320, 
        image: "KOD urunler/print hotfixx.png", 
        tagline: "Gelişmiş dökülme giderme.",
        description: "Saç dökülmesine karşı güçlendirici temizlik ve onarım.",
        details: "Biotin, Kafein, Isırgan Özü",
        usage: "Islak saça masajla uygulayıp durulayın."
    },
    { 
        name: "Print(Light Mode)", 
        type: "Ayınlatıcı Serum", 
        price: 295, 
        image: "KOD urunler/print light mode.jpeg", 
        tagline: "Cilde parlak bir arayüz.",
        description: "Cilt tonunu eşitleyen ve ışıltı veren aydınlatıcı kompleks.",
        details: "C Vitamini, Meyan Kökü Özü",
        usage: "Geceleri 3-4 damla temiz cilde uygulayın."
    },
    { 
        name: "Print(Nail Rescue)", 
        type: "Tırnak Bakımı", 
        price: 180, 
        image: "KOD urunler/print nail rescue.png", 
        tagline: "Kırılan kodları onar.",
        description: "Zayıf ve kırılgan tırnakları güçlendiren yoğun bakım yağı.",
        details: "E Vitamini, Tatlı Badem Yağı",
        usage: "Tırnak ve etlerine masaj yaparak uygulayın."
    },
    { 
        name: "Print(Optimizer)", 
        type: "Gündüz Kremi", 
        price: 290, 
        image: "KOD urunler/print optimizer.png", 
        tagline: "Gün boyu performans optimizasyonu.",
        description: "Hava kirliliğine karşı koruyan ve enerji veren günlük bakım.",
        details: "Q10 Enzimi, Yeşil Çay Özü",
        usage: "Sabahları temizlenmiş yüze uygulayın."
    },
    { 
        name: "Print(Outo-Save)", 
        type: "Yaşlanma Karşıtı Krem", 
        price: 365, 
        image: "KOD urunler/print outo-save.png", 
        tagline: "Cilt yaşını otomatik kaydet.",
        description: "İnce çizgilerin görünümünü azaltan zaman durdurucu bakım.",
        details: "Retinol, Kolajen, Peptitler",
        usage: "Geceleri tüm yüze dairesel hareketlerle uygulayın."
    },
    { 
        name: "Print(Refresh)", 
        type: "Canlandırıcı Tonik", 
        price: 325, 
        image: "KOD urunler/print refresh.jpeg", 
        tagline: "Sistemi anında canlandır.",
        description: "PH dengesini sağlayan ve gözenekleri sıkılaştıran ferahlık.",
        details: "Gül Suyu, Hamamelis Özü",
        usage: "Pamuk yardımıyla cildi silin."
    },
    { 
        name: "Print(Sweet Bliss)", 
        type: "Duak Balmı", 
        price: 245, 
        image: "KOD urunler/print sweet bliss.png", 
        tagline: "Tatlı bir kullanıcı deneyimi.",
        description: "Çatlamış dudakları anında onaran ve nemlendiren yumuşaklık.",
        details: "Shea Yağı, Balmumu, Meyve Özleri",
        usage: "İhtiyaç duydukça dudaklarınıza sürün."
    },
    { 
        name: "Print(Update)", 
        type: "Kolojenli Serum", 
        price: 210, 
        image: "KOD urunler/print update.png", 
        tagline: "Cildin en güncel sürümü.",
        description: "Elastikiyeti artıran ve cildi sıkılaştıran kolajen takviyesi.",
        details: "Hidrolize Kolajen, Elastin",
        usage: "Sabah akşam nemlendirici öncesi uygulayın."
    },
    { 
        name: "Print(Upload)", 
        type: "Peeling", 
        price: 235, 
        image: "KOD urunler/print upload.jpeg", 
        tagline: "Cildinin Taze versiyonunu yükle.",
        description: "Fiziksel partiküllerle cildi yenileyen mikro-peeling.",
        details: "Kayısı Çekirdeği Tozu, Kil",
        usage: "Haftalık kullanımda nazikçe ovalayıp yıkayın."
    },
    { 
        name: "Print(Debug)", 
        type: "Arındırıcı Tonik", 
        price: 205, 
        image: "KOD urunler/print(debug).jpeg", 
        tagline: "Tüm cilt buglarını ayıkla.",
        description: "Yağlı ciltler için sebum dengeleyici ve matlaştırıcı çözüm.",
        details: "Cadı Fındığı, Salisilik Asit",
        usage: "T bölgesine ağırlık vererek uygulayın."
    },
    { 
        name: "Print(Loading)", 
        type: "Yüz Maskesi", 
        price: 315, 
        image: "KOD urunler/print(loading).jpeg", 
        tagline: "Bakım yükleniyor...",
        description: "Yorgun cildi anında canlandıran vitamin deposu maske.",
        details: "Multivitamin Kompleksi, Panthenol",
        usage: "Kalın bir tabaka sürüp 15 dakika sonra yıkayın."
    },
    { 
        name: "Print(Sleep)", 
        type: "Gece Kremi", 
        price: 340, 
        image: "KOD urunler/print(sleep).jpeg", 
        tagline: "Uyku modunda onarım.",
        description: "Siz uyurken hücre yenilenmesini destekleyen yoğun gece bakımı.",
        details: "Gece Çuha Çiçeği Yağı, Squalane",
        usage: "Yatmadan önce temiz cilde uygulayın."
    },
    { 
        name: "Print(Datafresh)", 
        type: "Duş Jeli", 
        price: 315, 
        image: "KOD urunler/prit datafresh.png", 
        tagline: "Vücut verisini yenile.",
        description: "Uzun süre kalıcı koku ve ferahlık sağlayan temizleyici.",
        details: "Okyanus Mineralleri, Nemlendirici Süt",
        usage: "Banyo sırasında tüm vücuda uygulayın."
    }
];

// Ana sayfa rotası
app.get('/', (req, res) => {
    res.render('index', { products: products });
});

// Sunucuyu başlat
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Sistem aktif: http://localhost:${PORT}`);
});