import React from 'react';
import { motion } from 'framer-motion';
import tutorialGif from '../assets/HaiClick-tutorial.gif';
import clickGif from '../assets/click.gif';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onContinue }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-white p-8 rounded-lg shadow-lg relative select-none"
      >
        <h2 className="text-2xl font-bold mb-4 text-black">Taking a Break</h2>
        <p className="mb-4 text-black">Your progress is saved. Do you want to continue?</p>
        <div className="relative mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tutorialGif.src} alt="Tutorial" className="w-full h-auto rounded-lg" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={clickGif.src} alt="Click" className="absolute bottom-4 right-4 w-24 h-25" />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={onContinue}
          >
            Continue
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;