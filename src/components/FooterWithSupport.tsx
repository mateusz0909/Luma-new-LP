import React, { useState } from 'react';
import { Coffee, Heart, Check, Copy } from 'lucide-react';

export function FooterWithSupport() {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const buyMeACoffeeUrl = "https://buymeacoffee.com/mateuszbyrtus";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(buyMeACoffeeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Discrete Support Banner above bottom links */}
      <div className="py-8 px-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto font-mono text-xs text-[#0012da]">
        <div className="flex items-center gap-2 font-bold tracking-wider">
          <Heart className="w-4 h-4 fill-current text-[#0012da]" />
          <span>Independent indie project. 100% free with zero ads.</span>
        </div>

        <button
          onClick={() => setShowModal(true)}
          data-umami-event="Support Developer Modal Opened"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-[#d8d628] font-bold hover:bg-white hover:text-black transition-all shadow-md uppercase tracking-wider cursor-pointer"
        >
          <Coffee className="w-4 h-4" /> Support Developer ☕
        </button>
      </div>

      {/* Support Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0c0c0e] border border-white/15 rounded-[32px] p-8 max-w-lg w-full text-white shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d8d628] text-black flex items-center justify-center font-bold">
                  ☕
                </div>
                <h3 className="text-xl font-bold tracking-tight">Support Luma</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-neutral-400 hover:text-white text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-neutral-300 font-serif italic leading-relaxed mb-6">
              Luma was built out of frustration with \$80/year subscriptions for basic breathing clocks.
              It is 100% free, private, and offline forever. If Luma brings calm to your day, you can support indie development by buying a coffee.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={buyMeACoffeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="Buy Me a Coffee Outbound Click"
                className="w-full py-4 rounded-2xl bg-[#d8d628] text-black font-bold font-mono text-sm uppercase tracking-wider text-center hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Coffee className="w-4 h-4" /> Buy Me a Coffee (Web) →
              </a>

              <button
                onClick={handleCopyLink}
                data-umami-event="Support Link Copied"
                className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-neutral-300 font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Link Copied to Clipboard!' : 'Copy Support Link'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FooterWithSupport;
