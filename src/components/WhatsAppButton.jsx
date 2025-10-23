export default function WhatsAppButton() {
  const phone = "5521973222743";
  const msg = encodeURIComponent("Olá! Vim pelo site da M2 Flex e gostaria de falar com o SAC.");

  return (
    <a
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-0 bottom-4 md:bottom-6 z-50"
    >
      {/* pill sem glow + saída reta à direita */}
      <div className="wpp-pill wpp-reset flex items-center justify-center h-12 px-5 pr-6">
        <svg
          viewBox="0 0 32 32"
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M26.5 14.9c0 6.4-5.2 11.6-11.6 11.6-2 0-3.9-.5-5.5-1.4L5.5 26.5l1.5-3.8c-1-1.7-1.6-3.6-1.6-5.7C5.5 10.6 10.7 5.4 17.1 5.4s9.4 5.2 9.4 9.5Z" />
          <path d="M19.7 17.6c-.3-.2-1.8-.9-2-.9s-.5 0-.7.3c-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.6-2.9-1.8-3.8-3.3-.1-.3 0-.4.2-.6.2-.2.3-.3.5-.5.2-.1.2-.3.3-.5 0-.2 0-.4 0-.6 0-.2-.6-1.8-.9-2.5-.2-.6-.4-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.8.7-1.2 1.6-1.2 2.7 0 .3 0 .6.1.9.4 1.7 1.4 3.2 2.7 4.5 1.7 1.7 3.8 2.8 6.1 3.2.4.1.7.1 1.1.1 1 0 2-.3 2.8-.9.3-.2.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.1-.2-.2-.3-.2Z" />
        </svg>
      </div>
    </a>
  );
}
