import React, { useState } from 'react';
import { User, ActiveScreen } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  setActiveScreen: (screen: ActiveScreen) => void;
  user: User | null;
  onLogout: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  setActiveScreen,
  user,
  onLogout,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid patron email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const nameFromEmail = email.split('@')[0];
      const capitalized = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      onLogin({
        email,
        name: capitalized,
      });
      setActiveScreen('home');
    }, 600);
  };

  const handleDemoLogin = () => {
    setEmail('eleanor.vance@tvisaa.com');
    setPassword('atelier18k');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        email: 'eleanor.vance@tvisaa.com',
        name: 'Eleanor Vance',
      });
      setActiveScreen('home');
    }, 500);
  };

  if (user) {
    return (
      <div className="pt-28 pb-stack-lg min-h-[75vh] flex items-center justify-center">
        <main className="max-w-md mx-auto px-margin-mobile w-full text-center">
          <div className="p-8 border border-outline-variant bg-surface-container-lowest space-y-6">
            <div className="w-14 h-14 bg-surface-container border border-secondary flex items-center justify-center text-secondary mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <span className="font-label-caps text-[10px] uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
                Authenticated Patron
              </span>
              <h1 className="font-display-lg text-2xl text-primary font-normal">
                Welcome Back, {user.name}
              </h1>
              <p className="font-body-md text-xs text-on-surface-muted mt-1">
                {user.email}
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => setActiveScreen('collections')}
              >
                Browse Heirloom Vault
              </Button>
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={onLogout}
              >
                Sign Out of Dossier
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-stack-lg min-h-[80vh] flex items-center justify-center">
      <main className="max-w-lg mx-auto px-margin-mobile md:px-margin-desktop w-full">
        <div className="p-8 sm:p-12 border border-outline-variant bg-surface-container-lowest space-y-8">
          
          <div className="text-center space-y-2">
            <span className="font-label-caps text-[10px] uppercase tracking-[0.3em] text-secondary font-bold block">
              Private Patron Portal
            </span>
            <h1 className="font-display-lg text-3xl text-primary font-normal">
              Sign In to Your Dossier
            </h1>
            <p className="font-body-md text-xs text-on-surface-variant max-w-xs mx-auto">
              Access your bespoke commissions, diamond authenticity certificates, and archival orders.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              variant="boxed"
              label="Patron Email"
              type="email"
              required
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              variant="boxed"
              label="Password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
            />

            <div className="flex justify-between items-center text-xs font-body-md">
              <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded-none border-outline-variant text-primary focus:ring-0"
                />
                <span>Remember this device</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Password recovery credentials dispatched to registered email.')}
                className="text-secondary hover:underline font-label-caps text-[11px] uppercase tracking-wider"
              >
                Forgot?
              </button>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              type="submit"
            >
              Authenticate & Enter
            </Button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-3 border border-outline-subtle bg-surface-container-low text-xs font-label-caps uppercase tracking-wider text-on-surface-muted hover:text-primary hover:border-primary transition-colors text-center"
            >
              ⚡ Instant Demo Sign-In (Eleanor Vance)
            </button>
          </div>

          <div className="pt-6 border-t border-outline-variant text-center">
            <p className="font-body-md text-xs text-on-surface-variant">
              New to Tvisaa?{' '}
              <button
                type="button"
                onClick={() => setActiveScreen('register')}
                className="font-button uppercase tracking-wider text-secondary font-semibold hover:underline"
              >
                Create Patron Account
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
