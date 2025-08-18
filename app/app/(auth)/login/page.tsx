'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Zap, ArrowRight } from 'lucide-react';
import { demoAuth } from '@/lib/auth/demo-auth';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = () => {
    setIsLoading(true);
    // Simulate a quick loading state for better UX
    setTimeout(() => {
      demoAuth.login();
      window.location.href = '/';
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blox-purple-deep via-blox-darkblue to-blox-darkblue2" />
      
      {/* Floating orbs for visual interest */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-blox-teal/20 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blox-purple-DEFAULT/20 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-dark rounded-2xl p-8 border border-blox-glass-border">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blox-teal to-blox-success rounded-2xl mb-4"
            >
              <Gamepad2 className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-blox-text-primary mb-2">
              Welcome to Blox Buddy
            </h1>
            <p className="text-blox-text-muted">
              Your journey to Roblox mastery starts here
            </p>
          </div>

          {/* Demo Login Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 p-4 bg-blox-teal/10 border border-blox-teal/30 rounded-lg"
          >
            <div className="flex items-start gap-2">
              <Zap className="w-5 h-5 text-blox-teal mt-0.5" />
              <div className="text-sm text-blox-text-secondary">
                <span className="font-semibold text-blox-teal">Demo Mode Active</span>
                <br />
                Click below to instantly explore the app. No signup required!
              </div>
            </div>
          </motion.div>

          {/* Big Demo Login Button */}
          <motion.button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-blox-teal to-blox-success text-white font-bold text-lg rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-glow-teal disabled:opacity-50 disabled:cursor-not-allowed group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Enter Demo Mode</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blox-glass-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-blox-darkblue2 text-blox-text-muted">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Future Login Options (Disabled) */}
          <div className="space-y-3 opacity-40">
            <button
              disabled
              className="w-full py-3 px-6 bg-[#5865F2] text-white font-semibold rounded-lg flex items-center justify-center gap-3 cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 71 55" fill="none">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.3018 16.3068 45.2031C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2031C54.7816 45.3018 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor"/>
              </svg>
              <span>Discord Login (Requires Supabase)</span>
            </button>

            <button
              disabled
              className="w-full py-3 px-6 bg-blox-darkblue/50 text-white/50 font-semibold rounded-lg cursor-not-allowed"
            >
              Email Login (Coming Soon)
            </button>
          </div>

          {/* Info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-blox-text-muted">
              Demo mode gives you full access to explore the app.
              <br />
              Your progress won't be saved until you create a real account.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}