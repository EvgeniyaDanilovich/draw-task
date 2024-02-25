import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Layer, Line, Stage } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { updateDesk } from '../../redux/api/updateDesk';
import { useParams } from 'react-router-dom';
import { fetchDeskById } from '../../redux/api/fetchDeskById';
import { selectCurrentDesk, selectUsername } from '../../redux/selectors';
import { desksActions } from '../../redux/desks-slice';
import { deskFields } from '../../const/const';
import { ToolBar } from '../../components/ToolBar/ToolBar';
import cls from './DeskPage.module.scss'

export const DeskSecPage = () => {
    const [tool, setTool] = useState('pen');
    const [lines, setLines] = useState([]);
    const currentDesk = useSelector(selectCurrentDesk);
    const username = useSelector(selectUsername);
    const { deskId } = useParams();
    const dispatch = useDispatch();
    const isDrawing = useRef(false);
    const socketRef = useRef(null);
    const stageRef = useRef(null);

    const screenWidth = window.innerWidth - 70 ;
    const screenHeight = window.innerHeight - 75

    useEffect(() => {
        dispatch(fetchDeskById(deskId));
    }, []);

    useEffect(() => {
        if (username) {
            // const socket = new WebSocket('ws://localhost:8000/socket');
            const socket = new WebSocket('wss://drawtaskserver-g5jl791w.b4a.run/socket');
            socketRef.current = socket;

            socket.onopen = () => {
                socket.send(JSON.stringify({
                    method: 'connection',
                    username: username,
                    id: deskId
                }));
            };
            socket.onmessage = (event) => {
                const serverMessage = JSON.parse(event.data);
                switch (serverMessage.method) {
                    case 'connection':
                        console.log(`User ${serverMessage.username} connected`);
                        break;
                    case 'draw':
                        drawHandler(serverMessage);
                        break;
                }
            };
        }
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [username]);

    // useLayoutEffect(() => {
    //     return () => {
    //         if (stageRef.current) {
    //             const uri = stageRef.current.toDataURL();
    //             dispatch(updateDesk({ deskId: deskId, field: deskFields.thumbnailUrl, value: uri }));
    //         }
    //     };
    // }, []);

    const drawHandler = (serverMessage) => {
        switch (serverMessage.figure.type) {
            case 'brush':
                dispatch(desksActions.addCurrentLines(serverMessage.figure.lines));
                break;
        }
    };

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines(prevLines => [...prevLines, { tool, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        setLines(prevLines => {
            const updatedLines = [...prevLines];
            const lastLine = updatedLines[updatedLines.length - 1];
            const updatedLastLine = { ...lastLine };
            updatedLastLine.points = updatedLastLine.points.concat([point.x, point.y]);
            updatedLines.splice(updatedLines.length - 1, 1, updatedLastLine);

            socketRef.current.send(JSON.stringify({
                method: 'draw',
                id: deskId,
                figure: {
                    type: 'brush',
                    lines: updatedLastLine
                }
            }));

            return updatedLines;
        });
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
        dispatch(updateDesk({ deskId: deskId, field: deskFields.lines, value: currentDesk.lines }));
    };

    return (
        <section className={cls.sectionWrapper} >
            <ToolBar setTool={setTool} stage={stageRef.current} />
            <Stage className="konva-container" width={screenWidth} height={screenHeight} ref={stageRef}
                   onMouseDown={handleMouseDown} onMousemove={handleMouseMove} onMouseup={handleMouseUp}>
                <Layer>
                    {!!currentDesk && !!currentDesk.lines && !!currentDesk.lines.length && currentDesk.lines.map((line, i) => (
                        <Line key={i} points={line.points} stroke="#df4b26"
                              strokeWidth={5} tension={0.5} lineCap="round" lineJoin="round"
                              globalCompositeOperation={
                                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                              }
                        />
                    ))}
                </Layer>
            </Stage>
        </section>
    );
};
