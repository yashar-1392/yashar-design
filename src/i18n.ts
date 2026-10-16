export type Lang = 'fa' | 'en';
export type Theme = 'dark' | 'light';

export interface Service {
  id: string;
  icon: string;
  title: { fa: string; en: string };
  desc: { fa: string; en: string };
  price: { fa: string; en: string };
  soon?: boolean;
  custom?: boolean;
}

export const services: Service[] = [
  {
    id: 'web-design',
    icon: 'Globe',
    title: { fa: 'طراحی سایت', en: 'Web Design' },
    desc: { fa: 'طراحی رابط کاربری مدرن و زیبا برای کسب و کار شما.', en: 'Modern, beautiful UI design for your business.' },
    price: { fa: '۳۵۰.۰۰۰ تا ۲.۶۵۰.۰۰۰', en: '350K – 2.65M' },
  },
  {
    id: 'powerpoint',
    icon: 'BarChart3',
    title: { fa: 'ساخت پاورپوینت حرفه‌ای', en: 'Professional PowerPoint' },
    desc: { fa: 'طراحی اسلایدهای بصری و تاثیرگذار برای ارایه‌های مدیریتی و بیزنس پلن‌ها.', en: 'Visual, impactful slides for executive presentations and business plans.' },
    price: { fa: '۵۰.۰۰۰ تا ۲۰۰.۰۰۰', en: '50K – 200K' },
  },
  {
    id: 'tts',
    icon: 'Mic',
    title: { fa: 'تبدیل متن به صوت و بالعکس', en: 'Text-to-Speech & Vice Versa' },
    desc: { fa: 'پردازش سریع و با کیفیت صدا و متن.', en: 'Fast, high-quality audio and text processing.' },
    price: { fa: '۳۰.۰۰۰ تا ۱۵۰.۰۰۰', en: '30K – 150K' },
  },
  {
    id: 'translation',
    icon: 'Languages',
    title: { fa: 'ترجمه حرفه‌ای', en: 'Professional Translation' },
    desc: { fa: 'ترجمه تخصصی متون با رعایت دقیق اصطلاحات علمی و تجاری هر حوزه.', en: 'Specialized translation respecting precise scientific and commercial terminology.' },
    price: { fa: '۳۰.۰۰۰ تا ۷۰۰.۰۰۰', en: '30K – 700K' },
  },
  {
    id: 'debug',
    icon: 'Wrench',
    title: { fa: 'رفع اشکالات فنی', en: 'Technical Debugging' },
    desc: { fa: 'اصلاح باگ‌ها و بهینه‌سازی سرعت سایت‌های موجود.', en: 'Fix bugs and optimize speed of existing websites.' },
    price: { fa: '۳۰۰.۰۰۰ تا ۹۵۰.۰۰۰', en: '300K – 950K' },
  },
  {
    id: 'copywriting',
    icon: 'PenTool',
    title: { fa: 'تولید محتوا و کپی‌رایتینگ', en: 'Content & Copywriting' },
    desc: { fa: 'نوشتن متن ترغیب‌کننده برای جذب مشتری و افزایش اعتبار برند شما.', en: 'Persuasive copy to attract customers and boost your brand credibility.' },
    price: { fa: '۶۰.۰۰۰ تا ۳۰۰.۰۰۰', en: '60K – 300K' },
  },
  {
    id: 'music',
    icon: 'Music',
    title: { fa: 'تولید موزیک فارسی', en: 'Persian Music Production' },
    desc: { fa: 'خلق قطعات موسیقی و بیت‌های اختصاصی با استفاده از ابزارهای دیجیتال مدرن.', en: 'Create exclusive tracks and beats using modern digital tools.' },
    price: { fa: '۷۰.۰۰۰ تا ۵۰۰.۰۰۰', en: '70K – 500K' },
  },
  {
    id: 'podcast',
    icon: 'Podcast',
    title: { fa: 'تولید پادکست', en: 'Podcast Production' },
    desc: { fa: 'راهبری فنی از ضبط تا تدوین پادکست‌های با کیفیت بالا برای برندینگ شما.', en: 'Full technical pipeline from recording to editing high-quality podcasts.' },
    price: { fa: '۱۰۰.۰۰۰ تا ۵۰۰.۰۰۰', en: '100K – 500K' },
  },
  {
    id: 'summarize',
    icon: 'FileText',
    title: { fa: 'خلاصه‌سازی اسناد', en: 'Document Summarization' },
    desc: { fa: 'استخراج هوشمند نکات کلیدی از فایل‌های حجیم جهت صرفه‌جویی در زمان.', en: 'Smart key-point extraction from large files to save you time.' },
    price: { fa: '۴۵.۰۰۰ تا ۳۰۰.۰۰۰', en: '45K – 300K' },
  },
  {
    id: 'logo',
    icon: 'Palette',
    title: { fa: 'طراحی لوگو و هویت بصری', en: 'Logo & Visual Identity' },
    desc: { fa: 'خلق نشان‌های تجاری منحصر‌به‌فرد که شخصیت برند شما را بازتاب دهد.', en: 'Craft unique commercial marks that reflect your brand personality.' },
    price: { fa: '۶۰.۰۰۰ تا ۷۰۰.۰۰۰', en: '60K – 700K' },
  },
  {
    id: 'data',
    icon: 'TrendingUp',
    title: { fa: 'پردازش و تحلیل داده', en: 'Data Processing & Analytics' },
    desc: { fa: 'تبدیل داده‌های خام به نمودارهای کاربردی برای تصمیم‌گیری بهتر در بیزنس.', en: 'Turn raw data into actionable charts for better business decisions.' },
    price: { fa: '۱۰۰.۰۰۰ تا ۳۰۰.۰۰۰', en: '100K – 300K' },
  },
  {
    id: 'video',
    icon: 'Video',
    title: { fa: 'تولید محتوای ویدیویی', en: 'Video Content Production' },
    desc: { fa: 'ساخت ویدیوهای کوتاه و تیزرهای تبلیغاتی جذاب برای شبکه‌های اجتماعی.', en: 'Short videos and engaging promo teasers for social media.' },
    price: { fa: '۱۰۰.۰۰۰ تا ۵۰۰.۰۰۰', en: '100K – 500K' },
  },
  {
    id: 'telegram-bot',
    icon: 'Bot',
    title: { fa: 'ساخت ربات تلگرام و بله', en: 'Telegram & Bale Bot' },
    desc: { fa: 'اتوماسیون پاسخگویی، فروش خودکار و مدیریت گروه‌ها.', en: 'Automated responses, auto-selling, and group management.' },
    price: { fa: '۲۹.۰۰۰ تا ۲۸۰.۰۰۰', en: '29K – 280K' },
  },
  {
    id: 'social-banner',
    icon: 'Image',
    title: { fa: 'طراحی بنر و پست شبکه اجتماعی', en: 'Social Media Banner & Post' },
    desc: { fa: 'طراحی کاورهای حرفه‌ای، قالب پست و استوری اینستاگرام و بله، و بنرهای تبلیغاتی وب‌سایت.', en: 'Professional covers, Instagram & Bale post templates and stories, and website ad banners.' },
    price: { fa: '۴.۰۰۰ تا ۲۰.۰۰۰', en: '4K – 20K' },
  },
  {
    id: 'seo',
    icon: 'Search',
    title: { fa: 'بهینه‌سازی سئو اولیه (SEO)', en: 'Initial SEO Optimization' },
    desc: { fa: 'بهینه‌سازی ساختار سایت، کلمات کلیدی، سرعت و ثبت سایت در موتورهای جستجو برای دیده شدن در گوگل.', en: 'Optimize site structure, keywords, speed, and submit to search engines for Google visibility.' },
    price: { fa: '۹۰.۰۰۰ تا ۵۰۰.۰۰۰', en: '90K – 500K' },
  },
  {
    id: 'digital-menu',
    icon: 'Utensils',
    title: { fa: 'طراحی منوی دیجیتال (کافه و رستوران)', en: 'Digital Menu Design (Cafe & Restaurant)' },
    desc: { fa: 'طراحی منوی دیجیتال تعاملی و زیبا برای کافه‌ها و رستوران‌ها با قابلیت اسکن کد QR و نمایش روی موبایل مشتریان.', en: 'Interactive, elegant digital menus for cafes and restaurants with QR scan capability for mobile viewing.' },
    price: { fa: '۱۹۹.۰۰۰ تا ۵۹۹.۰۰۰', en: '199K – 599K' },
  },
  {
    id: 'analytics',
    icon: 'BarChart',
    title: { fa: 'راه‌اندازی و کانفیگ ابزار تحلیل رفتار کاربر', en: 'User Behavior Analytics Setup' },
    desc: { fa: 'نصب و پیکربندی ابزارهای تحلیل رفتار کاربر در وب‌سایت برای درک بهتر مسیر مشتری و بهبود نرخ تبدیل.', en: 'Install and configure user behavior analytics tools on your website to understand customer journeys and improve conversion.' },
    price: { fa: '۲۹.۰۰۰ تا ۱۹۹.۰۰۰', en: '29K – 199K' },
  },
  {
    id: 'stickers',
    icon: 'Sticker',
    title: { fa: 'تدوین و ساخت استیکر اختصاصی برند', en: 'Custom Brand Sticker Pack' },
    desc: { fa: 'طراحی بسته‌های استیکر تبلیغاتی و لوگومحور برای پیام‌رسان‌های بله و تلگرام جهت افزایش درگیری مخاطب.', en: 'Design promotional, logo-based sticker packs for Bale and Telegram to boost audience engagement.' },
    price: { fa: '۵۰.۰۰۰ تا ۲۵۰.۰۰۰', en: '50K – 250K' },
  },
  {
    id: 'ai-chatbot',
    icon: 'MessageCircle',
    title: { fa: 'ساخت و شخصی‌سازی چت‌بات‌های هوشمند (AI)', en: 'AI Chatbot Development' },
    desc: { fa: 'اتصال مدل‌های هوش مصنوعی به دیتابیس اختصاصی کسب‌وکارها برای پاسخگویی هوشمند به مشتریان (مکمل ساخت ربات).', en: 'Connect AI models to your business database for intelligent customer responses (complements bot building).' },
    price: { fa: '۲۵۰.۰۰۰ تا ۹۵۰.۰۰۰', en: '250K – 950K' },
  },
  {
    id: 'image-enhance',
    icon: 'ScanLine',
    title: { fa: 'افزایش کیفیت و ترمیم تصاویر قدیمی/کم‌کیفیت', en: 'Image Enhancement & Restoration' },
    desc: { fa: 'ارتقای رزولوشن (Upscale)، حذف پس‌زمینه، بازسازی رنگ‌ها و حذف اشیاء اضافی با ابزارهای پیشرفته.', en: 'Upscale resolution, remove backgrounds, restore colors, and remove unwanted objects with advanced tools.' },
    price: { fa: '۲۰.۰۰۰ تا ۱۲۰.۰۰۰', en: '20K – 120K' },
  },
  {
    id: 'smart-card',
    icon: 'ScanLine',
    title: { fa: 'طراحی کارت ویزیت هوشمند و دیجیتال (QR)', en: 'Smart Digital Business Card (QR)' },
    desc: { fa: 'ساخت کارت ویزیت آنلاین و تعاملی با قابلیت ذخیره شماره تماس، لینک شبکه‌های اجتماعی و مسیریابی سریع با اسکن کد QR.', en: 'Online interactive business card with contact info, social links, and quick navigation via QR code scan.' },
    price: { fa: '۷۰.۰۰۰ تا ۲۵۰.۰۰۰', en: '70K – 250K' },
  },
  {
    id: 'api',
    icon: 'Plug',
    title: { fa: 'یکپارچه‌سازی API', en: 'API Integration' },
    desc: { fa: 'متصل کردن سیستم‌های مختلف به سایت شما.', en: 'Connect various systems to your website.' },
    price: { fa: '', en: '' },
    soon: true,
  },
  {
    id: 'custom',
    icon: 'Sparkles',
    title: { fa: 'سایر درخواست‌ها', en: 'Other Requests' },
    desc: { fa: 'ساخت قابلیت‌های جدید مطابق نیاز شما.', en: 'Build new features tailored to your needs.' },
    price: { fa: 'قیمت‌گذاری با توجه به درخواست شما', en: 'Priced per your request' },
    custom: true,
  },
];

