import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WholesaleRegistrationForm.css';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  const handleBackToForm = () => {
    navigate('/');
  };

  return (
    <div className="form-container">
      <div className="form-wrapper" style={{ maxWidth: '900px' }}>
        <div className="form">
          {/* Header with Logo */}
          <div className="form-header">
            <img 
              src="https://admin-wholesaler.netlify.app/assets/WholesaleLogo-CdpT_oMl.png" 
              alt="Wholesale Logo" 
              className="form-logo"
            />
            <h1 className="form-title">Terms & Conditions</h1>
            <p className="form-subtitle">Monthly Auto-Ship Program</p>
          </div>

          {/* Terms Content */}
          <div style={{ padding: '24px 0', lineHeight: '1.6' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px' }}>
              Terms & Conditions – Monthly Auto-Ship Program
            </h3>
            
            <div style={{ color: '#374151' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', marginTop: '24px', color: '#10b981' }}>
                Enrollment
              </h4>
              <p style={{ marginBottom: '16px' }}>
                By opting into the Auto-Ship program, you agree to receive recurring monthly shipments of the selected product(s).
              </p>
              <p style={{ marginBottom: '16px' }}>
                Enrollment occurs when you select "Yes" on the application form or through any other sign-up method provided.
              </p>

              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', marginTop: '24px', color: '#10b981' }}>
                Billing & Payments
              </h4>
              <p style={{ marginBottom: '16px' }}>
                Your preferred payment method will be automatically charged each month on or around your renewal date.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Prices are subject to change with prior notice.
              </p>
              <p style={{ marginBottom: '16px' }}>
                It is your responsibility to ensure payment details are accurate and up to date.
              </p>

              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', marginTop: '24px', color: '#10b981' }}>
                Shipping & Delivery
              </h4>
              <p style={{ marginBottom: '16px' }}>
                Products will be shipped monthly to the address provided at the time of enrollment.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Delivery times may vary based on location, shipping provider, and availability.
              </p>
              <p style={{ marginBottom: '16px' }}>
                We are not responsible for delays caused by carriers, weather, or external circumstances beyond our control.
              </p>

              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', marginTop: '24px', color: '#10b981' }}>
                Cancellations & Modifications
              </h4>
              <p style={{ marginBottom: '16px' }}>
                You may cancel or modify your Auto-Ship subscription at any time through the upcoming Auto-Ship portal or by contacting customer support.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Cancellations must be made at least X days before the next scheduled billing date to avoid being charged for that cycle.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Once an order has been processed, it cannot be canceled or refunded.
              </p>

              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', marginTop: '24px', color: '#10b981' }}>
                Returns & Refunds
              </h4>
              <p style={{ marginBottom: '16px' }}>
                Auto-Ship orders are generally non-refundable.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Damaged or defective items may be eligible for replacement if reported within X days of delivery.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Return shipping costs may apply unless otherwise specified.
              </p>

              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', marginTop: '24px', color: '#10b981' }}>
                Account Responsibilities
              </h4>
              <p style={{ marginBottom: '16px' }}>
                You are responsible for maintaining accurate shipping, billing, and contact information in your account.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Failure to update your details may result in missed shipments or failed payments.
              </p>

              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', marginTop: '24px', color: '#10b981' }}>
                Program Changes & Termination
              </h4>
              <p style={{ marginBottom: '16px' }}>
                We reserve the right to update, pause, or discontinue the Auto-Ship program at any time with reasonable prior notice.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Any changes to terms will be communicated via email or posted on our website.
              </p>

              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', marginTop: '24px', color: '#10b981' }}>
                Legal & Liability
              </h4>
              <p style={{ marginBottom: '16px' }}>
                By participating, you acknowledge that the company is not liable for delays, lost shipments, or any indirect damages related to your subscription.
              </p>
              <p style={{ marginBottom: '16px' }}>
                All disputes will be governed by the laws of [Insert Jurisdiction].
              </p>

              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', marginTop: '24px', color: '#10b981' }}>
                Contact Information
              </h4>
              <p style={{ marginBottom: '16px' }}>
                For questions, modifications, or cancellations, please contact our support team at: [Insert Contact Details].
              </p>
            </div>
            
            {/* Back Button */}
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                            <button
                type="button"
                onClick={handleBackToForm}
                className="submit-button"
                style={{
                  backgroundColor: '#10b981',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                ← Back to Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
