function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return ( 
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white fixed justify-center rounded-lg shadow-lg p-4 w-auto h-auto mt-20 mb-20" onClick ={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
   );
}

export default Modal;