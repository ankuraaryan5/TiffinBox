export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918709499413" // replace with your number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10a9 9 0 1116.96 5.94L21 21l-5.06-1.04A9 9 0 013 10z"
        />
      </svg>
    </a>
  );
}
