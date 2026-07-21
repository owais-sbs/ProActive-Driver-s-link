'use client';

const SUCCESS_SVG = '/images/success.svg';
const DEFAULT_MESSAGE = 'Submitted successfully';

/**
 * Centered success overlay — SVG + message, no modal/buttons, auto-dismisses.
 */
export function showSuccessSwal(options?: { title?: string; text?: string }) {
  if (typeof document === 'undefined') return Promise.resolve();

  const message = options?.text ?? options?.title ?? DEFAULT_MESSAGE;

  const overlay = document.createElement('div');
  overlay.setAttribute('role', 'status');
  overlay.setAttribute('aria-live', 'polite');
  overlay.className =
    'fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 transition-opacity duration-300 pointer-events-none';

  overlay.innerHTML = `
    <div class="flex flex-col items-center gap-4 px-6 text-center">
      <img src="${SUCCESS_SVG}" alt="" width="140" height="140" class="h-[140px] w-[140px] sm:h-[160px] sm:w-[160px]" />
      <p class="font-display text-lg font-bold text-white sm:text-xl">${escapeHtml(message)}</p>
    </div>
  `;

  document.body.appendChild(overlay);

  return new Promise<void>((resolve) => {
    window.setTimeout(() => {
      overlay.style.opacity = '0';
      window.setTimeout(() => {
        overlay.remove();
        resolve();
      }, 300);
    }, 2400);
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
