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
  'common.yes': { id: 'Ya', en: 'Yes' },
  'common.no': { id: 'Tidak', en: 'No' },
  'common.confirm': { id: 'Konfirmasi', en: 'Confirm' },
  'common.close': { id: 'Tutup', en: 'Close' },
  'common.back': { id: 'Kembali', en: 'Back' },
  'common.next': { id: 'Selanjutnya', en: 'Next' },
  'common.previous': { id: 'Sebelumnya', en: 'Previous' },
  
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
  'products.productInfo': { id: 'Informasi Produk', en: 'Product Information' },
  'products.added': { id: 'Ditambahkan', en: 'Added' },
  'products.lastUpdated': { id: 'Terakhir Diupdate', en: 'Last Updated' },
  'products.viewProduct': { id: 'Lihat Produk', en: 'View Product' },
  'products.priceHistory': { id: 'Riwayat Harga', en: 'Price History' },
  'products.latestPrices': { id: 'Harga Terbaru', en: 'Latest Prices' },
  'products.noPriceHistory': { id: 'Belum ada riwayat harga', en: 'No price history yet' },
  'products.refreshPrice': { id: 'Refresh Harga', en: 'Refresh Price' },
  'products.productNotFound': { id: 'Produk tidak ditemukan', en: 'Product not found' },
  'products.updated': { id: 'Diupdate', en: 'Updated' },
  'products.deleteConfirm': { id: 'Apakah Anda yakin ingin menghapus produk ini?', en: 'Are you sure you want to delete this product?' },
  
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
  'settings.accountActive': { id: 'Akun Anda saat ini aktif dan memantau produk.', en: 'Your account is currently active and monitoring products.' },
  'settings.selectMarketplace': { id: 'Pilih marketplace yang ingin dihubungkan:', en: 'Select marketplace to connect:' },
  'settings.currentPassword': { id: 'Kata Sandi Saat Ini', en: 'Current Password' },
  'settings.newPassword': { id: 'Kata Sandi Baru', en: 'New Password' },
  'settings.confirmPassword': { id: 'Konfirmasi Kata Sandi', en: 'Confirm Password' },
  'settings.rotateApiKeyWarning': { id: 'Apakah Anda yakin ingin memutar kunci API? Kunci API saat ini akan dinonaktifkan dan Anda akan menerima yang baru.', en: 'Are you sure you want to rotate your API key? Your current API key will be invalidated and you will receive a new one.' },
  'settings.rotateConfirm': { id: 'Putar Kunci', en: 'Rotate Key' },
  
  // Sidebar
  'sidebar.dashboard': { id: 'Dashboard', en: 'Dashboard' },
  'sidebar.products': { id: 'Produk', en: 'Products' },
  'sidebar.alerts': { id: 'Notifikasi', en: 'Alerts' },
  'sidebar.settings': { id: 'Pengaturan', en: 'Settings' },
  'sidebar.system': { id: 'Sistem', en: 'System' },
  'sidebar.adminDashboard': { id: 'Dashboard Admin', en: 'Admin Dashboard' },
  'sidebar.users': { id: 'Pengguna', en: 'Users' },
  'sidebar.pricing': { id: 'Harga Layanan', en: 'Pricing' },
  'sidebar.analytics': { id: 'Analitik', en: 'Analytics' },
  'sidebar.superadmin': { id: 'Superadmin', en: 'Superadmin' },
  'sidebar.admins': { id: 'Admin', en: 'Admins' },
  'sidebar.billing': { id: 'Penagihan', en: 'Billing' },
  'sidebar.logout': { id: 'Keluar', en: 'Logout' },
  'sidebar.freePlan': { id: 'Paket Gratis', en: 'Free Plan' },
  'sidebar.proPlan': { id: 'Paket Pro', en: 'Pro Plan' },
  'sidebar.admin': { id: 'Admin', en: 'Admin' },
  'sidebar.superadminRole': { id: 'Superadmin', en: 'Superadmin' },
  
  // Dashboard
  'dashboard.title': { id: 'Dashboard', en: 'Dashboard' },
  'dashboard.description': { id: 'Pantau & analisis perubahan harga di seluruh marketplace Indonesia', en: 'Monitor & analyze price changes across Indonesian marketplaces' },
  'dashboard.totalProducts': { id: 'Total Produk', en: 'Total Products' },
  'dashboard.unreadAlerts': { id: 'Notifikasi Belum Dibaca', en: 'Unread Alerts' },
  'dashboard.priceChecks': { id: 'Pengecekan Harga', en: 'Price Checks' },
  'dashboard.priceTrends': { id: 'Tren Harga', en: 'Price Trends' },
  'dashboard.priceTrendsDesc': { id: 'Total nilai harga selama 30 hari terakhir', en: 'Total price value over last 30 days' },
  'dashboard.priceChecksDesc': { id: 'Jumlah pengecekan harga per hari', en: 'Number of price checks per day' },
  'dashboard.productsByMarketplace': { id: 'Produk per Marketplace', en: 'Products by Marketplace' },
  'dashboard.marketplaceDistribution': { id: 'Distribusi di seluruh platform', en: 'Distribution across platforms' },
  'dashboard.alertsOverTime': { id: 'Notifikasi Seiring Waktu', en: 'Alerts Over Time' },
  'dashboard.alertsOverTimeDesc': { id: 'Notifikasi harga yang dihasilkan per hari', en: 'Price alerts generated per day' },
  'dashboard.recentProducts': { id: 'Produk Terbaru', en: 'Recent Products' },
  'dashboard.noProducts': { id: 'Belum ada produk', en: 'No products yet' },
  'dashboard.loadingChart': { id: 'Memuat grafik...', en: 'Loading chart...' },
  
  // Alerts
  'alerts.title': { id: 'Notifikasi', en: 'Alerts' },
  'alerts.description': { id: 'Notifikasi perubahan harga dan peringatan pemantauan', en: 'Price change notifications and monitoring alerts' },
  'alerts.unread': { id: 'Belum Dibaca', en: 'Unread' },
  'alerts.read': { id: 'Sudah Dibaca', en: 'Read' },
  'alerts.markRead': { id: 'Tandai Sudah Dibaca', en: 'Mark Read' },
  'alerts.noAlerts': { id: 'Belum ada notifikasi', en: 'No alerts yet' },
  'alerts.noAlertsDesc': { id: 'Anda akan diberitahu ketika harga berubah!', en: 'You\'ll be notified when prices change!' },
  
  // Landing Page
  'landing.quantumTracking': { id: 'Pelacakan Quantum Aktif', en: 'Quantum Tracking Active' },
  'landing.heroTitle1': { id: 'VISI PASAR', en: 'UNRIVALED' },
  'landing.heroTitle2': { id: 'TAK TERBANDINGKAN.', en: 'MARKET VISION.' },
  'landing.heroSubtitle': { id: 'Suite kecerdasan harga definitif untuk marketplace Indonesia. Alami telemetri real-time di Shopee, Tokopedia, dan Lazada.', en: 'The definitive pricing intelligence suite for Indonesian marketplaces. Experience real-time telemetry across Shopee, Tokopedia, and Lazada.' },
  'landing.establishLink': { id: 'Buat Koneksi', en: 'Establish Link' },
  'landing.viewSystems': { id: 'Lihat Sistem', en: 'View Systems' },
  'landing.alertTriggered': { id: 'Peringatan Terpicu', en: 'Alert Triggered' },
  'landing.priceDeviation': { id: 'Penyimpangan harga terdeteksi di Kompetitor A (-12%)', en: 'Price deviation detected in Competitor A (-12%)' },
  'landing.feature1Title': { id: 'Pengawasan Omni-Channel', en: 'Omni-Channel Surveillance' },
  'landing.feature1Desc': { id: 'Secara otomatis merayapi ribuan listing produk setiap menit. Mesin proprietary kami melewati langkah-langkah anti-bot untuk memberikan lanskap pasar paling akurat di Indonesia.', en: 'Automatically crawl thousands of product listings every minute. Our proprietary engine bypasses anti-bot measures to deliver the most accurate market landscape in Indonesia.' },
  'landing.feature1Item1': { id: 'Pengindeksan Harga Real-time', en: 'Real-time Price Indexing' },
  'landing.feature1Item2': { id: 'Pemantauan Level Stok', en: 'Stock Level Monitoring' },
  'landing.feature1Item3': { id: 'AI Prediksi Buy-box', en: 'Buy-box Prediction AI' },
  'landing.feature2Title': { id: 'Protokol Peringatan Dinamis', en: 'Dynamic Alert Protocol' },
  'landing.feature2Desc': { id: 'Jangan pernah melewatkan pergerakan. Terima notifikasi terenkripsi instan via WhatsApp, Telegram, atau Webhook segera setelah ambang kompetitif Anda dilanggar.', en: 'Never miss a movement. Receive instant encrypted notifications via WhatsApp, Telegram, or Webhook as soon as your competitive threshold is breached.' },
  'landing.feature2Link': { id: 'Jelajahi Mesin Peringatan', en: 'Explore Alert Engine' },
  
  // Login
  'login.title': { id: 'Mulai Sesi', en: 'Initialize Session' },
  'login.subtitle': { id: 'Initialize Session', en: 'Initialize Session' },
  'login.protocol': { id: 'Protokol Akses Aman Aktif · Secure Access Protocol Active', en: 'Secure Access Protocol Active · Protokol Akses Aman Aktif' },
  'login.gridIdentifier': { id: 'Grid Identifier', en: 'Grid Identifier' },
  'login.emailPlaceholder': { id: 'Masukkan email terenkripsi Anda', en: 'Enter your encrypted email' },
  'login.accessKey': { id: 'Access Key', en: 'Access Key' },
  'login.forgotKey': { id: 'Lupa kunci akses?', en: 'Forgot access key?' },
  'login.initializing': { id: 'Menginisialisasi...', en: 'Initializing...' },
  'login.initializeSession': { id: 'Inisialisasi Sesi', en: 'Initialize Session' },
  'login.newToGrid': { id: 'Baru di grid?', en: 'New to the grid?' },
  'login.registerIdentity': { id: 'Daftarkan Identitas', en: 'Register Identity' },
  'login.systemOnline': { id: 'Sistem Online', en: 'System Online' },
  'login.encryption': { id: 'Enkripsi: AES-256', en: 'Encryption: AES-256' },
  'login.node': { id: 'Node: Obsidian-Alpha', en: 'Node: Obsidian-Alpha' },
  'login.access': { id: 'MASUK', en: 'ACCESS' },
  
  // Register
  'register.title': { id: 'Daftarkan Identitas', en: 'Register Identity' },
  'register.subtitle': { id: 'Register Identity', en: 'Register Identity' },
  'register.protocol': { id: 'Buat Protokol Akses Baru · Create New Access Protocol', en: 'Create New Access Protocol · Buat Protokol Akses Baru' },
  'register.identityName': { id: 'Identity Name', en: 'Identity Name' },
  'register.namePlaceholder': { id: 'Masukkan nama Anda', en: 'Enter your name' },
  'register.creatingIdentity': { id: 'Membuat Identitas...', en: 'Creating Identity...' },
  'register.createIdentity': { id: 'Buat Identitas', en: 'Create Identity' },
  'register.alreadyHaveIdentity': { id: 'Sudah punya identitas?', en: 'Already have an identity?' },
  'register.initializeSession': { id: 'Inisialisasi Sesi', en: 'Initialize Session' },
  
  // Header
  'header.intelligence': { id: 'Intelligence', en: 'Intelligence' },
  'header.networks': { id: 'Networks', en: 'Networks' },
  'header.api': { id: 'API', en: 'API' },
  'header.enterprise': { id: 'Enterprise', en: 'Enterprise' },
  'header.connectNow': { id: 'Hubungkan Sekarang', en: 'Connect Now' },
  
  // Footer
  'footer.interface': { id: 'Interface', en: 'Interface' },
  'footer.protocols': { id: 'Protocols', en: 'Protocols' },
  'footer.registry': { id: 'Registry', en: 'Registry' },
  'footer.description': { id: 'Platform kecerdasan harga terdepan untuk retailer berkecepatan tinggi di Asia Tenggara.', en: 'Leading pricing intelligence platform for high-speed retailers in Southeast Asia.' },
  'footer.copyright': { id: '© 2024 Obsidian Intelligence Systems Group.', en: '© 2024 Obsidian Intelligence Systems Group.' },
  'footer.terminalLog': { id: 'Terminal Log', en: 'Terminal Log' },
  'footer.privacyOps': { id: 'Privacy Ops', en: 'Privacy Ops' },
  
  // Status Page
  'status.systemStatus': { id: 'Status Sistem', en: 'System Status' },
  'status.title': { id: 'Status Cluster', en: 'Status Cluster' },
  'status.description': { id: 'Pantau kesehatan layanan HargaCerdas secara real-time. Transparansi uptime untuk tim Anda.', en: 'Monitor the health of HargaCerdas services in real time. Uptime transparency for your team.' },
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
