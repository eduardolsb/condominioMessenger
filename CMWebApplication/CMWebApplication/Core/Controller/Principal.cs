using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using CMWebApplication.Core.Model;

namespace CMWebApplication.Core.Controller
{
    public class Principal
    {

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object CarregaPagina()
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


            return new ViewModel.PrincipalResult("1", "", empresa, blocos.ToList());
        }


        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object CarregaPaginaBackground(string id)
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

            var user = repo.Usuarios.FirstOrDefault(a => a.Id == long.Parse(id) && a.IdEmpresa == empresa.Id);
            if (user == null)
            {
                return new ViewModel.PrincipalResult("0", "Usuário inexistente", empresa, blocos.ToList());
            }
            
            return new ViewModel.PrincipalResult("1", "", empresa, blocos.ToList(), user);

        }

    }
}