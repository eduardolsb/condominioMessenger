using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using CMWebApplication.Core.Model;

namespace CMWebApplication.Core.Controller
{
    public class Mensagem
    {
        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetLimparNotificacao(string id)
        {
            var repo = new Model.CMDataContextDataContext();

            var empresa = repo.Empresas.FirstOrDefault(a => a.FlgAtivo == true);
            if (empresa == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Empresa não cadastrada"
                };
            }

            var usuario = repo.Usuarios.FirstOrDefault(a => a.Id == long.Parse(id) && a.FlgAtivo == true);
            if (usuario == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Usuário não identificado"
                };
            }

            var notificacoes = repo.Notificacaos.Where(a => a.IdUsuarioDestino == usuario.Id && a.FlgAtivo == true);
            foreach (var notify in notificacoes)
            {
                var n = repo.Notificacaos.FirstOrDefault(a => a.Id == notify.Id);
                if (n != null)
                {
                    n.FlgAtivo = false;
                    n.DataFim = DateTime.Now;
                    repo.SubmitChanges();
                }
            }

            return new
            {
                Resultado = "1",
                Mensagem = "Limpeza realizada com sucesso"
            };
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetBlock(string iduser, string id)
        {
            var repo = new Model.CMDataContextDataContext();

            var empresa = repo.Empresas.FirstOrDefault(a => a.FlgAtivo == true);
            if (empresa == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Empresa não cadastrada"
                };
            }

