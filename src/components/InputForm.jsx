import { useState } from 'react';
import { SAMPLE_DATA } from '../utils/qrHelper';

/**
 * InputForm component with interactive controls, sample data autofill,
 * and Wi-Fi password visibility toggle.
 */
export default function InputForm({ activeType, values = {}, onChange, onFillSample }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleFillSample = () => {
    const sample = SAMPLE_DATA[activeType];
    if (sample && onFillSample) {
      onFillSample(activeType, sample);
    }
  };

  return (
    <div className="input-form-container">
      <div className="form-header-row">
        <div className="step-header">
          <span className="step-tag starburst">✦ 02</span>
          <h2 className="form-title">Enter Details</h2>
        </div>
        <button
          type="button"
          className="sample-fill-btn"
          onClick={handleFillSample}
          title="Autofill realistic sample data"
        >
          <span className="sparkle-icon">✦</span> Try Example
        </button>
      </div>

      {activeType === 'url' && (
        <div className="form-group">
          <label htmlFor="url-input" className="form-label">
            Website URL
          </label>
          <div className="input-with-icon">
            <span className="field-prefix-icon">🔗</span>
            <input
              id="url-input"
              type="url"
              name="url"
              className="form-control has-icon"
              placeholder="https://qrpop.studio"
              value={values.url || ''}
              onChange={handleChange}
              autoComplete="url"
            />
          </div>
          <span className="form-hint">Scanners will immediately launch this link.</span>
        </div>
      )}

      {activeType === 'text' && (
        <div className="form-group">
          <div className="label-row">
            <label htmlFor="text-input" className="form-label">
              Plain Text Message
            </label>
            <span className="char-badge">{(values.text || '').length} chars</span>
          </div>
          <textarea
            id="text-input"
            name="text"
            rows={4}
            className="form-control textarea"
            placeholder="Type your notes, quotes, or story..."
            value={values.text || ''}
            onChange={handleChange}
          />
          <span className="form-hint">Encoded directly as plain readable text.</span>
        </div>
      )}

      {activeType === 'email' && (
        <div className="form-fields-stack">
          <div className="form-group">
            <label htmlFor="email-input" className="form-label">
              Recipient Email
            </label>
            <input
              id="email-input"
              type="email"
              name="email"
              className="form-control"
              placeholder="hello@qrpop.studio"
              value={values.email || ''}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject-input" className="form-label">
              Subject Line
            </label>
            <input
              id="subject-input"
              type="text"
              name="subject"
              className="form-control"
              placeholder="Custom Design Inquiry"
              value={values.subject || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="body-input" className="form-label">
              Message Body
            </label>
            <textarea
              id="body-input"
              name="body"
              rows={3}
              className="form-control textarea"
              placeholder="Write pre-filled message..."
              value={values.body || ''}
              onChange={handleChange}
            />
          </div>
          <span className="form-hint">Scanners prompt to draft an email with these details.</span>
        </div>
      )}

      {activeType === 'phone' && (
        <div className="form-group">
          <label htmlFor="phone-input" className="form-label">
            Phone Number
          </label>
          <div className="input-with-icon">
            <span className="field-prefix-icon">📞</span>
            <input
              id="phone-input"
              type="tel"
              name="phone"
              className="form-control has-icon"
              placeholder="+1 (555) 000-0000"
              value={values.phone || ''}
              onChange={handleChange}
              autoComplete="tel"
            />
          </div>
          <span className="form-hint">Include country code for direct international dialing.</span>
        </div>
      )}

      {activeType === 'wifi' && (
        <div className="form-fields-stack">
          <div className="form-group">
            <label htmlFor="wifi-ssid" className="form-label">
              Network Name (SSID)
            </label>
            <input
              id="wifi-ssid"
              type="text"
              name="ssid"
              className="form-control"
              placeholder="e.g. Studio_Guest_5G"
              value={values.ssid || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="wifi-encryption" className="form-label">
                Encryption
              </label>
              <select
                id="wifi-encryption"
                name="encryption"
                className="form-control form-select"
                value={values.encryption || 'WPA'}
                onChange={handleChange}
              >
                <option value="WPA">WPA / WPA2</option>
                <option value="WEP">WEP</option>
                <option value="None">None (Open)</option>
              </select>
            </div>

            <div className="form-group flex-2">
              <label htmlFor="wifi-password" className="form-label">
                Password
              </label>
              <div className="password-wrapper">
                <input
                  id="wifi-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control password-input"
                  placeholder={values.encryption === 'None' ? 'No password needed' : 'Wi-Fi password'}
                  value={values.password || ''}
                  onChange={handleChange}
                  disabled={values.encryption === 'None'}
                />
                {values.encryption !== 'None' && (
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide Password' : 'Show Password'}
                    aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
          <span className="form-hint">Special characters (\, ;, :, &quot;) are escaped automatically.</span>
        </div>
      )}
    </div>
  );
}
