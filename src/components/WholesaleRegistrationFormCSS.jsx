import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import CustomSignatureCanvas from './SignatureCanvas';
import './WholesaleRegistrationForm.css';

const WholesaleRegistrationForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPersonFirstName: '',
    contactPersonLastName: '',
    titlePosition: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    emailAddress: '',
    website: '',
    businessType: '',
    otherBusinessType: '',
    yearsInBusiness: '',
    monthlyPurchaseVolume: '',
    federalEIN: '',
    resaleCertificateNumber: '',
    resaleCertificateFile: null,
    sellsSupplements: '',
    complyWithLaws: '',
    sellsOnThirdParty: '',
    thirdPartyPlatforms: '',
    preferredPaymentMethod: '',
    otherPaymentMethod: '',
    preferredShippingMethod: '',
    otherShippingMethod: '',
    hasLoadingDock: '',
    autoShipEnrollment: '',
    agreementConfirmed: false,
    signature: '',
    signatureDate: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    const requiredFields = [
      'companyName', 'contactPersonFirstName', 'contactPersonLastName', 
      'titlePosition', 'street', 'city', 'state', 'zipCode', 
      'phoneNumber', 'emailAddress', 'businessType', 'yearsInBusiness',
      'monthlyPurchaseVolume', 'federalEIN', 'resaleCertificateNumber',
      'sellsSupplements', 'complyWithLaws', 'sellsOnThirdParty',
      'preferredPaymentMethod', 'preferredShippingMethod', 'hasLoadingDock',
      'autoShipEnrollment', 'signature'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.emailAddress && !emailRegex.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Agreement validation
    if (!formData.agreementConfirmed) {
      newErrors.agreementConfirmed = 'You must confirm the agreement to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show loading toast
    const loadingToast = toast.loading('Submitting your application...');
    
    // Simulate API call delay
    setTimeout(() => {
      if (validateForm()) {
        console.log('Form submitted:', formData);
        
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success('Registration application submitted successfully! We will review your application and get back to you within 2-3 business days.', {
          duration: 5000,
          style: {
            background: '#10b981',
            color: '#ffffff',
            fontSize: '14px',
            maxWidth: '500px',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#10b981',
          },
        });
      } else {
        // Dismiss loading toast and show error
        toast.dismiss(loadingToast);
        toast.error('Please fill in all required fields correctly before submitting.', {
          duration: 4000,
          style: {
            background: '#ef4444',
            color: '#ffffff',
            fontSize: '14px',
            maxWidth: '500px',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#ef4444',
          },
        });
      }
    }, 1500); // 1.5 second delay to simulate API call
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const handleSignatureSave = (signatureDataUrl) => {
    setFormData(prev => ({ ...prev, signature: signatureDataUrl }));
    
    // Clear signature error if it exists
    if (errors.signature) {
      setErrors(prev => ({ ...prev, signature: '' }));
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form">
          {/* Header with Logo */}
          <div className="form-header">
            <img 
              src="https://admin-wholesaler.netlify.app/assets/WholesaleLogo-CdpT_oMl.png" 
              alt="Wholesale Logo" 
              className="form-logo"
            />
            <h1 className="form-title">Wholesale Registration Form</h1>
            <p className="form-subtitle">Please fill out all required information to register for wholesale access</p>
          </div>

          {/* Company Information */}
          <section className="form-section">
            <h2 className="section-title">Company Information</h2>
            
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`input-field ${errors.companyName ? 'input-error' : ''}`}
                  placeholder="Enter your company name"
                />
                {errors.companyName && <span className="error-message">{errors.companyName}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">Title/Position *</label>
                <input
                  type="text"
                  name="titlePosition"
                  value={formData.titlePosition}
                  onChange={handleInputChange}
                  className={`input-field ${errors.titlePosition ? 'input-error' : ''}`}
                  placeholder="Your title or position"
                />
                {errors.titlePosition && <span className="error-message">{errors.titlePosition}</span>}
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label className="input-label">Contact Person First Name *</label>
                <input
                  type="text"
                  name="contactPersonFirstName"
                  value={formData.contactPersonFirstName}
                  onChange={handleInputChange}
                  className={`input-field ${errors.contactPersonFirstName ? 'input-error' : ''}`}
                  placeholder="First name"
                />
                {errors.contactPersonFirstName && <span className="error-message">{errors.contactPersonFirstName}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">Contact Person Last Name *</label>
                <input
                  type="text"
                  name="contactPersonLastName"
                  value={formData.contactPersonLastName}
                  onChange={handleInputChange}
                  className={`input-field ${errors.contactPersonLastName ? 'input-error' : ''}`}
                  placeholder="Last name"
                />
                {errors.contactPersonLastName && <span className="error-message">{errors.contactPersonLastName}</span>}
              </div>
            </div>
          </section>

          {/* Business Address */}
          <section className="form-section">
            <h2 className="section-title">Business Address</h2>
            
            <div className="input-group">
              <label className="input-label">Street Address *</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className={`input-field ${errors.street ? 'input-error' : ''}`}
                placeholder="Street address"
              />
              {errors.street && <span className="error-message">{errors.street}</span>}
            </div>

            <div className="input-row">
              <div className="input-group">
                <label className="input-label">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`input-field ${errors.city ? 'input-error' : ''}`}
                  placeholder="City"
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`input-field ${errors.state ? 'input-error' : ''}`}
                  placeholder="State"
                />
                {errors.state && <span className="error-message">{errors.state}</span>}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">ZIP Code *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={`input-field ${errors.zipCode ? 'input-error' : ''}`}
                placeholder="ZIP Code"
                style={{maxWidth: '200px'}}
              />
              {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
            </div>
          </section>

          {/* Contact Information */}
          <section className="form-section">
            <h2 className="section-title">Contact Information</h2>
            
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`input-field ${errors.phoneNumber ? 'input-error' : ''}`}
                  placeholder="Phone number"
                />
                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">Email Address *</label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className={`input-field ${errors.emailAddress ? 'input-error' : ''}`}
                  placeholder="Email address"
                />
                {errors.emailAddress && <span className="error-message">{errors.emailAddress}</span>}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Website (if applicable)</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Website URL"
              />
            </div>
          </section>

          {/* Business Information */}
          <section className="form-section">
            <h2 className="section-title">Business Information</h2>
            
            <div className="input-group">
              <label className="input-label">Type of Business *</label>
              <div className="radio-group">
                {['Retail Store', 'Online Store', 'Distributor', 'Health Practitioner', 'Other'].map(type => (
                  <div key={type} className="radio-option">
                    <input
                      type="radio"
                      name="businessType"
                      value={type}
                      checked={formData.businessType === type}
                      onChange={handleInputChange}
                      className="radio-input"
                      id={`business-${type}`}
                    />
                    <label htmlFor={`business-${type}`} className="radio-label">{type}</label>
                  </div>
                ))}
              </div>
              {errors.businessType && <span className="error-message">{errors.businessType}</span>}
            </div>

            {formData.businessType === 'Other' && (
              <div className="input-group">
                <label className="input-label">Please specify</label>
                <input
                  type="text"
                  name="otherBusinessType"
                  value={formData.otherBusinessType}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Please specify your business type"
                />
              </div>
            )}

            <div className="input-row">
              <div className="input-group">
                <label className="input-label">Years in Business *</label>
                <input
                  type="number"
                  name="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={handleInputChange}
                  className={`input-field ${errors.yearsInBusiness ? 'input-error' : ''}`}
                  placeholder="Years in business"
                  min="0"
                />
                {errors.yearsInBusiness && <span className="error-message">{errors.yearsInBusiness}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">Estimated Monthly Purchase Volume *</label>
                <input
                  type="text"
                  name="monthlyPurchaseVolume"
                  value={formData.monthlyPurchaseVolume}
                  onChange={handleInputChange}
                  className={`input-field ${errors.monthlyPurchaseVolume ? 'input-error' : ''}`}
                  placeholder="e.g., $5,000 - $10,000"
                />
                {errors.monthlyPurchaseVolume && <span className="error-message">{errors.monthlyPurchaseVolume}</span>}
              </div>
            </div>
          </section>

          {/* Legal & Tax Information */}
          <section className="form-section">
            <h2 className="section-title">Legal & Tax Information</h2>
            
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">Federal EIN / Tax ID Number *</label>
                <input
                  type="text"
                  name="federalEIN"
                  value={formData.federalEIN}
                  onChange={handleInputChange}
                  className={`input-field ${errors.federalEIN ? 'input-error' : ''}`}
                  placeholder="Federal EIN / Tax ID"
                />
                {errors.federalEIN && <span className="error-message">{errors.federalEIN}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">State Resale/Tax Exemption Certificate Number *</label>
                <input
                  type="text"
                  name="resaleCertificateNumber"
                  value={formData.resaleCertificateNumber}
                  onChange={handleInputChange}
                  className={`input-field ${errors.resaleCertificateNumber ? 'input-error' : ''}`}
                  placeholder="Resale certificate number"
                />
                {errors.resaleCertificateNumber && <span className="error-message">{errors.resaleCertificateNumber}</span>}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Upload Resale Certificate</label>
              <input
                type="file"
                name="resaleCertificateFile"
                onChange={handleInputChange}
                className="file-input"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
            </div>
          </section>

          {/* Compliance & Certification */}
          <section className="form-section">
            <h2 className="section-title">Compliance & Certification (Health Supplement Specific)</h2>
            
            <div className="input-group">
              <label className="input-label">Do you currently sell dietary/health supplements? *</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    name="sellsSupplements"
                    value="Yes"
                    checked={formData.sellsSupplements === 'Yes'}
                    onChange={handleInputChange}
                    className="radio-input"
                    id="supplements-yes"
                  />
                  <label htmlFor="supplements-yes" className="radio-label">Yes</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    name="sellsSupplements"
                    value="No"
                    checked={formData.sellsSupplements === 'No'}
                    onChange={handleInputChange}
                    className="radio-input"
                    id="supplements-no"
                  />
                  <label htmlFor="supplements-no" className="radio-label">No</label>
                </div>
              </div>
              {errors.sellsSupplements && <span className="error-message">{errors.sellsSupplements}</span>}
            </div>

            <div className="input-group">
              <label className="input-label">Do you agree to comply with FDA, FTC, and state laws regarding the sale and marketing of dietary supplements? *</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    name="complyWithLaws"
                    value="Yes"
                    checked={formData.complyWithLaws === 'Yes'}
                    onChange={handleInputChange}
                    className="radio-input"
                    id="comply-yes"
                  />
                  <label htmlFor="comply-yes" className="radio-label">Yes</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    name="complyWithLaws"
                    value="No"
                    checked={formData.complyWithLaws === 'No'}
                    onChange={handleInputChange}
                    className="radio-input"
                    id="comply-no"
                  />
                  <label htmlFor="comply-no" className="radio-label">No</label>
                </div>
              </div>
              {errors.complyWithLaws && <span className="error-message">{errors.complyWithLaws}</span>}
            </div>

            <div className="input-group">
              <label className="input-label">Will you be selling products on 3rd-party platforms (e.g., Amazon, eBay, Walmart)? *</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    name="sellsOnThirdParty"
                    value="Yes"
                    checked={formData.sellsOnThirdParty === 'Yes'}
                    onChange={handleInputChange}
                    className="radio-input"
                    id="third-party-yes"
                  />
                  <label htmlFor="third-party-yes" className="radio-label">Yes</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    name="sellsOnThirdParty"
                    value="No"
                    checked={formData.sellsOnThirdParty === 'No'}
                    onChange={handleInputChange}
                    className="radio-input"
                    id="third-party-no"
                  />
                  <label htmlFor="third-party-no" className="radio-label">No</label>
                </div>
              </div>
              {errors.sellsOnThirdParty && <span className="error-message">{errors.sellsOnThirdParty}</span>}
            </div>

            {formData.sellsOnThirdParty === 'Yes' && (
              <div className="input-group">
                <label className="input-label">Please specify platforms</label>
                <input
                  type="text"
                  name="thirdPartyPlatforms"
                  value={formData.thirdPartyPlatforms}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., Amazon, eBay, Walmart"
                />
              </div>
            )}
          </section>

          {/* Payment & Shipping */}
          <section className="form-section">
            <h2 className="section-title">Payment & Shipping</h2>
            
            <div className="input-group">
              <label className="input-label">Preferred Payment Method *</label>
              <div className="radio-group">
                {['Credit Card', 'ACH / Bank Transfer', 'PayPal', 'Other'].map(method => (
                  <div key={method} className="radio-option">
                    <input
                      type="radio"
                      name="preferredPaymentMethod"
                      value={method}
                      checked={formData.preferredPaymentMethod === method}
                      onChange={handleInputChange}
                      className="radio-input"
                      id={`payment-${method}`}
                    />
                    <label htmlFor={`payment-${method}`} className="radio-label">{method}</label>
                  </div>
                ))}
              </div>
              {errors.preferredPaymentMethod && <span className="error-message">{errors.preferredPaymentMethod}</span>}
            </div>

            {formData.preferredPaymentMethod === 'Other' && (
              <div className="input-group">
                <label className="input-label">Please specify payment method</label>
                <input
                  type="text"
                  name="otherPaymentMethod"
                  value={formData.otherPaymentMethod}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Please specify"
                />
              </div>
            )}

            <div className="input-group">
              <label className="input-label">Preferred Shipping Method *</label>
              <div className="radio-group">
                {['UPS', 'FedEx', 'USPS', 'Freight', 'Other'].map(method => (
                  <div key={method} className="radio-option">
                    <input
                      type="radio"
                      name="preferredShippingMethod"
                      value={method}
                      checked={formData.preferredShippingMethod === method}
                      onChange={handleInputChange}
                      className="radio-input"
                      id={`shipping-${method}`}
                    />
                    <label htmlFor={`shipping-${method}`} className="radio-label">{method}</label>
                  </div>
                ))}
              </div>
              {errors.preferredShippingMethod && <span className="error-message">{errors.preferredShippingMethod}</span>}
            </div>

            {formData.preferredShippingMethod === 'Other' && (
              <div className="input-group">
                <label className="input-label">Please specify shipping method</label>
                <input
                  type="text"
                  name="otherShippingMethod"
                  value={formData.otherShippingMethod}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Please specify"
                />
              </div>
            )}

            <div className="input-group">
              <label className="input-label">Do you have a loading dock for pallet shipments? *</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    name="hasLoadingDock"
                    value="Yes"
                    checked={formData.hasLoadingDock === 'Yes'}
                    onChange={handleInputChange}
                    className="radio-input"
                    id="loading-dock-yes"
                  />
                  <label htmlFor="loading-dock-yes" className="radio-label">Yes</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    name="hasLoadingDock"
                    value="No"
                    checked={formData.hasLoadingDock === 'No'}
                    onChange={handleInputChange}
                    className="radio-input"
                    id="loading-dock-no"
                  />
                  <label htmlFor="loading-dock-no" className="radio-label">No</label>
                </div>
              </div>
              {errors.hasLoadingDock && <span className="error-message">{errors.hasLoadingDock}</span>}
            </div>
          </section>

          {/* Auto-Ship Program */}
          <section className="form-section">
            <h2 className="section-title">Auto-Ship Program</h2>
            
            <div className="input-group">
              <label className="input-label">Would you like to be enrolled in our monthly Auto-Ship program? *</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    name="autoShipEnrollment"
                    value="Yes, sign me up for Auto-Ship."
                    checked={formData.autoShipEnrollment === "Yes, sign me up for Auto-Ship."}
                    onChange={handleInputChange}
                    className="radio-input"
                    id="auto-ship-yes"
                  />
                  <label htmlFor="auto-ship-yes" className="radio-label">Yes, sign me up for Auto-Ship.</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    name="autoShipEnrollment"
                    value="No"
                    checked={formData.autoShipEnrollment === "No"}
                    onChange={handleInputChange}
                    className="radio-input"
                    id="auto-ship-no"
                  />
                  <label htmlFor="auto-ship-no" className="radio-label">No</label>
                </div>
              </div>
              {errors.autoShipEnrollment && <span className="error-message">{errors.autoShipEnrollment}</span>}
            </div>
          </section>

          {/* Agreement */}
          <section className="form-section">
            <div className="agreement-section">
              <h2 className="section-title">Agreement</h2>
              <p className="input-label">By submitting this application, you confirm that:</p>
              <ul className="agreement-list">
                <li>All information provided is accurate and up-to-date.</li>
                <li>You will adhere to MAP (Minimum Advertised Pricing) policies set by our company.</li>
                <li>You understand wholesale accounts are for resale purposes only.</li>
              </ul>
              
              <div className="input-group">
                <div className="checkbox-option">
                  <input
                    type="checkbox"
                    name="agreementConfirmed"
                    checked={formData.agreementConfirmed}
                    onChange={handleInputChange}
                    className="checkbox-input"
                    id="agreement-confirmed"
                  />
                  <label htmlFor="agreement-confirmed" className="checkbox-label">
                    I confirm that I have read and agree to all the terms stated above
                  </label>
                </div>
                {errors.agreementConfirmed && <span className="error-message">{errors.agreementConfirmed}</span>}
              </div>

              <div className="input-row">
                <div className="input-group">
                  <CustomSignatureCanvas
                    onSignatureSave={handleSignatureSave}
                    label="Signature"
                    isRequired={true}
                  />
                  {errors.signature && <span className="error-message">{errors.signature}</span>}
                </div>

                <div className="input-group">
                  <label className="input-label">Date</label>
                  <input
                    type="date"
                    name="signatureDate"
                    value={formData.signatureDate || getTodayDate()}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </section>

          <button type="submit" className="submit-button">
            Submit Registration Application
          </button>
        </form>
      </div>
      
      {/* Toaster for notifications */}
      <Toaster 
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          },
        }}
      />
    </div>
  );
};

export default WholesaleRegistrationForm;
