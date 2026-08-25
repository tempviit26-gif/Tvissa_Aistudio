import React, { useState } from 'react';
import { User, ActiveScreen } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface CreateAccountScreenProps {
  onLogin: (user: User) => void;
  setActiveScreen: (screen: ActiveScreen) => void;
}

export const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({
  onLogin,
  setActiveScreen,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeNewsletter, setAgreeNewsletter] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please provide your full legal name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please provide a valid patron email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: fullName.trim(),
        email: email.trim(),
      });
      setActiveScreen('home');
    }, 600);
  };

  return (
    <div className="pt-28 pb-stack-lg min-h-[80vh] flex items-center justify-center">
      <main className="max-w-lg mx-auto px-margin-mobile md:px-margin-desktop w-full">
        <div className="p-8 sm:p-12 border border-outline-variant bg-surface-container-lowest space-y-8">
          
          <div className="text-center space-y-2">
            <span className="font-label-caps text-[10px] uppercase tracking-[0.3em] text-secondary font-bold block">
              Join The Tvisaa Guild
            </span>
            <h1 className="font-display-lg text-3xl text-primary font-normal">
              Create Patron Account
            </h1>
            <p className="font-body-md text-xs text-on-surface-variant max-w-xs mx-auto">
              Receive priority access to private salon drops, bespoke atelier commissions, and archival certificates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              variant="boxed"
              label="Full Name"
              type="text"
              required
              placeholder="Eleanor Vance"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <Input
              variant="boxed"
              label="Email Address"
              type="email"
              required
              placeholder="eleanor@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                variant="boxed"
                label="Password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                variant="boxed"
                label="Confirm Password"
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-xs text-error">{error}</p>}

            <div className="pt-2 space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs font-body-md text-on-surface-variant">
                <input
                  type="checkbox"
                  checked={agreeNewsletter}
                  onChange={(e) => setAgreeNewsletter(e.target.checked)}
                  className="rounded-none border-outline-variant text-primary focus:ring-0 mt-0.5"
                />
                <span>
                  Receive private invitations to confidential casting releases and salon trunk shows.
                </span>
              </label>
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                type="submit"
              >
                Register Patron Dossier
              </Button>
            </div>
          </form>

          <div className="pt-6 border-t border-outline-variant text-center">
            <p className="font-body-md text-xs text-on-surface-variant">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setActiveScreen('login')}
                className="font-button uppercase tracking-wider text-secondary font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
