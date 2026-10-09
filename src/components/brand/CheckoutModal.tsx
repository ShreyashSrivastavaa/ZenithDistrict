'use client';

import React, { useState } from 'react';
import { ApparelProduct, ApparelSize, GarmentColorway } from '@/data/types';
import { X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { commerceAdapter } from '@/lib/commerce';

interface CheckoutModalProps {
  product: ApparelProduct;
  colorway: string;
  size: ApparelSize;
  onClose: () => void;
}

export function CheckoutModal({ product, colorway, size, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'submitting' | 'success' | 'error'>('form');
  const [errorMsg, setErrorMsg] = useState('');
  const [orderId, setOrderId] = useState('');

  const formattedPrice = commerceAdapter.formatPrice(product.price, product.currency);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStep('submitting');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const customer = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address1: formData.get('address1'),
      city: formData.get('city'),
      state_id: formData.get('state_id') || 'Maharashtra',
      zip: formData.get('zip'),
      country_id: 'IN',
    };

    try {
      const res = await fetch('/api/qikink/order/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setOrderId(data.orderId);
        setStep('success');
      } else {
        setErrorMsg(data.error || 'Failed to place order.');
        setStep('error');
      }
    } catch (err) {
      setErrorMsg('A network error occurred.');
      setStep('error');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[var(--bg-page)] border border-[var(--border-color)] shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--border-color)] bg-[var(--surface-elevated)]">
          <div>
            <h2 className="font-display text-xl font-medium tracking-tight">Express Checkout</h2>
            <p className="font-mono-tag text-[10px] text-[var(--stone)] mt-1 uppercase tracking-wider">
              Secure Sandbox Environment
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--stone)] hover:text-[var(--text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          {/* Order Summary */}
          <div className="mb-8 p-4 bg-[var(--surface-elevated)] border border-[var(--border-color)]">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-sm">{product.name}</h3>
              <span className="font-mono-tag tabular-nums">{formattedPrice}</span>
            </div>
            <div className="flex justify-between items-end font-mono-tag text-xs text-[var(--stone)]">
              <div className="space-y-1 uppercase">
                <p>Color: {colorway}</p>
                <p>Size: {size}</p>
                <p>Qty: 1</p>
              </div>
              <p className="text-right">Total: {formattedPrice}</p>
            </div>
          </div>

          {step === 'form' && (
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-mono-tag text-xs tracking-wider uppercase text-[var(--stone)] border-b border-[var(--border-color)] pb-2">
                  Shipping Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="first_name" className="block font-mono-tag text-[10px] uppercase text-[var(--text-primary)]">First Name</label>
                    <input required type="text" id="first_name" name="first_name" className="w-full h-10 px-3 bg-transparent border border-[var(--border-color)] focus:border-[var(--text-primary)] focus:outline-none text-sm font-mono transition-colors" placeholder="Jane" defaultValue="Jane" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="last_name" className="block font-mono-tag text-[10px] uppercase text-[var(--text-primary)]">Last Name</label>
                    <input required type="text" id="last_name" name="last_name" className="w-full h-10 px-3 bg-transparent border border-[var(--border-color)] focus:border-[var(--text-primary)] focus:outline-none text-sm font-mono transition-colors" placeholder="Doe" defaultValue="Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block font-mono-tag text-[10px] uppercase text-[var(--text-primary)]">Email Address</label>
                    <input required type="email" id="email" name="email" className="w-full h-10 px-3 bg-transparent border border-[var(--border-color)] focus:border-[var(--text-primary)] focus:outline-none text-sm font-mono transition-colors" placeholder="jane@example.com" defaultValue="jane@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block font-mono-tag text-[10px] uppercase text-[var(--text-primary)]">Phone Number</label>
                    <input required type="tel" id="phone" name="phone" className="w-full h-10 px-3 bg-transparent border border-[var(--border-color)] focus:border-[var(--text-primary)] focus:outline-none text-sm font-mono transition-colors" placeholder="9876543210" defaultValue="9876543210" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="address1" className="block font-mono-tag text-[10px] uppercase text-[var(--text-primary)]">Address</label>
                  <input required type="text" id="address1" name="address1" className="w-full h-10 px-3 bg-transparent border border-[var(--border-color)] focus:border-[var(--text-primary)] focus:outline-none text-sm font-mono transition-colors" placeholder="123 Example Street" defaultValue="123 Example Street" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="city" className="block font-mono-tag text-[10px] uppercase text-[var(--text-primary)]">City</label>
                    <input required type="text" id="city" name="city" className="w-full h-10 px-3 bg-transparent border border-[var(--border-color)] focus:border-[var(--text-primary)] focus:outline-none text-sm font-mono transition-colors" placeholder="Mumbai" defaultValue="Mumbai" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="state_id" className="block font-mono-tag text-[10px] uppercase text-[var(--text-primary)]">State</label>
                    <input required type="text" id="state_id" name="state_id" className="w-full h-10 px-3 bg-transparent border border-[var(--border-color)] focus:border-[var(--text-primary)] focus:outline-none text-sm font-mono transition-colors" placeholder="Maharashtra" defaultValue="Maharashtra" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="zip" className="block font-mono-tag text-[10px] uppercase text-[var(--text-primary)]">Postal Code</label>
                    <input required type="text" id="zip" name="zip" className="w-full h-10 px-3 bg-transparent border border-[var(--border-color)] focus:border-[var(--text-primary)] focus:outline-none text-sm font-mono transition-colors" placeholder="400001" defaultValue="400001" />
                  </div>
                </div>
              </div>
            </form>
          )}

          {step === 'submitting' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--text-primary)]" />
              <p className="font-mono-tag text-xs uppercase tracking-widest text-[var(--stone)]">
                Processing Order...
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 border border-green-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-medium">Order Confirmed</h3>
                <p className="text-[var(--stone)] text-sm">
                  Your sandbox order has been successfully placed.
                </p>
              </div>
              <div className="bg-[var(--surface-elevated)] border border-[var(--border-color)] p-4 w-full max-w-sm">
                <p className="font-mono-tag text-[10px] text-[var(--stone)] uppercase mb-1">Order ID</p>
                <p className="font-mono text-lg">{orderId}</p>
              </div>
              <button
                onClick={onClose}
                className="w-full max-w-sm h-12 bg-[var(--text-primary)] text-[var(--bg-page)] hover:bg-[var(--signal)] hover:text-white font-mono-tag text-xs tracking-widest uppercase transition-colors focus-visible:outline-none"
              >
                Continue Shopping
              </button>
            </div>
          )}

          {step === 'error' && (
            <div className="py-8 flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 border border-red-500/20">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl font-medium text-red-500">Checkout Failed</h3>
                <p className="text-[var(--stone)] text-sm">{errorMsg}</p>
              </div>
              <div className="flex w-full max-w-sm gap-3">
                <button
                  onClick={() => setStep('form')}
                  className="flex-1 h-12 border border-[var(--border-color)] hover:border-[var(--text-primary)] font-mono-tag text-xs tracking-widest uppercase transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 h-12 bg-[var(--text-primary)] text-[var(--bg-page)] hover:bg-[var(--signal)] hover:text-white font-mono-tag text-xs tracking-widest uppercase transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer (Only for form step) */}
        {step === 'form' && (
          <div className="p-4 sm:p-6 border-t border-[var(--border-color)] bg-[var(--surface-elevated)] flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="font-mono-tag text-[10px] text-[var(--stone)] uppercase">
              No real payment will be collected.
            </p>
            <button
              type="submit"
              form="checkout-form"
              className="w-full sm:w-auto px-8 h-12 bg-[var(--text-primary)] text-[var(--bg-page)] hover:bg-[var(--signal)] hover:text-white font-mono-tag text-xs tracking-widest uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]"
            >
              Place Test Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
