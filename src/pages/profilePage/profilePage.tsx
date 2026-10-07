import "./profilePage.scss";

export const ProfilePage = () => (
    <section className="profile-page">
        <header className="profile-page__header">
            <p className="profile-page__eyebrow">АККАУНТ</p>
            <h1 className="profile-page__title">Личный кабинет</h1>
            <p className="profile-page__description">
                Войдите в аккаунт, чтобы управлять профилем и настройками.
            </p>
        </header>

        <div className="profile-page__status" role="status">
            <div className="profile-page__avatar" aria-hidden="true">?</div>
            <div>
                <h2 className="profile-page__status-title">Гостевой режим</h2>
                <p className="profile-page__status-description">
                    Авторизация пока недоступна. Данные профиля появятся после входа.
                </p>
            </div>
        </div>
    </section>
);