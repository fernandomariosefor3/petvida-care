import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useApp } from '@/contexts/AppContext';
import SeoJsonLd from '@/components/feature/SeoJsonLd';

const features = [
  {
    icon: 'ri-heart-2-line',
    title: 'Cadastro de Pets',
    desc: 'Registre todos os seus animais com foto, raça, idade, peso e muito mais em um perfil completo.',
  },
  {
    icon: 'ri-alarm-line',
    title: 'Lembretes Inteligentes',
    desc: 'Nunca perca uma vacina, consulta ou medicamento. Configure alertas personalizados para cada pet.',
  },
  {
    icon: 'ri-heart-pulse-line',
    title: 'Histórico de Saúde',
    desc: 'Acompanhe consultas, exames, vacinas e o peso dos seus pets ao longo do tempo.',
  },
  {
    icon: 'ri-layout-grid-line',
    title: 'Dashboard Completo',
    desc: 'Visualize tudo em um só lugar: pets, próximos eventos, saúde e muito mais.',
  },
];

const steps = [
  { num: '01', title: 'Crie sua conta', desc: 'Cadastro rápido e gratuito em menos de 1 minuto.' },
  { num: '02', title: 'Adicione seus pets', desc: 'Registre nome, raça, foto e informações de cada pet.' },
  { num: '03', title: 'Configure lembretes', desc: 'Defina datas de vacinas, consultas e medicamentos.' },
  { num: '04', title: 'Acompanhe a saúde', desc: 'Mantenha o histórico completo e nunca perca nada.' },
];

const testimonials = [
  {
    name: 'Ana Rodrigues',
    pet: 'Tutora do Bolt e da Mel',
    text: 'O PetVida transformou como cuido dos meus dois cachorros. Nunca mais esqueci uma vacina!',
    avatar: 'A',
  },
  {
    name: 'Carlos Mendes',
    pet: 'Tutor da Mimi',
    text: 'Minha gata Mimi tem 12 anos e agora tenho todo o histórico dela organizado. Incrível!',
    avatar: 'C',
  },
  {
    name: 'Juliana Santos',
    pet: 'Tutora do Rex e Totó',
    text: 'Interface linda, fácil de usar. Recomendo para todos que amam seus pets!',
    avatar: 'J',
  },
];

