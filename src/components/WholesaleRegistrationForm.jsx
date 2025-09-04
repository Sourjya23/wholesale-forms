import React, { useState } from 'react';

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
    signatureDate: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
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
      'preferredPaymentMethod', 'preferredShippingMethod', 'hasLoadingDock'
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-8">
          {/* Header with Logo */}
          <div className="text-center border-b border-green-100 pb-8">
            <img 
              src="https://admin-wholesaler.netlify.app/assets/WholesaleLogo-CdpT_oMl.png" 
              alt="Wholesale Logo" 
              className="mx-auto h-16 mb-4"
            />
            <h1 className="text-3xl font-bold text-black mb-2">Wholesale Registration Form</h1>
            <p className="text-black">Please fill out all required information to register for wholesale access</p>
          </div>

          {/* Company Information */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-black border-b border-green-200 pb-2">
              Company Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter your company name"
                />
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Title/Position *
                </label>
                <input
                  type="text"
                  name="titlePosition"
                  value={formData.titlePosition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Your title or position"
                />
                {errors.titlePosition && <p className="text-red-500 text-sm mt-1">{errors.titlePosition}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Contact Person First Name *
                </label>
                <input
                  type="text"
                  name="contactPersonFirstName"
                  value={formData.contactPersonFirstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="First name"
                />
                {errors.contactPersonFirstName && <p className="text-red-500 text-sm mt-1">{errors.contactPersonFirstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Contact Person Last Name *
                </label>
                <input
                  type="text"
                  name="contactPersonLastName"
                  value={formData.contactPersonLastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Last name"
                />
                {errors.contactPersonLastName && <p className="text-red-500 text-sm mt-1">{errors.contactPersonLastName}</p>}
              </div>
            </div>
          </section>

          {/* Business Address */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-black border-b border-green-200 pb-2">
              Business Address
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Street address"
                />
                {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="City"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="State"
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="ZIP Code"
                />
                {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-black border-b border-green-200 pb-2">
              Contact Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="(555) 123-4567"
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="your.email@example.com"
                />
                {errors.emailAddress && <p className="text-red-500 text-sm mt-1">{errors.emailAddress}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="https://www.yourwebsite.com"
                />
              </div>
            </div>
          </section>

          {/* Business Information */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-black border-b border-green-200 pb-2">
              Business Information
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-black mb-3">
                Type of Business *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Retail Store', 'Online Store', 'Distributor', 'Health Practitioner (Chiropractor, Naturopath, Nutritionist, etc.)', 'Other'].map((type) => (
                  <label key={type} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="businessType"
                      value={type}
                      checked={formData.businessType === type}
                      onChange={handleInputChange}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="text-black">{type}</span>
                  </label>
                ))}
              </div>
              {formData.businessType === 'Other' && (
                <div className="mt-4">
                  <input
                    type="text"
                    name="otherBusinessType"
                    value={formData.otherBusinessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Please specify other business type"
                  />
                </div>
              )}
              {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Years in Business *
                </label>
                <input
                  type="number"
                  name="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Years in business"
                  min="0"
                />
                {errors.yearsInBusiness && <p className="text-red-500 text-sm mt-1">{errors.yearsInBusiness}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Estimated Monthly Purchase Volume *
                </label>
                <input
                  type="text"
                  name="monthlyPurchaseVolume"
                  value={formData.monthlyPurchaseVolume}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="e.g., $5,000 - $10,000"
                />
                {errors.monthlyPurchaseVolume && <p className="text-red-500 text-sm mt-1">{errors.monthlyPurchaseVolume}</p>}
              </div>
            </div>
          </section>

          {/* Legal & Tax Information */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-black border-b border-green-200 pb-2">
              Legal & Tax Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Federal EIN / Tax ID Number *
                </label>
                <input
                  type="text"
                  name="federalEIN"
                  value={formData.federalEIN}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="XX-XXXXXXX"
                />
                {errors.federalEIN && <p className="text-red-500 text-sm mt-1">{errors.federalEIN}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  State Resale/Tax Exemption Certificate Number *
                </label>
                <input
                  type="text"
                  name="resaleCertificateNumber"
                  value={formData.resaleCertificateNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Certificate number"
                />
                {errors.resaleCertificateNumber && <p className="text-red-500 text-sm mt-1">{errors.resaleCertificateNumber}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black mb-2">
                  Upload Resale Certificate
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <input
                    type="file"
                    name="resaleCertificateFile"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-gray-600">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PDF, PNG, JPG up to 10MB</p>
                    </div>
                  </label>
                  {formData.resaleCertificateFile && (
                    <p className="mt-2 text-sm text-green-600">
                      File selected: {formData.resaleCertificateFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Compliance & Certification */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-black border-b border-green-200 pb-2">
              Compliance & Certification (Health Supplement Specific)
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-3">
                  Do you currently sell dietary/health supplements? *
                </label>
                <div className="flex space-x-6">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sellsSupplements"
                        value={option}
                        checked={formData.sellsSupplements === option}
                        onChange={handleInputChange}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-black">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.sellsSupplements && <p className="text-red-500 text-sm mt-1">{errors.sellsSupplements}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-3">
                  Do you agree to comply with FDA, FTC, and state laws regarding the sale and marketing of dietary supplements? *
                </label>
                <div className="flex space-x-6">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="complyWithLaws"
                        value={option}
                        checked={formData.complyWithLaws === option}
                        onChange={handleInputChange}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-black">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.complyWithLaws && <p className="text-red-500 text-sm mt-1">{errors.complyWithLaws}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-3">
                  Will you be selling products on 3rd-party platforms (e.g., Amazon, eBay, Walmart)? *
                </label>
                <div className="flex space-x-6">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sellsOnThirdParty"
                        value={option}
                        checked={formData.sellsOnThirdParty === option}
                        onChange={handleInputChange}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-black">{option}</span>
                    </label>
                  ))}
                </div>
                {formData.sellsOnThirdParty === 'Yes' && (
                  <div className="mt-4">
                    <input
                      type="text"
                      name="thirdPartyPlatforms"
                      value={formData.thirdPartyPlatforms}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Please specify platforms (e.g., Amazon, eBay, Walmart)"
                    />
                  </div>
                )}
                {errors.sellsOnThirdParty && <p className="text-red-500 text-sm mt-1">{errors.sellsOnThirdParty}</p>}
              </div>
            </div>
          </section>

          {/* Payment & Shipping */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-black border-b border-green-200 pb-2">
              Payment & Shipping
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-3">
                  Preferred Payment Method *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Credit Card', 'ACH / Bank Transfer', 'PayPal', 'Other'].map((method) => (
                    <label key={method} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="preferredPaymentMethod"
                        value={method}
                        checked={formData.preferredPaymentMethod === method}
                        onChange={handleInputChange}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-black">{method}</span>
                    </label>
                  ))}
                </div>
                {formData.preferredPaymentMethod === 'Other' && (
                  <div className="mt-4">
                    <input
                      type="text"
                      name="otherPaymentMethod"
                      value={formData.otherPaymentMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Please specify other payment method"
                    />
                  </div>
                )}
                {errors.preferredPaymentMethod && <p className="text-red-500 text-sm mt-1">{errors.preferredPaymentMethod}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-3">
                  Preferred Shipping Method *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['UPS', 'FedEx', 'USPS', 'Freight', 'Other'].map((method) => (
                    <label key={method} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="preferredShippingMethod"
                        value={method}
                        checked={formData.preferredShippingMethod === method}
                        onChange={handleInputChange}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-black">{method}</span>
                    </label>
                  ))}
                </div>
                {formData.preferredShippingMethod === 'Other' && (
                  <div className="mt-4">
                    <input
                      type="text"
                      name="otherShippingMethod"
                      value={formData.otherShippingMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Please specify other shipping method"
                    />
                  </div>
                )}
                {errors.preferredShippingMethod && <p className="text-red-500 text-sm mt-1">{errors.preferredShippingMethod}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-3">
                  Do you have a loading dock for pallet shipments? *
                </label>
                <div className="flex space-x-6">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasLoadingDock"
                        value={option}
                        checked={formData.hasLoadingDock === option}
                        onChange={handleInputChange}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-black">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.hasLoadingDock && <p className="text-red-500 text-sm mt-1">{errors.hasLoadingDock}</p>}
              </div>
            </div>
          </section>

          {/* Agreement */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-black border-b border-green-200 pb-2">
              Agreement
            </h2>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-black mb-4">
                By submitting this application, you confirm that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-black mb-6">
                <li>All information provided is accurate and up-to-date.</li>
                <li>You will adhere to MAP (Minimum Advertised Pricing) policies set by [Your Company Name].</li>
                <li>You understand wholesale accounts are for resale purposes only.</li>
              </ul>
              
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Signature Date *
                </label>
                <input
                  type="date"
                  name="signatureDate"
                  value={formData.signatureDate}
                  onChange={handleInputChange}
                  className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
                {errors.signatureDate && <p className="text-red-500 text-sm mt-1">{errors.signatureDate}</p>}
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Submit Registration Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WholesaleRegistrationForm;
