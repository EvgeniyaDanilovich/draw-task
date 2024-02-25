import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalComponent = (props) => {
    const { status, onClose, onCreate, text, setText, title, btnText } = props;
    const [disabled, setDisabled] = useState(true);

    const handleInput = (e) => {
        setText(e.target.value);
    };

    useEffect(() => {
        text ? setDisabled(false) : setDisabled(true);
    }, [text]);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <Modal show={status} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type={'text'} value={text} onChange={handleInput} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onCreate} disabled={disabled}>
                    {btnText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};