export interface ProcessStep {
  num: string;
  title: { fa: string; en: string };
  desc: { fa: string; en: string };
}

export const processSteps: ProcessStep[] = [
  {
    num: '۱',
    title: { fa: 'ایده', en: 'Idea' },
    desc: { fa: 'شروع از نیاز واقعی، نه لیست قابلیت‌ها.', en: 'Start from the real need, not a feature list.' },
  },
  {
    num: '۲',
    title: { fa: 'فهم', en: 'Understand' },
    desc: { fa: 'خرد کردن مسئله پیش از دست بردن به ابزار.', en: 'Break down the problem before touching tools.' },
  },
  {
    num: '۳',
    title: { fa: 'طراحی', en: 'Design' },
    desc: { fa: 'شکل‌دادن همزمان تجربه و سیستم.', en: 'Shape experience and system simultaneously.' },
  },
  {
    num: '۴',
    title: { fa: 'ساخت', en: 'Build' },
    desc: { fa: 'مهندسی برای پروداکشن، نه برای دمو.', en: 'Engineer for production, not for demo.' },
  },
  {
    num: '۵',
    title: { fa: 'تست', en: 'Test' },
    desc: { fa: 'تلاش برای خراب‌کردنش پیش از کاربرها.', en: 'Try to break it before users do.' },
  },
  {
    num: '۶',
    title: { fa: 'بهبود', en: 'Improve' },
    desc: { fa: 'بستن حلقه: بازخورد، تکرار، پالایش.', en: 'Close the loop: feedback, iterate, refine.' },
  },
  {
    num: '۷',
    title: { fa: 'انتشار', en: 'Release' },
    desc: { fa: 'تحویل چیزی واقعی و ادامه ساختن.', en: 'Deliver something real and keep building.' },
  },
];

