using System;
using System.Web.Script.Services;
using System.Web.Services;

namespace CMWebApplication
{
    public partial class Channel : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetAdminMensagem(string id, string tipo, string condominio, string msg)
        {
            return Core.Controller.Mensagem.SetAdminMensagem(id, tipo, condominio, msg);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetLimparNotificacao(string id)
        {
            return Core.Controller.Mensagem.SetLimparNotificacao(id);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object CarregaPagina()
        {
            return Core.Controller.Principal.CarregaPagina();
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object CarregaPaginaBackground(string id)
        {
            return Core.Controller.Principal.CarregaPaginaBackground(id);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetLogin(string usuario, string senha)
        {
            return Core.Controller.Login.SetLogin(usuario, senha);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetCadastro(string nome, string sobrenome, string usuario, string senha, string telefone, string celular, string bloco, 
            string rua, string casa, string mensagem, string imei, string img)
        {
            return Core.Controller.Cadastro.SetCadastro(nome,  sobrenome,  usuario,  senha,  telefone,  celular,  bloco, rua,  casa,  mensagem,  imei, img);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetUpdateCadastro(string id, string nome, string sobrenome, string usuario, string senha,
            string telefone, string celular, string bloco,
            string rua, string casa, string mensagem, string imei, string img)
        {
            return Core.Controller.Cadastro.SetUpdateCadastro(id, nome, sobrenome, usuario, senha, telefone, celular,
                bloco, rua, casa, mensagem, imei, img);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object GetMensagem(string id) 
        {
            return Core.Controller.Mensagem.GetMensagem(id);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetMensagem(string id, string iddestino, string mensagemdesc)
        {
            return Core.Controller.Mensagem.SetMensagem(id, iddestino, mensagemdesc);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetBlock(string iduser, string id)
        {
            return Core.Controller.Mensagem.SetBlock(iduser, id);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetLimpar(string iduser, string id)
        {
            return Core.Controller.Mensagem.SetLimpar(iduser, id);
        }
    }
}