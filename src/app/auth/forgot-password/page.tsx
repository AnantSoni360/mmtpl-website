'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setSuccess(true);
      toast.success('Password reset link sent to your email.');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bone)] px-4">
      <div className="w-full max-w-md bg-[var(--color-paper)] rounded-[16px] border-[0.5px] border-[var(--color-silver)] p-8 shadow-[var(--shadow-card)]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-2">
            Forgot Password?
          </h1>
          <p className="text-[15px] text-[var(--color-slate)] font-switzer">
            Enter your email to receive a password reset link.
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-[12px] text-green-700 text-[14px] font-switzer">
              If an account with that email exists, we have sent a password reset link to it. Please check your inbox.
            </div>
            <Link href="/auth/login" className="block text-[14px] font-medium text-[var(--color-lilac-bloom)] hover:underline">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[var(--color-obsidian)] font-switzer mb-1.5">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="dark"
              className="w-full h-12"
              disabled={loading}
            >
              {loading ? 'Sending link...' : 'Send Reset Link'}
            </Button>
            
            <div className="text-center">
              <Link href="/auth/login" className="text-[13px] font-medium text-[var(--color-slate)] hover:text-[var(--color-obsidian)] transition-colors">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
