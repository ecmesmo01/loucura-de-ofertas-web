import React, { useState } from 'react';
import { Link2, Copy, Check, ExternalLink, Sparkles, AlertCircle, Image as ImageIcon, Download, Share2, Loader2 } from 'lucide-react';

interface AffiliateConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AffiliateConverter: React.FC<AffiliateConverterProps> = ({ isOpen, onClose }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productImage, setProductImage] = useState('');
  const [detectedStore, setDetectedStore] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPost, setCopiedPost] = useState(false);
  const [copiedImg, setCopiedImg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Tags oficiais de afiliado para fallback instantâneo
  const AMAZON_TAG = 'loucuradeo0dc-20';
  const MERCADOLIVRE_TAG = 'vpn1234';
  const MERCADOLIVRE_TOOL = '12053995';
  const SHOPEE_APP_ID = 'an_18386310690';
  const SHOPEE_CAMPAIGN = 'id_1I6ZbEiqygj';

  const handleConvert = async () => {
    setErrorMsg('');
    setConvertedUrl('');
    setProductTitle('');
    setProductImage('');
    setDetectedStore(null);
    setCopiedLink(false);
    setCopiedPost(false);
    setCopiedImg(false);

    const raw = inputUrl.trim();
    if (!raw) {
      setErrorMsg('Por favor, cole um link antes de converter.');
      return;
    }

    let target = raw;
    const urlMatch = raw.match(/https?:\/\/[^\s]+/i);
    if (urlMatch) {
      target = urlMatch[0];
    }

    setLoading(true);

    // 1. Tenta conversão rica via API do Bot (extrai foto real e título da página)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);
      const apiUrl = `https://loucura-de-ofertas-bot.onrender.com/api/convert?url=${encodeURIComponent(target)}`;
      const res = await fetch(apiUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.affiliateUrl) {
          setConvertedUrl(data.affiliateUrl);
          setProductTitle(data.title || 'Produto em Promoção');
          setProductImage(data.imageUrl || '');
          setDetectedStore(data.store || 'Loja Parceira');
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fallback local se a API estiver inicializando
    }

    // 2. Fallback de conversão instantânea no navegador
    try {
      let store = '';
      let finalUrl = target;
      const fallbackImg = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80';

      if (target.includes('amazon.com.br') || target.includes('amzn.to') || target.includes('a.co')) {
        store = 'Amazon';
        const urlObj = new URL(target);
        urlObj.searchParams.set('tag', AMAZON_TAG);
        finalUrl = urlObj.toString();
      } else if (target.includes('mercadolivre.com.br') || target.includes('meli.la')) {
        store = 'Mercado Livre';
        const urlObj = new URL(target);
        urlObj.searchParams.set('matt_word', MERCADOLIVRE_TAG);
        urlObj.searchParams.set('matt_tool', MERCADOLIVRE_TOOL);
        finalUrl = urlObj.toString();
      } else if (target.includes('shopee.com.br') || target.includes('shope.ee')) {
        store = 'Shopee';
        const urlObj = new URL(target);
        urlObj.searchParams.set('utm_source', SHOPEE_APP_ID);
        urlObj.searchParams.set('mmp_pid', SHOPEE_APP_ID);
        urlObj.searchParams.set('utm_medium', 'affiliates');
        urlObj.searchParams.set('utm_campaign', SHOPEE_CAMPAIGN);
        finalUrl = urlObj.toString();
      } else {
        setErrorMsg('Link não reconhecido. Suportamos Mercado Livre, Amazon e Shopee.');
        setLoading(false);
        return;
      }

      setDetectedStore(store);
      setConvertedUrl(finalUrl);
      setProductTitle('Produto Oficial');
      setProductImage(fallbackImg);
    } catch {
      setErrorMsg('URL inválida. Verifique o link digitado.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (!convertedUrl) return;
    try {
      await navigator.clipboard.writeText(convertedUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {}
  };

  const handleCopyImage = async () => {
    if (!productImage) return;
    try {
      await navigator.clipboard.writeText(productImage);
      setCopiedImg(true);
      setTimeout(() => setCopiedImg(false), 2000);
    } catch {}
  };

  const handleCopyFullPost = async () => {
    if (!convertedUrl) return;
    const post = `🔥 *${productTitle}*\n🏪 Loja: ${detectedStore}\n\n🛒 Compre com desconto aqui:\n${convertedUrl}${productImage ? `\n\n🖼️ Imagem do Produto: ${productImage}` : ''}`;
    try {
      await navigator.clipboard.writeText(post);
      setCopiedPost(true);
      setTimeout(() => setCopiedPost(false), 2000);
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
                Gerador de Link com Imagem <Sparkles className="w-4 h-4 text-amber-500" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Gere links de afiliado com foto oficial do produto</p>
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
              onKeyDown={(e) => e.key === 'Enter' && !loading && handleConvert()}
              disabled={loading}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
          </div>

          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-md shadow-red-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Buscando imagem e convertendo...</span>
              </>
            ) : (
              <>
                <span>Converter com Imagem do Produto</span>
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Erro */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs rounded-xl border border-red-200 dark:border-red-900">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Resultado com Imagem e Ações */}
          {convertedUrl && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in">
              
              {/* Card visual do produto */}
              <div className="flex gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                {productImage && (
                  <div className="w-20 h-20 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    <img
                      src={productImage}
                      alt={productTitle}
                      className="w-full h-full object-contain hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                        {detectedStore}
                      </span>
                      <span className="text-[10px] text-slate-400">Tag Oficial Ativa</span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-1 line-clamp-2">
                      {productTitle}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Link Box */}
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 break-all font-mono select-all">
                {convertedUrl}
              </div>

              {/* Ações principais */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleCopyLink}
                  className="py-2 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedLink ? 'Link Copiado!' : 'Copiar Link'}
                </button>

                <button
                  onClick={handleCopyFullPost}
                  className="py-2 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
                >
                  {copiedPost ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  {copiedPost ? 'Post Copiado!' : 'Copiar Post Completo'}
                </button>
              </div>

              {/* Ações secundárias: Imagem e Teste */}
              <div className="flex gap-2 pt-1 border-t border-slate-200 dark:border-slate-700/60 text-xs">
                {productImage && (
                  <button
                    onClick={handleCopyImage}
                    className="flex-1 py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1 transition-colors"
                  >
                    {copiedImg ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <ImageIcon className="w-3.5 h-3.5" />}
                    <span>{copiedImg ? 'Link Foto Copiado!' : 'Copiar Foto'}</span>
                  </button>
                )}

                {productImage && (
                  <a
                    href={productImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Ver Imagem</span>
                  </a>
                )}

                <a
                  href={convertedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Testar</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
