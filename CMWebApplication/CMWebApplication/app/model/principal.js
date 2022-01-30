Management.App.Model.Principal = {

    chargePage: function () {

        var core = Management.Core.get();
        if (core.Profile == null) {

            $.ajax({
                type: "POST",
                timeout: 120000,
                async: true,
                url: Management.Const.url() + "/CarregaPagina",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({}),
                success: function(result) {
                    var retorno = result.d;
                    if (retorno.Resultado == "1") {

                        Management.Core.set(retorno);
                        Management.App.Controller.Principal.setConfig.load();

                    } else {

                        Management.Methods.Message.show('ERRO', retorno.Mensagem);
                    }
                },
                error: function(n) {

                }
            });
            return true;
        } else {

            Management.App.Controller.Principal.setConfig.load();
            return true;
        }
    },

    chargePageBackground: function () {
        
        var core = Management.Core.get();
        if (core.Profile[0] != null) {

            $.ajax({
                type: "POST",
                timeout: 120000,
                async: true,
                url: Management.Const.url() + "/CarregaPaginaBackground",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ id: Management.Core.get().Profile[0].Id }),
                success: function(result) {
                    var retorno = result.d;

                    Management.Core.set(retorno);

                    Management.App.Model.Principal.chargeGridNotificacao(retorno);

                },
                error: function(n) {

                }
            });
        }
        return true;
        
    },

    setLogin: function(usuario, senha) {
        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: Management.Const.url() + "/SetLogin",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ usuario: usuario, senha: senha }),
            success: function (result) {
                var retorno = result.d;
                if (retorno.Resultado == "1") {

                    Management.Core.set(retorno);
                    Management.App.Controller.Principal.setConfig.load();

                } else {

                    Management.Methods.Message.show('ERRO', retorno.Mensagem, parseInt(retorno.Resultado));
                }
            },
            error: function (n) {

            }
        });
        return true;
    },

    setCadastro: function (nome, sobrenome, usuario, senha, telefone, celular, imei, bloco, rua, casa, mensagem, img) {
        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: Management.Const.url() + "/SetCadastro",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                nome: nome, sobrenome: sobrenome, usuario: usuario, senha: senha, telefone: telefone, celular:celular, imei:imei,
                bloco:bloco, rua:rua, casa:casa, mensagem:mensagem, img:img 
            }),
            success: function (result) {
                var retorno = result.d;
                if (retorno.Resultado == "1") {

                    Management.Core.set(retorno);
                    Management.App.Controller.Principal.setConfig.setLogin();

                }

                Management.Methods.Message.show(Management.Core.Usuario.Nome, retorno.Mensagem, parseInt(retorno.Resultado));
            },
            error: function (n) {

            }
        });
        return true;
    },

    setUpdateCadastro: function (nome, sobrenome, usuario, senha, telefone, celular, imei, bloco, rua, casa, mensagem, img) {
        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: Management.Const.url() + "/SetUpdateCadastro",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ id: Management.Core.Usuario.Profile[0].Id,
                nome: nome, sobrenome: sobrenome, usuario: usuario, senha: senha, telefone: telefone, celular: celular, imei: imei,
                bloco: bloco, rua: rua, casa: casa, mensagem: mensagem, img: img
            }),
            success: function (result) {
                var retorno = result.d;
                if (retorno.Resultado == "1") {

                    Management.Core.set(retorno);
                    location.href = 'index.html';

                }

                Management.Methods.Message.show(Management.Core.Usuario.Nome, retorno.Mensagem, parseInt(retorno.Resultado));
            },
            error: function (n) {

            }
        });
        return true;
    },

    getMessage: function (id) {

        var _html = '' +
        '<div style="width: 100%; height: 200px; background: url(images/) center center no-repeat;">' +
        '    <svg class="circular" viewBox="25 25 50 50">' +
        '        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />' +
        '    </svg>' +
        '</div>';
        $('#lst-msg').html(_html);

        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: Management.Const.url() + "/GetMensagem",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ id: id }),
            success: function (result) {
                var retorno = result.d;
                if (retorno.Resultado == "1") {


                    Management.App.Model.Principal.chargeGridMessage(retorno);

                }
            },
            error: function (n) {
                var html = '';
                $('#lst-msg').html(html);
            }
        });
        return true;
    },

    setAdminMessage: function(id, tipo, condominio, msg) {
        var _html = '' +
        '<div style="width: 100%; height: 200px; background: url(images/) center center no-repeat;">' +
        '    <svg class="circular" viewBox="25 25 50 50">' +
        '        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />' +
        '    </svg>' +
        '</div>';
        $('#lst-msg').html(_html);

        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: Management.Const.url() + "/SetAdminMensagem",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ id: id, tipo: tipo, condominio: condominio, msg: msg }),
            success: function (result) {
                var retorno = result.d;
                if (retorno.Resultado == "1") {

                    Management.Methods.Message.show(Management.Core.Usuario.Nome, retorno.Mensagem, parseInt(retorno.Resultado));
                    $('#txt-paneladm-descricao').val('');
                }
            },
            error: function (n) {
                var html = '';
                $('#lst-msg').html(html);
            }
        });
        return true;
    },

    setMessage: function (id, iddestino, mensagemdesc) {

        var _html = '' +
        '<div style="width: 100%; height: 200px; background: url(images/) center center no-repeat;">' +
        '    <svg class="circular" viewBox="25 25 50 50">' +
        '        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />' +
        '    </svg>' +
        '</div>';
        $('#lst-msg').html(_html);

        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: Management.Const.url() + "/SetMensagem",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ id: id, iddestino:iddestino, mensagemdesc:mensagemdesc }),
            success: function (result) {
                var retorno = result.d;
                if (retorno.Resultado == "1") {

                    Management.App.Model.Principal.chargeGridMessage(retorno);
                    $('#txt-panelmsg-descricao').val('');
                }
            },
            error: function (n) {
                var html = '';
                $('#lst-msg').html(html);
            }
        });
        return true;
    },

    chargeGridMessage: function(retorno) {
        var html = '';

        var usuarioamigo = localStorage.getItem('cm-instant-messenger');

        $.each(retorno.Sessoes, function (k1, v1) {

            if (Management.Core.Usuario.Profile[0].Id == v1.IdUsuarioDestino && usuarioamigo == v1.IdUsuario ||
                Management.Core.Usuario.Profile[0].Id == v1.IdUsuario && usuarioamigo == v1.IdUsuarioDestino) {

                $.each(v1.Mensagens, function(k, v) {
                    html += '<div class="media">' +
                        '   <div class="media-left">' +
                        '        <a href="#"><img alt="..." src="' + v.Img + '" class="media-object"></a>' +
                        '    </div>' +
                        '    <div class="media-body">' +
                        '        <h4 class="media-heading">' + v.Nome + '</h4>' +
                        '        <p class="f-s-12"> ' + v.Descricao + ' </p>' +
                        '        <!--<i class="fa fa-send"></i>-->' +
                        '        <p style="text-align:right;font-size:9px;"> ' + v.DataInicio + ' </p>' +
                        '    </div>' +
                        '</div>';
                });
            }
        });
        $('#lst-msg').html(html);
    },

    chargeGridNotificacao: function(retorno) {
        var html = '';
        $.each(retorno.Profile[0].Notificacao, function (k, user) {

            if (user.FlgPrincipal == true) {
                html += '<div class="media" onclick="Management.App.Controller.Principal.setConfig.setMessage(' + user.IdUsuario + ');">' +
                    '    <div class="media-body">' +
                    '        <h4 class="media-heading">' + user.Nome + '</h4>' +
                    '        <p class="f-s-12"> ' + user.Descricao + ' </p>' +
                    '        <!--<i class="fa fa-send"></i>-->' +
                    '        <p style="text-align:right;font-size:9px;"> ' + user.DataInicio + ' </p>' +
                    '    </div>' +
                    '</div>';
            } else {
                html += '<div class="media" onclick="Management.App.Controller.Principal.setConfig.setMessage(' + user.IdUsuario + ');">' +
                        '   <div class="media-left">' +
                        '        <a href="#"><img alt="..." src="' + user.Img + '" class="media-object"></a>' +
                        '    </div>' +
                        '    <div class="media-body">' +
                        '        <h4 class="media-heading">' + user.Nome + '</h4>' +
                        '        <div class="meaasge-date"> Morador </div>' +
                        '        <p class="f-s-12"> ' + user.Descricao + ' </p>' +
                        '        <!--<i class="fa fa-send"></i>-->' +
                        '        <p style="text-align:right;font-size:9px;"> ' + user.DataInicio + ' </p>' +
                        '    </div>' +
                        '</div>';
            }
        });
        $('#lst-notificacao').html(html);
    },

    setBlock: function(iduser, id) {
        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: Management.Const.url() + "/SetBlock",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                iduser: iduser, id:id
            }),
            success: function (result) {
                var retorno = result.d;
                if (retorno.Resultado == "1") {
                    
                    if (retorno.Status == "bloqueado") {
                        $('#btn-bloqueio-user').attr('src', 'images/bloqueio_on.png');
                    } else if (retorno.Status == "desbloqueado") {
                        $('#btn-bloqueio-user').attr('src', 'images/bloqueio_off.png');
                    }
                }
                
                Management.Methods.Message.show(Management.Core.Usuario.Nome, retorno.Mensagem, parseInt(retorno.Resultado));
            },
            error: function (n) {

            }
        });
        return true;
    },
    setLimpar: function (iduser, id) {
        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: Management.Const.url() + "/SetLimpar",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                iduser: iduser, id: id
            }),
            success: function (result) {
                var retorno = result.d;
                //if (retorno.Resultado == "1") {
                //    Management.Core.set(retorno);
                //}

                Management.Methods.Message.show(Management.Core.Usuario.Nome, retorno.Mensagem, parseInt(retorno.Resultado));
            },
            error: function (n) {

            }
        });
        return true;
    },
    clearNotify: function(id) {
        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: Management.Const.url() + "/SetLimparNotificacao",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                id: id
            }),
            success: function (result) {
                var retorno = result.d;

                Management.Methods.Message.show(Management.Core.Usuario.Nome, retorno.Mensagem, parseInt(retorno.Resultado));


                $('#lst-notificacao').html(' ');
            },
            error: function (n) {

            }
        });
        return true;
    }
}