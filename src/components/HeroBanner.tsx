import React from 'react';
import { ShieldCheck, CheckCircle2, Zap, ArrowRight, BellRing } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="max-w-2xl text-center lg:text-left">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30 mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Sincronizado 24h com nosso Telegram Oficial</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Ofertas Reais, Cupons Testados e{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-300">
                Zero Pegadinhas.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Curadoria humana e monitoramento inteligente dos maiores e-commerces do Brasil:
              <strong className="text-white"> Amazon, Shopee, Mercado Livre e Magalu</strong>. 
              Garantimos apenas promoções ativas e links 100% seguros.
            </p>

            {/* Badges of trust */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Preços conferidos antes do post</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Links diretos das lojas oficiais</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BellRing className="w-4 h-4 text-amber-400" />
                <span>Alertas em tempo real</span>
              </div>
            </div>
          </div>

          {/* Quick Telegram Box */}
          <div className="w-full lg:w-auto shrink-0 bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700/80 shadow-2xl max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#229ED9]/20 text-[#229ED9] flex items-center justify-center font-bold text-xl">
                ✈️
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Canal Loucura de Ofertas</h3>
                <p className="text-xs text-slate-400">Receba no seu celular antes que o estoque acabe!</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
              <span>🔔 Grátis no Telegram</span>
              <span className="text-emerald-400 font-medium">● Ofertas ao vivo</span>
            </div>
            <a
              href="https://t.me/loucuradeofertas"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-2.5 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#229ED9] to-[#1a85b8] hover:from-[#1f93ca] hover:to-[#1674a1] text-white flex items-center justify-center gap-2 shadow-lg shadow-[#229ED9]/25 transition-all"
            >
              <span>Entrar no Grupo Grátis</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
