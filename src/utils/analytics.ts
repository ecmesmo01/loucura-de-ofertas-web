/**
 * Utilitário de rastreamento Google Ads e Analytics
 * Ação de conversão: Clique de saída
 * ID: AW-18585267272 / Rótulo: xD2YCICN0L8dEMjYkp5F
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GOOGLE_ADS_ID = 'AW-18585267272';
export const CONVERSION_OUTBOUND_CLICK = 'AW-18585267272/xD2YCICN0L8dEMjYkp5F';

/**
 * Dispara o evento de conversão do Google Ads para cliques de saída (afiliados / ofertas).
 */
export function trackOutboundClick(url?: string, label?: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: CONVERSION_OUTBOUND_CLICK,
      event_category: 'outbound_click',
      event_label: label || url || 'Oferta',
      value: 1.0,
      currency: 'BRL',
    });
  }
}

/**
 * Permite verificação automática via URL (ex: ?google_conversion_test=1)
 */
export function initAnalytics() {
  if (typeof window !== 'undefined' && window.location.search.includes('google_conversion_test=1')) {
    trackOutboundClick('test', 'Verificação Google Ads');
  }
}
