import React from 'react';
import { Flame, Send, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                LOUCURA <span className="text-red-500">DE OFERTAS</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              O portal mais confiável para encontrar promoções reais, descontos relâmpago e cupons testados das maiores lojas do país. Não vendemos produtos diretamente: realizamos curadoria e direcionamos você para os sites oficiais.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://t.me/loucuradeofertas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#229ED9]/20 text-[#229ED9] hover:bg-[#229ED9]/30 font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>@loucuradeofertas no Telegram</span>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Categorias Populares
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Smartphones & Tablets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Notebooks & Hardware</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Eletrodomésticos & Air Fryer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Consoles & Games</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cupons e Vouchers de Frete</a></li>
            </ul>
          </div>

          {/* Lojas Oficiais */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Lojas Parceiras
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 hover:text-white">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Amazon Brasil</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white">
                <span className="w-2 h-2 rounded-full bg-orange-600" />
                <span>Shopee Oficial</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span>Mercado Livre</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Magazine Luiza</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Ethical Transparency Disclaimer */}
        <div className="pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3 text-slate-400">
            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-semibold text-slate-300 text-xs">
                Aviso Legal e Transparência de Afiliados
              </h5>
              <p className="text-[11px] leading-relaxed">
                O <strong>Loucura de Ofertas</strong> participa de programas de afiliados (incluindo o Programa de Associados da Amazon, Programa de Afiliados Shopee e Mercado Livre). Como afiliado, podemos receber uma comissão por compras qualificadas efetuadas através dos nossos links, <strong>sem qualquer custo adicional para o comprador</strong>. Os preços e condições anunciados são de responsabilidade exclusiva dos lojistas e podem ser alterados ou expirar a qualquer momento.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} Loucura de Ofertas. Todos os direitos reservados.</p>
            <p className="flex items-center gap-1">
              Feito com excelência para quem ama economizar de verdade
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
