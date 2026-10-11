import { useState, type FormEvent } from 'react';
import { activateUserApi } from '../../api/authAPi';

interface ActivateAccountFormProps {
    onSwitchToLogin: () => void;
    initialUid?: string;
    initialToken?: string;
}

export const ActivateAccountForm = ({
    onSwitchToLogin,
    initialUid = '',
    initialToken = '',
}: ActivateAccountFormProps) => {
    const [uid, setUid] = useState(initialUid);
    const [token, setToken] = useState(initialToken);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        setIsSuccess(false);

        const result = await activateUserApi(uid.trim(), token.trim());
        setIsSuccess(result.success);
        setMessage(result.success ? 'Аккаунт активирован. Теперь войдите в него.' : result.message);
        setIsSubmitting(false);
    };

    return (
        <div className="auth-form">
            <h2 className="auth-form__title">Активировать аккаунт</h2>
            <p className="auth-form__description">
                Если ссылка из письма открыла страницу ошибки, вставьте сюда UID и token из ссылки.
            </p>

            <form className="auth-form__fields" onSubmit={onSubmit}>
                <div className="auth-form__field">
                    <label htmlFor="activation-uid">UID</label>
                    <input
                        id="activation-uid"
                        autoComplete="off"
                        required
                        value={uid}
                        onChange={(event) => setUid(event.target.value)}
                    />
                </div>
                <div className="auth-form__field">
                    <label htmlFor="activation-token">Token</label>
                    <input
                        id="activation-token"
                        autoComplete="off"
                        required
                        value={token}
                        onChange={(event) => setToken(event.target.value)}
                    />
                </div>
                <button className="auth-form__submit" type="submit" disabled={isSubmitting || isSuccess}>
                    {isSubmitting ? 'Активируем...' : 'Активировать аккаунт'}
                </button>
            </form>

            {message && (
                <p
                    className={`auth-form__message${isSuccess ? ' auth-form__message--success' : ''}`}
                    role={isSuccess ? 'status' : 'alert'}
                >
                    {message}
                </p>
            )}

            <p className="auth-form__switch">
                Уже активировали аккаунт?{' '}
                <button type="button" onClick={onSwitchToLogin}>Перейти ко входу</button>
            </p>
        </div>
    );
};
