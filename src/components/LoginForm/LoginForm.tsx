import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { resendActivationEmailApi } from '../../api/authAPi';
import type { LoginData } from '../../api/authAPi';
import { useAuth } from '../../hooks/useAuth';

interface LoginFormProps {
    onLoginSuccess: () => void;
    onSwitchToRegister: () => void;
    onSwitchToActivate: () => void;
}

const LoginForm = ({ onLoginSuccess, onSwitchToRegister, onSwitchToActivate }: LoginFormProps) => {
    const [serverMessage, setServerMessage] = useState('');
    const { login } = useAuth();
    const [requiresActivation, setRequiresActivation] = useState(false);
    const [activationMessage, setActivationMessage] = useState('');
    const [isResendingActivation, setIsResendingActivation] = useState(false);

    const resendActivation = async () => {
        setIsResendingActivation(true);
        setActivationMessage('');

        const result = await resendActivationEmailApi(formik.values.email);
        setActivationMessage(
            result.success
                ? 'Если для этого аккаунта требуется активация, письмо отправлено. Проверьте почту и папку «Спам».'
                : result.message,
        );
        setIsResendingActivation(false);
    };

    const formik = useFormik<LoginData>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Неверный формат email').required('Обязательное поле'),
            password: Yup.string().required('Обязательное поле'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setServerMessage('');
            setRequiresActivation(false);
            setActivationMessage('');

            const result = await login(values);

            if (result.success) {
                onLoginSuccess();
            } else {
                setServerMessage(result.message || 'Ошибка входа');
                setRequiresActivation(Boolean(result.requiresActivation));
            }

            setSubmitting(false);
        },
    });

    return (
        <div className="auth-form">
            <h2 className="auth-form__title">Вход в аккаунт</h2>
            <p className="auth-form__description">Введите данные, указанные при регистрации.</p>

            <form className="auth-form__fields" onSubmit={formik.handleSubmit}>
                <div className="auth-form__field">
                    <label htmlFor="login-email">Email</label>
                    <input id="login-email" type="email" autoComplete="email" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email && (
                        <div className="auth-form__field-error">{formik.errors.email}</div>
                    )}
                </div>

                <div className="auth-form__field">
                    <label htmlFor="login-password">Пароль</label>
                    <input id="login-password" type="password" autoComplete="current-password" {...formik.getFieldProps('password')} />
                    {formik.touched.password && formik.errors.password && (
                        <div className="auth-form__field-error">{formik.errors.password}</div>
                    )}
                </div>

                <button className="auth-form__submit" type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Вход...' : 'Войти'}
                </button>
            </form>

            {serverMessage && <p className="auth-form__message" role="alert">{serverMessage}</p>}
            {requiresActivation && (
                <div className="auth-form__activation">
                    <button
                        className="auth-form__activation-button"
                        type="button"
                        disabled={isResendingActivation || !formik.values.email}
                        onClick={resendActivation}
                    >
                        {isResendingActivation ? 'Отправляем...' : 'Отправить письмо активации повторно'}
                    </button>
                    {activationMessage && <p className="auth-form__activation-message" role="status">{activationMessage}</p>}
                    <button
                        className="auth-form__activation-button"
                        type="button"
                        onClick={onSwitchToActivate}
                    >
                        У меня есть UID и token из письма
                    </button>
                </div>
            )}

            <p className="auth-form__switch">
                Нет аккаунта?{' '}
                <button type="button" onClick={onSwitchToRegister}>Зарегистрироваться</button>
            </p>
        </div>
    );
};

export default LoginForm;