import { useSearchParams } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { ActivateAccountForm } from "../../components/ActivateAccountForm/ActivateAccountForm";
import { useAuth } from "../../hooks/useAuth";
import "./profilePage.scss";

export const ProfilePage = () => {
    const { user, isLoading, error, logout } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const authMode = searchParams.get("auth");

    const switchToLogin = () => setSearchParams({ auth: "login" });
    const switchToRegister = () => setSearchParams({ auth: "register" });
    const switchToActivate = () => setSearchParams({ auth: "activate" });

    if (isLoading) {
        return (
            <section className="profile-page">
                <p className="profile-page__loading" role="status">Загружаем профиль...</p>
            </section>
        );
    }

    if (user) {
        const initials = user.username
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase();

        return (
            <section className="profile-page">
                <header className="profile-page__header">
                    <p className="profile-page__eyebrow">АККАУНТ</p>
                    <h1 className="profile-page__title">Личный кабинет</h1>
                    <p className="profile-page__description">
                        Управляйте своим профилем и настройками аккаунта.
                    </p>
                </header>

                <div className="profile-page__card">
                    <div className="profile-page__avatar" aria-label={`Аватар ${user.username}`}>
                        {initials || "?"}
                    </div>
                    <div className="profile-page__user-details">
                        <p className="profile-page__eyebrow">ПРОФИЛЬ</p>
                        <h2 className="profile-page__username">{user.username}</h2>
                        <p className="profile-page__email">{user.email}</p>
                    </div>
                    <button className="profile-page__logout" type="button" onClick={logout}>
                        Выйти из аккаунта
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="profile-page">
            <header className="profile-page__header">
                <p className="profile-page__eyebrow">АККАУНТ</p>
                <h1 className="profile-page__title">Личный кабинет</h1>
                <p className="profile-page__description">
                    Войдите в аккаунт или зарегистрируйтесь, чтобы открыть личный профиль.
                </p>
            </header>

            <div className="profile-page__auth-card">
                {error && <p className="profile-page__auth-error" role="alert">{error}</p>}
                {authMode === "register" ? (
                    <RegisterForm onSwitchToLogin={switchToLogin} onSwitchToActivate={switchToActivate} />
                ) : authMode === "activate" ? (
                    <ActivateAccountForm onSwitchToLogin={switchToLogin} />
                ) : (
                    <LoginForm
                        onLoginSuccess={() => setSearchParams({})}
                        onSwitchToRegister={switchToRegister}
                        onSwitchToActivate={switchToActivate}
                    />
                )}
            </div>
        </section>
    );
};
