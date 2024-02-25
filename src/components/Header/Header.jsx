import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsername } from '../../redux/selectors';
import { sessionStorageKeys } from '../../const/const';
import { desksActions } from '../../redux/desks-slice';
import cls from './Header.module.scss';
import { ModalComponent } from '../Modal/Modal';
import { createDesk } from '../../redux/api/createDesk';
import { ReactComponent as PlusIcon } from '../../assets/images/plus.svg';
import { ReactComponent as ArrowIcon } from '../../assets/images/arrow.svg';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
    const [modal, setModal] = useState(false);
    const [deskTitle, setDeskTitle] = useState('');
    const username = useSelector(selectUsername);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        const name = sessionStorage.getItem(sessionStorageKeys.username);
        dispatch(desksActions.setUsername(name));
    }, []);

    const onCreateDesk = () => {
        dispatch(createDesk(deskTitle));
        setModal(false);
    };

    const onClose = () => {
        setModal(false);
    };

    const onBackToMainPage = () => {
        navigate('/');
    };

    return (
        <header className={cls.header}>
            {pathname !== '/' && <div className={cls.btnBack} onClick={onBackToMainPage}>
                <ArrowIcon className={cls.icon} />
                Back
            </div>}
            <div className={cls.subRow}>
                {pathname === '/' && <div className={cls.createWrapper} onClick={() => setModal(true)}>
                    <PlusIcon className={cls.icon} />
                    <p>Create new desk</p>
                </div>
                }
                <p>Hello {username}!</p>
            </div>

            <ModalComponent status={modal} onClose={onClose} onCreate={onCreateDesk} text={deskTitle}
                            setText={setDeskTitle} title={'Desk title'} btnText={'Create'} />
        </header>
    );
};
