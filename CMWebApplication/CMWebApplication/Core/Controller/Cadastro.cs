using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using CMWebApplication.Core.Model;

namespace CMWebApplication.Core.Controller
{
    public class Cadastro
    {

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetCadastro(string nome, string sobrenome, string usuario, string senha, string telefone, string celular, string bloco,
            string rua, string casa, string mensagem, string imei, string img)
        {
            var repo = new CMDataContextDataContext();

            if (string.IsNullOrEmpty(nome))
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Precisa escrever um Nome"
                };
            }
            if (string.IsNullOrEmpty(sobrenome))
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Precisa escrever um Sobrenome"
                };
            }

            if (string.IsNullOrEmpty(usuario))
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Precisa escrever um Usuario"
                };
            }

            if (string.IsNullOrEmpty(senha))
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Precisa escrever uma Senha"
                };
            }

            var empresa = repo.Empresas.FirstOrDefault(a => a.FlgAtivo == true);
            if (empresa == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Empresa não cadastrada"
                };
            }

            var user1 = repo.Usuarios.FirstOrDefault(a => a.Usuario1 == usuario && a.FlgAtivo == true);
            if (user1 != null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Usuário já existe com este email"
                };
            }

            var user2 = repo.Usuarios.FirstOrDefault(a => a.Celular == celular && a.FlgAtivo == true);
            if (user2 != null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Usuário já existe com este celular"
                };
            }

            var user3 = repo.Usuarios.FirstOrDefault(a => a.IMEI == imei && a.FlgAtivo == true);
            if (user3 != null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Usuário já existe com este celular"
                };
            }

            var blocos = repo.Blocos.FirstOrDefault(a => a.FlgAtivo == true && a.Id == long.Parse(bloco));
            if (blocos == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Bloco não cadastrado"
                };
            }
            var ruas = repo.Ruas.FirstOrDefault(a => a.FlgAtivo == true && a.Id == long.Parse(rua));
            if (ruas == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Rua não cadastrada"
                };
            }
            var casas = repo.Casas.FirstOrDefault(a => a.FlgAtivo == true && a.Id == long.Parse(casa));
            if (casas == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Casa não cadastrada"
                };
            }


            var newuser = new Model.Usuario
            {
                IdBloco = blocos.Id,
                IdRua = ruas.Id,
                IdCasa = casas.Id,
                Img = img,
                Nome = Mensagem.ClearText(nome.ToUpper()),
                SobreNome = Mensagem.ClearText(sobrenome.ToUpper()),
                Usuario1 = Mensagem.ClearText(usuario),
                Senha = Mensagem.ClearText(senha),
                Telefone = Mensagem.ClearText(telefone),
                Celular = Mensagem.ClearText(celular),
                IMEI = Mensagem.ClearText(imei),
                FlgAtivo = true,
                FlgNotificacaoOn = mensagem == "1",
                FlgChamadaOn = mensagem == "1",
                FlgAprovado = false,
                DataConectado = DateTime.Now,
                DataInicio = DateTime.Now,
                DataFim = null,
                Email = Mensagem.ClearText(usuario),
                IdEmpresa = empresa.Id,
                FlgPrivadoOn = false,
                FlgPrincipal = false,
                
            };
            repo.Usuarios.InsertOnSubmit(newuser);
            repo.SubmitChanges();


            var _blocos = repo.Blocos.Where(a => a.FlgAtivo == true && a.IdEmpresa == empresa.Id);
            if (!_blocos.Any())
            {
                return new ViewModel.PrincipalResult("0", "Empresa não configurada. Blocos não cadastrados", empresa, _blocos.ToList());
            }

            var user = repo.Usuarios.FirstOrDefault(a => a.Id == newuser.Id && a.IdEmpresa == empresa.Id);
            
            return new ViewModel.PrincipalResult("1", "Cadastrado com sucesso. Favor validar cadastro na administração", empresa, _blocos.ToList(), user);

        }


        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetUpdateCadastro(string id, string nome, string sobrenome, string usuario, string senha, string telefone, string celular, string bloco,
            string rua, string casa, string mensagem, string imei, string img) 
        {
            var repo = new CMDataContextDataContext();

            if (string.IsNullOrEmpty(nome))
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Precisa escrever um Nome"
                };
            }
            if (string.IsNullOrEmpty(sobrenome))
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Precisa escrever um Sobrenome"
                };
            }

            if (string.IsNullOrEmpty(usuario))
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Precisa escrever um Usuario"
                };
            }

            var empresa = repo.Empresas.FirstOrDefault(a => a.FlgAtivo == true);
            if (empresa == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Empresa não cadastrada"
                };
            }

            
            var blocos = repo.Blocos.FirstOrDefault(a => a.FlgAtivo == true && a.Id == long.Parse(bloco));
            if (blocos == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Bloco não cadastrado"
                };
            }
            var ruas = repo.Ruas.FirstOrDefault(a => a.FlgAtivo == true && a.Id == long.Parse(rua));
            if (ruas == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Rua não cadastrada"
                };
            }
            var casas = repo.Casas.FirstOrDefault(a => a.FlgAtivo == true && a.Id == long.Parse(casa));
            if (casas == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Casa não cadastrada"
                };
            }


            var newuser = repo.Usuarios.FirstOrDefault(a => a.Id == long.Parse(id));
            if (newuser == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Usuário não encontrado"
                };
            }

            newuser.Nome = Mensagem.ClearText(nome);
            newuser.SobreNome = Mensagem.ClearText(sobrenome);
            newuser.Celular = Mensagem.ClearText(celular);
            newuser.Telefone = Mensagem.ClearText(telefone);
            newuser.Email = Mensagem.ClearText(usuario);
            newuser.Senha = (string.IsNullOrEmpty(senha)) ? newuser.Senha : Mensagem.ClearText(senha);
            newuser.IMEI = Mensagem.ClearText(imei);
            newuser.Img = img;
            newuser.FlgNotificacaoOn = mensagem == "1";
            newuser.FlgChamadaOn = mensagem == "1";
            newuser.FlgPrivadoOn = mensagem == "0";
            repo.SubmitChanges();

            var _blocos = repo.Blocos.Where(a => a.FlgAtivo == true && a.IdEmpresa == empresa.Id);
            if (!_blocos.Any())
            {
                return new ViewModel.PrincipalResult("0", "Empresa não configurada. Blocos não cadastrados", empresa, _blocos.ToList());
            }

            var user = repo.Usuarios.FirstOrDefault(a => a.Id == newuser.Id && a.IdEmpresa == empresa.Id);

            return new ViewModel.PrincipalResult("1", "Atualizado com sucesso.", empresa, _blocos.ToList(), user);

        }

    }
}