"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Download, 
  ChevronRight, 
  Star, 
  Menu, 
  X,
  Smartphone,
  Globe,
  Lock,
  Languages
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Types & Translations ---

type Language = 'en' | 'sw';

const translations = {
  en: {
    nav: {
      features: "Features",
      howItWorks: "How it Works",
      trust: "Trust",
      download: "Download"
    },
    hero: {
      badge: "Live Signal Detection",
      title: "Real-Time Signal Detection. Precision. Speed.",
      description: "Experience the next generation of Aviator signal alerts. Precision-engineered for speed and accuracy.",
      ctaPrimary: "Download Now",
      ctaSecondary: "Learn More",
      appPro: "AviatorX Pro",
      prediction: "Current Prediction",
      signalDetected: "Signal Detected",
      activate: "ACTIVATE SCAN",
      success: "SUCCESS"
    },
    features: {
      title: "Premium Features",
      subtitle: "Designed for those who demand precision and speed in every alert.",
      items: [
        {
          title: "Real-Time Signal Alerts",
          description: "Get instant notifications the second a high-probability signal is detected."
        },
        {
          title: "High Accuracy Detection",
          description: "Our proprietary algorithm filters noise to provide precision-focused results."
        },
        {
          title: "Instant Notifications",
          description: "Zero latency delivery system ensures you never miss a critical update."
        },
        {
          title: "24/7 Monitoring System",
          description: "Continuous system monitoring ensures reliable performance around the clock."
        }
      ]
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "Simple, effective, and built for performance. Get started in three easy steps.",
      steps: [
        {
          title: "Download AviatorX",
          description: "Get the app from the App Store or Google Play and set up your profile in seconds."
        },
        {
          title: "Get Live Signals",
          description: "Activate the signal detector and start receiving real-time precision alerts."
        },
        {
          title: "Follow Alerts",
          description: "Act on the signals in real time with our zero-latency notification system."
        }
      ]
    },
    trust: {
      title: "Trusted by Professionals",
      badges: [
        { label: "Secure System" },
        { label: "Private & Safe" },
        { label: "Fast Activation" },
        { label: "Global Access" }
      ],
      testimonials: [
        {
          name: "Marcus T.",
          role: "Pro User",
          text: "The speed of these alerts is unmatched. I've tried many apps, but AviatorX is the only one that feels truly professional."
        },
        {
          name: "Sarah L.",
          role: "Daily User",
          text: "Clean interface, no fluff, just pure precision. The 24/7 monitoring gives me peace of mind."
        }
      ]
    },
    download: {
      title: "Ready to Elevate Your Experience?",
      description: "Join thousands of users who rely on AviatorX for the most accurate signal detection in the industry.",
      cta: "Get Started Now",
      appStore: "App Store",
      googlePlay: "Google Play",
      downloadOn: "Download on the",
      getItOn: "Get it on"
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "All rights reserved."
    },

    modal: {
      title: "Android Only (For Now)",
      description1: "Our app is currently available for",
      highlight: "Android users only",
      description2: "Google Play & App Store versions are coming soon.",
      description3: "For now, download and install the APK using the Download button above.",
      button: "Got It"
    }
  },
  sw: {
    nav: {
      features: "Vipengele",
      howItWorks: "Jinsi Inavyofanya Kazi",
      trust: "Uaminifu",
      download: "Pakua"
    },
    hero: {
      badge: "Utambuzi wa Ishara Moja kwa Moja",
      title: "Utambuzi wa Ishara kwa Wakati Halisi. Usahihi. Kasi.",
      description: "Pata kizazi kijacho cha arifa za ishara za Aviator. Imeundwa kwa usahihi kwa kasi na usahihi.",
      ctaPrimary: "Pakua Sasa",
      ctaSecondary: "Jifunze Zaidi",
      appPro: "AviatorX Pro",
      prediction: "Utabiri wa Sasa",
      signalDetected: "Ishara Imepatikana",
      activate: "WASHA SCAN",
      success: "IMEFANIKIWA"
    },
    features: {
      title: "Vipengele Bora",
      subtitle: "Imeundwa kwa ajili ya wale wanaohitaji usahihi na kasi katika kila arifa.",
      items: [
        {
          title: "Arifa za Ishara za Wakati Halisi",
          description: "Pata arifa za papo hapo sekunde ile ishara yenye uwezekano mkubwa inapotambuliwa."
        },
        {
          title: "Utambuzi wa Usahihi wa Juu",
          description: "Algorithm yetu inachuja kelele ili kutoa matokeo yaliyolenga usahihi."
        },
        {
          title: "Arifa za Papo Hapo",
          description: "Mfumo wa utoaji usio na ucheleweshaji unahakikisha hukosi sasisho muhimu."
        },
        {
          title: "Mfumo wa Ufuatiliaji wa Saa 24",
          description: "Ufuatiliaji wa mfumo unaoendelea unahakikisha utendaji wa kuaminika saa kumi na mbili."
        }
      ]
    },
    howItWorks: {
      title: "Jinsi Inavyofanya Kazi",
      subtitle: "Rahisi, yenye ufanisi, na iliyojengwa kwa utendaji. Anza kwa hatua tatu rahisi.",
      steps: [
        {
          title: "Pakua AviatorX",
          description: "Pata programu kutoka App Store au Google Play na uweke wasifu wako kwa sekunde chache."
        },
        {
          title: "Pata Ishara za Moja kwa Moja",
          description: "Washa kitambuzi cha ishara na uanze kupokea arifa za usahihi wa wakati halisi."
        },
        {
          title: "Fuata Arifa",
          description: "Chukua hatua kwenye ishara kwa wakati halisi na mfumo wetu wa arifa usio na ucheleweshaji."
        }
      ]
    },
    trust: {
      title: "Inaaminika na Wataalamu",
      badges: [
        { label: "Mfumo Salama" },
        { label: "Siri na Salama" },
        { label: "Uanzishaji wa Haraka" },
        { label: "Ufikiaji wa Dunia" }
      ],
      testimonials: [
        {
          name: "Marcus T.",
          role: "Mtumiaji Bingwa",
          text: "Kasi ya arifa hizi haina kifani. Nimejaribu programu nyingi, lakini AviatorX ndiyo pekee inayohisi kuwa ya kitaalamu kweli."
        },
        {
          name: "Sarah L.",
          role: "Mtumiaji wa Kila Siku",
          text: "Kiolesura safi, hakuna mambo mengi, usahihi mtupu tu. Ufuatiliaji wa saa 24 unanipa amani ya akili."
        }
      ]
    },
    download: {
      title: "Uko Tayari Kuinua Uzoefu Wako?",
      description: "Jiunge na maelfu ya watumiaji wanaotegemea AviatorX kwa utambuzi sahihi zaidi wa ishara katika tasnia.",
      cta: "Anza Sasa",
      appStore: "App Store",
      googlePlay: "Google Play",
      downloadOn: "Pakua kwenye",
      getItOn: "Ione kwenye"
    },
    footer: {
      privacy: "Sera ya Faragha",
      terms: "Masharti ya Huduma",
      rights: "Haki zote zimehifadhiwa."
    },

    modal: {
      title: "Android Pekee (Kwa Sasa)",
      description1: "Programu yetu kwa sasa inapatikana kwa",
      highlight: "Watumiaji wa Android pekee",
      description2: "Toleo la Google Play na App Store linakuja hivi karibuni.",
      description3: "Kwa sasa, pakua na sakinisha APK ukitumia kitufe cha Download hapo juu.",
      button: "Sawa"
    }
  }
};

