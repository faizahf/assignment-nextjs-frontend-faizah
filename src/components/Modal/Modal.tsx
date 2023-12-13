import React, { ReactNode, useEffect, useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 w-full h-full z-10 justify-center items-center">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="relative bg-white z-10 p-5 w-1/4 rounded-lg bg-light-grey hover:shadow-[2px_3px_10px_4px_#D8472726]">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