export interface FAQItem {
  q: { fa: string; en: string };
  a: { fa: string; en: string };
}

export const faqItems: FAQItem[] = [
  {
    q: { fa: 'چگونه می‌توانم سفارش ثبت کنم؟', en: 'How can I place an order?' },
    a: { fa: 'از طریق بات ثبت سفارش در بله می‌توانید به‌سادگی سفارش خود را ثبت کنید. پس از ثبت، تیم ما با شما تماس می‌گیرد.', en: 'You can easily place your order through the Bale order bot. After submission, our team will contact you.' },
  },
  {
    q: { fa: 'زمان تحویل پروژه‌ها چقدر است؟', en: 'What is the delivery time for projects?' },
    a: { fa: 'زمان تحویل بسته به نوع و حجم پروژه متفاوت است. معمولاً بین ۳ تا ۱۴ روز کاری زمان نیاز است.', en: 'Delivery time varies by project type and scope. Typically between 3 to 14 business days.' },
  },
  {
    q: { fa: 'آیا پشتیبانی پس از تحویل ارائه می‌دهید؟', en: 'Do you offer post-delivery support?' },
    a: { fa: 'بله، ما به‌صورت ۷/۲۴ پشتیبانی ارائه می‌دهیم و پس از تحویل نیز در دسترس شما هستیم.', en: 'Yes, we provide 24/7 support and remain available after delivery.' },
  },
  {
    q: { fa: 'آیا تخفیف اولین خرید فعال است؟', en: 'Is the first-order discount active?' },
    a: { fa: 'بله! اگر تا به حال از ما خرید نکرده‌اید، یک تخفیف ویژه برای اولین سفارش شما در نظر گرفته‌ایم.', en: 'Yes! If you have not ordered from us before, we have a special discount for your first order.' },
  },
  {
    q: { fa: 'روش پرداخت چگونه است؟', en: 'What are the payment methods?' },
    a: { fa: 'پرداخت به‌صورت نقدی یا اقساطی قابل انجام است. برای پروژه‌های بزرگ، ۵۰٪ پیش‌پرداخت و مابقی پس از تحویل دریافت می‌شود.', en: 'Payment can be made in full or installments. For large projects, 50% upfront and the rest upon delivery.' },
  },
  {
    q: { fa: 'آیا می‌توانم نمونه کارهای شما را ببینم؟', en: 'Can I see your portfolio?' },
    a: { fa: 'بله، نمونه کارها در کانال بله ما منتشر می‌شوند. می‌توانید با عضویت در کانال از آخرین پروژه‌ها مطلع شوید.', en: 'Yes, portfolio items are published on our Bale channel. Join to see our latest projects.' },
  },
];

