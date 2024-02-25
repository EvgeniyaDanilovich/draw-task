import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDesks } from '../../redux/api/fetchDesks';
import { selectDesks } from '../../redux/selectors';
import { ModalComponent } from '../../components/Modal/Modal';
import { desksActions } from '../../redux/desks-slice';
import { sessionStorageKeys } from '../../const/const';
import cls from './MainPage.module.scss';

export const MainPage = () => {
    const dispatch = useDispatch();
    const desks = useSelector(selectDesks);
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        dispatch(fetchDesks());

        const name = sessionStorage.getItem(sessionStorageKeys.username);
        if (!name) {
            setModal(true);
        }
    }, []);

    const handleRedirect = useCallback((deskId) => {
        navigate(`/d/${deskId}`);
    }, []);

    const onCreate = () => {
        setModal(false);
        dispatch(desksActions.setUsername(name));
        sessionStorage.setItem(sessionStorageKeys.username, name);
    };

    const renderDesks = useMemo(() => {
        return desks.map(desk => {
            return (
                <div key={desk.id} onClick={() => handleRedirect(desk.id)} className={cls.deskPreview}>
                    <div className={cls.subtitle}>{desk.title}</div>
                    {desk.thumbnailUrl && <img src={desk.thumbnailUrl} alt={'desk preview'} />}
                </div>
            );
        });
    }, [desks]);

    return (
        <section className={cls.desksWrapper}>
            <h1 className={cls.title}>Desks</h1>
            <div className={cls.desks}>
                {renderDesks}
            </div>
            <ModalComponent status={modal} onCreate={onCreate}
                            text={name} setText={setName} title={'Your name'} btnText={'Save'} />
        </section>
    );
};
