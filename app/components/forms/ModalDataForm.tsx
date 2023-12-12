import ModalComponent from '@/packages/ui/modal/modal';
import React from 'react';

const ModalDataForm = ({ isOpen, onOpen, onClose, onOpenChange }) => {
  console.log('isOpen2', isOpen);
  console.log('onOpen2', onOpen);
  console.log('onClose2', onClose);
  return (
    <div>
      <ModalComponent
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        asd
      </ModalComponent>
    </div>
  );
};

export default ModalDataForm;
