import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUserApi, type RegisterData } from '../../api/authAPi';
import { useState } from 'react';

interface RegisterFormProps {
    onSwitchToLogin: () => void;
    onSwitchToActivate: () => void;
}

const RegisterForm = ({ onSwitchToLogin, onSwitchToActivate }: RegisterFormProps) => {
    const [serverMessage, setServerMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const formik = useFormik<RegisterData>({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Обязательное поле'),
            email: Yup.string().email('Неверный формат email').required('Обязательное поле'),
            password: Yup.string().min(6, 'Минимум 6 символов').required('Обязательное поле'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setServerMessage('');
            setIsSuccess(false);

            const result = await registerUserApi(values);

            if (result.success) {
                setIsSuccess(true);
                setServerMessage(
                    'Регистрация прошла успешно. Если вход не сработает, возможно, аккаунт нужно активировать по ссылке из письма.',
                );
                resetForm();
            } else {
                setServerMessage(
                    ('message' in result && result.message) ||
                    'Ошибка регистрации. Проверьте введённые данные и попробуйте снова.',
                );
            }
            setSubmitting(false);
        },
    });

    return (
        <div className="auth-form">
            <h2 className="auth-form__title">Создать аккаунт</h2>
            <p className="auth-form__description">Зарегистрируйтесь, чтобы получить доступ к профилю.</p>

            <form className="auth-form__fields" onSubmit={formik.handleSubmit}>
                <div className="auth-form__field">
                    <label htmlFor="register-username">Имя пользователя</label>
                    <input id="register-username" type="text" autoComplete="username" {...formik.getFieldProps('username')} />
                    {formik.touched.username && formik.errors.username && (
                        <div className="auth-form__field-error">{formik.errors.username}</div>
                    )}
                </div>

                <div className="auth-form__field">
                    <label htmlFor="register-email">Email</label>
                    <input id="register-email" type="email" autoComplete="email" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email && (
                        <div className="auth-form__field-error">{formik.errors.email}</div>
                    )}
                </div>

                <div className="auth-form__field">
                    <label htmlFor="register-password">Пароль</label>
                    <input id="register-password" type="password" autoComplete="new-password" {...formik.getFieldProps('password')} />
                    {formik.touched.password && formik.errors.password && (
                        <div className="auth-form__field-error">{formik.errors.password}</div>
                    )}
                </div>

                <button className="auth-form__submit" type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
            </form>

            {serverMessage && (
                <p className={`auth-form__message${isSuccess ? ' auth-form__message--success' : ''}`} role="status">
                    {serverMessage}
                </p>
            )}

            <p className="auth-form__switch">
                Уже есть аккаунт?{' '}
                <button type="button" onClick={onSwitchToLogin}>Войти</button>
            </p>
            <p className="auth-form__switch">
                Нужно подтвердить email?{' '}
                <button type="button" onClick={onSwitchToActivate}>Активировать аккаунт</button>
            </p>
        </div>
    );
};

export default RegisterForm;