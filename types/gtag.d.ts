// Type declaration for Google Analytics gtag
// Injected by @next/third-parties/google <GoogleAnalytics> component

interface Window {
  gtag: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
}
