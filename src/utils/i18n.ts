export type Language = 'id' | 'en';

export interface Translations {
  [key: string]: {
    id: string;
    en: string;
  };
}

const translations: Translations = {
  // Common
  'common.dashboard': { id: 'Dashboard', en: 'Dashboard' },
  'common.products': { id: 'Produk', en: 'Products' },
  'common.alerts': { id: 'Notifikasi', en: 'Alerts' },
  'common.settings': { id: 'Pengaturan', en: 'Settings' },
  'common.save': { id: 'Simpan', en: 'Save' },
  'common.cancel': { id: 'Batal', en: 'Cancel' },
  'common.delete': { id: 'Hapus', en: 'Delete' },
  'common.edit': { id: 'Edit', en: 'Edit' },
  'common.add': { id: 'Tambah', en: 'Add' },
  'common.loading': { id: 'Memuat...', en: 'Loading...' },
  'common.search': { id: 'Cari', en: 'Search' },
  'common.filter': { id: 'Filter', en: 'Filter' },
  
  // Products
  'products.title': { id: 'Inventori Produk', en: 'Products Inventory' },
  'products.add': { id: 'Tambah Produk', en: 'Add Product' },
  'products.monitoring': { id: 'Memantau', en: 'Monitoring' },
  'products.active': { id: 'aktif di seluruh marketplace', en: 'active listings across marketplaces' },
  'products.currentPrice': { id: 'Harga Saat Ini', en: 'Current Price' },
  'products.targetPrice': { id: 'Harga Target', en: 'Target Price' },
  'products.marketplace': { id: 'Marketplace', en: 'Marketplace' },
  'products.viewDetails': { id: 'Lihat Detail', en: 'View Details' },
  'products.noProducts': { id: 'Belum ada produk. Tambah produk pertama untuk mulai memantau!', en: 'No products yet. Add your first product to start monitoring!' },
  'products.allPlatforms': { id: 'Semua Platform', en: 'All Platforms' },
  
  // Add Product Modal
  'modal.monitorProduct': { id: 'PANTau PRODUK', en: 'MONITOR PRODUCT' },
  'modal.description': { id: 'Masukkan URL marketplace untuk memulai survei kompetitif.', en: 'Input a marketplace URL to initiate competitive surveillance.' },
  'modal.marketplace': { id: 'Marketplace Target', en: 'Target Marketplace' },
  'modal.productLink': { id: 'Tautan Produk', en: 'Product Link' },
  'modal.productName': { id: 'Nama Produk', en: 'Product Name' },
  'modal.scanning': { id: 'PEMINDAIAN AMAN AKTIF', en: 'SECURE SCANNING ACTIVE' },
  'modal.initialize': { id: 'Mulai Pelacakan', en: 'Initialize Tracking' },
  'modal.abort': { id: 'Batal', en: 'Abort' },
  
  // Settings
  'settings.title': { id: 'Pengaturan', en: 'Settings' },
  'settings.description': { id: 'Kelola identitas Obsidian dan preferensi langganan Anda di Indonesia.', en: 'Manage your Obsidian identity and subscription preferences in Indonesia.' },
  'settings.profile': { id: 'Profil Admin', en: 'Admin Profile' },
  'settings.authorized': { id: 'Operator Akun Berwenang', en: 'Authorized Account Operator' },
  'settings.fullName': { id: 'Nama Lengkap', en: 'Full Name' },
  'settings.email': { id: 'Alamat Email', en: 'Email Address' },
  'settings.role': { id: 'Peran', en: 'Role' },
  'settings.accountType': { id: 'Tipe Akun', en: 'Account Type' },
  'settings.subscription': { id: 'Langganan & Batas', en: 'Subscription & Limits' },
  'settings.active': { id: 'Aktif', en: 'Active' },
  'settings.marketplaceSync': { id: 'Sinkronisasi Marketplace', en: 'Marketplace Sync' },
  'settings.security': { id: 'Keamanan', en: 'Security' },
  'settings.twoFactor': { id: 'Autentikasi Dua Faktor', en: 'Two-Factor Auth' },
  'settings.secureWhatsApp': { id: 'Aman via WhatsApp', en: 'Secure via WhatsApp' },
  'settings.resetPassword': { id: 'Reset Kata Sandi Akun', en: 'Reset Account Password' },
  'settings.rotateApiKeys': { id: 'Putar Kunci API', en: 'Rotate API Keys' },
  'settings.connectMarketplace': { id: '+ Hubungkan Marketplace', en: '+ Connect Marketplace' },
  
  // Sidebar
  'sidebar.dashboard': { id: 'Dashboard', en: 'Dashboard' },
  'sidebar.products': { id: 'Produk', en: 'Products' },
  'sidebar.alerts': { id: 'Notifikasi', en: 'Alerts' },
  'sidebar.settings': { id: 'Pengaturan', en: 'Settings' },
  'sidebar.system': { id: 'Sistem', en: 'System' },
  'sidebar.adminDashboard': { id: 'Dashboard Admin', en: 'Admin Dashboard' },
  'sidebar.users': { id: 'Pengguna', en: 'Users' },
  'sidebar.analytics': { id: 'Analitik', en: 'Analytics' },
  'sidebar.superadmin': { id: 'Superadmin', en: 'Superadmin' },
  'sidebar.admins': { id: 'Admin', en: 'Admins' },
  'sidebar.billing': { id: 'Penagihan', en: 'Billing' },
  'sidebar.logout': { id: 'Keluar', en: 'Logout' },
  'sidebar.freePlan': { id: 'Paket Gratis', en: 'Free Plan' },
  'sidebar.proPlan': { id: 'Paket Pro', en: 'Pro Plan' },
  'sidebar.admin': { id: 'Admin', en: 'Admin' },
  'sidebar.superadminRole': { id: 'Superadmin', en: 'Superadmin' },
};

class I18n {
  private language: Language = 'id';

  setLanguage(lang: Language) {
    this.language = lang;
    localStorage.setItem('language', lang);
  }

  getLanguage(): Language {
    const saved = localStorage.getItem('language') as Language;
    if (saved) {
      this.language = saved;
    }
    return this.language;
  }

  t(key: string): string {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[this.language];
  }
}

export const i18n = new I18n();

// Initialize language from localStorage
i18n.getLanguage();
