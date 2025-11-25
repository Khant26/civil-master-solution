import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api'; // Import the API service
import { useRequestForm } from '../context/RequestFormContext';

// Accept productId and productName as props for clarity
const RequestMoreInformation = ({ onSubmit, onCancel, productName }) => {
  const { closeRequestForm } = useRequestForm();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    contact: '',
    company: '',
    country: '',
    comments: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeRequestForm();
        if (onCancel) onCancel();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [closeRequestForm, onCancel]);

  const handleBackdropClick = (e) => {
    // Close modal when clicking on the backdrop (not on the modal content)
    if (e.target === e.currentTarget) {
      closeRequestForm();
      if (onCancel) onCancel();
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.fullName || !form.email || !form.contact || !form.company || !form.country || !productName) {
      setError('Please fill in all fields.');
      return;
    }
    setSubmitting(true);
    try {
      // Prepare payload for /api/requestforms/
      const payload = {
        full_name: form.fullName,
        email_address: form.email,
        contact_number: form.contact,
        company_name: form.company,
        country: form.country,
        product_name: productName, // Use productName directly from props
        comments: form.comments,
      };
      await apiService.requestForm.submit(payload); // Use the API service to submit the form
      setSuccess('Your request has been submitted successfully.');
      setForm({
        fullName: '',
        email: '',
        contact: '',
        company: '',
        country: '',
        comments: '',
      });
      if (onSubmit) onSubmit(payload);
    } catch (err) {
      setError('Failed to submit your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-0 overflow-hidden relative" style={{ borderRadius: 0 }}>
        {/* Header */}
        <div className="bg-[#0A1A2F] p-6 flex flex-col items-center" style={{ borderRadius: 0 }}>
          <img src="/images/logo.png" alt="Logo" className="h-12 mb-2" />
          <h2 className="text-white text-lg font-semibold text-center">Please fill this form to get more information</h2>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-cover bg-center p-4 sm:p-6 md:p-8 relative" style={{ backgroundImage: 'url(/images/backgrounds/request_background.jpg)', borderRadius: 0 }}>
          {/* Dark blue and white gradient overlay with 50% opacity on blue */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(120deg, rgba(10,26,47,0.7) 0%, rgba(10,26,47,0.5) 60%, rgba(255,255,255,0.4) 100%)',
              opacity: 1
            }}
          />
          <div className="space-y-4 relative z-10">
            {productName && (
              <div className="text-white text-xl font-bold mb-2 text-left">
                {productName}
              </div>
            )}
            <div>
              <label className="block text-base font-semibold text-white mb-1">Full Name*</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full p-2 bg-white bg-opacity-10 border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-white"
                style={{ borderRadius: 0 }}
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-white mb-1">Email Address*</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 bg-white bg-opacity-10 border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-white"
                style={{ borderRadius: 0 }}
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-white mb-1">Contact Number*</label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full p-2 bg-white bg-opacity-10 border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-white"
                style={{ borderRadius: 0 }}
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-white mb-1">Company Name*</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full p-2 bg-white bg-opacity-10 border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-white"
                style={{ borderRadius: 0 }}
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-white mb-1">Country*</label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full p-2 bg-white bg-opacity-10 border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-white"
                style={{ borderRadius: 0 }}
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-white mb-1">Additional Comments</label>
              <textarea
                name="comments"
                value={form.comments || ''}
                onChange={handleChange}
                className="w-full p-2 bg-white bg-opacity-10 border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-white"
                style={{ borderRadius: 0 }}
                rows="3"
                placeholder="Any additional information or specific requirements..."
              />
            </div>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            {success && <div className="text-green-500 text-sm text-center">{success}</div>}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mt-6">
              <button
                type="submit"
                className="bg-[#0A1A2F] text-white px-6 sm:px-10 py-3 text-sm sm:text-base font-bold shadow hover:bg-cyan-700 border-l-4 border-cyan-400 transition-all"
                style={{ borderRadius: 0 }}
                disabled={submitting}
              >
                {submitting ? 'SUBMITTING...' : 'SUBMIT'}
              </button>
              <button
                type="button"
                onClick={() => {
                  closeRequestForm();
                  if (onCancel) onCancel();
                }}
                className="bg-[#0A1A2F] text-white px-6 sm:px-10 py-3 text-sm sm:text-base font-bold shadow hover:bg-cyan-700 border-l-4 border-cyan-400 transition-all"
                style={{ borderRadius: 0 }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestMoreInformation;