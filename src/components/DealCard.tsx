import React, { useState, useEffect } from 'react';
import { Deal } from '../types';
import { trackOutboundClick } from '../utils/analytics';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Clock, 
  Flame, 
  ShieldCheck, 
  Truck, 
  Share2, 
  Heart,
  Ticket
} from 'lucide-react';

interface DealCardProps {
  deal: Deal;
}

const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  eletronicos: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
  informatica: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
  casa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80',
  games: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=600&auto=format&fit=crop&q=80',
  moda: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
  cupons: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80',
};

const getCategoryFallbackImage = (category?: string) => {
  if (category && CATEGORY_FALLBACK_IMAGES[category]) {
    return CATEGORY_FALLBACK_IMAGES[category];
  }
  return 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80';
};

export const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(deal.likesCount || 0);

  const resolveImageUrl = (url?: string | null) => {
    if (!url) return getCategoryFallbackImage(deal.category);
    if (url.startsWith('/images/deals/')) {
      // Prioritize raw GitHub CDN for instant sub-second delivery of new telegram photos
      return `https://raw.githubusercontent.com/ecmesmo01/loucura-de-ofertas-web/main/public${url}`;
    }
    return url;
  };

  const [imgSrc, setImgSrc] = useState<string>(() => resolveImageUrl(deal.imageUrl));

  useEffect(() => {
    setImgSrc(resolveImageUrl(deal.imageUrl));
  }, [deal.imageUrl]);

  const handleCopyCoupon = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (deal.couponCode) {
      navigator.clipboard.writeText(deal.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareText = `🔥 *${deal.title}*\n💰 De R$ ${deal.originalPrice?.toFixed(2)} por *R$ ${deal.currentPrice.toFixed(2)}*${deal.couponCode ? `\n🎟️ Cupom: ${deal.couponCode}` : ''}\n👉 Veja aqui: ${deal.affiliateUrl}`;
    
    if (navigator.share) {
      navigator.share({
        title: deal.title,
        text: shareText,
        url: deal.affiliateUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(deal.affiliateUrl);
      alert('Link da promoção copiado com sucesso!');
    }
  };

  // Helper for store badges
  const getStoreBadge = () => {
    switch (deal.store) {
      case 'amazon':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#FF9900]/15 text-[#b36b00] dark:text-[#ffaa2b] border border-[#FF9900]/30">
            Amazon
          </span>
        );
      case 'shopee':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EE4D2D]/15 text-[#d43818] dark:text-[#ff6b4d] border border-[#EE4D2D]/30">
            Shopee
          </span>
        );
      case 'mercadolivre':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#FFE600]/25 text-[#736300] dark:text-[#ffec3d] border border-[#d6c100]/40">
            Mercado Livre
          </span>
        );
      case 'magalu':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#0086FF]/15 text-[#006bd1] dark:text-[#38a0ff] border border-[#0086FF]/30">
            Magalu
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
            Loja Oficial
          </span>
        );
    }
  };

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getTimeAgo = (dateStr: string) => {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `há ${diffMins} min`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `há ${diffHours}h`;
    return `há ${Math.floor(diffHours / 24)}d`;
  };

  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
      
      {/* Top Media / Thumbnail - Fully Clickable */}
      <a 
        href={deal.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick(deal.affiliateUrl, deal.title)}
        className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center p-4 cursor-pointer block"
        title={`Ver promoção: ${deal.title}`}
      >
        {/* Badges on top of image */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {deal.discountPercentage && deal.discountPercentage > 0 && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-red-600 text-white shadow-sm flex items-center gap-1">
              -{deal.discountPercentage}%
            </span>
          )}
          {deal.isHot && (
            <span className="px-2 py-1 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-0.5 shadow-sm">
              <Flame className="w-3.5 h-3.5 fill-slate-950" /> EM ALTA
            </span>
          )}
        </div>

        {/* Store badge on top right */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          {getStoreBadge()}
        </div>

        {/* Product Image */}
        <img
          src={imgSrc}
          alt={deal.title}
          loading="lazy"
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300 mix-blend-multiply dark:mix-blend-normal"
          onError={() => {
            const fallback = getCategoryFallbackImage(deal.category);
            if (imgSrc !== fallback) {
              setImgSrc(fallback);
            }
          }}
        />

        {deal.isVerified && (
          <div className="absolute bottom-2.5 left-3 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 dark:bg-slate-900/90 text-emerald-700 dark:text-emerald-400 backdrop-blur-sm border border-emerald-500/20 shadow-sm pointer-events-none">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>Preço Conferido</span>
          </div>
        )}
      </a>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Clickable Title */}
          <a
            href={deal.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick(deal.affiliateUrl, deal.title)}
            className="block"
          >
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              {deal.title}
            </h3>
          </a>

          {/* Description snippet */}
          {deal.description && (
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {deal.description}
            </p>
          )}

          {/* Shipping & Installments */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            {deal.freeShipping && (
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <Truck className="w-3.5 h-3.5" /> Frete Grátis
              </span>
            )}
            {deal.installment && (
              <span className="text-slate-500 dark:text-slate-400">
                {deal.installment}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Section */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          
          {/* Coupon Banner */}
          {deal.couponCode && (
            <div className="mb-3 p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-dashed border-amber-300 dark:border-amber-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
                <Ticket className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Cupom: <strong className="font-mono text-red-600 dark:text-red-400 text-sm">{deal.couponCode}</strong></span>
              </div>
              <button
                type="button"
                onClick={handleCopyCoupon}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 hover:bg-amber-300 dark:hover:bg-amber-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" /> Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copiar
                  </>
                )}
              </button>
            </div>
          )}

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mb-3">
            {deal.originalPrice && deal.originalPrice > deal.currentPrice && (
              <span className="text-xs sm:text-sm text-slate-400 line-through font-medium">
                {formatBRL(deal.originalPrice)}
              </span>
            )}
            <span className="text-xl sm:text-2xl font-black text-red-600 dark:text-red-500">
              {formatBRL(deal.currentPrice)}
            </span>
          </div>

          {/* Direct CTA Button */}
          <a
            href={deal.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick(deal.affiliateUrl, deal.title)}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-700 active:bg-red-800 text-white flex items-center justify-center gap-2 shadow-sm shadow-red-600/30 transition-all hover:translate-y-[-1px] cursor-pointer"
          >
            <span>Pegar Promoção</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Card Footer */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{getTimeAgo(deal.createdAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleLike}
                className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 transition-colors cursor-pointer ${
                  liked ? 'text-red-500 font-bold' : ''
                }`}
                aria-label="Curtir oferta"
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-red-500' : ''}`} />
                <span>{likeCount}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                aria-label="Compartilhar oferta"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
