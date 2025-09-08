import RegisterForm from '../components/RegisterForm';

function RegisterPage( {onLogin} )
{
    return (
        <div>
            
            <RegisterForm onLogin={onLogin} />
        </div>
    );
}

export default RegisterPage;