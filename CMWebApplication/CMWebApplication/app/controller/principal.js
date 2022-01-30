Management.App.Controller.Principal = {

    msgInterval: null,
    principalInterval: null,

    loadOperationStart: function () {

        Management.App.Model.Principal.chargePage();
    },

    setConfig: {

        load: function () {
            
            if (Management.App.Controller.Principal.principalInterval != null) {
                Management.App.Controller.Principal.principalInterval = clearInterval(Management.App.Controller.Principal.principalInterval);
            }
            Management.App.Controller.Principal.principalInterval = setInterval(function () {
                Management.App.Model.Principal.chargePageBackground();
            }, 10000);
            
            Management.App.Controller.Principal.setConfig.isLogin();
        },
        isLogin: function() {
            var core = Management.Core.get();
            $('#txt-condominio').html(core.Nome);
            
            if (core.FlgProfile === false) {
                $('#panel-usuario-logado').hide();
                $('#panel-info-usuario').hide();
                $('#sidebarnav').hide();
                $('#panel-usuario-logado').attr('style', 'display: none !important');

                Management.App.Controller.Principal.setConfig.setLogin();
                return false;
            } else {

                $('#panel-usuario-logado').show();
                $('#panel-info-usuario').show();
                $('#sidebarnav').show();
                $('#panel-usuario-logado').removeAttr('style');

                //INICIA TELA
                Management.App.Controller.Principal.setConfig.setNotificacao();

                //ICONE NOTIFICACOES
                //if (Management.Core.Usuario.Profile[0].Sessoes.length > 0) {
                //    $('#icon-alert-notificacao').show(500);
                //} else {
                    $('#icon-alert-notificacao').hide();
                //}

                //INFORMACOES DO USUARIO
                $('#txt-header-nome').html(Management.Core.Usuario.Profile[0].Nome);
                $('#txt-nome-usuario').html(Management.Core.Usuario.Profile[0].Nome);
                $('#txt-bloco').html(Management.Core.Usuario.Profile[0].NomeBloco);
                $('#txt-rua').html(Management.Core.Usuario.Profile[0].NomeRua);
                $('#txt-casa').html(Management.Core.Usuario.Profile[0].NomeCasa);
                $('#img-header-imagem').attr('src', Management.Core.Usuario.Profile[0].Img);

                if (core.Profile[0].FlgPrincipal == true) {
                    $('#menu-adm').show();
                } else {
                    $('#menu-adm').hide();
                }
                return true;
            }

            
        },
        fechaMenu: function() {
            $('body').attr('class', 'fix-header fix-sidebar mini-sidebar');
            $('#icon-menu').attr('class', 'mdi-close mdi-menu mdi');

            if (Management.App.Controller.Principal.msgInterval != null) {
                Management.App.Controller.Principal.msgInterval = clearInterval(Management.App.Controller.Principal.msgInterval);
            }
        },
        verificaUsuarioBloqueado: function(id) {
            var result = false;
            $.each(Management.Core.Usuario.Profile[0].UsuariosBloqueados, function(k, v) {
                if (v.Id == id) {
                    result = true;
                }
            });
            return result;
        },

        //MENU
        setLogin: function () {
            $('#panel-message-administrativo').hide();
            $('#panel-contatos').hide();
            $('#panel-cadastro').hide();
            $('#panel-configuracoes').hide();
            $('#panel-message').hide();
            $('#panel-msg-administracao').hide();
            $('#panel-msg-morador').hide();
            $('#panel-notificacao').hide();
            $('#panel-principal-condominio').show();


            $('#panel-login').show(500);
            Management.App.Controller.Principal.setConfig.fechaMenu();
        },
        //CADASTRO
        setCadastro: function () {
            $('#panel-message-administrativo').hide();
            $('#panel-contatos').hide();
            $('#panel-login').hide();
            $('#panel-configuracoes').hide();
            $('#panel-message').hide();
            $('#panel-msg-administracao').hide();
            $('#panel-msg-morador').hide();
            $('#panel-notificacao').hide();
            $('#panel-principal-condominio').show();

            $('#panel-cadastro').show(500);
            Management.App.Controller.Principal.setConfig.fechaMenu();

            //IMG
            $('#img-perfil-principal1').off('click').on('click', function() { $('#img-perfil-principal').attr('src', 'images/bookingSystem/1.png'); });
            $('#img-perfil-principal2').off('click').on('click', function () { $('#img-perfil-principal').attr('src', 'images/bookingSystem/2.png'); });
            $('#img-perfil-principal3').off('click').on('click', function () { $('#img-perfil-principal').attr('src', 'images/bookingSystem/3.png'); });
            $('#img-perfil-principal4').off('click').on('click', function () { $('#img-perfil-principal').attr('src', 'images/bookingSystem/4.png'); });
            $('#img-perfil-principal5').off('click').on('click', function () { $('#img-perfil-principal').attr('src', 'images/bookingSystem/5.png'); });
            $('#img-perfil-principal6').off('click').on('click', function () { $('#img-perfil-principal').attr('src', 'images/bookingSystem/6.png'); });
            $('#img-perfil-principal7').off('click').on('click', function () { $('#img-perfil-principal').attr('src', 'images/bookingSystem/7.png'); });
            $('#img-perfil-principal8').off('click').on('click', function () { $('#img-perfil-principal').attr('src', 'images/bookingSystem/8.png'); });
            $('#img-perfil-principal9').off('click').on('click', function () { $('#img-perfil-principal').attr('src', 'images/bookingSystem/9.png'); });
            $('#img-perfil-principal10').off('click').on('click', function () { $('#img-perfil-principal').attr('src', 'images/bookingSystem/10.png'); });


            var html = '<option value="0"> Selecione um Bloco</option>';
            var htmlr = '<option value="0"> Selecione uma Rua</option>';
            var htmlc = '<option value="0"> Selecione uma Casa</option>';
            $.each(Management.Core.Usuario.Blocos, function(k, v) {
                html += '<option value="' + v.Id + '"> ' + v.Nome + '</option>';
            });
            $('#sl-cad-bloco').html(html);
            $('#sl-cad-rua').html(htmlr);
            $('#sl-cad-casa').html(htmlc);


            
            $('#sl-cad-bloco').on('change', function() {
                var newvalue = this.value;
                htmlr = '<option value="0"> Selecione uma Rua</option>';
                htmlc = '<option value="0"> Selecione uma Casa</option>';
                $.each(Management.Core.Usuario.Blocos, function (k1, v1) {
                    if (v1.Id == parseInt(newvalue)) {
                        $.each(v1.Ruas, function(k, v) {
                            htmlr += '<option value="' + v.Id + '"> ' + v.Nome + '</option>';
                        });
                    }
                });
                $('#sl-cad-rua').html(htmlr);
                $('#sl-cad-casa').html(htmlc);
                return true;
            });

            $('#sl-cad-rua').on('change', function () {
                var newvalue = this.value;
                htmlc = '<option value="0"> Selecione uma Casa</option>';
                $.each(Management.Core.Usuario.Blocos, function (k1, v1) {
                    if (v1.Id == parseInt($('#sl-cad-bloco').val())) {
                        $.each(v1.Ruas, function (k2, v2) {
                            if (v2.Id == parseInt(newvalue)) {
                                $.each(v2.Casas, function (k, v) {
                                    htmlc += '<option value="' + v.Id + '"> ' + v.Nome + '</option>';
                                });
                            }
                        });
                    }
                });
                $('#sl-cad-casa').html(htmlc);
                return true;
            });
            

        },
        //CONTATOS
        setContatos: function () {
            $('#panel-message-administrativo').hide();
            $('#panel-login').hide();
            $('#panel-cadastro').hide();
            $('#panel-configuracoes').hide();
            $('#panel-message').hide();
            $('#panel-msg-administracao').hide();
            $('#panel-msg-morador').hide();
            $('#panel-notificacao').hide();
            $('#panel-principal-condominio').show();

            $('#panel-contatos').show(500);
            Management.App.Controller.Principal.setConfig.fechaMenu();

            var html = '';
            if (Management.Core.Usuario != null && Management.Core.Usuario.Profile[0] != null && Management.Core.Usuario.Profile[0].Contatos != null) {
                $.each(Management.Core.Usuario.Profile[0].Contatos, function (k, v) {
                    if (v.FlgPrivadoOn == false) {
                        if (v.FlgPrincipal == true) {
                            html += '<div class="media" onclick="Management.App.Controller.Principal.setConfig.setMessage(' + v.Id + ');">' +
                                '    <div class="media-body">' +
                                '        <h4 class="media-heading">' + v.Nome + '</h4>' +
                                '        <div class="meaasge-date"> Administração </div>' +
                                '        <p class="f-s-12"> Bloco:' + v.NomeBloco + ' / Rua:' + v.NomeRua + ' / Casa:' + v.NomeCasa + ' </p>' +
                                '        <!--<i class="fa fa-send"></i>-->' +
                                '    </div>' +
                                '</div>';
                        } else {
                            html += '<div class="media" onclick="Management.App.Controller.Principal.setConfig.setMessage(' + v.Id + ');">' +
                                '    <div class="media-left">' +
                                '        <a href="#"><img alt="..." src="' + v.Img + '" class="media-object"></a>';

                            html += '   ' +
                                '<div id="icon-contato-bloqueado-' + v.Id + '" class="notify" style="display:none;">' +
                                '    <span class="heartbit"></span> ' +
                                '    <span class="point"></span> ' +
                                '</div>' +
                                '' +
                                ' ';

                            html += '  </div>' +
                                '    <div class="media-body">' +
                                '        <h4 class="media-heading">' + v.Nome + ' ' + v.SobreNome + '</h4>' +
                                '        <div class="meaasge-date"> Morador </div>' +
                                '        <p class="f-s-12"> Bloco:' + v.NomeBloco + ' / Rua:' + v.NomeRua + ' / Casa:' + v.NomeCasa + ' </p>' +
                                '        <!--<i class="fa fa-send"></i>-->' +
                                '    </div>' +
                                '</div>';
                        }
                    }
                });

            }
            $('#lst-contatos').html(html);

            //VERIFICA BLOQUEIO
            $.each(Management.Core.Usuario.Profile[0].Contatos, function (k, v) {
                $.each(Management.Core.Usuario.Profile[0].UsuariosBloqueados, function (k1, v1) {
                    if (v1.Id == v.Id) {
                        $('#icon-contato-bloqueado-' + v.Id).show();
                    }
                });
            });
            //VERIFICA BLOQUEIO


            /*
            <div class="media" onclick="alert('teste');">
                <div class="media-body">
                    <h4 class="media-heading">Neo</h4>
                    <div class="meaasge-date">2 dias atrás</div>
                    <p class="f-s-12">Por favor economizar água. Haverá cortes de 7h até 16h.</p>
                    <!--<i class="fa fa-send"></i>-->
                </div>
            </div>

            <div class="media" onclick="alert('teste');">
                <div class="media-left">
                    <a href="#"><img alt="..." src="images/avatar/3.jpg" class="media-object"></a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading">Mr. Michael</h4>
                    <div class="meaasge-date">2 dias atrás</div>
                    <p class="f-s-12">We like your birthday cake </p>
                    <!--<i class="fa fa-send"></i>-->
                </div>
            </div>
            */

            $('#txt-contato-buscar').on("input", function () {
                var dInput = this.value;
                
                var html = '';
                if (Management.Core.Usuario != null && Management.Core.Usuario.Profile[0] != null && Management.Core.Usuario.Profile[0].Contatos != null) {
                    $.each(Management.Core.Usuario.Profile[0].Contatos, function (k, v) {
                        if (v.Nome.indexOf(dInput.toUpperCase()) > -1) {
                            if (v.FlgPrivadoOn == false) {
                                if (v.FlgPrincipal == true) {
                                    html += '<div class="media" onclick="Management.App.Controller.Principal.setConfig.setMessage(' + v.Id + ');">' +
                                        '    <div class="media-body">' +
                                        '        <h4 class="media-heading">' + v.Nome + '</h4>' +
                                        '        <div class="meaasge-date"> Administração </div>' +
                                        '        <p class="f-s-12"> Bloco:' + v.NomeBloco + ' / Rua:' + v.NomeRua + ' / Casa:' + v.NomeCasa + ' </p>' +
                                        '        <!--<i class="fa fa-send"></i>-->' +
                                        '    </div>' +
                                        '</div>';
                                } else {
                                    html += '<div class="media" onclick="Management.App.Controller.Principal.setConfig.setMessage(' + v.Id + ');">' +
                                        '    <div class="media-left">' +
                                        '        <a href="#"><img alt="..." src="' + v.Img + '" class="media-object"></a>';

                                    html += '   ' +
                                        '<div id="icon-contato-bloqueado-' + v.Id + '" class="notify" style="display:none;">' +
                                        '    <span class="heartbit"></span> ' +
                                        '    <span class="point"></span> ' +
                                        '</div>' +
                                        '' +
                                        ' ';

                                    html += '  </div>' +
                                        '    <div class="media-body">' +
                                        '        <h4 class="media-heading">' + v.Nome + ' ' + v.SobreNome + '</h4>' +
                                        '        <div class="meaasge-date"> Morador </div>' +
                                        '        <p class="f-s-12"> Bloco:' + v.NomeBloco + ' / Rua:' + v.NomeRua + ' / Casa:' + v.NomeCasa + ' </p>' +
                                        '        <!--<i class="fa fa-send"></i>-->' +
                                        '    </div>' +
                                        '</div>';
                                }
                            }
                        }
                    });

                }
                $('#lst-contatos').html(html);

                //VERIFICA BLOQUEIO
                $.each(Management.Core.Usuario.Profile[0].Contatos, function (k, v) {
                    $.each(Management.Core.Usuario.Profile[0].UsuariosBloqueados, function (k1, v1) {
                        if (v1.Id == v.Id) {
                            $('#icon-contato-bloqueado-' + v.Id).show();
                        }
                    });
                });
                //VERIFICA BLOQUEIO
            });

            $('#txt-contato-buscar').focus();
        },
        //PRINCIPAL
        setNotificacao: function () {
            $('#panel-message-administrativo').hide();
            $('#panel-contatos').hide();
            $('#panel-login').hide();
            $('#panel-cadastro').hide();
            $('#panel-configuracoes').hide();
            $('#panel-message').hide();
            $('#panel-msg-administracao').hide();
            $('#panel-msg-morador').hide();
            $('#panel-principal-condominio').show();

            $('#panel-notificacao').show(500);
            Management.App.Controller.Principal.setConfig.fechaMenu();

            Management.App.Model.Principal.chargeGridNotificacao(Management.Core.get());
        },
        //COMUNICADOS
        setAdministracao: function () {
            
            $('#panel-contatos').hide();
            $('#panel-login').hide();
            $('#panel-cadastro').hide();
            $('#panel-configuracoes').hide();
            $('#panel-message').hide();
            $('#panel-msg-administracao').hide();
            $('#panel-msg-morador').hide();
            $('#panel-principal-condominio').hide();
            $('#panel-notificacao').hide();

            $('#panel-message-administrativo').show(500);
            Management.App.Controller.Principal.setConfig.fechaMenu();

            Management.App.Controller.Principal.pageAdministracao();
        },
        //CONFIGURACAO
        setConfiguracao: function () {
            $('#panel-message-administrativo').hide();
            $('#panel-contatos').hide();
            $('#panel-login').hide();
            $('#panel-cadastro').hide();
            $('#panel-notificacao').hide();
            $('#panel-message').hide();
            $('#panel-msg-administracao').hide();
            $('#panel-msg-morador').hide();
            $('#panel-principal-condominio').show();

            $('#panel-configuracoes').show(500);
            Management.App.Controller.Principal.setConfig.fechaMenu();

            //IMG
            $('#img-perfil2-principal1').off('click').on('click', function () { $('#img-perfil2-principal').attr('src', 'images/bookingSystem/1.png'); });
            $('#img-perfil2-principal2').off('click').on('click', function () { $('#img-perfil2-principal').attr('src', 'images/bookingSystem/2.png'); });
            $('#img-perfil2-principal3').off('click').on('click', function () { $('#img-perfil2-principal').attr('src', 'images/bookingSystem/3.png'); });
            $('#img-perfil2-principal4').off('click').on('click', function () { $('#img-perfil2-principal').attr('src', 'images/bookingSystem/4.png'); });
            $('#img-perfil2-principal5').off('click').on('click', function () { $('#img-perfil2-principal').attr('src', 'images/bookingSystem/5.png'); });
            $('#img-perfil2-principal6').off('click').on('click', function () { $('#img-perfil2-principal').attr('src', 'images/bookingSystem/6.png'); });
            $('#img-perfil2-principal7').off('click').on('click', function () { $('#img-perfil2-principal').attr('src', 'images/bookingSystem/7.png'); });
            $('#img-perfil2-principal8').off('click').on('click', function () { $('#img-perfil2-principal').attr('src', 'images/bookingSystem/8.png'); });
            $('#img-perfil2-principal9').off('click').on('click', function () { $('#img-perfil2-principal').attr('src', 'images/bookingSystem/9.png'); });
            $('#img-perfil2-principal10').off('click').on('click', function () { $('#img-perfil2-principal').attr('src', 'images/bookingSystem/10.png'); });

            $('#img-perfil2-principal').attr('src', Management.Core.Usuario.Profile[0].Img);
            $('#txt-cad2-nome').val(Management.Core.Usuario.Profile[0].Nome);
            $('#txt-cad2-sobrenome').val(Management.Core.Usuario.Profile[0].SobreNome);
            $('#sl-cad2-bloco').html('<option value="' + Management.Core.Usuario.Profile[0].IdBloco + '">' + Management.Core.Usuario.Profile[0].NomeBloco + '</option>');
            $('#sl-cad2-rua').html('<option value="' + Management.Core.Usuario.Profile[0].IdRua + '">' + Management.Core.Usuario.Profile[0].NomeRua + '</option>');
            $('#sl-cad2-casa').html('<option value="' + Management.Core.Usuario.Profile[0].IdCasa + '">' + Management.Core.Usuario.Profile[0].NomeCasa + '</option>');
            $('#sl-cad2-mensagem').val((Management.Core.Usuario.Profile[0].FlgPrivadoOn) ? 0 : 1);
            $('#txt-cad2-usuario').val(Management.Core.Usuario.Profile[0].Email);
            $('#txt-cad2-telefone').val(Management.Core.Usuario.Profile[0].Telefone);
            $('#txt-cad2-celular').val(Management.Core.Usuario.Profile[0].Celular);
            $('#txt-cad2-imei').val(Management.Core.Usuario.Profile[0].IMEI);
            //$('#').val(Management.Core.Usuario.Profile[0]);
            //$('#').val(Management.Core.Usuario.Profile[0]);


        },
        //ENVIO DE MENSAGEM
        setMessage: function (id) {
            $('#panel-message-administrativo').hide();
            $('#panel-contatos').hide();
            $('#panel-login').hide();
            $('#panel-cadastro').hide();
            $('#panel-notificacao').hide();
            $('#panel-msg-administracao').hide();
            $('#panel-msg-morador').hide();
            $('#panel-configuracoes').hide();
            $('#panel-principal-condominio').hide();

            $('#panel-message').show(500);
            Management.App.Controller.Principal.setConfig.fechaMenu();

            localStorage.setItem('cm-instant-messenger', id);
            
            if (Management.Core.Usuario != null && Management.Core.Usuario.Profile[0] != null && Management.Core.Usuario.Profile[0].Contatos != null) {
                $.each(Management.Core.Usuario.Profile[0].Contatos, function (k, v) {
                    if (id == v.Id) {
                        $('#txt-panelmsg-nome').html(v.Nome);
                        $('#txt-panelmsg-tipo').html((v.FlgPrincipal) ? "Administração" : "Morador");
                    }
                });
            }

            Management.App.Controller.Principal.msgInterval = setInterval(function() {
                Management.App.Model.Principal.getMessage(Management.Core.Usuario.Profile[0].Id);
            }, 10000);
            
            Management.App.Model.Principal.getMessage(Management.Core.Usuario.Profile[0].Id);

            $('#btn-panelmsg-descricao').off('click').on('click', function () {

                //VERIFICA BLOQUEIO
                var resultado = false;
                $.each(Management.Core.Usuario.Profile[0].UsuariosBloqueados, function (k1, v1) {
                    if (v1.Id == id) {
                        resultado = true;
                    }
                });
                if (resultado == true) {
                    Management.Methods.Message.show(Management.Core.Usuario.Nome, 'Você bloqueou este usuário. Precisa desbloquear primeiro.', 0);
                    return;
                }
                //VERIFICA BLOQUEIO

                var msg = $('#txt-panelmsg-descricao').val();
                if (!Management.Methods.isEmpty(msg)) {
                    //var core = Management.Core.get();
                    Management.App.Model.Principal.setMessage(Management.Core.Usuario.Profile[0].Id, id, msg);
                } else {
                    Management.Methods.Message.show(Management.Core.Usuario.Nome, 'Escreva uma mensagem', 0);
                }
            });

            $('#btn-bloqueio-user').off('click').on('click', function() {
                Management.App.Model.Principal.setBlock(Management.Core.Usuario.Profile[0].Id, id);
            });
            $('#btn-limpar-msg').off('click').on('click', function () {
                Management.App.Model.Principal.setLimpar(Management.Core.Usuario.Profile[0].Id, id);
            });

            //VERIFICA BLOQUEIO
            $('#btn-bloqueio-user').attr('src', 'images/bloqueio_off.png');
            
                $.each(Management.Core.Usuario.Profile[0].UsuariosBloqueados, function (k1, v1) {
                    if (v1.Id == id) {
                        $('#btn-bloqueio-user').attr('src', 'images/bloqueio_on.png');
                    }
                });
            
            //VERIFICA BLOQUEIO
        },




        //TELA DE MSG ADMINISTRACAO <!--OCULTOS  START-->
        setMsgAdministracao: function () {
            $('#panel-administracao').hide();
            $('#panel-contatos').hide();
            $('#panel-login').hide();
            $('#panel-cadastro').hide();
            $('#panel-notificacao').hide();
            $('#panel-msg-morador').hide();
            $('#panel-configuracoes').hide();
            $('#panel-message').hide();
            $('#panel-principal-condominio').show();

            $('#panel-msg-administracao').show(500);
            Management.App.Controller.Principal.setConfig.fechaMenu();
        },
        //TELA DE MSG MORADOR <!--OCULTOS  START-->
        setMsgMorador: function () {
            $('#panel-administracao').hide();
            $('#panel-contatos').hide();
            $('#panel-login').hide();
            $('#panel-cadastro').hide();
            $('#panel-notificacao').hide();
            $('#panel-configuracoes').hide();
            $('#panel-message').hide();
            $('#panel-msg-administracao').hide();
            $('#panel-principal-condominio').show();

            $('#panel-msg-morador').show(500);
            Management.App.Controller.Principal.setConfig.fechaMenu();
        }

    },

    pageLogin: {
        btnEntrar: function () {

            var core = Management.Core.get();
            var usuario = $('#txt-login-usuario').val();
            var senha = $('#txt-login-senha').val();

            if (Management.Methods.isEmpty(usuario)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever um Usuário/Email', 0);
                return;
            }

            if (Management.Methods.isEmpty(senha)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever uma senha', 0);
                return;
            }

            Management.App.Model.Principal.setLogin(usuario, senha);

        }
    },
    pageCadastro: {
        btnSalvar: function () {

            var core = Management.Core.get();
            var nome = $('#txt-cad-nome').val();
            var sobrenome = $('#txt-cad-sobrenome').val();

            var usuario = $('#txt-cad-usuario').val();
            var senha = $('#txt-cad-senha').val();

            var telefone = $('#txt-cad-telefone').val();
            var celular = $('#txt-cad-celular').val();

            var imei = $('#txt-cad-imei').val();
            var img = $('#img-perfil-principal').attr('src');

            var bloco = $('#sl-cad-bloco').val();
            var rua = $('#sl-cad-rua').val();
            var casa = $('#sl-cad-casa').val();
            var mensagem = $('#sl-cad-mensagem').val();

            if (Management.Methods.isEmpty(nome)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever um Nome', 0);
                return;
            }

            if (Management.Methods.isEmpty(sobrenome)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever um Sobrenome', 0);
                return;
            }

            if (Management.Methods.isEmpty(usuario)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever um Usuário/Email', 0);
                return;
            }

            if (Management.Methods.isEmpty(senha)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever uma Senha', 0);
                return;
            }

            if (Management.Methods.isEmpty(telefone)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever um Nome', 0);
                return;
            }

            if (Management.Methods.isEmpty(celular)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever um Sobrenome', 0);
                return;
            }

            if (Management.Methods.isEmpty(imei)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever um IMEI do celular *#06#', 0);
                return;
            }

            if (bloco == "0") {
                Management.Methods.Message.show(core.Nome, 'Precisa selecionar um Bloco', 0);
                return;
            }
            if (rua == "0") {
                Management.Methods.Message.show(core.Nome, 'Precisa selecionar uma Rua', 0);
                return;
            }
            if (casa == "0") {
                Management.Methods.Message.show(core.Nome, 'Precisa selecionar uma Casa', 0);
                return;
            }
            if (mensagem == "0") {
                Management.Methods.Message.show(core.Nome, 'Precisa definir um comportamento de Mensagem', 0);
                return;
            }


            Management.App.Model.Principal.setCadastro(nome, sobrenome, usuario, senha, telefone, celular, imei, bloco, rua, casa, mensagem, img);
        },
        btnAtualizar: function() {
            var core = Management.Core.get();
            var nome = $('#txt-cad2-nome').val();
            var sobrenome = $('#txt-cad2-sobrenome').val();

            var usuario = $('#txt-cad2-usuario').val();
            var senha = $('#txt-cad2-senha').val();

            var telefone = $('#txt-cad2-telefone').val();
            var celular = $('#txt-cad2-celular').val();

            var imei = $('#txt-cad2-imei').val();
            var img = $('#img-perfil2-principal').attr('src');

            var bloco = $('#sl-cad2-bloco').val();
            var rua = $('#sl-cad2-rua').val();
            var casa = $('#sl-cad2-casa').val();
            var mensagem = $('#sl-cad2-mensagem').val();

            if (Management.Methods.isEmpty(nome)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever um Nome', 0);
                return;
            }

            if (Management.Methods.isEmpty(sobrenome)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever um Sobrenome', 0);
                return;
            }

            if (Management.Methods.isEmpty(usuario)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever um Usuário/Email', 0);
                return;
            }

            if (Management.Methods.isEmpty(telefone)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever um Nome', 0);
                return;
            }

            if (Management.Methods.isEmpty(celular)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever um Sobrenome', 0);
                return;
            }

            if (Management.Methods.isEmpty(imei)) {
                Management.Methods.Message.show(core.Nome, 'Precisa escrever um IMEI do celular *#06#', 0);
                return;
            }

            if (bloco == "0") {
                Management.Methods.Message.show(core.Nome, 'Precisa selecionar um Bloco', 0);
                return;
            }
            if (rua == "0") {
                Management.Methods.Message.show(core.Nome, 'Precisa selecionar uma Rua', 0);
                return;
            }
            if (casa == "0") {
                Management.Methods.Message.show(core.Nome, 'Precisa selecionar uma Casa', 0);
                return;
            }


            Management.App.Model.Principal.setUpdateCadastro(nome, sobrenome, usuario, senha, telefone, celular, imei, bloco, rua, casa, mensagem, img);
        }
    },
    pageNotificacao: {
        btnLimpar: function () {
            var core = Management.Core.get();
            Management.App.Model.Principal.clearNotify(core.Profile[0].Id);
        }
    },
    pageAdministracao: function() {

        $('#cb-tipo').change(function () {
            var html = '';
            var id = this.value;
            if (id == 1) {
                //TODO CONDOMINIO
            }

            if (id == 2) {
                //TODO BLOCO
                html = '';
                $.each(Management.Core.Usuario.Blocos, function(k, v) {
                    html += '<option value="' + v.Id + '">' + v.Nome + '</option>';
                });
            }

            if (id == 3) {
                //TODO RUA
                html = '';
                $.each(Management.Core.Usuario.Blocos, function (k1, v1) {
                    $.each(v1.Ruas, function(k, v) {
                        html += '<option value="' + v.Id + '">' + v.Nome + '</option>';
                    });
                });
            }

            if (id == 4) {
                //TODO CASA
                html = '';
                $.each(Management.Core.Usuario.Blocos, function (k1, v1) {
                    $.each(v1.Ruas, function(k2, v2) {
                        $.each(v2.Casas, function(k, v) {
                            html += '<option value="' + v.Id + '">' + v.Nome + '</option>';
                        });
                    });
                });
            }
            $('#cb-condominio').html(html);
            

            $('#btn-paneladm-descricao').off('click').on('click', function () {
                var tipo = $('#cb-tipo').val();
                var condominio = $('#cb-condominio').val();
                var msg = $('#txt-paneladm-descricao').val();

                if (!Management.Methods.isEmpty(msg)) {
                    //var core = Management.Core.get();
                    Management.App.Model.Principal.setAdminMessage(Management.Core.Usuario.Profile[0].Id, tipo, condominio, msg);
                } else {
                    Management.Methods.Message.show(Management.Core.Usuario.Nome, 'Escreva uma mensagem', 0);
                }
            });

        });

    }
}