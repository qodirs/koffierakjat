export interface BlogPost {
  slug: string;
  date: string;
  readTime: {
    id: string;
    en: string;
  };
  title: {
    id: string;
    en: string;
  };
  excerpt: {
    id: string;
    en: string;
  };
  content: {
    id: string;
    en: string;
  };
  imageUrl: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'cara-seduh-v60-pemula',
    date: '2026-07-20',
    readTime: { id: '3 menit baca', en: '3 min read' },
    imageUrl: '/images/brewing-v60.jpg',
    title: {
      id: 'Panduan Menyeduh V60 untuk Pemula di Rumah',
      en: 'V60 Brewing Guide for Beginners at Home'
    },
    excerpt: {
      id: 'Menyeduh kopi manual dengan V60 tidak sesulit yang dibayangkan. Ini langkah mudah mendapatkan secangkir kopi hitam yang bersih dan aromatik.',
      en: 'Manual brewing with V60 is not as hard as it looks. Here are easy steps to get a clean and aromatic cup of black coffee.'
    },
    content: {
      id: `Menyeduh dengan V60 adalah salah satu cara terbaik untuk menikmati keasaman yang cerah dan profil rasa buah dari kopi *single origin*. Berikut adalah resep dasar yang mudah diikuti di rumah:

### Peralatan yang Dibutuhkan:
1. V60 Dripper & Kertas Saring (Paper Filter)
2. Timbangan Kopi (Coffee Scale)
3. Termometer & Teko Leher Angsa (Gooseneck Kettle)
4. 15 gram biji kopi filter Koffie Rakjat (Giling Medium-Coarse)
5. 225 gram air panas bersuhu 90-93°C (Rasio 1:15)

### Langkah Menyeduh:
* **Persiapan Kertas**: Bilas kertas saring dengan air panas untuk menghilangkan bau kertas dan memanaskan dripper. Buang air bilasannya.
* **Timbang Kopi**: Masukkan 15 gram kopi giling ke dalam dripper, ratakan permukaannya.
* **Tahap Blooming**: Tuang 30-40 gram air panas secara merata dan diamkan selama 30-45 detik. Langkah ini membebaskan gas karbon dioksida yang terperangkap dalam kopi.
* **Tuangan Pertama**: Tuang air hingga mencapai 120 gram dengan gerakan melingkar dari tengah ke luar.
* **Tuangan Kedua**: Setelah air turun setengahnya, tuang lagi hingga total mencapai 225 gram.
* **Selesai**: Biarkan air mengalir seluruhnya. Waktu seduh keseluruhan sebaiknya berkisar antara 2 hingga 2,5 menit. Goyangkan gelas server Anda sebelum disajikan!`,
      en: `Brewing with V60 is one of the best ways to enjoy the bright acidity and fruity notes of *single origin* coffee. Here is a simple, easy-to-follow recipe at home:

### Equipment Needed:
1. V60 Dripper & Paper Filter
2. Coffee Scale
3. Thermometer & Gooseneck Kettle
4. 15g of Koffie Rakjat filter coffee beans (Medium-Coarse Grind)
5. 225g of hot water at 90-93°C (1:15 Ratio)

### Step-by-Step Guide:
* **Rinse Filter**: Rinse the paper filter with hot water to remove paper taste and heat the dripper. Discard the rinse water.
* **Add Coffee**: Add 15 grams of ground coffee into the dripper, shake gently to level it.
* **Blooming Phase**: Pour 30-40 grams of hot water evenly and wait 30-45 seconds. This releases trapped carbon dioxide gas.
* **First Pour**: Pour hot water up to 120 grams in a slow spiral motion from the center outward.
* **Second Pour**: Once the water level drops slightly, pour again up to the final weight of 225 grams.
* **Enjoy**: Let the water drip through completely. The total brew time should be between 2 to 2.5 minutes. Swirl your server before serving!`
    }
  },
  {
    slug: 'perbedaan-proses-kopi-natural-wash-honey',
    date: '2026-07-05',
    readTime: { id: '5 menit baca', en: '5 min read' },
    imageUrl: '/images/coffee-pack-filter.jpg',
    title: {
      id: 'Mengenal Proses Kopi: Natural, Washed, dan Honey',
      en: 'Understanding Coffee Processing: Natural, Washed, and Honey'
    },
    excerpt: {
      id: 'Pernah membaca label "Natural Process" atau "Honey Process" di bungkus kopi? Yuk pahami bagaimana proses pascapanen ini membentuk rasa di cangkir Anda.',
      en: 'Ever read "Natural Process" or "Honey Process" on a coffee bag? Let\'s explore how these post-harvest methods shape the flavor in your cup.'
    },
    content: {
      id: `Setelah buah kopi dipetik, biji di dalamnya harus dipisahkan dari kulit dan daging buahnya. Cara pemrosesan pascapanen ini sangat memengaruhi profil rasa akhir:

### 1. Natural / Dry Process
Pada proses ini, buah kopi yang baru dipetik langsung dijemur utuh di bawah terik matahari beserta kulitnya.
* **Karakter Rasa**: Menghasilkan bodi yang tebal (heavy body), tingkat keasaman yang rendah hingga sedang, dan rasa manis buah-buahan matang yang kuat (fruity/winey).
* **Contoh Kopi**: *Kerinci Natural Honey* atau *Gayo Avadhana*.

### 2. Washed / Wet Process
Kulit luar buah kopi dikupas terlebih dahulu menggunakan mesin depulper. Lendir buah yang tersisa kemudian dibersihkan dengan cara direndam dan difermentasi dalam tangki air sebelum dijemur.
* **Karakter Rasa**: Menghasilkan rasa kopi yang sangat bersih (clean cup), keasaman yang cerah dan tajam (bright acidity), serta aroma floral yang lebih menonjol.
* **Contoh Kopi**: *Kintamani Sweet Citrus*.

### 3. Honey Process
Ini adalah jalan tengah antara Natural dan Washed. Kulit luar dikupas, namun sebagian lendir buah (mucilage) yang lengket sengaja dibiarkan melekat pada biji kopi saat dijemur. Karena lengket seperti madu, proses ini disebut "Honey".
* **Karakter Rasa**: Memiliki rasa manis yang intens, keasaman yang seimbang, dan bodi yang halus (creamy/silky).
* **Contoh Kopi**: *Malabar Red Honey*.`,
      en: `After coffee cherries are picked, the seeds inside must be separated from the outer skin and fruit pulp. The post-harvest processing method heavily influences the final flavor profile:

### 1. Natural / Dry Process
In this method, freshly picked coffee cherries are laid out in thin layers to dry in the sun with their skins intact.
* **Flavor Character**: Produces a heavy body, low to medium acidity, and strong, sweet ripe fruit notes (fruity/winey).
* **Example**: *Kerinci Natural Honey* or *Gayo Avadhana*.

### 2. Washed / Wet Process
The outer skin of the coffee cherry is removed using a depulping machine. The sticky mucilage left on the seed is then washed off in fermentation water tanks before drying.
* **Flavor Character**: Yields a very clean cup, bright and crisp acidity, and prominent floral aromas.
* **Example**: *Kintamani Sweet Citrus*.

### 3. Honey Process
A hybrid between Natural and Washed. The outer skin is removed, but a portion of the sticky fruit mucilage is left on the beans during drying. Because it feels sticky like honey, it is named "Honey".
* **Flavor Character**: Delivers intense sweetness, balanced acidity, and a smooth body (creamy/silky).
* **Example**: *Malabar Red Honey*.`
    }
  }
];
