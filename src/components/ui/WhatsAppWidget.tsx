"use client";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppWidget = () => {
  const phoneNumber = "14754410119";
  const message =
    "Hello! I would like to inquire about your cabinetry solutions.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:bg-[#20ba5a]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp size={32} />
        <span className="sr-only">Chat on WhatsApp</span>

        {/* Pulsing effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping" />
      </motion.a>
    </div>
  );
};

export default WhatsAppWidget;
