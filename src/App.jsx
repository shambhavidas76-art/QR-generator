import { useState, useMemo, useEffect } from 'react';
import TypeSelector from './components/TypeSelector';
import InputForm from './components/InputForm';
import QRStylePicker from './components/QRStylePicker';
import QRPreview from './components/QRPreview';
import ThemeToggle from './components/ThemeToggle';
import { INITIAL_FORM_VALUES, buildQRData } from './utils/qrHelper';
import './App.css';

function App() {
  const [activeType, setActiveType] = useState('url');
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  
  // Theme state: defaults to dark for max neon-chartreuse anime contrast
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('qr_pop_theme');
    if (saved) return saved;
    return 'dark';
  });

  // QR Color & Style state (Aiko Electric Lime default)
  const [qrStyle, setQrStyle] = useState({
    color: '#c8f300',
    bgColor: '#0a0c0a',
    dotType: 'rounded',
  });

  // Sync theme attribute to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('qr_pop_theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Compute live QR payload string
  const currentValues = formValues[activeType] || {};
  const qrData = useMemo(() => {
    return buildQRData(activeType, formValues[activeType] || {});
  }, [activeType, formValues]);

  const handleTypeSelect = (typeId) => {
    setActiveType(typeId);
  };

  const handleInputChange = (fieldName, value) => {
    setFormValues((prev) => ({
      ...prev,
      [activeType]: {
        ...prev[activeType],
        [fieldName]: value,
      },
    }));
  };

  const handleFillSample = (type, sampleData) => {
    setFormValues((prev) => ({
      ...prev,
      [type]: {
        ...sampleData,
      },
    }));
  };

  const handleStyleChange = (updates) => {
    setQrStyle((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <div className="app-layout">
      {/* Top Anime / Neo-Pop Header */}
      <header className="app-header">
        <div className="header-top-row">
          <div className="brand-group">
            <div className="brand-logo-icon">
              <span className="starburst-glyph">✦</span>
            </div>
            <div className="brand-text">
              <span className="brand-title">QR ✦ POP</span>
              <span className="brand-badge">STUDIO</span>
            </div>
          </div>

          <ThemeToggle theme={theme} onToggleTheme={handleToggleTheme} />
        </div>

        <div className="header-hero">
          <div className="hero-pill-badge">
            <span>✳️</span> Vibrant Colors · Clean Details · Neo-Pop
          </div>
          <h1 className="header-headline">
            Design Interactive QR Codes with Personality
          </h1>
          <p className="header-subtext">
            Choose your format, enter content, dial in electrifying cyber-lime palettes, and watch your QR code come alive.
          </p>
        </div>
      </header>

      {/* Main Grid: Left Configuration & Right Preview */}
      <main className="app-main-grid">
        {/* Left Column: Multi-step Configuration Card */}
        <section className="left-panel" aria-label="QR Code Configuration">
          <div className="card config-card">
            {/* Step 1: Type Selection */}
            <TypeSelector
              activeType={activeType}
              onSelectType={handleTypeSelect}
            />

            <div className="card-divider" />

            {/* Step 2: Content Details */}
            <InputForm
              activeType={activeType}
              values={currentValues}
              onChange={handleInputChange}
              onFillSample={handleFillSample}
            />

            <div className="card-divider" />

            {/* Step 3: Color & Style Customization */}
            <div className="style-step-header">
              <span className="step-tag starburst">✦ 03</span>
              <h2 className="form-title">Customize Colors &amp; Dots</h2>
            </div>
            <QRStylePicker
              qrStyle={qrStyle}
              onChangeStyle={handleStyleChange}
            />
          </div>
        </section>

        {/* Right Column: Live QR Preview */}
        <section className="right-panel" aria-label="QR Code Live Preview">
          <QRPreview
            qrData={qrData}
            activeType={activeType}
            qrStyle={qrStyle}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