export default function HomePage() {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const siteUrl = import.meta.env.VITE_SITE_URL as string || 'https://petvida.net.com.br';

  const webAppSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'PetVida',
    url: siteUrl,
    description: 'Aplicativo completo para tutores gerenciarem saúde, vacinas, consultas e lembretes dos seus pets.',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    inLanguage: 'pt-BR',
    offers: [
      {
        '@type': 'Offer',
        name: 'Plano Mensal',
        price: '9.99',
        priceCurrency: 'BRL',
        billingIncrement: 'P1M',
      },
      {
        '@type': 'Offer',
        name: 'Plano Anual',
        price: '78.99',
        priceCurrency: 'BRL',
        billingIncrement: 'P1Y',
      },
    ],
  }), [siteUrl]);

  const organizationSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PetVida',
    url: siteUrl,
    logo: '/logo.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-85-98743-6263',
      contactType: 'customer support',
      availableLanguage: 'Portuguese',
    },
    sameAs: [],
  }), [siteUrl]);

  const webSiteSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PetVida',
    url: siteUrl,
    description: 'Aplicativo completo para tutores gerenciarem saúde, vacinas, consultas e lembretes dos seus pets.',
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'Organization',
      name: 'PetVida',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: '/logo.svg',
      },
    },
  }), [siteUrl]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (currentUser) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <SeoJsonLd id="ld-webapp" schema={webAppSchema} />
      <SeoJsonLd id="ld-org" schema={organizationSchema} />
      <SeoJsonLd id="ld-website" schema={webSiteSchema} />

      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo.svg" alt="PetVida" className="w-8 h-8 object-contain" />
            </div>
            <span className={`font-bold text-lg tracking-tight ${scrolled ? 'text-gray-800' : 'text-white'}`}>PetVida</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className={`text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 hover:text-emerald-600' : 'text-white/80 hover:text-white'}`}>Funcionalidades</a>
            <a href="#how" className={`text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 hover:text-emerald-600' : 'text-white/80 hover:text-white'}`}>Como funciona</a>
            <a href="#testimonials" className={`text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 hover:text-emerald-600' : 'text-white/80 hover:text-white'}`}>Depoimentos</a>
            <a href="#pricing" className={`text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 hover:text-emerald-600' : 'text-white/80 hover:text-white'}`}>Planos</a>
            <Link to="/faq" className={`text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 hover:text-emerald-600' : 'text-white/80 hover:text-white'}`}>FAQ</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/register" className={`text-sm font-medium px-4 py-2 rounded-full transition-colors whitespace-nowrap cursor-pointer ${scrolled ? 'text-gray-600 hover:text-emerald-600' : 'text-white/80 hover:text-white'}`}>
              Entrar
            </Link>
            <Link to="/register" className="text-sm font-semibold px-5 py-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors whitespace-nowrap cursor-pointer">
              Começar grátis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1400&h=900&fit=crop"
            alt="Pets felizes"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <i className="ri-shield-check-line text-emerald-400 text-sm"></i>
            <span className="text-white/90 text-sm">Cuidado e amor para seus pets</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            O melhor cuidado<br />para quem você<br />
            <span className="text-emerald-400">mais ama</span>
          </h1>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Gerencie a saúde e rotina dos seus pets em um só lugar. Vacinas, consultas, medicamentos e muito mais — tudo organizado para você.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-all text-base cursor-pointer whitespace-nowrap">
              Começar gratuitamente
            </Link>
            <a href="#features" className="px-8 py-3.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold rounded-full transition-all text-base cursor-pointer whitespace-nowrap">
              Ver funcionalidades
            </a>
          </div>
          <div className="flex items-center justify-center gap-8 mt-14">
            {[['500+', 'Tutores'], ['1.200+', 'Pets cadastrados'], ['98%', 'Satisfação']].map(([num, label]) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-white">{num}</p>
                <p className="text-white/60 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <a href="#features" className="absolute bottom-8 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center text-white/60 animate-bounce cursor-pointer">
          <i className="ri-arrow-down-line text-xl"></i>
        </a>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Funcionalidades</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3 mb-4">Tudo que seus pets precisam</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Uma plataforma completa para garantir o bem-estar e a saúde dos seus animais de estimação.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-emerald-200 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                  <i className={`${f.icon} text-emerald-600 text-xl`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual showcase */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Seu companheiro digital</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3 mb-6">Organize a vida dos seus pets com facilidade</h2>
              <p className="text-gray-500 leading-relaxed mb-8">Do banho à vacina, do peso ao veterinário — tenha tudo anotado e acessível de onde estiver, a qualquer momento.</p>
              <ul className="space-y-4">
                {[
                  'Perfil completo para cada pet com foto e informações',
                  'Lembretes automáticos para nunca esquecer de nada',
                  'Histórico de saúde organizado por data',
                  'Acompanhe o peso e crescimento ao longo do tempo',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <i className="ri-checkbox-circle-fill text-emerald-500"></i>
                    </div>
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-colors cursor-pointer whitespace-nowrap">
                Começar agora
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
            <div className="relative">
              <div className="w-full h-96 rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=500&fit=crop"
                  alt="Tutora com seu pet"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <i className="ri-alarm-line text-emerald-600"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Próximo lembrete</p>
                  <p className="text-sm font-semibold text-gray-800">Vacina do Thor — 10 Abr</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-emerald-500 rounded-2xl p-4 text-white">
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-emerald-100">pets ativos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 bg-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Como funciona</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3 mb-4">Simples e rápido de começar</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Em apenas 4 passos você já estará organizando tudo para seus pets.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-emerald-200 z-0" style={{ width: 'calc(100% - 2rem)', left: 'calc(50% + 2rem)' }}></div>
                )}
                <div className="bg-white rounded-2xl p-6 border border-emerald-100 relative z-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Depoimentos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3 mb-4">O que dizem nossos tutores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <i key={i} className="ri-star-fill text-amber-400 text-sm"></i>)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-semibold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.pet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Planos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3 mb-4">Simples e transparente</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Escolha o plano que melhor se encaixa na sua rotina com seus pets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">

            {/* Plano Mensal */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                  <i className="ri-calendar-line text-gray-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Mensal</h3>
                <p className="text-gray-500 text-sm">Pague mês a mês, cancele quando quiser.</p>
              </div>
              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-gray-400 text-lg font-medium">R$</span>
                  <span className="text-5xl font-bold text-gray-800">9</span>
                  <span className="text-5xl font-bold text-gray-800">,99</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">por mês</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Pets ilimitados',
                  'Lembretes e alertas',
                  'Histórico de saúde completo',
                  'Dashboard personalizado',
                  'Suporte por e-mail',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className="ri-check-line text-emerald-500 text-base"></i>
                    </div>
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className="w-full py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold text-center hover:border-emerald-400 hover:text-emerald-600 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
              >
                Começar agora
              </Link>
            </div>

            {/* Plano Anual — destaque */}
            <div className="bg-emerald-500 rounded-3xl p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-5 right-5 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                Economize 34%
              </div>
              <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-400 flex items-center justify-center mb-4">
                  <i className="ri-calendar-2-line text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Anual</h3>
                <p className="text-emerald-100 text-sm">O melhor custo-benefício para seu pet.</p>
              </div>
              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-emerald-200 text-lg font-medium">R$</span>
                  <span className="text-5xl font-bold text-white">78</span>
                  <span className="text-5xl font-bold text-white">,99</span>
                </div>
                <p className="text-emerald-200 text-sm mt-1">por ano &mdash; equivale a R$ 6,58/mês</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Tudo do plano mensal',
                  'Prioridade no suporte',
                  'Relatórios mensais por e-mail',
                  'Acesso antecipado a novidades',
                  '2 meses grátis no ano',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className="ri-check-line text-white text-base"></i>
                    </div>
                    <span className="text-emerald-50 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className="w-full py-3.5 rounded-2xl bg-white text-emerald-600 font-bold text-center hover:bg-emerald-50 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
              >
                Assinar plano anual
              </Link>
            </div>

          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            Todos os planos incluem acesso completo. Sem taxas escondidas. Cancele a qualquer momento.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Comece a cuidar melhor dos seus pets hoje</h2>
          <p className="text-gray-300 mb-10">Junte-se a centenas de tutores que já organizaram a vida dos seus animais com o PetVida.</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full transition-colors text-base cursor-pointer whitespace-nowrap">
            Criar conta gratuitamente
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-800 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center">
              <img src="/logo.svg" alt="PetVida" className="w-7 h-7 object-contain" />
            </div>
            <span className="font-bold text-white">PetVida</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://wa.me/5585987436263?text=Ol%C3%A1%2C+tenho+uma+d%C3%BAvida+sobre+o+PetVida!"
              target="_blank"
              rel="nofollow noreferrer"
              className="flex items-center gap-2 text-emerald-200 hover:text-white text-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-whatsapp-line"></i>
              (85) 98743-6263
            </a>
            <a href="mailto:0pet0vida0@gmail.com" className="flex items-center gap-2 text-emerald-200 hover:text-white text-sm transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-mail-line"></i>
              0pet0vida0@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/faq" className="text-emerald-200 hover:text-white text-sm transition-colors">FAQ</Link>
            <a href="#" className="text-emerald-200 hover:text-white text-sm transition-colors">Privacidade</a>
            <a href="#" className="text-emerald-200 hover:text-white text-sm transition-colors">Termos</a>
          </div>
        </div>
        <p className="text-center text-emerald-300/50 text-xs mt-6">© 2026 PetVida Care. Feito com amor para os pets.</p>
      </footer>
    </div>
  );
}
