import './loader.scss';

export const Loader = ({ message = 'Ожидание данных...' }) => {
    return (
        <div className="loader-container">
            <div className="spinner" aria-label="Загрузка"></div>
            <p className="loader-text">{message}</p>
        </div>
    );
};