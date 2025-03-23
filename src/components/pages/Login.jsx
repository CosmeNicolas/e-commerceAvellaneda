import FormularioRegistro from "../fragments/FormularioRegistro";
import "../../css/index.css"
const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center fondo">
      <FormularioRegistro idPage="login" />
    </div>
  );
};

export default LoginPage;