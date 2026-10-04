/**
 * Helper utilities for QR Code payload formatting, Neo-Pop color presets, and sample data.
 */

export const QR_TYPES = [
  { id: 'url', label: 'URL', icon: 'link' },
  { id: 'text', label: 'Plain Text', icon: 'text' },
  { id: 'email', label: 'Email', icon: 'mail' },
  { id: 'phone', label: 'Phone Number', icon: 'phone' },
  { id: 'wifi', label: 'Wi-Fi', icon: 'wifi' },
];

export const INITIAL_FORM_VALUES = {
  url: { url: 'https://qrpop.studio' },
  text: { text: '' },
  email: { email: '', subject: '', body: '' },
  phone: { phone: '' },
  wifi: { ssid: '', password: '', encryption: 'WPA' },
};

export const SAMPLE_DATA = {
  url: { url: 'https://dribbble.com/shots/9071670-Kafene-Landing-page' },
  text: { text: '✦ QR Pop Studio — Vibrant Colors & Clean Design ✨' },
  email: { email: 'hello@qrpop.studio', subject: 'Custom Design Inquiry', body: 'Hi team! I would love to collaborate on a custom design project.' },
  phone: { phone: '+1 (555) 839-2041' },
  wifi: { ssid: 'QR_Pop_Studio_5G', password: 'Vibrant&NeonVibes!2026', encryption: 'WPA' },
};

export const COLOR_PRESETS = [
  { id: 'lime', name: 'Electric Lime', fg: '#c8f300', bg: '#0a0c0a' },
  { id: 'poppy', name: 'Poppy Scarlet', fg: '#ff2a4b', bg: '#ffffff' },
  { id: 'sakura', name: 'Sakura Pink', fg: '#ff70a6', bg: '#ffffff' },
  { id: 'obsidian', name: 'Ink Obsidian', fg: '#0c0e0c', bg: '#ffffff' },
  { id: 'violet', name: 'Cyber Violet', fg: '#8b5cf6', bg: '#ffffff' },
  { id: 'cyan', name: 'Tokyo Cyan', fg: '#06b6d4', bg: '#ffffff' },
];

export const DOT_STYLES = [
  { id: 'rounded', label: 'Rounded' },
  { id: 'dots', label: 'Dots' },
  { id: 'classy', label: 'Classy' },
  { id: 'square', label: 'Classic' },
];

/**
 * Escapes special characters for Wi-Fi strings according to ZXing specification.
 * Characters escaped: backslash (\), semicolon (;), comma (,), colon (:), and double quote (").
 */
export function escapeWifiField(str = '') {
  if (!str) return '';
  return str.replace(/([\\;,":])/g, (match) => '\\' + match);
}

/**
 * Builds a standard URL data payload.
 */
export function buildUrlData(url = '') {
  return (url || '').trim();
}

/**
 * Builds a plain text data payload.
 */
export function buildTextData(text = '') {
  return text || '';
}

/**
 * Builds a standard mailto: payload with optional query parameters.
 */
export function buildEmailData({ email = '', subject = '', body = '' } = {}) {
  const cleanEmail = (email || '').trim();
  const params = [];

  if (subject) {
    params.push(`subject=${encodeURIComponent(subject)}`);
  }
  if (body) {
    params.push(`body=${encodeURIComponent(body)}`);
  }

  const queryString = params.length > 0 ? `?${params.join('&')}` : '';
  return `mailto:${cleanEmail}${queryString}`;
}

/**
 * Builds a standard tel: payload for phone numbers.
 */
export function buildPhoneData(phone = '') {
  const cleanPhone = (phone || '').trim();
  return cleanPhone ? `tel:${cleanPhone}` : '';
}

/**
 * Builds a standard Wi-Fi configuration payload.
 * Syntax: WIFI:T:<WPA|WEP|nopass>;S:<SSID>;P:<password>;;
 */
export function buildWifiData({ ssid = '', password = '', encryption = 'WPA' } = {}) {
  const cleanSSID = escapeWifiField(ssid || '');
  const cleanPassword = escapeWifiField(password || '');
  const enc = encryption === 'None' || encryption === 'nopass' ? 'nopass' : (encryption || 'WPA');

  if (enc === 'nopass') {
    return `WIFI:T:nopass;S:${cleanSSID};;`;
  }
  return `WIFI:T:${enc};S:${cleanSSID};P:${cleanPassword};;`;
}

/**
 * Master dispatcher that takes an active QR type and its form values
 * and generates the appropriate formatted QR data string.
 */
export function buildQRData(type, values = {}) {
  switch (type) {
    case 'url':
      return buildUrlData(values.url);
    case 'text':
      return buildTextData(values.text);
    case 'email':
      return buildEmailData(values);
    case 'phone':
      return buildPhoneData(values.phone);
    case 'wifi':
      return buildWifiData(values);
    default:
      return '';
  }
}
