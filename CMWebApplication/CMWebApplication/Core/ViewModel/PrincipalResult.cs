using System;
using System.Collections.Generic;
using System.Linq;
using CMWebApplication.Core.Model;

namespace CMWebApplication.Core.ViewModel
{
    public class PrincipalResult
    {
        
        private readonly string _resultado;
        private readonly string _mensagem;

        private readonly long _id;
        private readonly string _nome;
        private readonly string _endereco;
        private readonly string _numero;
        private readonly string _bairro;
        private readonly string _cidade;
        private readonly string _estado;
        private readonly string _cep;

        private readonly bool _flgprofile;

        private readonly List<Object> _profile;
        private readonly List<Object> _blocos;

        public string Resultado { get { return _resultado; } }
        public string Mensagem { get { return _mensagem; } }
        public long Id { get { return _id; } }
        public string Nome { get { return _nome; } }
        public string Endereco { get { return _endereco; } }
        public string Numero { get { return _numero; } }
        public string Bairro { get { return _bairro; } }
        public string Cidade { get { return _cidade; } } 
        public string Estado { get { return _estado; } } 
        public string CEP { get { return _cep; } }
        public bool FlgProfile { get { return _flgprofile; } }
        public List<Object> Profile { get { return _profile; } }
        public List<Object> Blocos { get { return _blocos; } }

