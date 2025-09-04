import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import toast from 'react-hot-toast';
import './SignatureCanvas.css';

const CustomSignatureCanvas = ({ onSignatureSave, label = "Signature", isRequired = false }) => {
  const sigCanvas = useRef(null);
  const [signatureData, setSignatureData] = useState(null);
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureHistory, setSignatureHistory] = useState([]);

  const handleBegin = () => {
    // Save state for undo functionality
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const currentData = sigCanvas.current.toDataURL();
      setSignatureHistory(prev => [...prev, currentData]);
    }
  };

  const handleEnd = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      setHasSignature(true);
    } else {
      setHasSignature(false);
    }
  };

  const handleClear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setSignatureData(null);
      setHasSignature(false);
      setSignatureHistory([]);
      
      toast.success('Signature cleared successfully', {
        duration: 2000,
        style: {
          background: '#10b981',
          color: '#ffffff',
          fontSize: '14px',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#10b981',
        },
      });

      // Notify parent component
      if (onSignatureSave) {
        onSignatureSave(null);
      }
    }
  };

  const handleUndo = () => {
    if (signatureHistory.length > 0) {
      const previousSignature = signatureHistory[signatureHistory.length - 1];
      setSignatureHistory(prev => prev.slice(0, -1));
      
      // Clear canvas and redraw previous signature
      sigCanvas.current.clear();
      const img = new Image();
      img.onload = () => {
        const canvas = sigCanvas.current.getCanvas();
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        setHasSignature(true);
      };
      img.src = previousSignature;
      
      toast.info('Signature undone', {
        duration: 2000,
        style: {
          background: '#6366f1',
          color: '#ffffff',
          fontSize: '14px',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#6366f1',
        },
      });
    } else {
      toast.error('Nothing to undo', {
        duration: 2000,
        style: {
          background: '#ef4444',
          color: '#ffffff',
          fontSize: '14px',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#ef4444',
        },
      });
    }
  };

  const handleSave = () => {
    if (sigCanvas.current && hasSignature) {
      const signatureDataUrl = sigCanvas.current.toDataURL();
      setSignatureData(signatureDataUrl);
      
      toast.success('Signature saved successfully!', {
        duration: 3000,
        style: {
          background: '#10b981',
          color: '#ffffff',
          fontSize: '14px',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#10b981',
        },
      });

      // Notify parent component
      if (onSignatureSave) {
        onSignatureSave(signatureDataUrl);
      }

      // Auto-clear after save as requested
      setTimeout(() => {
        handleClear();
        toast.info('Canvas cleared for next signature', {
          duration: 2000,
          style: {
            background: '#6366f1',
            color: '#ffffff',
            fontSize: '14px',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#6366f1',
          },
        });
      }, 1000);
    } else {
      toast.error('Please provide a signature before saving', {
        duration: 3000,
        style: {
          background: '#ef4444',
          color: '#ffffff',
          fontSize: '14px',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#ef4444',
        },
      });
    }
  };

  return (
    <div className="signature-container">
      <div className="signature-group">
        <label className="signature-label">
          {label} {isRequired && '*'}
        </label>
        
        <div className="signature-canvas-wrapper">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              width: 500,
              height: 200,
              className: 'signature-canvas'
            }}
            onBegin={handleBegin}
            onEnd={handleEnd}
          />
          <div className="signature-placeholder">
            {!hasSignature && 'Sign here'}
          </div>
        </div>
        
        <div className="signature-buttons">
          <button
            type="button"
            onClick={handleClear}
            className="signature-btn clear-btn"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleUndo}
            className="signature-btn undo-btn"
            disabled={signatureHistory.length === 0}
          >
            Undo
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="signature-btn save-btn"
            disabled={!hasSignature}
          >
            Save
          </button>
        </div>
      </div>

      {signatureData && (
        <div className="saved-signature">
          <label className="signature-label">Saved Signature:</label>
          <img src={signatureData} alt="Saved Signature" className="signature-preview" />
        </div>
      )}
    </div>
  );
};

export default CustomSignatureCanvas;
