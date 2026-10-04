import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';

/**
 * QRPreview component.
 * Features live reactive QR rendering with custom colors and dot styles,
 * copy-to-clipboard feedback, and one-click PNG/SVG download in Neo-Pop aesthetic.
 */
export default function QRPreview({ qrData, activeType, qrStyle }) {
  const containerRef = useRef(null);
  const qrCodeRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Initialize qr-code-styling once when component mounts
  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 260,
      height: 260,
      data: ' ',
      margin: 8,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'M',
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 0,
      },
      dotsOptions: {
        type: 'rounded',
        color: '#c8f300',
      },
      backgroundOptions: {
        color: '#0a0c0a',
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#c8f300',
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#c8f300',
      },
    });

    qrCodeRef.current = qrCode;
    const container = containerRef.current;

    if (container) {
      container.innerHTML = '';
      qrCode.append(container);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  // Update QR code data, colors, and dot shapes reactively
  useEffect(() => {
    if (qrCodeRef.current) {
      const payload = qrData && qrData.trim().length > 0 ? qrData : ' ';
      qrCodeRef.current.update({
        data: payload,
        dotsOptions: {
          type: qrStyle.dotType || 'rounded',
          color: qrStyle.color || '#c8f300',
        },
        backgroundOptions: {
          color: qrStyle.bgColor || '#0a0c0a',
        },
        cornersSquareOptions: {
          type: qrStyle.dotType === 'dots' ? 'dot' : 'extra-rounded',
          color: qrStyle.color || '#c8f300',
        },
        cornersDotOptions: {
          type: 'dot',
          color: qrStyle.color || '#c8f300',
        },
      });
    }
  }, [qrData, qrStyle]);

  const handleCopy = async () => {
    if (!qrData) return;
    try {
      await navigator.clipboard.writeText(qrData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async (extension = 'png') => {
    if (!qrCodeRef.current || !qrData) return;
    setDownloading(true);
    try {
      await qrCodeRef.current.download({
        name: `qr-${activeType}-${Date.now()}`,
        extension,
      });
    } finally {
      setDownloading(false);
    }
  };

  const hasData = Boolean(qrData && qrData.trim());

  return (
    <div className="preview-card">
      <div className="preview-header">
        <div className="preview-status">
          <span className={`status-indicator ${hasData ? 'active' : 'idle'}`} />
          <span className="status-text">{hasData ? '✦ Live Ready' : 'Awaiting Input'}</span>
        </div>
        <span className="preview-type-badge">{activeType.toUpperCase()}</span>
      </div>

      <div className="preview-canvas-wrapper" style={{ backgroundColor: qrStyle.bgColor || '#0a0c0a' }}>
        <div className="scan-corners top-left" />
        <div className="scan-corners top-right" />
        <div className="scan-corners bottom-left" />
        <div className="scan-corners bottom-right" />
        <div ref={containerRef} className="qr-canvas-container" />
      </div>

      {/* Action Buttons: Download & Copy */}
      <div className="preview-actions-row">
        <button
          type="button"
          className="download-btn primary"
          onClick={() => handleDownload('png')}
          disabled={!hasData || downloading}
          title="Download high-res PNG image"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>✦ Download PNG</span>
        </button>

        <button
          type="button"
          className="download-btn secondary"
          onClick={() => handleDownload('svg')}
          disabled={!hasData || downloading}
          title="Download vector SVG"
        >
          <span>SVG</span>
        </button>
      </div>

      <div className="preview-footer">
        <div className="payload-label">
          <span>✦ Encoded Payload</span>
          <button
            type="button"
            className="copy-btn"
            onClick={handleCopy}
            disabled={!hasData}
            title="Copy payload string to clipboard"
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
        <div className="payload-code-box">
          <code>{qrData || '<empty payload>'}</code>
        </div>
      </div>
    </div>
  );
}
