import { COLOR_PRESETS, DOT_STYLES } from '../utils/qrHelper';

/**
 * QRStylePicker component for Neo-Pop anime theme.
 * Allows customizing QR code foreground/background colors and dot styles in real-time.
 */
export default function QRStylePicker({ qrStyle, onChangeStyle }) {
  const { color, bgColor, dotType } = qrStyle;

  const handlePresetClick = (preset) => {
    onChangeStyle({
      color: preset.fg,
      bgColor: preset.bg,
    });
  };

  const handleColorChange = (e) => {
    onChangeStyle({ color: e.target.value });
  };

  const handleBgChange = (e) => {
    onChangeStyle({ bgColor: e.target.value });
  };

  const handleDotTypeChange = (type) => {
    onChangeStyle({ dotType: type });
  };

  return (
    <div className="style-picker-container">
      <div className="style-section">
        <label className="sub-label">✦ Color Presets</label>
        <div className="presets-row">
          {COLOR_PRESETS.map((preset) => {
            const isSelected = color.toLowerCase() === preset.fg.toLowerCase();
            return (
              <button
                key={preset.id}
                type="button"
                className={`preset-chip ${isSelected ? 'selected' : ''}`}
                onClick={() => handlePresetClick(preset)}
                title={preset.name}
              >
                <span
                  className="preset-swatch"
                  style={{ backgroundColor: preset.fg }}
                />
                <span className="preset-name">{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="style-section">
        <label className="sub-label">✦ Custom Palette</label>
        <div className="color-pickers-grid">
          <div className="color-field">
            <span className="color-field-label">QR Dots Color</span>
            <div className="color-input-wrapper">
              <input
                type="color"
                className="color-input-swatch"
                value={color}
                onChange={handleColorChange}
              />
              <input
                type="text"
                className="color-hex-input"
                value={color}
                onChange={handleColorChange}
                maxLength={7}
              />
            </div>
          </div>

          <div className="color-field">
            <span className="color-field-label">Background Color</span>
            <div className="color-input-wrapper">
              <input
                type="color"
                className="color-input-swatch"
                value={bgColor}
                onChange={handleBgChange}
              />
              <input
                type="text"
                className="color-hex-input"
                value={bgColor}
                onChange={handleBgChange}
                maxLength={7}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="style-section">
        <label className="sub-label">✦ Dot Shapes</label>
        <div className="dot-styles-row">
          {DOT_STYLES.map((style) => {
            const isSelected = dotType === style.id;
            return (
              <button
                key={style.id}
                type="button"
                className={`dot-style-btn ${isSelected ? 'active' : ''}`}
                onClick={() => handleDotTypeChange(style.id)}
              >
                {style.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
