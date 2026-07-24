import { motion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';

interface WhatsAppFloatingProps {
  phone?: string;
  message?: string;
}

export function WhatsAppFloating({
  phone = '+966543019329',
  message = 'السلام عليكم، أرغب في الاستفسار عن خدمات سكراب صلد الشمال.',
}: WhatsAppFloatingProps) {
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone.replace(/\+/g, '')}?text=${encodedText}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 left-6 z-50 pointer-events-auto"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] transition-all hover:scale-105"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping group-hover:animate-none opacity-75" />
        
        {/* SVG WhatsApp icon */}
        <svg
          className="h-7 w-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.45.002 9.885-4.37 9.888-9.75.002-2.607-1.012-5.059-2.859-6.908C16.456 2.1 14.004.988 12.002.988c-5.46 0-9.9 4.37-9.902 9.752-.001 1.793.479 3.543 1.39 5.068L2.5 21.576l6.147-1.613" />
        </svg>

        {/* Tooltip on hover */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 bg-[#111612] text-[#f4ecdf] text-xs font-semibold px-3 py-2 rounded shadow-lg whitespace-nowrap transition-all duration-200 origin-right">
          تواصل معنا عبر واتساب
        </span>
      </a>
    </motion.div>
  );
}
