import React, { useState } from 'react';

const RequestMoreInformation = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    contact: '',
    company: '',
    country: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.fullName || !form.email || !form.contact || !form.company || !form.country) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    if (onSubmit) onSubmit(form);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-0 overflow-hidden relative">
        {/* Header */}
        <div className="bg-[#0A1A2F] p-6 flex flex-col items-center">
          <img src="/images/logo.png" alt="Logo" className="h-12 mb-2" />
          <h2 className="text-white text-lg font-semibold text-center">Please fill this form to download the information</h2>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-cover bg-center p-8" style={{ backgroundImage: 'url(/images/backgrounds/background1.JPG)' }}>
          <div className="space-y-4">
            <div>
              <label className="block text-base font-semibold text-black mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full p-2 bg-white bg-opacity-70 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-black mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 bg-white bg-opacity-70 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-black mb-1">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full p-2 bg-white bg-opacity-70 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-black mb-1">Company Name</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full p-2 bg-white bg-opacity-70 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-black mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full p-2 bg-white bg-opacity-70 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            <div className="flex justify-center gap-8 mt-6">
              <button
                type="submit"
                className="bg-[#0A1A2F] text-white px-10 py-3 font-bold rounded shadow hover:bg-cyan-700 border-b-4 border-cyan-400 transition-all"
              >
                SUBMIT
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-[#0A1A2F] text-white px-10 py-3 font-bold rounded shadow hover:bg-cyan-700 border-b-4 border-cyan-400 transition-all"
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
