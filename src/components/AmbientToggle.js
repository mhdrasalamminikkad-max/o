import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const AmbientToggle = ({ isOn, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
        isOn ? 'bg-forest' : 'bg-mutedBlue/30'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOn ? 'Turn off ambient sounds' : 'Turn on ambient sounds'}
    >
      <motion.div
        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md flex items-center justify-center"
        animate={{ x: isOn ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isOn ? (
          <Volume2 className="h-2.5 w-2.5 text-forest" />
        ) : (
          <VolumeX className="h-2.5 w-2.5 text-mutedBlue" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default AmbientToggle;
