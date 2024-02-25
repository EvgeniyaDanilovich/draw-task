import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { Header } from './components/Header/Header';
import { DeskSecPage } from './pages/DeskSecPage/DeskSecPage';

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/d/:deskId" element={<DeskSecPage />} />
            </Routes>
        </div>
    );
}

export default App;