// --- Context ---

const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: typeof translations.en;
}>({
  lang: 'en',
  setLang: () => {},
  t: translations.en
});

const useTranslation = () => useContext(LanguageContext);

// --- Utility ---

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = () => {
  const { lang, setLang, t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'sw' : 'en');
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-[#0f0f12]/95 border-b border-white/5 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#ff2d2d] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,45,45,0.5)]">
            <Zap className="text-dark-bg w-5 h-5 fill-current" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">AviatorX</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: t.nav.features, id: 'features' },
            { name: t.nav.howItWorks, id: 'how-it-works' },
            { name: t.nav.trust, id: 'trust' }
          ].map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
          
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors border border-white/10 px-3 py-1 rounded-full"
          >
            <Languages className="w-4 h-4" />
            {lang === 'en' ? 'SW' : 'EN'}
          </button>

          <a
            href="/aviatorx-v1.0.apk"
            download
            className="bg-[#ff2d2d] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#ff4444] transition-all shadow-[0_0_25px_rgba(255,45,45,0.5)]"
          >
            {t.nav.download}
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleLang}
            className="flex items-center gap-1 text-xs font-bold text-accent border border-accent/20 px-2 py-1 rounded-lg"
          >
            {lang === 'en' ? 'SW' : 'EN'}
          </button>
          <button 
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-dark-surface border-b border-white/10 p-6 md:hidden flex flex-col gap-4"
          >
            {[
              { name: t.nav.features, id: 'features' },
              { name: t.nav.howItWorks, id: 'how-it-works' },
              { name: t.nav.trust, id: 'trust' }
            ].map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                className="text-lg font-medium text-white/80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button className="bg-accent text-dark-bg w-full py-3 rounded-xl font-bold mt-2">
              {t.hero.ctaPrimary}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            {t.hero.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 text-gradient tracking-tight">
            {t.hero.title}
          </h1>
          <p className="text-base md:text-lg text-white/60 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="/aviatorx-v1.0.apk"
            download
            className="glow-button bg-accent text-dark-bg px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group w-full sm:w-auto"
          >
            {t.hero.ctaPrimary}
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <button className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all font-semibold flex items-center justify-center gap-2 w-full sm:w-auto">
            {t.hero.ctaSecondary}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative z-10 bg-[#16161b] border border-white/5 rounded-2xl p-3 md:p-4 mx-auto max-w-[280px] md:max-w-[320px] aspect-[9/19] shadow-2xl">
            <div className="w-full h-full bg-dark-bg rounded-xl overflow-hidden relative border border-white/5">
              {/* Mock App Interface */}
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <Zap className="text-accent w-4 h-4" />
                  </div>
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">{t.hero.appPro}</div>
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-full border-2 border-accent/30 flex items-center justify-center mb-4 relative">
                    <div className="absolute inset-0 border-2 border-accent rounded-full animate-[spin_3s_linear_infinite] border-t-transparent border-l-transparent" />
                    <span className="text-3xl font-display font-bold text-accent">2.4x</span>
                  </div>
                  <div className="text-xs font-medium text-white/40 mb-1">{t.hero.prediction}</div>
                  <div className="text-xl font-bold mb-6">{t.hero.signalDetected}</div>
                  
                  <div className="w-full space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <div className="text-[10px] text-white/60">Signal #{i}024</div>
                        </div>
                        <div className="text-[10px] font-bold text-accent">{t.hero.success}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-accent text-dark-bg py-3 rounded-xl text-xs font-bold mt-6">
                  {t.hero.activate}
                </button>
              </div>
            </div>
          </div>
          {/* Decorative elements behind phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-[80px] -z-10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const { t } = useTranslation();
  const icons = [
    <Bell className="w-6 h-6 text-accent" />,
    <ShieldCheck className="w-6 h-6 text-accent" />,
    <Zap className="w-6 h-6 text-accent" />,
    <Activity className="w-6 h-6 text-accent" />
  ];

  return (
    <section id="features" className="py-20 md:py-24 px-6 bg-dark-surface/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">{t.features.title}</h2>
          <p className="text-sm md:text-base text-white/40 max-w-xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {t.features.items.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#16161b] border border-white/5 rounded-2xl p-6 md:p-8 hover:bg-white/[0.05] transition-all group"
            >
              <div className="mb-6 p-3 bg-accent/10 rounded-xl w-fit group-hover:scale-110 transition-transform">
                {icons[idx]}
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = t.howItWorks.steps.map((s, i) => ({ ...s, number: `0${i + 1}` }));

  return (
    <section id="how-it-works" className="py-20 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">{t.howItWorks.title}</h2>
            <p className="text-sm md:text-base text-white/40">
              {t.howItWorks.subtitle}
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-white/10 mx-12 mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative text-center md:text-left"
            >
              <div className="text-5xl md:text-6xl font-display font-black text-white/5 absolute -top-6 md:-top-8 left-1/2 md:left-[-4px] -translate-x-1/2 md:translate-x-0 select-none">
                {step.number}
              </div>
              <div className="relative z-10 pt-4">
                <h3 className="text-xl md:text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-xs mx-auto md:mx-0">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Trust = () => {
  const { t } = useTranslation();
  const badgeIcons = [
    <ShieldCheck className="w-5 h-5" />,
    <Lock className="w-5 h-5" />,
    <Zap className="w-5 h-5" />,
    <Globe className="w-5 h-5" />
  ];

  return (
    <section id="trust" className="py-24 px-6 bg-dark-surface/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">{t.trust.title}</h2>
            <div className="grid grid-cols-2 gap-4">
              {t.trust.badges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-[#16161b] border border-white/5 rounded-2xl">
                  <div className="text-accent">{badgeIcons[idx]}</div>
                  <span className="text-sm font-medium text-white/80">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {t.trust.testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-[#16161b] border border-white/5 rounded-2xl p-8 relative"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-lg text-white/80 italic mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-xs text-white/40 uppercase tracking-widest">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DownloadSection = ({ onComingSoon }: { onComingSoon: () => void }) => {
  const { t } = useTranslation();
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5 blur-[120px] -z-10" />
      
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-6xl font-display font-bold mb-6 md:mb-8 tracking-tight">{t.download.title}</h2>
          <p className="text-base md:text-xl text-white/50 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.download.description}
          </p>
          
          <div className="flex flex-col items-center gap-6 md:gap-8">
          <button
            onClick={onComingSoon}
            className="glow-button bg-accent text-dark-bg px-10 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-lg md:text-xl flex items-center gap-3 group w-full sm:w-auto justify-center"
          >
            {t.download.cta}
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={onComingSoon}
              className="flex items-center gap-3 px-6 py-3 bg-[#16161b] border border-white/5 rounded-2xl hover:bg-white/10 transition-all justify-center"
            >
                <Smartphone className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-[10px] uppercase text-white/40 leading-none">{t.download.downloadOn}</div>
                  <div className="text-sm font-bold">{t.download.appStore}</div>
                </div>
              </button>
              <button
                onClick={onComingSoon}
                className="flex items-center gap-3 px-6 py-3 bg-[#16161b] border border-white/5 rounded-2xl hover:bg-white/10 transition-all justify-center"
              >
                <Globe className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-[10px] uppercase text-white/40 leading-none">{t.download.getItOn}</div>
                  <div className="text-sm font-bold">{t.download.googlePlay}</div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
              <Zap className="text-dark-bg w-4 h-4 fill-current" />
            </div>
            <span className="font-display font-bold text-lg">AviatorX</span>
          </div>
          
          <div className="flex gap-8 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
            <a href="mailto:support@aviatorx.app" className="hover:text-white transition-colors">support@aviatorx.app</a>
          </div>
          
          <div className="text-xs text-white/20">
            © {new Date().getFullYear()} AviatorX. {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
};

const ComingSoonModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9998]"
            onClick={onClose}
          />

          {/* Centered Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          >
            <div className="w-full max-w-md bg-[#16161b] border border-white/5 rounded-2xl p-8 rounded-2xl text-center border border-white/10">

              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-accent" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4">
                {t.modal.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                {t.modal.description1}{" "}
                <span className="text-accent font-semibold">
                  {t.modal.highlight}
                </span>.
                <br /><br />
                {t.modal.description2}
                <br /><br />
                {t.modal.description3}
              </p>

              {/* Button */}
              <button
                onClick={onClose}
                className="w-full bg-accent text-dark-bg py-3 rounded-xl font-bold hover:opacity-90 transition-all"
              >
                {t.modal.button}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [showModal, setShowModal] = useState(false);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <div className="min-h-screen font-sans bg-[#0f0f12] text-white selection:bg-[#ff2d2d] selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Trust />
          <DownloadSection onComingSoon={() => setShowModal(true)} />
        </main>
        <Footer />

        <ComingSoonModal open={showModal} onClose={() => setShowModal(false)} />
      </div>
    </LanguageContext.Provider>
  );
}