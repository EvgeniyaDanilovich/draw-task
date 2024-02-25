import React, { useState } from 'react';
import cls from './ToolBar.module.scss';
import { ReactComponent as PenIcon } from '../../assets/images/pen.svg';
import { ReactComponent as EraserIcon } from '../../assets/images/eraser.svg';
import { ReactComponent as SaveIcon } from '../../assets/images/save.svg';

export const ToolBar = ({ setTool, stage }) => {
    const [activeTool, setActiveTool] = useState('pen');

    function downloadURI(uri, name) {
        let link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleExport = () => {
        const uri = stage.toDataURL();
        downloadURI(uri, 'stage.jpg');
    };

    const onChangeTool = (tool) => {
        setTool(tool);
        setActiveTool(tool);
    };

    return (
        <div className={cls.toolBar}>
            <div onClick={() => onChangeTool('pen')}>
                <PenIcon className={`${cls.icon} ${activeTool === 'pen' ? cls.active : ''}`} />
            </div>
            <div onClick={() => onChangeTool('eraser')}>
                <EraserIcon className={`${cls.icon} ${activeTool === 'eraser' ? cls.active : ''}`} />
            </div>
            <div onClick={handleExport}><SaveIcon className={cls.icon} /></div>
        </div>
    );
};
