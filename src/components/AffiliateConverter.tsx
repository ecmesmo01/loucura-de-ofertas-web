import React, { useState } from 'react';
import { Link2, Copy, Check, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

interface AffiliateConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AffiliateConverter: React.FC<AffiliateConverterProps> = ({ isOpen, onClose }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');
  const [detectedStore, setDetectedStore] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Tags oficiais de afiliado
  const AMAZON_TAG = 'loucuradeo0dc-20';
  const MERCADOLIVRE_TAG = 'vanderleivpn';
  const MERCADOLIVRE_TOOL = '12053995';
  const SHOPEE_APP_ID = 'an_18386310690';
  const SHOPEE_CAMPAIGN = 'id_1I6ZbEiqygj';

  const handleConvert = () => {
    setErrorMsg('');
    setConvertedUrl('');
    setDetectedStore(null);
    setCopied(false);

    const raw = inputUrl.trim();
    if (!raw) {
      setErrorMsg('Por favor, cole um link antes de converter.');
      return;
    }

    try {
      let target = raw;
      // Extrai a primeira URL se o texto contiver palavras ao redor
      const urlMatch = raw.match(/https?:\/\/[^\s]+/i);
      if (urlMatch) {
        target = urlMatch[0];
      }

      // 1. Amazon
      if (target.includes('amazon.com.br') || target.includes('amzn.to') || target.includes('a.co')) {
        setDetectedStore('Amazon');
        const urlObj = new URL(target);
        urlObj.searchParams.set('tag', AMAZON_TAG);
        setConvertedUrl(urlObj.toString());
        return;
      }

      // 2. Mercado Livre
      if (target.includes('mercadolivre.com.br') || target.includes('meli.la')) {
        setDetectedStore('Mercado Livre');
        const urlObj = new URL(target);
        urlObj.searchParams.set('matt_word', MERCADOLIVRE_TAG);
        urlObj.searchParams.set('matt_tool', MERCADOLIVRE_TOOL);
        setConvertedUrl(urlObj.toString());
        return;
      }

      // 3. Shopee
      if (target.includes('shopee.com.br') || target.includes('shope.ee')) {
        setDetectedStore('Shopee');
        const urlObj = new URL(target);
        urlObj.searchParams.set('utm_source', SHOPEE_APP_ID);
        urlObj.searchParams.set('mmp_pid', SHOPEE_APP_ID);
        urlObj.searchParams.set('utm_medium', 'affiliates');
        urlObj.searchParams.set('utm_campaign', SHOPEE_CAMPAIGN);
        setConvertedUrl(urlObj.toString());
        return;
      }

      setErrorMsg('Link não reconhecido. Suportamos apenas Mercado Livre, Amazon e Shopee.');
    } catch {
      setErrorMsg('URL inválida. Verifique o link digitado.');
    }
  };

  const handleCopy = async () => {
    if (!convertedUrl) return;
    try {
      await navigator.clipboard.writeText(convertedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
                Gerador de Link Afiliado <Sparkles className="w-4 h-4 text-amber-500" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Converta produtos para suas tags oficiais</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold p-1 rounded-md"
          >
            ✕
          </button>
        </div>

        {/* Input */}
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Cole o link do produto:
            </label>
            <input
              type="text"
              placeholder="Ex: https://produto.mercadolivre.com.br/... ou https://a.co/..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
          </div>

          <button
            onClick={handleConvert}
            className="w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-md shadow-red-500/20 transition-all active:scale-[0.98]"
          >
            Converter para Afiliado 🚀
          </button>

          {/* Erro */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs rounded-xl border border-red-200 dark:border-red-900">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Resultado */}
          {convertedUrl && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-400">
                <span>Loja: {detectedStore}</span>
                <span className="bg-emerald-200/80 dark:bg-emerald-900/60 px-2 py-0.5 rounded text-[10px]">Tag Aplicada</span>
              </div>
              
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 break-all font-mono select-all">
                {convertedUrl}
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-2 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado para o Ctrl+V!' : 'Copiar Link'}
                </button>
                <a
                  href={convertedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-1 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                >
                  Testar <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
