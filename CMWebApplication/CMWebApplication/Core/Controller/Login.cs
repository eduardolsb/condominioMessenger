using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using CMWebApplication.Core.Model;

namespace CMWebApplication.Core.Controller
{
    public class Login
    {

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetLogin(string usuario, string senha)
        {
            var repo = new CMDataContextDataContext();

            var empresa = repo.Empresas.FirstOrDefault(a => a.FlgAtivo == true);
            if (empresa == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Empresa não cadastrada"
                };
            }

            var blocos = repo.Blocos.Where(a => a.FlgAtivo == true && a.IdEmpresa == empresa.Id);
            if (!blocos.Any())
            {
                return new ViewModel.PrincipalResult("0", "Empresa não configurada. Blocos não cadastrados", empresa, blocos.ToList());
            }

            var user = repo.Usuarios.FirstOrDefault(a => a.Usuario1 == usuario && a.IdEmpresa == empresa.Id);
            if (user == null)
            {
                return new ViewModel.PrincipalResult("0", "Usuário inexistente", empresa, blocos.ToList());
            }
            if (user.Senha != senha)
            {
                return new ViewModel.PrincipalResult("0", "Senha incorreta", empresa, blocos.ToList());
            }

            if (user.FlgAprovado == false)
            {
                return new ViewModel.PrincipalResult("0", "Usuário cadastrado, mas precisa aprovar uso na administração", empresa, blocos.ToList());
            }

            return new ViewModel.PrincipalResult("1", "", empresa, blocos.ToList(), user);

        }

    }
}