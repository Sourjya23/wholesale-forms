import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import CustomSignatureCanvas from './SignatureCanvas';
import './DistributorRegistrationForm.css';

const DistributorRegistrationForm = () => {
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
    numberOfEmployees: '',
    distributionTerritory: '',
    existingBrands: '',
    monthlyAnnualVolume: '',
    retailAccountsServed: '',
    warehousingFacilities: '',
    coldStorageAvailable: '',
    federalEIN: '',
    resaleCertificateNumber: '',
    businessLicenseFile: null,
    fdaFtcCompliance: '',
    productLiabilityInsurance: '',
    insuranceCertificateFile: null,
    mapGuidelines: '',
    onlineMarketplaces: '',
    marketplacePlatforms: '',
    salesTeam: '',
    annualMarketingSpend: '',
    marketingSupportNeeded: [],
    preferredPaymentMethod: '',
    otherPaymentMethod: '',
    preferredShippingMethod: '',
    otherShippingMethod: '',
    dropShippingSupport: '',
    agreementConfirmed: false,
    signature: '',
    signatureDate: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'marketingSupportNeeded') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
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
      'numberOfEmployees', 'distributionTerritory', 'monthlyAnnualVolume',
      'retailAccountsServed', 'warehousingFacilities', 'coldStorageAvailable',
      'federalEIN', 'resaleCertificateNumber', 'fdaFtcCompliance',
      'productLiabilityInsurance', 'mapGuidelines', 'onlineMarketplaces',
      'salesTeam', 'preferredPaymentMethod', 'preferredShippingMethod',
      'dropShippingSupport', 'signature'
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
    const loadingToast = toast.loading('Submitting your distributor application...');
    
    // Simulate API call delay
    setTimeout(() => {
      if (validateForm()) {
        console.log('Distributor form submitted:', formData);
        
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success('Distributor registration application submitted successfully! Our team will review your application and contact you within 3-5 business days to discuss the next steps.', {
          duration: 6000,
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
        toast.error('Please fill in all required fields correctly before submitting your distributor application.', {
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
    <div className="distributor-form-container">
      <div className="distributor-form-wrapper">
        <form onSubmit={handleSubmit} className="distributor-form">
          {/* Header with Logo */}
          <div className="distributor-form-header">
            <img 
              src="https://admin-wholesaler.netlify.app/assets/WholesaleLogo-CdpT_oMl.png" 
              alt="Distributor Logo" 
              className="distributor-form-logo"
            />
            <h1 className="distributor-form-title">Distributor Registration Form</h1>
            <p className="distributor-form-subtitle">Please fill out all required information to register as a distributor</p>
          </div>

          {/* Company Information */}
          <section className="distributor-form-section">
            <h2 className="distributor-section-title">Company Information</h2>
            
            <div className="distributor-input-row">
              <div className="distributor-input-group">
                <label className="distributor-input-label">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`distributor-input-field ${errors.companyName ? 'distributor-input-error' : ''}`}
                  placeholder="Enter your company name"
                />
                {errors.companyName && <span className="distributor-error-message">{errors.companyName}</span>}
              </div>

              <div className="distributor-input-group">
                <label className="distributor-input-label">Title/Position *</label>
                <input
                  type="text"
                  name="titlePosition"
                  value={formData.titlePosition}
                  onChange={handleInputChange}
                  className={`distributor-input-field ${errors.titlePosition ? 'distributor-input-error' : ''}`}
                  placeholder="Your title or position"
                />
                {errors.titlePosition && <span className="distributor-error-message">{errors.titlePosition}</span>}
              </div>
            </div>

            <div className="distributor-input-row">
              <div className="distributor-input-group">
                <label className="distributor-input-label">Contact Person First Name *</label>
                <input
                  type="text"
                  name="contactPersonFirstName"
                  value={formData.contactPersonFirstName}
                  onChange={handleInputChange}
                  className={`distributor-input-field ${errors.contactPersonFirstName ? 'distributor-input-error' : ''}`}
                  placeholder="First name"
                />
                {errors.contactPersonFirstName && <span className="distributor-error-message">{errors.contactPersonFirstName}</span>}
              </div>

              <div className="distributor-input-group">
                <label className="distributor-input-label">Contact Person Last Name *</label>
                <input
                  type="text"
                  name="contactPersonLastName"
                  value={formData.contactPersonLastName}
                  onChange={handleInputChange}
                  className={`distributor-input-field ${errors.contactPersonLastName ? 'distributor-input-error' : ''}`}
                  placeholder="Last name"
                />
                {errors.contactPersonLastName && <span className="distributor-error-message">{errors.contactPersonLastName}</span>}
              </div>
            </div>
          </section>

          {/* Business Address */}
          <section className="distributor-form-section">
            <h2 className="distributor-section-title">Business Address</h2>
            
            <div className="distributor-input-group">
              <label className="distributor-input-label">Street Address *</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className={`distributor-input-field ${errors.street ? 'distributor-input-error' : ''}`}
                placeholder="Street address"
              />
              {errors.street && <span className="distributor-error-message">{errors.street}</span>}
            </div>

            <div className="distributor-input-row">
              <div className="distributor-input-group">
                <label className="distributor-input-label">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`distributor-input-field ${errors.city ? 'distributor-input-error' : ''}`}
                  placeholder="City"
                />
                {errors.city && <span className="distributor-error-message">{errors.city}</span>}
              </div>

              <div className="distributor-input-group">
                <label className="distributor-input-label">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`distributor-input-field ${errors.state ? 'distributor-input-error' : ''}`}
                  placeholder="State"
                />
                {errors.state && <span className="distributor-error-message">{errors.state}</span>}
              </div>
            </div>

            <div className="distributor-input-group">
              <label className="distributor-input-label">ZIP Code *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={`distributor-input-field ${errors.zipCode ? 'distributor-input-error' : ''}`}
                placeholder="ZIP Code"
                style={{maxWidth: '200px'}}
              />
              {errors.zipCode && <span className="distributor-error-message">{errors.zipCode}</span>}
            </div>
          </section>

          {/* Contact Information */}
          <section className="distributor-form-section">
            <h2 className="distributor-section-title">Contact Information</h2>
            
            <div className="distributor-input-row">
              <div className="distributor-input-group">
                <label className="distributor-input-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`distributor-input-field ${errors.phoneNumber ? 'distributor-input-error' : ''}`}
                  placeholder="Phone number"
                />
                {errors.phoneNumber && <span className="distributor-error-message">{errors.phoneNumber}</span>}
              </div>

              <div className="distributor-input-group">
                <label className="distributor-input-label">Email Address *</label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className={`distributor-input-field ${errors.emailAddress ? 'distributor-input-error' : ''}`}
                  placeholder="Email address"
                />
                {errors.emailAddress && <span className="distributor-error-message">{errors.emailAddress}</span>}
              </div>
            </div>

            <div className="distributor-input-group">
              <label className="distributor-input-label">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="distributor-input-field"
                placeholder="Website URL"
              />
            </div>
          </section>

          {/* Business Information */}
          <section className="distributor-form-section">
            <h2 className="distributor-section-title">Business Information</h2>
            
            <div className="distributor-input-group">
              <label className="distributor-input-label">Type of Business *</label>
              <div className="distributor-radio-group">
                {['Distributor', 'Sub-Distributor', 'Retail Chain Distributor', 'Health Practitioner Distributor', 'Other'].map(type => (
                  <div key={type} className="distributor-radio-option">
                    <input
                      type="radio"
                      name="businessType"
                      value={type}
                      checked={formData.businessType === type}
                      onChange={handleInputChange}
                      className="distributor-radio-input"
                      id={`business-${type}`}
                    />
                    <label htmlFor={`business-${type}`} className="distributor-radio-label">{type}</label>
                  </div>
                ))}
              </div>
              {errors.businessType && <span className="distributor-error-message">{errors.businessType}</span>}
            </div>

            {formData.businessType === 'Other' && (
              <div className="distributor-input-group">
                <label className="distributor-input-label">Please specify</label>
                <input
                  type="text"
                  name="otherBusinessType"
                  value={formData.otherBusinessType}
                  onChange={handleInputChange}
                  className="distributor-input-field"
                  placeholder="Please specify your business type"
                />
              </div>
            )}

            <div className="distributor-input-row">
              <div className="distributor-input-group">
                <label className="distributor-input-label">Years in Business *</label>
                <input
                  type="number"
                  name="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={handleInputChange}
                  className={`distributor-input-field ${errors.yearsInBusiness ? 'distributor-input-error' : ''}`}
                  placeholder="Years in business"
                  min="0"
                />
                {errors.yearsInBusiness && <span className="distributor-error-message">{errors.yearsInBusiness}</span>}
              </div>

              <div className="distributor-input-group">
                <label className="distributor-input-label">Number of Employees *</label>
                <input
                  type="number"
                  name="numberOfEmployees"
                  value={formData.numberOfEmployees}
                  onChange={handleInputChange}
                  className={`distributor-input-field ${errors.numberOfEmployees ? 'distributor-input-error' : ''}`}
                  placeholder="Number of employees"
                  min="1"
                />
                {errors.numberOfEmployees && <span className="distributor-error-message">{errors.numberOfEmployees}</span>}
              </div>
            </div>

            <div className="distributor-input-group">
              <label className="distributor-input-label">Distribution Territory (Regions/States/Countries) *</label>
              <textarea
                name="distributionTerritory"
                value={formData.distributionTerritory}
                onChange={handleInputChange}
                className={`distributor-textarea-field ${errors.distributionTerritory ? 'distributor-input-error' : ''}`}
                placeholder="Describe your distribution territory"
                rows="3"
              />
              {errors.distributionTerritory && <span className="distributor-error-message">{errors.distributionTerritory}</span>}
            </div>

            <div className="distributor-input-group">
              <label className="distributor-input-label">Existing Brands Distributed</label>
              <textarea
                name="existingBrands"
                value={formData.existingBrands}
                onChange={handleInputChange}
                className="distributor-textarea-field"
                placeholder="List the brands you currently distribute"
                rows="3"
              />
            </div>
          </section>

          {/* Sales & Capacity */}
          <section className="distributor-form-section">
            <h2 className="distributor-section-title">Sales & Capacity</h2>
            
            <div className="distributor-input-row">
              <div className="distributor-input-group">
                <label className="distributor-input-label">Estimated Monthly/Annual Purchase Volume *</label>
                <input
                  type="text"
                  name="monthlyAnnualVolume"
                  value={formData.monthlyAnnualVolume}
                  onChange={handleInputChange}
                  className={`distributor-input-field ${errors.monthlyAnnualVolume ? 'distributor-input-error' : ''}`}
                  placeholder="e.g., $50,000/month or $600,000/year"
                />
                {errors.monthlyAnnualVolume && <span className="distributor-error-message">{errors.monthlyAnnualVolume}</span>}
              </div>

              <div className="distributor-input-group">
                <label className="distributor-input-label">Current Number of Retail Accounts Served *</label>
                <input
                  type="number"
                  name="retailAccountsServed"
                  value={formData.retailAccountsServed}
                  onChange={handleInputChange}
                  className={`distributor-input-field ${errors.retailAccountsServed ? 'distributor-input-error' : ''}`}
                  placeholder="Number of retail accounts"
                  min="0"
                />
                {errors.retailAccountsServed && <span className="distributor-error-message">{errors.retailAccountsServed}</span>}
              </div>
            </div>

            <div className="distributor-input-row">
              <div className="distributor-input-group">
                <label className="distributor-input-label">Warehousing Facilities Available *</label>
                <div className="distributor-radio-group">
                  <div className="distributor-radio-option">
                    <input
                      type="radio"
                      name="warehousingFacilities"
                      value="Yes"
                      checked={formData.warehousingFacilities === 'Yes'}
                      onChange={handleInputChange}
                      className="distributor-radio-input"
                      id="warehousing-yes"
                    />
                    <label htmlFor="warehousing-yes" className="distributor-radio-label">Yes</label>
                  </div>
                  <div className="distributor-radio-option">
                    <input
                      type="radio"
                      name="warehousingFacilities"
                      value="No"
                      checked={formData.warehousingFacilities === 'No'}
                      onChange={handleInputChange}
                      className="distributor-radio-input"
                      id="warehousing-no"
                    />
                    <label htmlFor="warehousing-no" className="distributor-radio-label">No</label>
                  </div>
                </div>
                {errors.warehousingFacilities && <span className="distributor-error-message">{errors.warehousingFacilities}</span>}
              </div>

              <div className="distributor-input-group">
                <label className="distributor-input-label">Cold Storage Available (if required) *</label>
                <div className="distributor-radio-group">
                  <div className="distributor-radio-option">
                    <input
                      type="radio"
                      name="coldStorageAvailable"
                      value="Yes"
                      checked={formData.coldStorageAvailable === 'Yes'}
                      onChange={handleInputChange}
                      className="distributor-radio-input"
                      id="cold-storage-yes"
                    />
                    <label htmlFor="cold-storage-yes" className="distributor-radio-label">Yes</label>
                  </div>
                  <div className="distributor-radio-option">
                    <input
                      type="radio"
                      name="coldStorageAvailable"
                      value="No"
                      checked={formData.coldStorageAvailable === 'No'}
                      onChange={handleInputChange}
                      className="distributor-radio-input"
                      id="cold-storage-no"
                    />
                    <label htmlFor="cold-storage-no" className="distributor-radio-label">No</label>
                  </div>
                </div>
                {errors.coldStorageAvailable && <span className="distributor-error-message">{errors.coldStorageAvailable}</span>}
              </div>
            </div>
          </section>

          {/* Legal & Tax Information */}
          <section className="distributor-form-section">
            <h2 className="distributor-section-title">Legal & Tax Information</h2>
            
            <div className="distributor-input-row">
              <div className="distributor-input-group">
                <label className="distributor-input-label">Federal EIN / Tax ID Number *</label>
                <input
                  type="text"
                  name="federalEIN"
                  value={formData.federalEIN}
                  onChange={handleInputChange}
                  className={`distributor-input-field ${errors.federalEIN ? 'distributor-input-error' : ''}`}
                  placeholder="Federal EIN / Tax ID"
                />
                {errors.federalEIN && <span className="distributor-error-message">{errors.federalEIN}</span>}
              </div>

              <div className="distributor-input-group">
                <label className="distributor-input-label">State Resale/Tax Exemption Certificate Number *</label>
                <input
                  type="text"
                  name="resaleCertificateNumber"
                  value={formData.resaleCertificateNumber}
                  onChange={handleInputChange}
                  className={`distributor-input-field ${errors.resaleCertificateNumber ? 'distributor-input-error' : ''}`}
                  placeholder="Resale certificate number"
                />
                {errors.resaleCertificateNumber && <span className="distributor-error-message">{errors.resaleCertificateNumber}</span>}
              </div>
            </div>

            <div className="distributor-input-group">
              <label className="distributor-input-label">Upload Business License / Resale Certificate</label>
              <input
                type="file"
                name="businessLicenseFile"
                onChange={handleInputChange}
                className="distributor-file-input"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
            </div>
          </section>

          {/* Compliance & Certifications */}
          <section className="distributor-form-section">
            <h2 className="distributor-section-title">Compliance & Certifications</h2>
            
            <div className="distributor-input-group">
              <label className="distributor-input-label">Do you comply with FDA/FTC regulations for dietary supplements? *</label>
              <div className="distributor-radio-group">
                <div className="distributor-radio-option">
                  <input
                    type="radio"
                    name="fdaFtcCompliance"
                    value="Yes"
                    checked={formData.fdaFtcCompliance === 'Yes'}
                    onChange={handleInputChange}
                    className="distributor-radio-input"
                    id="fda-compliance-yes"
                  />
                  <label htmlFor="fda-compliance-yes" className="distributor-radio-label">Yes</label>
                </div>
                <div className="distributor-radio-option">
                  <input
                    type="radio"
                    name="fdaFtcCompliance"
                    value="No"
                    checked={formData.fdaFtcCompliance === 'No'}
                    onChange={handleInputChange}
                    className="distributor-radio-input"
                    id="fda-compliance-no"
                  />
                  <label htmlFor="fda-compliance-no" className="distributor-radio-label">No</label>
                </div>
              </div>
              {errors.fdaFtcCompliance && <span className="distributor-error-message">{errors.fdaFtcCompliance}</span>}
            </div>

            <div className="distributor-input-group">
              <label className="distributor-input-label">Do you carry product liability insurance? *</label>
              <div className="distributor-radio-group">
                <div className="distributor-radio-option">
                  <input
                    type="radio"
                    name="productLiabilityInsurance"
                    value="Yes"
                    checked={formData.productLiabilityInsurance === 'Yes'}
                    onChange={handleInputChange}
                    className="distributor-radio-input"
                    id="insurance-yes"
                  />
                  <label htmlFor="insurance-yes" className="distributor-radio-label">Yes (Upload Certificate)</label>
                </div>
                <div className="distributor-radio-option">
                  <input
                    type="radio"
                    name="productLiabilityInsurance"
                    value="No"
                    checked={formData.productLiabilityInsurance === 'No'}
                    onChange={handleInputChange}
                    className="distributor-radio-input"
                    id="insurance-no"
                  />
                  <label htmlFor="insurance-no" className="distributor-radio-label">No</label>
                </div>
              </div>
              {errors.productLiabilityInsurance && <span className="distributor-error-message">{errors.productLiabilityInsurance}</span>}
            </div>

            {formData.productLiabilityInsurance === 'Yes' && (
              <div className="distributor-input-group">
                <label className="distributor-input-label">Upload Insurance Certificate</label>
                <input
                  type="file"
                  name="insuranceCertificateFile"
                  onChange={handleInputChange}
                  className="distributor-file-input"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
              </div>
            )}

            <div className="distributor-input-group">
              <label className="distributor-input-label">Do you agree to follow MAP (Minimum Advertised Pricing) guidelines? *</label>
              <div className="distributor-radio-group">
                <div className="distributor-radio-option">
                  <input
                    type="radio"
                    name="mapGuidelines"
                    value="Yes"
                    checked={formData.mapGuidelines === 'Yes'}
                    onChange={handleInputChange}
                    className="distributor-radio-input"
                    id="map-yes"
                  />
                  <label htmlFor="map-yes" className="distributor-radio-label">Yes</label>
                </div>
                <div className="distributor-radio-option">
                  <input
                    type="radio"
                    name="mapGuidelines"
                    value="No"
                    checked={formData.mapGuidelines === 'No'}
                    onChange={handleInputChange}
                    className="distributor-radio-input"
                    id="map-no"
                  />
                  <label htmlFor="map-no" className="distributor-radio-label">No</label>
                </div>
              </div>
              {errors.mapGuidelines && <span className="distributor-error-message">{errors.mapGuidelines}</span>}
            </div>

            <div className="distributor-input-group">
              <label className="distributor-input-label">Do you plan to sell products on online marketplaces (Amazon, eBay, Walmart, etc.)? *</label>
              <div className="distributor-radio-group">
                <div className="distributor-radio-option">
                  <input
                    type="radio"
                    name="onlineMarketplaces"
                    value="Yes"
                    checked={formData.onlineMarketplaces === 'Yes'}
                    onChange={handleInputChange}
                    className="distributor-radio-input"
                    id="marketplaces-yes"
                  />
                  <label htmlFor="marketplaces-yes" className="distributor-radio-label">Yes</label>
                </div>
                <div className="distributor-radio-option">
                  <input
                    type="radio"
                    name="onlineMarketplaces"
                    value="No"
                    checked={formData.onlineMarketplaces === 'No'}
                    onChange={handleInputChange}
                    className="distributor-radio-input"
                    id="marketplaces-no"
                  />
                  <label htmlFor="marketplaces-no" className="distributor-radio-label">No</label>
                </div>
              </div>
              {errors.onlineMarketplaces && <span className="distributor-error-message">{errors.onlineMarketplaces}</span>}
            </div>

            {formData.onlineMarketplaces === 'Yes' && (
              <div className="distributor-input-group">
                <label className="distributor-input-label">Please specify platforms</label>
                <input
                  type="text"
                  name="marketplacePlatforms"
                  value={formData.marketplacePlatforms}
                  onChange={handleInputChange}
                  className="distributor-input-field"
                  placeholder="e.g., Amazon, eBay, Walmart"
                />
              </div>
            )}
          </section>

          {/* Marketing & Promotion */}
          <section className="distributor-form-section">
            <h2 className="distributor-section-title">Marketing & Promotion</h2>
            
            <div className="distributor-input-row">
              <div className="distributor-input-group">
                <label className="distributor-input-label">Do you have a sales team to promote products? *</label>
                <div className="distributor-radio-group">
                  <div className="distributor-radio-option">
                    <input
                      type="radio"
                      name="salesTeam"
                      value="Yes"
                      checked={formData.salesTeam === 'Yes'}
                      onChange={handleInputChange}
                      className="distributor-radio-input"
                      id="sales-team-yes"
                    />
                    <label htmlFor="sales-team-yes" className="distributor-radio-label">Yes</label>
                  </div>
                  <div className="distributor-radio-option">
                    <input
                      type="radio"
                      name="salesTeam"
                      value="No"
                      checked={formData.salesTeam === 'No'}
                      onChange={handleInputChange}
                      className="distributor-radio-input"
                      id="sales-team-no"
                    />
                    <label htmlFor="sales-team-no" className="distributor-radio-label">No</label>
                  </div>
                </div>
                {errors.salesTeam && <span className="distributor-error-message">{errors.salesTeam}</span>}
              </div>

              <div className="distributor-input-group">
                <label className="distributor-input-label">Expected Annual Marketing Spend for Our Products</label>
                <input
                  type="text"
                  name="annualMarketingSpend"
                  value={formData.annualMarketingSpend}
                  onChange={handleInputChange}
                  className="distributor-input-field"
                  placeholder="e.g., $10,000 - $50,000"
                />
              </div>
            </div>

            <div className="distributor-input-group">
              <label className="distributor-input-label">Preferred Marketing Support Needed</label>
              <div className="distributor-multi-checkbox-group">
                {['Product Samples', 'Training for Sales Staff', 'Digital Assets (images, videos, brochures)', 'Joint Advertising Campaigns'].map(support => (
                  <div key={support} className="distributor-checkbox-option">
                    <input
                      type="checkbox"
                      name="marketingSupportNeeded"
                      value={support}
                      checked={formData.marketingSupportNeeded.includes(support)}
                      onChange={handleInputChange}
                      className="distributor-checkbox-input"
                      id={`support-${support}`}
                    />
                    <label htmlFor={`support-${support}`} className="distributor-checkbox-label">{support}</label>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Payment & Shipping */}
          <section className="distributor-form-section">
            <h2 className="distributor-section-title">Payment & Shipping</h2>
            
            <div className="distributor-input-group">
              <label className="distributor-input-label">Preferred Payment Method *</label>
              <div className="distributor-radio-group">
                {['Credit Card', 'ACH / Bank Transfer', 'PayPal', 'Other'].map(method => (
                  <div key={method} className="distributor-radio-option">
                    <input
                      type="radio"
                      name="preferredPaymentMethod"
                      value={method}
                      checked={formData.preferredPaymentMethod === method}
                      onChange={handleInputChange}
                      className="distributor-radio-input"
                      id={`payment-${method}`}
                    />
                    <label htmlFor={`payment-${method}`} className="distributor-radio-label">{method}</label>
                  </div>
                ))}
              </div>
              {errors.preferredPaymentMethod && <span className="distributor-error-message">{errors.preferredPaymentMethod}</span>}
            </div>

            {formData.preferredPaymentMethod === 'Other' && (
              <div className="distributor-input-group">
                <label className="distributor-input-label">Please specify payment method</label>
                <input
                  type="text"
                  name="otherPaymentMethod"
                  value={formData.otherPaymentMethod}
                  onChange={handleInputChange}
                  className="distributor-input-field"
                  placeholder="Please specify"
                />
              </div>
            )}

            <div className="distributor-input-group">
              <label className="distributor-input-label">Preferred Shipping Method *</label>
              <div className="distributor-radio-group">
                {['UPS', 'FedEx', 'Freight', 'Other'].map(method => (
                  <div key={method} className="distributor-radio-option">
                    <input
                      type="radio"
                      name="preferredShippingMethod"
                      value={method}
                      checked={formData.preferredShippingMethod === method}
                      onChange={handleInputChange}
                      className="distributor-radio-input"
                      id={`shipping-${method}`}
                    />
                    <label htmlFor={`shipping-${method}`} className="distributor-radio-label">{method}</label>
                  </div>
                ))}
              </div>
              {errors.preferredShippingMethod && <span className="distributor-error-message">{errors.preferredShippingMethod}</span>}
            </div>

            {formData.preferredShippingMethod === 'Other' && (
              <div className="distributor-input-group">
                <label className="distributor-input-label">Please specify shipping method</label>
                <input
                  type="text"
                  name="otherShippingMethod"
                  value={formData.otherShippingMethod}
                  onChange={handleInputChange}
                  className="distributor-input-field"
                  placeholder="Please specify"
                />
              </div>
            )}

            <div className="distributor-input-group">
              <label className="distributor-input-label">Do you require drop-shipping support? *</label>
              <div className="distributor-radio-group">
                <div className="distributor-radio-option">
                  <input
                    type="radio"
                    name="dropShippingSupport"
                    value="Yes"
                    checked={formData.dropShippingSupport === 'Yes'}
                    onChange={handleInputChange}
                    className="distributor-radio-input"
                    id="dropship-yes"
                  />
                  <label htmlFor="dropship-yes" className="distributor-radio-label">Yes</label>
                </div>
                <div className="distributor-radio-option">
                  <input
                    type="radio"
                    name="dropShippingSupport"
                    value="No"
                    checked={formData.dropShippingSupport === 'No'}
                    onChange={handleInputChange}
                    className="distributor-radio-input"
                    id="dropship-no"
                  />
                  <label htmlFor="dropship-no" className="distributor-radio-label">No</label>
                </div>
              </div>
              {errors.dropShippingSupport && <span className="distributor-error-message">{errors.dropShippingSupport}</span>}
            </div>
          </section>

          {/* Agreement */}
          <section className="distributor-form-section">
            <div className="distributor-agreement-section">
              <h2 className="distributor-section-title">Agreement</h2>
              <p className="distributor-input-label">By submitting this application, you confirm that:</p>
              <ul className="distributor-agreement-list">
                <li>All information provided is true and accurate.</li>
                <li>You will act as an authorized distributor of our products within agreed territories.</li>
                <li>You agree to comply with U.S. laws, FDA/FTC guidelines, and our distribution policies.</li>
                <li>Distributor approval is subject to review and may require a separate Distribution Agreement Contract.</li>
              </ul>
              
              <div className="distributor-input-group">
                <div className="distributor-checkbox-option">
                  <input
                    type="checkbox"
                    name="agreementConfirmed"
                    checked={formData.agreementConfirmed}
                    onChange={handleInputChange}
                    className="distributor-checkbox-input"
                    id="agreement-confirmed"
                  />
                  <label htmlFor="agreement-confirmed" className="distributor-checkbox-label">
                    I confirm that I have read and agree to all the terms stated above
                  </label>
                </div>
                {errors.agreementConfirmed && <span className="distributor-error-message">{errors.agreementConfirmed}</span>}
              </div>

              <div className="distributor-input-row">
                <div className="distributor-input-group">
                  <CustomSignatureCanvas
                    onSignatureSave={handleSignatureSave}
                    label="Signature"
                    isRequired={true}
                  />
                  {errors.signature && <span className="distributor-error-message">{errors.signature}</span>}
                </div>

                <div className="distributor-input-group">
                  <label className="distributor-input-label">Date</label>
                  <input
                    type="date"
                    name="signatureDate"
                    value={formData.signatureDate || getTodayDate()}
                    onChange={handleInputChange}
                    className="distributor-input-field"
                  />
                </div>
              </div>
            </div>
          </section>

          <button type="submit" className="distributor-submit-button">
            Submit Distributor Application
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

export default DistributorRegistrationForm;
