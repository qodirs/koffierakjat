export interface Product {
  id: string;
  name: string;
  category: 'filter' | 'espresso';
  origin: string;
  roastLevel: 'Light' | 'Medium' | 'Dark';
  tasteNotes: string[];
  prices: {
    '100g': number;
    '200g': number;
    '1kg': number;
  };
  isLimited: boolean;
  isPreOrder: boolean;
  imageUrl: string;
  description: {
    id: string;
    en: string;
  };
}

export const products: Product[] = [
  {
    id: 'gayo-avadhana',
    name: 'Gayo Avadhana',
    category: 'filter',
    origin: 'Aceh Gayo, 1500m',
    roastLevel: 'Light',
    tasteNotes: ['Jasmine', 'Peach', 'Black Tea', 'Clean Finish'],
    prices: {
      '100g': 55000,
      '200g': 95000,
      '1kg': 380000,
    },
    isLimited: true,
    isPreOrder: false,
    imageUrl: '/images/coffee-pack-filter.jpg',
    description: {
      id: 'Biji kopi pilihan dari dataran tinggi Gayo yang diproses secara wet-hulled halus, menghasilkan rasa floral melati yang wangi dan manis buah persik yang menyegarkan.',
      en: 'Select coffee beans from the Gayo highlands, fine wet-hulled processed, producing a fragrant jasmine floral note and a refreshing sweet peach finish.'
    }
  },
  {
    id: 'kintamani-citrus',
    name: 'Kintamani Sweet Citrus',
    category: 'filter',
    origin: 'Bali Kintamani, 1300m',
    roastLevel: 'Light',
    tasteNotes: ['Orange Blossom', 'Honey', 'Lemon Drops', 'Crisp Acidity'],
    prices: {
      '100g': 48000,
      '200g': 85000,
      '1kg': 340000,
    },
    isLimited: false,
    isPreOrder: true,
    imageUrl: '/images/coffee-pack-filter.jpg',
    description: {
      id: 'Diproses secara Full Wash, menonjolkan keasaman sitrus khas Kintamani yang cerah dibalut manisnya madu alami. Sangat cocok diseduh pagi hari.',
      en: 'Full Wash processed, highlighting the bright signature citrus acidity of Kintamani wrapped in natural honey sweetness. Perfect for morning brewing.'
    }
  },
  {
    id: 'toraja-sapan',
    name: 'Toraja Sapan Specialty',
    category: 'filter',
    origin: 'Toraja Sapan, 1700m',
    roastLevel: 'Medium',
    tasteNotes: ['Dark Cocoa', 'Red Cherry', 'Cedarwood', 'Creamy Body'],
    prices: {
      '100g': 52000,
      '200g': 90000,
      '1kg': 360000,
    },
    isLimited: false,
    isPreOrder: false,
    imageUrl: '/images/coffee-pack-filter.jpg',
    description: {
      id: 'Karakter rasa klasik Toraja dengan tingkat keasaman sedang, manis buah ceri merah, diakhiri dengan sentuhan cokelat pekat yang tebal.',
      en: 'Classic Toraja taste profile with medium acidity, red cherry sweetness, and a thick chocolate finish.'
    }
  },
  {
    id: 'ijen-blue-mountain',
    name: 'Ijen Blue Mountain',
    category: 'filter',
    origin: 'Kawah Ijen, 1400m',
    roastLevel: 'Light',
    tasteNotes: ['Blueberry', 'Bergamot', 'Earl Grey', 'Sweet Finish'],
    prices: {
      '100g': 60000,
      '200g': 110000,
      '1kg': 420000,
    },
    isLimited: true,
    isPreOrder: false,
    imageUrl: '/images/coffee-pack-filter.jpg',
    description: {
      id: 'Varietas legendaris Blue Mountain yang ditanam di lereng Kawah Ijen. Memiliki kompleksitas rasa buah beri biru yang tebal dan aromatik teh bergamot.',
      en: 'Legendary Blue Mountain variety grown on the slopes of Mount Ijen. Offers a complex, thick blueberry flavor with an aromatic bergamot tea note.'
    }
  },
  {
    id: 'kerinci-honey',
    name: 'Kerinci Natural Honey',
    category: 'filter',
    origin: 'Gunung Kerinci, 1600m',
    roastLevel: 'Medium',
    tasteNotes: ['Red Apple', 'Caramel', 'Brown Sugar', 'Juicy Mouthfeel'],
    prices: {
      '100g': 50000,
      '200g': 88000,
      '1kg': 350000,
    },
    isLimited: false,
    isPreOrder: false,
    imageUrl: '/images/coffee-pack-filter.jpg',
    description: {
      id: 'Proses Honey yang lambat mengekstrak manis alami daging buah kopi. Menghasilkan rasa manis apel merah matang dan legit karamel yang panjang.',
      en: 'Slow honey process extracts the natural sweetness of the coffee cherry. Delivers ripe red apple flavors and a long, rich caramel finish.'
    }
  },
  {
    id: 'malabar-red-honey',
    name: 'Malabar Red Honey',
    category: 'filter',
    origin: 'Gunung Malabar, 1450m',
    roastLevel: 'Medium',
    tasteNotes: ['Honey', 'Strawberry', 'Jackfruit', 'Silky Body'],
    prices: {
      '100g': 53000,
      '200g': 92000,
      '1kg': 370000,
    },
    isLimited: false,
    isPreOrder: false,
    imageUrl: '/images/coffee-pack-filter.jpg',
    description: {
      id: 'Sensasi rasa buah tropis matik seperti nangka dan stroberi dengan tingkat keasaman lembut dan bodi sehalus sutra.',
      en: 'Sensational tropical fruit notes like jackfruit and strawberry with gentle acidity and a silky-smooth body.'
    }
  },
  {
    id: 'rakyat-espresso',
    name: 'Rakyat Espresso Blend',
    category: 'espresso',
    origin: 'Gayo & Toraja Blend',
    roastLevel: 'Dark',
    tasteNotes: ['Brown Sugar', 'Roasted Peanut', 'Dark Chocolate', 'Full Body'],
    prices: {
      '100g': 40000,
      '200g': 70000,
      '1kg': 260000,
    },
    isLimited: false,
    isPreOrder: false,
    imageUrl: '/images/coffee-pack-espresso.jpg',
    description: {
      id: 'House blend andalan Koffie Rakyat. Diformulasikan khusus untuk susu maupun hitam. Bodi sangat tebal, pahit yang manis (sweet bitter), rendah asam.',
      en: 'The signature house blend of Koffie Rakyat. Specifically formulated for milk-based and black coffee. Bold body, sweet bitterness, low acidity.'
    }
  },
  {
    id: 'semarang-oldcity',
    name: 'Semarang Old City Blend',
    category: 'espresso',
    origin: 'Java Arabica & Robusta',
    roastLevel: 'Dark',
    tasteNotes: ['Bold Cocoa', 'Toffee', 'Spice Notes', 'Creamy Crema'],
    prices: {
      '100g': 35000,
      '200g': 60000,
      '1kg': 220000,
    },
    isLimited: false,
    isPreOrder: false,
    imageUrl: '/images/coffee-pack-espresso.jpg',
    description: {
      id: 'Mengingatkan pada sudut Kota Lama Semarang. Perpaduan Arabika Malabar dan Robusta Temanggung yang menghasilkan crema tebal dan aroma rempah toffee.',
      en: 'Reminiscent of Semarang Old Town corners. A blend of Malabar Arabica and Temanggung Robusta yielding thick crema and spicy toffee aroma.'
    }
  },
  {
    id: 'koffie-signature',
    name: 'Koffie Signature Espresso',
    category: 'espresso',
    origin: 'Kintamani & Gayo Blend',
    roastLevel: 'Medium',
    tasteNotes: ['Red Velvet', 'Berry Jam', 'Milk Chocolate', 'Medium Body'],
    prices: {
      '100g': 45000,
      '200g': 78000,
      '1kg': 300000,
    },
    isLimited: true,
    isPreOrder: false,
    imageUrl: '/images/coffee-pack-espresso.jpg',
    description: {
      id: 'Blended specialty beans yang diracik khusus untuk rasa kopi yang modern. Citarasa manis kue red velvet dibarengi aroma selai beri dan cokelat susu.',
      en: 'Blended specialty beans crafted for a modern coffee experience. Sweet red velvet notes paired with berry jam and milk chocolate aroma.'
    }
  }
];
