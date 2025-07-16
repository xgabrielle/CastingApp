import RegisterForm from '../components/RegisterForm';

function RegisterPage( {onLogin} )
{
    return (
        <div>
            <h1> Register Page</h1>
            <RegisterForm onLogin={onLogin} />
        </div>
    );
}

export default RegisterPage;