import LoginForm from '../components/LoginForm'
function LoginPage( {onLogin} )
{
    return (
        <div>
            <h1>Welcome to This Casting App</h1>
            <LoginForm onLogin={onLogin} />
        </div>
    );
}

export default LoginPage;