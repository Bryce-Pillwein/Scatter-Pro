import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  variables: string[];
  onSelect: (variable: string) => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ variables, onSelect, onClose }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { onClose(); }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed top-0 inset-0 flex items-center justify-center bg-neutral-950 bg-opacity-50 z-50">
      <div className=" p-6 rounded-md w-1/3 max-h-[85vh] overflow-y-auto " style={{ backgroundColor: 'hsl(0, 0%, 13%)' }}>
        <div className="flex justify-between items-center">
          <h2 className="text-m py-6 text-center">Select Dependent Variable</h2>
          <button onClick={onClose} className="px-3 py-1 bg-neutral-800 text-white rounded-md hover:bg-slate-800" >Cancel</button>
        </div>
        <div className="mb-4">
          {variables.map((variable) => (
            <div key={variable} className="flex items-center mb-4 py-1 px-4 rounded-lg cursor-pointer hover:bg-neutral-700"
              onClick={() => onSelect(variable)}>
              <p className='text-s'>{variable}</p>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
