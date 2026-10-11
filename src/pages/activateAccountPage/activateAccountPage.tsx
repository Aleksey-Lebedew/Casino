import { useNavigate, useParams } from 'react-router-dom';
import { ActivateAccountForm } from '../../components/ActivateAccountForm/ActivateAccountForm';
import '../profilePage/profilePage.scss';

export const ActivateAccountPage = () => {
    const { uid = '', token = '' } = useParams();
    const navigate = useNavigate();

    return <ActivateAccountForm initialUid={uid} initialToken={token} onSwitchToLogin={() => navigate('/profile')} />;
};
