USE [master]
GO
/****** Object:  Database [CM]    Script Date: 24/01/2019 18:15:38 ******/
CREATE DATABASE [CM] ON  PRIMARY 
( NAME = N'CM', FILENAME = N'C:\Program Files (x86)\Parallels\Plesk\Databases\MSSQL\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\CM.mdf' , SIZE = 2304KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'CM_log', FILENAME = N'C:\Program Files (x86)\Parallels\Plesk\Databases\MSSQL\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\CM_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [CM] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CM].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CM] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CM] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CM] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CM] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CM] SET ARITHABORT OFF 
GO
ALTER DATABASE [CM] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CM] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CM] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CM] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CM] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CM] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CM] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CM] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CM] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CM] SET  DISABLE_BROKER 
GO
ALTER DATABASE [CM] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CM] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CM] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CM] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CM] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CM] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CM] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CM] SET RECOVERY FULL 
GO
ALTER DATABASE [CM] SET  MULTI_USER 
GO
ALTER DATABASE [CM] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CM] SET DB_CHAINING OFF 
GO
USE [CM]
GO
/****** Object:  User [cooper]    Script Date: 24/01/2019 18:15:40 ******/
CREATE USER [cooper] FOR LOGIN [cooper] WITH DEFAULT_SCHEMA=[cooper]
GO
/****** Object:  User [bdez]    Script Date: 24/01/2019 18:15:41 ******/
CREATE USER [bdez] FOR LOGIN [bdez] WITH DEFAULT_SCHEMA=[bdez]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [cooper]
GO
ALTER ROLE [db_backupoperator] ADD MEMBER [cooper]
GO
ALTER ROLE [db_datareader] ADD MEMBER [cooper]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [cooper]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [bdez]
GO
ALTER ROLE [db_backupoperator] ADD MEMBER [bdez]
GO
ALTER ROLE [db_datareader] ADD MEMBER [bdez]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [bdez]
GO
/****** Object:  Schema [bdez]    Script Date: 24/01/2019 18:15:42 ******/
CREATE SCHEMA [bdez]
GO
/****** Object:  Schema [cooper]    Script Date: 24/01/2019 18:15:42 ******/
CREATE SCHEMA [cooper]
GO
/****** Object:  Table [dbo].[Bloco]    Script Date: 24/01/2019 18:15:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Bloco](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdEmpresa] [bigint] NULL,
	[Bloco] [varchar](100) NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_Bloco_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_Bloco_Uid]  DEFAULT (newid()),
 CONSTRAINT [PK_Bloco] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Casa]    Script Date: 24/01/2019 18:15:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Casa](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdEmpresa] [bigint] NULL,
	[IdRua] [bigint] NULL,
	[Numero] [varchar](10) NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_Casa_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_Casa_Uid]  DEFAULT (newid()),
 CONSTRAINT [PK_Casa] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Empresa]    Script Date: 24/01/2019 18:15:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Empresa](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[CNPJ] [varchar](50) NULL,
	[NomeCondominio] [varchar](100) NULL,
	[Endereco] [varchar](100) NULL,
	[Numero] [varchar](50) NULL,
	[Bairro] [varchar](50) NULL,
	[Cidade] [varchar](50) NULL,
	[Estado] [varchar](50) NULL,
	[CEP] [varchar](8) NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_Empresa_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_Empresa_Uid]  DEFAULT (newid()),
	[Codigo] [varchar](255) NULL,
 CONSTRAINT [PK_Empresa] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EtiquetaUsuario]    Script Date: 24/01/2019 18:15:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EtiquetaUsuario](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Descricao] [varchar](500) NULL,
	[IdEmpresa] [bigint] NULL,
	[IdMensagem] [bigint] NULL,
	[IdUsuario] [bigint] NULL,
	[IdUsuarioDestino] [bigint] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL,
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL,
 CONSTRAINT [PK_EtiquetaUsuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Mensagens]    Script Date: 24/01/2019 18:15:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mensagens](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdEmpresa] [bigint] NULL,
	[IdSessaoMensagens] [bigint] NULL,
	[IdUsuarioDestino] [bigint] NULL,
	[IdUsuario] [bigint] NULL,
	[Arquivo] [varchar](max) NULL,
	[ExtArquivo] [varchar](50) NULL,
	[Descricao] [varchar](max) NULL,
	[FlgMensagem] [bit] NULL,
	[FlgComunicado] [bit] NULL,
	[FlgAtivo] [bit] NULL,
	[DataRecebimento] [datetime] NULL,
	[DataVisualizacao] [datetime] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_Mensagens_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_Mensagens_Uid]  DEFAULT (newid()),
	[Hastags] [varchar](500) NULL,
 CONSTRAINT [PK_Mensagens] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Notificacao]    Script Date: 24/01/2019 18:15:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Notificacao](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdEmpresa] [bigint] NULL,
	[IdUsuario] [bigint] NULL,
	[IdUsuarioDestino] [bigint] NULL,
	[NomeUsuario] [varchar](50) NULL,
	[Descricao] [varchar](max) NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_Notificacao_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_Notificacao_Uid]  DEFAULT (newid()),
	[FlgNotificacao] [bit] NULL,
 CONSTRAINT [PK_Notificacao] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Rua]    Script Date: 24/01/2019 18:15:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Rua](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdEmpresa] [bigint] NULL,
	[IdBloco] [bigint] NULL,
	[Rua] [varchar](500) NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_Rua_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_Rua_Uid]  DEFAULT (newid()),
 CONSTRAINT [PK_Rua] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SessaoMensagens]    Script Date: 24/01/2019 18:15:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SessaoMensagens](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdEmpresa] [bigint] NULL,
	[IdUsuario] [bigint] NULL,
	[IdUsuarioDestino] [bigint] NULL,
	[Descricao] [varchar](max) NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_SessaoMensagens_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_SessaoMensagens_Uid]  DEFAULT (newid()),
	[DataUltMsg] [datetime] NULL,
	[IdUltMsg] [bigint] NULL,
 CONSTRAINT [PK_SessaoMensagens] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 24/01/2019 18:15:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdEmpresa] [bigint] NULL,
	[Usuario] [varchar](50) NULL,
	[Senha] [varchar](50) NULL,
	[Img] [varchar](50) NULL,
	[Nome] [varchar](50) NULL,
	[SobreNome] [varchar](500) NULL,
	[IMEI] [varchar](50) NULL,
	[FlgPrincipal] [bit] NULL,
	[IdCasa] [bigint] NULL,
	[IdRua] [bigint] NULL,
	[IdBloco] [bigint] NULL,
	[Email] [varchar](50) NULL,
	[Telefone] [varchar](10) NULL,
	[Celular] [varchar](11) NULL,
	[FlgNotificacaoOn] [bit] NULL,
	[FlgChamadaOn] [bit] NULL,
	[FlgPrivadoOn] [bit] NULL,
	[DataConectado] [datetime] NULL,
	[FlgAprovado] [bit] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL,
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[UsuarioBloqueado]    Script Date: 24/01/2019 18:15:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsuarioBloqueado](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdEmpresa] [bigint] NULL,
	[IdUsuario] [bigint] NULL,
	[IdUsuarioBloqueado] [bigint] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_UsuarioBloqueado_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_UsuarioBloqueado_Uid]  DEFAULT (newid()),
 CONSTRAINT [PK_UsuarioBloqueado] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[EtiquetaUsuario] ADD  CONSTRAINT [DF_EtiquetaUsuario_DataInicio]  DEFAULT (getdate()) FOR [DataInicio]
GO
ALTER TABLE [dbo].[EtiquetaUsuario] ADD  CONSTRAINT [DF_EtiquetaUsuario_Uid]  DEFAULT (newid()) FOR [Uid]
GO
ALTER TABLE [dbo].[Bloco]  WITH CHECK ADD  CONSTRAINT [FK_Bloco_Empresa] FOREIGN KEY([IdEmpresa])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[Bloco] CHECK CONSTRAINT [FK_Bloco_Empresa]
GO
ALTER TABLE [dbo].[Casa]  WITH CHECK ADD  CONSTRAINT [FK_Casa_Empresa] FOREIGN KEY([IdEmpresa])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[Casa] CHECK CONSTRAINT [FK_Casa_Empresa]
GO
ALTER TABLE [dbo].[Casa]  WITH CHECK ADD  CONSTRAINT [FK_Casa_Rua] FOREIGN KEY([IdRua])
REFERENCES [dbo].[Rua] ([Id])
GO
ALTER TABLE [dbo].[Casa] CHECK CONSTRAINT [FK_Casa_Rua]
GO
ALTER TABLE [dbo].[EtiquetaUsuario]  WITH CHECK ADD  CONSTRAINT [FK_EtiquetaUsuario_Empresa] FOREIGN KEY([IdEmpresa])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[EtiquetaUsuario] CHECK CONSTRAINT [FK_EtiquetaUsuario_Empresa]
GO
ALTER TABLE [dbo].[EtiquetaUsuario]  WITH CHECK ADD  CONSTRAINT [FK_EtiquetaUsuario_Mensagens] FOREIGN KEY([IdMensagem])
REFERENCES [dbo].[Mensagens] ([Id])
GO
ALTER TABLE [dbo].[EtiquetaUsuario] CHECK CONSTRAINT [FK_EtiquetaUsuario_Mensagens]
GO
ALTER TABLE [dbo].[EtiquetaUsuario]  WITH CHECK ADD  CONSTRAINT [FK_EtiquetaUsuario_Usuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[EtiquetaUsuario] CHECK CONSTRAINT [FK_EtiquetaUsuario_Usuario]
GO
ALTER TABLE [dbo].[EtiquetaUsuario]  WITH CHECK ADD  CONSTRAINT [FK_EtiquetaUsuario_Usuario1] FOREIGN KEY([IdUsuarioDestino])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[EtiquetaUsuario] CHECK CONSTRAINT [FK_EtiquetaUsuario_Usuario1]
GO
ALTER TABLE [dbo].[Mensagens]  WITH CHECK ADD  CONSTRAINT [FK_Mensagens_Empresa] FOREIGN KEY([IdEmpresa])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[Mensagens] CHECK CONSTRAINT [FK_Mensagens_Empresa]
GO
ALTER TABLE [dbo].[Mensagens]  WITH CHECK ADD  CONSTRAINT [FK_Mensagens_SessaoMensagens] FOREIGN KEY([IdSessaoMensagens])
REFERENCES [dbo].[SessaoMensagens] ([Id])
GO
ALTER TABLE [dbo].[Mensagens] CHECK CONSTRAINT [FK_Mensagens_SessaoMensagens]
GO
ALTER TABLE [dbo].[Mensagens]  WITH CHECK ADD  CONSTRAINT [FK_Mensagens_Usuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Mensagens] CHECK CONSTRAINT [FK_Mensagens_Usuario]
GO
ALTER TABLE [dbo].[Mensagens]  WITH CHECK ADD  CONSTRAINT [FK_Mensagens_Usuario1] FOREIGN KEY([IdUsuarioDestino])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Mensagens] CHECK CONSTRAINT [FK_Mensagens_Usuario1]
GO
ALTER TABLE [dbo].[Notificacao]  WITH CHECK ADD  CONSTRAINT [FK_Notificacao_Empresa] FOREIGN KEY([IdEmpresa])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[Notificacao] CHECK CONSTRAINT [FK_Notificacao_Empresa]
GO
ALTER TABLE [dbo].[Notificacao]  WITH CHECK ADD  CONSTRAINT [FK_Notificacao_Usuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Notificacao] CHECK CONSTRAINT [FK_Notificacao_Usuario]
GO
ALTER TABLE [dbo].[Notificacao]  WITH CHECK ADD  CONSTRAINT [FK_Notificacao_Usuario1] FOREIGN KEY([IdUsuarioDestino])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Notificacao] CHECK CONSTRAINT [FK_Notificacao_Usuario1]
GO
ALTER TABLE [dbo].[Rua]  WITH CHECK ADD  CONSTRAINT [FK_Rua_Bloco] FOREIGN KEY([IdBloco])
REFERENCES [dbo].[Bloco] ([Id])
GO
ALTER TABLE [dbo].[Rua] CHECK CONSTRAINT [FK_Rua_Bloco]
GO
ALTER TABLE [dbo].[Rua]  WITH CHECK ADD  CONSTRAINT [FK_Rua_Empresa] FOREIGN KEY([IdEmpresa])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[Rua] CHECK CONSTRAINT [FK_Rua_Empresa]
GO
ALTER TABLE [dbo].[SessaoMensagens]  WITH CHECK ADD  CONSTRAINT [FK_SessaoMensagens_Empresa] FOREIGN KEY([IdEmpresa])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[SessaoMensagens] CHECK CONSTRAINT [FK_SessaoMensagens_Empresa]
GO
ALTER TABLE [dbo].[SessaoMensagens]  WITH CHECK ADD  CONSTRAINT [FK_SessaoMensagens_Usuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[SessaoMensagens] CHECK CONSTRAINT [FK_SessaoMensagens_Usuario]
GO
ALTER TABLE [dbo].[SessaoMensagens]  WITH CHECK ADD  CONSTRAINT [FK_SessaoMensagens_Usuario1] FOREIGN KEY([IdUsuarioDestino])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[SessaoMensagens] CHECK CONSTRAINT [FK_SessaoMensagens_Usuario1]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_Bloco] FOREIGN KEY([IdBloco])
REFERENCES [dbo].[Bloco] ([Id])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_Bloco]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_Casa] FOREIGN KEY([IdCasa])
REFERENCES [dbo].[Casa] ([Id])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_Casa]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_Empresa] FOREIGN KEY([IdEmpresa])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_Empresa]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_Rua] FOREIGN KEY([IdRua])
REFERENCES [dbo].[Rua] ([Id])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_Rua]
GO
ALTER TABLE [dbo].[UsuarioBloqueado]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioBloqueado_Empresa] FOREIGN KEY([IdEmpresa])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[UsuarioBloqueado] CHECK CONSTRAINT [FK_UsuarioBloqueado_Empresa]
GO
ALTER TABLE [dbo].[UsuarioBloqueado]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioBloqueado_Usuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[UsuarioBloqueado] CHECK CONSTRAINT [FK_UsuarioBloqueado_Usuario]
GO
ALTER TABLE [dbo].[UsuarioBloqueado]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioBloqueado_Usuario1] FOREIGN KEY([IdUsuarioBloqueado])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[UsuarioBloqueado] CHECK CONSTRAINT [FK_UsuarioBloqueado_Usuario1]
GO
USE [master]
GO
ALTER DATABASE [CM] SET  READ_WRITE 
GO



/****** 
SELECT TOP 1000 [Id]
      ,[CNPJ]
      ,[NomeCondominio]
      ,[Endereco]
      ,[Numero]
      ,[Bairro]
      ,[Cidade]
      ,[Estado]
      ,[CEP]
      ,[FlgAtivo]
      ,[DataInicio]
      ,[DataFim]
      ,[Uid]
      ,[Codigo]
  FROM [CM].[dbo].[Empresa]

Id                   CNPJ                                               NomeCondominio                                                                                       Endereco                                                                                             Numero                                             Bairro                                             Cidade                                             Estado                                             CEP      FlgAtivo DataInicio              DataFim                 Uid                                  Codigo
-------------------- -------------------------------------------------- ---------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------- -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- -------- -------- ----------------------- ----------------------- ------------------------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
1                    NULL                                               Neo Residencial                                                                                      Rua Eduardo Sathler                                                                                  2                                                  Serra Dagua                                        Juiz de Fora                                       Minas Gerais                                       36035720 1        2018-06-19 22:10:50.447 NULL                    7716359D-CF7E-4656-A011-6E334C9CEB25 1

(1 row(s) affected)
******/