            var usuario = repo.Usuarios.FirstOrDefault(a => a.Id == long.Parse(iduser) && a.FlgAtivo == true);
            if (usuario == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Usuário não identificado"
                };
            }

            var bloqueado = repo.Usuarios.FirstOrDefault(a => a.Id == long.Parse(id) && a.FlgAtivo == true);
            if (bloqueado == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Usuário indicado não identificado"
                };
            }

            string resultado = string.Empty;
            var blockUser = repo.UsuarioBloqueados.FirstOrDefault(a => a.IdUsuario == usuario.Id && a.IdUsuarioBloqueado == bloqueado.Id && a.FlgAtivo == true);
            if (blockUser != null)
            {
                resultado = "desbloqueado";
                blockUser.FlgAtivo = false;
                blockUser.DataFim = DateTime.Now;
                repo.SubmitChanges();
            }
            else
            {
                resultado = "bloqueado";
                var newBlockUser = new Model.UsuarioBloqueado
                {
                    DataFim = null,
                    DataInicio = DateTime.Now,
                    FlgAtivo = true,
                    IdEmpresa = empresa.Id,
                    IdUsuario = usuario.Id,
                    IdUsuarioBloqueado = bloqueado.Id
                };
                repo.UsuarioBloqueados.InsertOnSubmit(newBlockUser);
                repo.SubmitChanges();
            }

            return new
            {
                Resultado = "1",
                Mensagem = "Usuário " + resultado + " com sucesso",
                Status = resultado

            };
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetLimpar(string iduser, string id)
        {
            var repo = new Model.CMDataContextDataContext();

            var empresa = repo.Empresas.FirstOrDefault(a => a.FlgAtivo == true);
            if (empresa == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Empresa não cadastrada"
                };
            }

            var usuario = repo.Usuarios.FirstOrDefault(a => a.Id == long.Parse(iduser) && a.FlgAtivo == true);
            if (usuario == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Usuário não identificado"
                };
            }

            var companheiro = repo.Usuarios.FirstOrDefault(a => a.Id == long.Parse(id) && a.FlgAtivo == true);
            if (companheiro == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Usuário indicado não identificado"
                };
            }

            var sessao = repo.SessaoMensagens.FirstOrDefault(
                    a => a.FlgAtivo == true && ((a.IdUsuario == usuario.Id && a.IdUsuarioDestino == companheiro.Id) ||
                                                (a.IdUsuario == companheiro.Id && a.IdUsuarioDestino == usuario.Id)) &&
                         a.IdEmpresa == empresa.Id);
            if (sessao != null)
            {
                sessao.FlgAtivo = false;
                sessao.DataFim = DateTime.Now;
                repo.SubmitChanges();

                var mmensagens = repo.Mensagens.Where(a => a.IdSessaoMensagens == sessao.Id && a.FlgAtivo == true);
                foreach (var m in mmensagens)
                {
                    var mm = repo.Mensagens.FirstOrDefault(a => a.Id == m.Id);
                    if (mm != null)
                    {
                        mm.FlgAtivo = false;
                        mm.DataFim = DateTime.Now;
                        repo.SubmitChanges();
                    }
                }
            }

            var notificacoes = repo.Notificacaos.Where(a => a.IdUsuario == companheiro.Id && a.IdUsuarioDestino == usuario.Id && a.FlgAtivo == true);
            foreach (var notify in notificacoes)
            {
                var n = repo.Notificacaos.FirstOrDefault(a => a.Id == notify.Id);
                if (n != null)
                {
                    n.FlgAtivo = false;
                    n.DataFim = DateTime.Now;
                    repo.SubmitChanges();
                }
            }

            return new
            {
                Resultado = "1",
                Mensagem = "História limpa com sucesso"
            };
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetMensagem(string id, string iddestino, string mensagemdesc)
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

            var user = repo.Usuarios.FirstOrDefault(a => a.Id == long.Parse(id) && a.FlgAtivo == true);
            if (user == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Usuário não existe"
                };
            }

            var userdestino = repo.Usuarios.FirstOrDefault(a => a.Id == long.Parse(iddestino) && a.FlgAtivo == true);
            if (userdestino == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Usuário não existe"
                };
            }

            var oldsession = repo.SessaoMensagens.FirstOrDefault(a => ((a.IdUsuario == user.Id && a.IdUsuarioDestino == userdestino.Id) ||
                (a.IdUsuario == userdestino.Id && a.IdUsuarioDestino == user.Id)) && a.IdEmpresa == empresa.Id && a.FlgAtivo == true);
            if (oldsession == null)
            {
                var sessao = new Model.SessaoMensagen
                {
                    IdUsuario = user.Id,
                    IdUsuarioDestino = userdestino.Id,
                    DataFim = null,
                    DataInicio = DateTime.Now,
                    Descricao = ClearText(mensagemdesc),
                    IdEmpresa = empresa.Id,
                    FlgAtivo = true
                };
                repo.SessaoMensagens.InsertOnSubmit(sessao);
                repo.SubmitChanges();

                oldsession = sessao;
            }
            else
            {
                oldsession.Descricao = ClearText(mensagemdesc);
                repo.SubmitChanges();
            }

            var mensagem = new Model.Mensagen
            {
                IdUsuario   = user.Id,
                IdUsuarioDestino = userdestino.Id,
                IdSessaoMensagens = oldsession.Id,
                Arquivo = null,
                DataFim = null,
                DataInicio = DateTime.Now,
                Descricao = ClearText(mensagemdesc),
                DataRecebimento = null,
                DataVisualizacao = null,
                ExtArquivo = null,
                IdEmpresa = empresa.Id,
                FlgAtivo = true,
                FlgComunicado = (user.FlgPrincipal),
                FlgMensagem = (!user.FlgPrincipal),
            };
            repo.Mensagens.InsertOnSubmit(mensagem);
            repo.SubmitChanges();

            var notificacao = new Model.Notificacao
            {
                IdUsuario = user.Id,
                IdUsuarioDestino = userdestino.Id,
                DataFim = null,
                DataInicio = DateTime.Now,
                Descricao = ClearText(mensagemdesc),
                IdEmpresa = empresa.Id,
                FlgAtivo = true,
                NomeUsuario = user.Nome,
                Uid = Guid.NewGuid()
            };
            repo.Notificacaos.InsertOnSubmit(notificacao);
            repo.SubmitChanges();


            var sessoes = repo.SessaoMensagens.OrderByDescending(b=> b.Id).Where(b => b.IdEmpresa == empresa.Id && (b.IdUsuario == user.Id || b.IdUsuarioDestino == user.Id) && b.FlgAtivo == true).Select(b => new
                {
                    Id = b.Id,
                    IdUsuario = b.IdUsuario,
                    IdUsuarioDestino = b.IdUsuarioDestino,

                    Img = b.Usuario.Img,
                    ImgDestino = b.Usuario1.Img,

                    Descricao = b.Descricao,

                    Mensagens = b.Mensagens.Where(c => c.IdEmpresa == empresa.Id && c.IdSessaoMensagens == b.Id && (c.IdUsuario == user.Id || c.IdUsuarioDestino == user.Id) && c.FlgAtivo == true)
                            .OrderByDescending(c => c.Id)
                            .Select(c => new
                            {
                                Id = c.Id,
                                IdUsuario = c.IdUsuario,
                                IdUsuarioDestino = c.IdUsuarioDestino,

                                Img = c.Usuario.Img,
                                ImgDestino = c.Usuario1.Img,

                                Nome = c.Usuario.Nome,
                                NomeDestino = c.Usuario1.Nome,

                                DataInicio = GetData(c.DataInicio),
                                DataRecebimento = GetData(c.DataRecebimento),
                                DataVisualizacao = GetData(c.DataVisualizacao),

                                Descricao = c.Descricao,

                                FlgComunicado = c.FlgComunicado,
                                FlgMensagem = c.FlgMensagem,
                                Arquivo = c.Arquivo,
                            })
                });



            return new
            {
                Resultado = "1",
                Mensagem = "",
                Sessoes = sessoes
            };

        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetAdminMensagem(string id, string tipo, string condominio, string msg)
        {
            var repo = new Model.CMDataContextDataContext();

            var empresa = repo.Empresas.FirstOrDefault(a => a.FlgAtivo == true);
            if (empresa == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Empresa não cadastrada"
                };
            }

            var user = repo.Usuarios.FirstOrDefault(a => a.Id == long.Parse(id) && a.FlgAtivo == true);
            if (user == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Usuário não existe"
                };
            }

            //TODOS DO COMDOMINIO
            var usuarios = repo.Usuarios.Where(a => a.FlgAtivo == true);
            //BLOCO
            if (tipo == "2")
            {
                var bloco = repo.Blocos.FirstOrDefault(a => a.Id == long.Parse(condominio));
                if (bloco != null)
                {
                    usuarios = repo.Usuarios.Where(a => a.FlgAtivo == true && a.IdBloco == bloco.Id);
                }
            }
            //RUA
            if (tipo == "3")
            {
                var rua = repo.Ruas.FirstOrDefault(a => a.Id == long.Parse(condominio));
                if (rua != null)
                {
                    usuarios = repo.Usuarios.Where(a => a.FlgAtivo == true && a.IdRua == rua.Id);
                }
            }
            //CASA
            if (tipo == "4")
            {
                var casa = repo.Casas.FirstOrDefault(a => a.Id == long.Parse(condominio));
                if (casa != null)
                {
                    usuarios = repo.Usuarios.Where(a => a.FlgAtivo == true && a.IdCasa == casa.Id);
                }
            }

            foreach (var u in usuarios)
            {
                var userdestino = repo.Usuarios.FirstOrDefault(a => a.Id == u.Id && a.FlgAtivo == true);
                if (userdestino == null)
                {
                    return new
                    {
                        Resultado = "0",
                        Mensagem = "Usuário não existe"
                    };
                }

                var oldsession = repo.SessaoMensagens.FirstOrDefault(
                        a => ((a.IdUsuario == user.Id && a.IdUsuarioDestino == userdestino.Id) ||
                              (a.IdUsuario == userdestino.Id && a.IdUsuarioDestino == user.Id)) &&
                             a.IdEmpresa == empresa.Id && a.FlgAtivo == true);

                if (oldsession == null)
                {
                    var sessao = new Model.SessaoMensagen
                    {
                        IdUsuario = user.Id,
                        IdUsuarioDestino = userdestino.Id,
                        DataFim = null,
                        DataInicio = DateTime.Now,
                        Descricao = ClearText(msg),
                        IdEmpresa = empresa.Id,
                        FlgAtivo = true
                    };
                    repo.SessaoMensagens.InsertOnSubmit(sessao);
                    repo.SubmitChanges();

                    oldsession = sessao;
                }
                else
                {
                    oldsession.Descricao = ClearText(msg);
                    repo.SubmitChanges();
                }

                var mensagem = new Model.Mensagen
                {
                    IdUsuario = user.Id,
                    IdUsuarioDestino = userdestino.Id,
                    IdSessaoMensagens = oldsession.Id,
                    Arquivo = null,
                    DataFim = null,
                    DataInicio = DateTime.Now,
                    Descricao = ClearText(msg),
                    DataRecebimento = null,
                    DataVisualizacao = null,
                    ExtArquivo = null,
                    IdEmpresa = empresa.Id,
                    FlgAtivo = true,
                    FlgComunicado = (user.FlgPrincipal),
                    FlgMensagem = (!user.FlgPrincipal),
                };
                repo.Mensagens.InsertOnSubmit(mensagem);
                repo.SubmitChanges();

                var notificacao = new Model.Notificacao
                {
                    IdUsuario = user.Id,
                    IdUsuarioDestino = userdestino.Id,
                    DataFim = null,
                    DataInicio = DateTime.Now,
                    Descricao = ClearText(msg),
                    IdEmpresa = empresa.Id,
                    FlgAtivo = true,
                    NomeUsuario = user.Nome,
                    Uid = Guid.NewGuid()
                };
                repo.Notificacaos.InsertOnSubmit(notificacao);
                repo.SubmitChanges();
            }

            var sessoes = repo.SessaoMensagens.OrderByDescending(b => b.Id).Where(b => b.IdEmpresa == empresa.Id && (b.IdUsuario == user.Id || b.IdUsuarioDestino == user.Id) && b.FlgAtivo == true).Select(b => new
            {
                Id = b.Id,
                IdUsuario = b.IdUsuario,
                IdUsuarioDestino = b.IdUsuarioDestino,

                Img = b.Usuario.Img,
                ImgDestino = b.Usuario1.Img,

                Descricao = b.Descricao,

                Mensagens = b.Mensagens.Where(c => c.IdEmpresa == empresa.Id && c.IdSessaoMensagens == b.Id && (c.IdUsuario == user.Id || c.IdUsuarioDestino == user.Id) && c.FlgAtivo == true)
                        .OrderByDescending(c => c.Id)
                        .Select(c => new
                        {
                            Id = c.Id,
                            IdUsuario = c.IdUsuario,
                            IdUsuarioDestino = c.IdUsuarioDestino,

                            Img = c.Usuario.Img,
                            ImgDestino = c.Usuario1.Img,

                            Nome = c.Usuario.Nome,
                            NomeDestino = c.Usuario1.Nome,

                            DataInicio = GetData(c.DataInicio),
                            DataRecebimento = GetData(c.DataRecebimento),
                            DataVisualizacao = GetData(c.DataVisualizacao),

                            Descricao = c.Descricao,

                            FlgComunicado = c.FlgComunicado,
                            FlgMensagem = c.FlgMensagem,
                            Arquivo = c.Arquivo,
                        })
            });



            return new
            {
                Resultado = "1",
                Mensagem = "Enviada com sucesso",
                Sessoes = sessoes
            };

        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object GetMensagem(string id)
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

            var user = repo.Usuarios.FirstOrDefault(a => a.Id == long.Parse(id) && a.FlgAtivo == true);
            if (user == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = "Usuário não existe"
                };
            }

            var sessoes = repo.SessaoMensagens.OrderByDescending(b => b.Id).Where(b => b.IdEmpresa == empresa.Id && (b.IdUsuario == user.Id || b.IdUsuarioDestino == user.Id) && b.FlgAtivo == true).Select(b => new
            {
                Id = b.Id,
                IdUsuario = b.IdUsuario,
                IdUsuarioDestino = b.IdUsuarioDestino,

                Img = b.Usuario.Img,
                ImgDestino = b.Usuario1.Img,

                Descricao = b.Descricao,

                Mensagens = b.Mensagens.Where(c => c.IdEmpresa == empresa.Id && c.IdSessaoMensagens == b.Id && (c.IdUsuario == user.Id || c.IdUsuarioDestino == user.Id) && c.FlgAtivo == true)
                        .OrderByDescending(c => c.Id)
                        .Select(c => new
                        {
                            Id = c.Id,
                            IdUsuario = c.IdUsuario,
                            IdUsuarioDestino = c.IdUsuarioDestino,

                            Img = c.Usuario.Img,
                            ImgDestino = c.Usuario1.Img,

                            Nome = c.Usuario.Nome,
                            NomeDestino = c.Usuario1.Nome,

                            DataInicio = GetData(c.DataInicio),
                            DataRecebimento = GetData(c.DataRecebimento),
                            DataVisualizacao = GetData(c.DataVisualizacao),

                            Descricao = c.Descricao,

                            FlgComunicado = c.FlgComunicado,
                            FlgMensagem = c.FlgMensagem,
                            Arquivo = c.Arquivo,
                        })
            });


            return new
            {
                Resultado = "1",
                Mensagem = "",
                Sessoes = sessoes
            }; 

        }


        public static string GetData(DateTime? dt)
        {
            return (dt != null) ? dt.Value.ToString("g") : "";
        }

        public static string ClearText(string message)
        {
            var mensagem = "";
            var listSimple = message.Split(new string[] { "'" }, StringSplitOptions.None);
            if (listSimple.Length > 0)
            {
                mensagem = string.Join(" ", listSimple);
            }

            var listDouble = message.Split('"');
            if (listDouble.Length > 0)
            {
                mensagem = string.Join(" ", listDouble);
            }
            return mensagem;
        }
    }
}