export const t = {
  fa: {
    dir: 'rtl' as const,
    nav: {
      home: 'خانه',
      services: 'خدمات',
      about: 'درباره ما',
      process: 'فرایند',
      faq: 'سوالات',
      order: 'ثبت سفارش',
      channel: 'عضویت در کانال',
    },
    hero: {
      badge: 'شریک خلاق شما در مسیر دیجیتال',
      title1: 'یاشار',
      title2: 'دیزاین',
      subtitle: 'ما فراتر از یک تیم فنی هستیم؛ ما ایده‌های پیچیده شما را به تجربه‌های بصری ساده، زیبا و قدرتمند تبدیل می‌کنیم.',
      cta1: 'ثبت سفارش',
      cta2: 'مشاهده خدمات',
      stat1: 'پروژه موفق',
      stat2: 'رضایت مشتری',
      stat3: 'خدمت فعال',
      stat4: 'پشتیبانی',
    },
    services: {
      title: 'خدمات ما',
      subtitle: 'طیف گسترده‌ای از خدمات حرفه‌ای برای رشد کسب و کار شما',
      soon: 'به زودی...',
      customPrice: 'قیمت‌گذاری با توجه به درخواست شما',
      currency: 'تومان',
      from: 'از',
      to: 'تا',
    },
    offer: {
      title: 'تا به حالا از ما خرید نکردی؟',
      desc: 'اگر تا به حال از ما خرید نکردی، یک تخفیف خیلی ویژه برای هر خدمت برات داریم! پیشنهادهای ویژه اولین خرید رو از دست نده.',
      cta: ' همین حالا سفارش بده!',
    },
    about: {
      title: 'درباره ما',
      slogan: 'سازنده‌ام، نه فقط برنامه‌نویس.',
      subtitle: 'در یاشار دیزاین، ما فراتر از یک تیم فنی هستیم؛ ما شریک خلاق شما در مسیر دیجیتال هستیم. هدف ما تبدیل ایده‌های پیچیده شما به تجربه‌های بصری و کاربری ساده، زیبا و قدرتمند است.',
      s1Title: 'پروژه موفق',
      s1Desc: 'بیش از ۶۰ پروژه با موفقیت تحویل شده',
      s2Title: 'رضایت مشتری',
      s2Desc: 'صددرصد رضایت از مشتریان ما',
      s3Icon: 'Clock',
      s3Title: 'پشتیبانی ۷/۲۴',
      s3Desc: 'ما در تمام ساعات شبانه‌روز برای همراهی شما آماده هستیم.',
      s4Icon: 'Target',
      s4Title: 'تخصص گسترده',
      s4Desc: 'تمرکز ما بر پوشش تمامی حوزه‌های مدرن طراحی و توسعه است.',
    },
    process: {
      title: 'فرایند کار ما',
      subtitle: 'از ایده تا انتشار، شفاف و دقیق',
    },
    faq: {
      title: 'سوالات متداول',
      subtitle: 'پاسخ به پرتکرارترین پرسش‌های شما',
    },
    cta: {
      title: 'آماده‌اید شروع کنیم؟',
      desc: 'همین حالا سفارش خود را ثبت کنید یا به کانال ما بپیوندید تا از آخرین نمونه‌کارها و تخفیف‌ها مطلع شوید.',
      order: 'ثبت سفارش',
      channel: 'عضویت در کانال بله',
    },
    footer: {
      desc: 'شریک خلاق شما در مسیر دیجیتال — از طراحی سایت تا تولید محتوا.',
      quickLinks: 'دسترسی سریع',
      services: 'خدمات',
      contact: 'ارتباط با ما',
      rights: 'تمامی حقوق محفوظ است.',
      madeWith: 'ساخته شده با',
    },
  },
  en: {
    dir: 'ltr' as const,
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      process: 'Process',
      faq: 'FAQ',
      order: 'Order Now',
      channel: 'Join Channel',
    },
    hero: {
      badge: 'Your creative partner on the digital journey',
      title1: 'Yashar',
      title2: 'Design',
      subtitle: 'We are more than a technical team; we turn your complex ideas into simple, beautiful, and powerful visual experiences.',
      cta1: 'Place an Order',
      cta2: 'View Services',
      stat1: 'Projects Done',
      stat2: 'Client Satisfaction',
      stat3: 'Active Services',
      stat4: 'Support',
    },
    services: {
      title: 'Our Services',
      subtitle: 'A wide range of professional services to grow your business',
      soon: 'Coming Soon...',
      customPrice: 'Priced per your request',
      currency: 'Toman',
      from: 'From',
      to: 'to',
    },
    offer: {
      title: 'Never ordered from us before?',
      desc: "If you're a first-time customer, we have a very special discount on every service! Don't miss our exclusive first-order offers.",
      cta: ' Order now!',
    },
    about: {
      title: 'About Us',
      slogan: 'I am a builder, not just a programmer.',
      subtitle: 'At Yashar Design, we are more than a technical team; we are your creative partner on the digital journey. Our goal is to transform your complex ideas into simple, beautiful, and powerful visual and user experiences.',
      s1Title: 'Projects Done',
      s1Desc: 'Over 60 projects successfully delivered',
      s2Title: 'Client Satisfaction',
      s2Desc: '100% satisfaction from our clients',
      s3Icon: 'Clock',
      s3Title: '24/7 Support',
      s3Desc: 'We are ready to accompany you around the clock.',
      s4Icon: 'Target',
      s4Title: 'Broad Expertise',
      s4Desc: 'Our focus covers all modern areas of design and development.',
    },
    process: {
      title: 'Our Process',
      subtitle: 'From idea to release — transparent and precise',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to your most common questions',
    },
    cta: {
      title: 'Ready to get started?',
      desc: 'Place your order now or join our channel to stay updated on our latest work and discounts.',
      order: 'Place an Order',
      channel: 'Join Bale Channel',
    },
    footer: {
      desc: 'Your creative partner on the digital journey — from web design to content production.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact Us',
      rights: 'All rights reserved.',
      madeWith: 'Made with',
    },
  },
};

export const BALE_CHANNEL = 'https://ble.ir/yashardesign';
export const BALE_ORDER_BOT = 'https://ble.ir/order_registration_bot';