        public PrincipalResult(string resultado, string mensagem, Empresa empresa, List<Bloco> blocos, Usuario user = null)
        {

            var repo = new Model.CMDataContextDataContext();

            _resultado = resultado;
            _mensagem = mensagem;
            
            _id = empresa.Id;
            _nome = empresa.NomeCondominio;
            _endereco = empresa.Endereco;
            _numero = empresa.Numero;
            _bairro = empresa.Bairro;
            _cidade = empresa.Cidade;
            _estado = empresa.Estado;
            _cep = empresa.CEP;

            _flgprofile = (user != null);

            if (blocos != null && blocos.Any())
            {
                _blocos = new List<object>(blocos.Select(a => new
                {
                    Id = a.Id,
                    Nome = a.Bloco1,
                    Ruas = a.Ruas.Where(b => b.IdBloco == a.Id && b.FlgAtivo == true).Select(b => new
                    {
                        Id = b.Id,
                        IdBloco = b.IdBloco,
                        Nome = b.Rua1,
                        Casas = b.Casas.Where(c => c.IdRua == b.Id && c.FlgAtivo == true).Select(c => new
                        {
                            Id = c.Id,
                            IdRua = c.IdRua,
                            Nome = c.Numero
                        })
                    })
                }));
            }
            else
            {
               _blocos = new List<object>();   
            }


            if (user == null)
            {
                _profile = new List<object>();   
            }
            else
            {
                _profile = new List<object> { new 
                {
                    Id = user.Id,
                    Nome = user.Nome,
                    SobreNome = user.SobreNome,

                    IdBloco = user.IdBloco,
                    NomeBloco = (user.IdBloco == null) ? "" : user.Bloco.Bloco1,

                    IdRua = user.IdRua,
                    NomeRua = (user.IdRua == null) ? "" : user.Rua.Rua1,

                    IdCasa = user.IdCasa,
                    NomeCasa = (user.IdCasa == null) ? "" : user.Casa.Numero,

                    Celular = user.Celular,
                    Telefone = user.Telefone,
                    Email = user.Email,

                    FlgAprovado = user.FlgAprovado,
                    FlgChamadaOn = user.FlgChamadaOn,
                    FlgNotificacaoOn = user.FlgNotificacaoOn,
                    FlgPrivadoOn = user.FlgPrivadoOn,

                    Img = user.Img,

                    //ADMINISTRADOR
                    FlgPrincipal = user.FlgPrincipal,
                    IMEI = user.IMEI,

                    Notificacao = repo.Notificacaos.Where(a=> a.FlgAtivo == true && a.IdUsuarioDestino == user.Id).OrderByDescending(a=> a.Id).Select(a=> new 
                    {
                        Id = a.Id, 
                        IdUsuario = a.Usuario.Id, 
                        Nome = a.Usuario.Nome,
                        Img = a.Usuario.Img,
                        Descricao = a.Descricao,
                        FlgPrincipal = a.Usuario.FlgPrincipal,
                        DataInicio = Core.Controller.Mensagem.GetData(a.DataInicio)
                    }),

                    Contatos = repo.Usuarios.Where(a=> a.FlgAtivo == true && a.FlgPrivadoOn == false).OrderByDescending(a=> a.FlgPrincipal).ThenBy(a=> a.Nome).Select(a=> new
                    {
                        Id = a.Id,
                        Nome = a.Nome,
                        SobreNome = a.SobreNome,

                        IdBloco = a.IdBloco,
                        NomeBloco = (a.IdBloco == null) ? "" : a.Bloco.Bloco1,

                        IdRua = a.IdRua,
                        NomeRua = (a.IdRua == null) ? "" : a.Rua.Rua1,

                        IdCasa = a.IdCasa,
                        NomeCasa = (a.IdCasa == null) ? "" : a.Casa.Numero,

                        Celular = a.Celular,
                        Telefone = a.Telefone,
                        Email = a.Email,

                        FlgAprovado = a.FlgAprovado,
                        FlgChamadaOn = a.FlgChamadaOn,
                        FlgNotificacaoOn = a.FlgNotificacaoOn,
                        FlgPrivadoOn = a.FlgPrivadoOn,

                        Img = a.Img,

                        //ADMINISTRADOR
                        FlgPrincipal = a.FlgPrincipal,
                        IMEI = a.IMEI,
                    }).Take(10),

                    Sessoes = user.SessaoMensagens.OrderByDescending(b=> b.Id).Where(b => b.IdEmpresa == empresa.Id 
                        && b.FlgAtivo == true 
                        && (b.IdUsuario == user.Id || b.IdUsuarioDestino == user.Id)).Select(b=> new 
                    {
                        Id = b.Id,
                        IdUsuario = b.IdUsuario,
                        IdUsuarioDestino = b.IdUsuarioDestino,

                        Img = b.Usuario.Img,
                        ImgDestino = b.Usuario1.Img,

                        Nome = b.Usuario.Nome, 
                        NomeDestino = b.Usuario1.Nome,

                        FlgPrincipal = b.Usuario.FlgPrincipal,
                        FlgPrincipalDestino = b.Usuario1.FlgPrincipal,
                         
                        Descricao = b.Descricao,
                        DataInicio = Core.Controller.Mensagem.GetData(b.DataInicio),

                        Mensagens = b.Mensagens.Where(c => c.IdEmpresa == empresa.Id && c.IdSessaoMensagens == b.Id && 
                            (c.IdUsuario == user.Id || c.IdUsuarioDestino == user.Id) && c.FlgAtivo == true).OrderByDescending(c=> c.Id).Select(c => new
                        {
                            Id = c.Id,
                            IdUsuario = c.IdUsuario,
                            IdUsuarioDestino = c.IdUsuarioDestino,

                            Img = c.Usuario.Img,
                            ImgDestino = c.Usuario1.Img,

                            Nome = c.Usuario.Nome, 
                            NomeDestino = c.Usuario1.Nome,

                            DataInicio = Core.Controller.Mensagem.GetData(c.DataInicio),
                            DataRecebimento = Core.Controller.Mensagem.GetData(c.DataRecebimento),
                            DataVisualizacao = Core.Controller.Mensagem.GetData(c.DataVisualizacao),

                            Descricao = c.Descricao,

                            FlgComunicado = c.FlgComunicado,
                            FlgMensagem = c.FlgMensagem,
                            Arquivo = c.Arquivo,
                        })
                    }),

                    UsuariosBloqueados = user.UsuarioBloqueados.Where(b => b.IdEmpresa == empresa.Id && b.IdUsuario == user.Id && b.FlgAtivo == true).Select(b => new
                        {
                            Id = b.IdUsuarioBloqueado,
                        })
                }};

            }

        }
    }
}