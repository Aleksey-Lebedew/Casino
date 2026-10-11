import './loader.scss';

export const Loader = ({ message = 'Ожидание данных...' }) => {
    return (
        <div className="loader-container" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true"></div>
            <p className="loader-text">{message}</p>
        </div>
    );
};