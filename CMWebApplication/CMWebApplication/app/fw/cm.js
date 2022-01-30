Management = {
    App: {
        Controller: {
            Principal: null
        },
        Model: {
            Principal: null
        },
        View: {
            Principal: null
        }
    },
    LogOut: function() {
        localStorage.clear();
        Management.App.Controller.Principal.loadOperationStart();
    },
    Config: {
        token: null,
        closeAllInterval: function () {
            //============== CHAT PRINCIPAL
            if (Management.App.Controller.Principal.interval != null) {
                Management.App.Controller.Principal.interval = clearInterval(Management.App.Controller.Principal.interval);
            }
        }
    },
    Core: {
        Usuario: null,
        get: function () {
            if (localStorage.getItem('cm') != null && localStorage.getItem('cm') !== '' && localStorage.getItem('cm') != undefined) {
                var core = JSON.parse(Management.Const.Criptografia.load(localStorage.getItem('cm')));
                Management.Core.Usuario = JSON.parse(Management.Const.Criptografia.load(localStorage.getItem('cm')));
                return core;
            }
            return [];
        },
        set: function (obj) {
            localStorage.setItem('cm', Management.Const.Criptografia.set(JSON.stringify(obj)));
            Management.Core.Usuario = JSON.parse(Management.Const.Criptografia.load(localStorage.getItem('cm')));
        }
    },
    Const: {
        url: function () {
            return 'http://localhost:11215/Channel.aspx';
            //if (window.location.href.split(/\?|#/)[0].indexOf('index') > -1) {
            //    return window.location.href.split(/\?|#/)[0].replace('index.html', 'Channel.aspx');
            //} else {
            //    return window.location.href.split(/\?|#/)[0] + 'Channel.aspx';
            //}
        },
        n_url: function () {
            var path = window.location.pathname.split('/');
            if (path[1].toLocaleLowerCase() == 'cm') {
                return window.location.origin + '/' + path[1] + '/Channel.aspx';
            } else {
                return window.location.origin + '/Channel.aspx';
            }
        },
        host: window.location.host,
        n_host: function () {
            var path = window.location.pathname.split('/');
            if (path[1].toLocaleLowerCase() == 'cm') {
                return window.location.origin + '/' + path[1];
            } else {
                return window.location.origin;
            }
        },
        height: function () {
            return $(window).height();
        },
        width: function () {
            return $(window).width();
        },
        CodigoFuncao: {
            data: [
                { "Id": 1, "Funcao": "Diretor" },
                { "Id": 2, "Funcao": "Gerente" },
                { "Id": 3, "Funcao": "Engenheiro" },
                { "Id": 4, "Funcao": "Supervisor" },
                { "Id": 5, "Funcao": "Encarregado" },
                { "Id": 6, "Funcao": "Motorista" },
                { "Id": 7, "Funcao": "Auxiliar" },
                { "Id": 8, "Funcao": "Entregador" },
                { "Id": 9, "Funcao": "Manobrista" }
            ]
        },
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91, // COMMAND
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93, // COMMAND_RIGHT
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91, // COMMAND,
            F5: 116
        },
        Criptografia: {
            set: function (string) {
                // Convertendo para Base64
                return btoa(string);
            },
            load: function (codigo) {
                // Voltando para string
                return atob(codigo);
            }
        }
    },
    Methods: {

        isEmail: function (email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        },
        chargePanel: function (html) {
            Management.Config.closeAllInterval();
            $('#page-content').html(html);
        },
        chargeInterfaceHTML: function (obj, func) {
            $("body").load(obj.url, function () {
                //alert("Load was performed.");
                func.call();
            });
        },
        chargeInterface: function (html) {
            $('#principal-content').attr('class', '');
            $('#principal-content').hide();
            $('#principal-content').html(html);
            $('#principal-content').attr('class', 'fadeInDown animated');
            $('#principal-content').show();
        },
        chargeInterfaceFrameId: function (id, obj) {
            $.get(obj.url, function (data) {
                (id.indexOf('#') > -1) ? $(id).html(data) : $('#' + id).html(data);
                //$(this).children("div:first").append(data);
            });
        },
        isConnected: function () {
            var a = Management.Core.get();
            return (a != null && a !== '');
        },
        isEmpty: function (text) {
            return (text == null || text.trim() == '');
        },
        Message: {
            show: function (title, message, type) {
                $('#txt-title').html(title);
                $('#txt-message').html(message);
                if (type == 0) {
                    $('#alert-message').attr('class', 'alert alert-danger bounceIn animated');
                } else if (type == 1) {
                    $('#alert-message').attr('class', 'alert alert-success bounceIn animated');
                }
                $('#alert-message').show();
                setTimeout(function () {
                    $('#alert-message').fadeOut();
                }, 5000);
                $('#alert-massage').off('click').on('click', function () {
                    $('#alert-message').fadeOut();
                });
            },
            hide: function () {
                $('#alert-massage').fadeOut();
            }
        },
        LogOut: function () {
            localStorage.clear();
            location.href = 'index.html';
        },
        CPF_CNPJ: {
            verifica_cpf_cnpj: function (valor) {

                // Garante que o valor é uma string
                valor = valor.toString();

                // Remove caracteres inválidos do valor
                valor = valor.replace(/[^0-9]/g, '');

                // Verifica CPF
                if (valor.length === 11) {
                    return 'CPF';
                }
                    // Verifica CNPJ
                else if (valor.length === 14) {
                    return 'CNPJ';
                }
                    // Não retorna nada
                else {
                    return false;
                }

            },

            /*
             calc_digitos_posicoes
 
             Multiplica dígitos vezes posições
 
             @param string digitos Os digitos desejados
             @param string posicoes A posição que vai iniciar a regressão
             @param string soma_digitos A soma das multiplicações entre posições e dígitos
             @return string Os dígitos enviados concatenados com o último dígito
            */
            calc_digitos_posicoes: function (digitos, posicoes, somaDigitos) {

                if (posicoes == null)
                    posicoes = 10;

                if (somaDigitos == null)
                    somaDigitos = 0;

                // Garante que o valor é uma string
                digitos = digitos.toString();

                // Faz a soma dos dígitos com a posição
                // Ex. para 10 posições:
                //   0    2    5    4    6    2    8    8   4
                // x10   x9   x8   x7   x6   x5   x4   x3  x2
                //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
                for (var i = 0; i < digitos.length; i++) {
                    // Preenche a soma com o dígito vezes a posição
                    somaDigitos = somaDigitos + (digitos[i] * posicoes);

                    // Subtrai 1 da posição
                    posicoes--;

                    // Parte específica para CNPJ
                    // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
                    if (posicoes < 2) {
                        // Retorno a posição para 9
                        posicoes = 9;
                    }
                }

                // Captura o resto da divisão entre soma_digitos dividido por 11
                // Ex.: 196 % 11 = 9
                somaDigitos = somaDigitos % 11;

                // Verifica se soma_digitos é menor que 2
                if (somaDigitos < 2) {
                    // soma_digitos agora será zero
                    somaDigitos = 0;
                } else {
                    // Se for maior que 2, o resultado é 11 menos soma_digitos
                    // Ex.: 11 - 9 = 2
                    // Nosso dígito procurado é 2
                    somaDigitos = 11 - somaDigitos;
                }

                // Concatena mais um dígito aos primeiro nove dígitos
                // Ex.: 025462884 + 2 = 0254628842
                var cpf = digitos + somaDigitos;

                // Retorna
                return cpf;

            },

            /*
             Valida CPF
     
             Valida se for CPF
     
             @param  string cpf O CPF com ou sem pontos e traço
             @return bool True para CPF correto - False para CPF incorreto
            */
            valida_cpf: function (valor) {

                // Garante que o valor é uma string
                valor = valor.toString();

                // Remove caracteres inválidos do valor
                valor = valor.replace(/[^0-9]/g, '');


                // Captura os 9 primeiros dígitos do CPF
                // Ex.: 02546288423 = 025462884
                var digitos = valor.substr(0, 9);

                // Faz o cálculo dos 9 primeiros dígitos do CPF para obter o primeiro dígito
                var novo_cpf = GARRA.Methods.CPF_CNPJ.calc_digitos_posicoes(digitos);

                // Faz o cálculo dos 10 dígitos do CPF para obter o último dígito
                var novo_cpf = GARRA.Methods.CPF_CNPJ.calc_digitos_posicoes(novo_cpf, 11);

                // Verifica se o novo CPF gerado é idêntico ao CPF enviado
                if (novo_cpf === valor) {
                    // CPF válido
                    return true;
                } else {
                    // CPF inválido
                    return false;
                }

            },

            /*
             valida_cnpj
     
             Valida se for um CNPJ
     
             @param string cnpj
             @return bool true para CNPJ correto
            */
            valida_cnpj: function (valor) {

                // Garante que o valor é uma string
                valor = valor.toString();

                // Remove caracteres inválidos do valor
                valor = valor.replace(/[^0-9]/g, '');


                // O valor original
                var cnpj_original = valor;

                // Captura os primeiros 12 números do CNPJ
                var primeiros_numeros_cnpj = valor.substr(0, 12);

                // Faz o primeiro cálculo
                var primeiro_calculo = GARRA.Methods.CPF_CNPJ.calc_digitos_posicoes(primeiros_numeros_cnpj, 5);

                // O segundo cálculo é a mesma coisa do primeiro, porém, começa na posição 6
                var segundo_calculo = GARRA.Methods.CPF_CNPJ.calc_digitos_posicoes(primeiro_calculo, 6);

                // Concatena o segundo dígito ao CNPJ
                var cnpj = segundo_calculo;

                // Verifica se o CNPJ gerado é idêntico ao enviado
                if (cnpj === cnpj_original) {
                    return true;
                }

                // Retorna falso por padrão
                return false;

            },

            /*
             valida_cpf_cnpj
     
             Valida o CPF ou CNPJ
     
             @access public
             @return bool true para válido, false para inválido
            */
            valida_cpf_cnpj: function (valor) {

                // Verifica se é CPF ou CNPJ
                var valida = GARRA.Methods.CPF_CNPJ.verifica_cpf_cnpj(valor);

                // Garante que o valor é uma string
                valor = valor.toString();

                // Remove caracteres inválidos do valor
                valor = valor.replace(/[^0-9]/g, '');


                // Valida CPF
                if (valida === 'CPF') {
                    // Retorna true para cpf válido
                    return GARRA.Methods.CPF_CNPJ.valida_cpf(valor);
                }
                    // Valida CNPJ
                else if (valida === 'CNPJ') {
                    // Retorna true para CNPJ válido
                    return GARRA.Methods.CPF_CNPJ.valida_cnpj(valor);
                }
                    // Não retorna nada
                else {
                    return false;
                }

            },

            /*
             formata_cpf_cnpj
     
             Formata um CPF ou CNPJ
     
             @access public
             @return string CPF ou CNPJ formatado
            */
            formata_cpf_cnpj: function (valor) {

                // O valor formatado
                var formatado = false;

                // Verifica se é CPF ou CNPJ
                var valida = GARRA.Methods.CPF_CNPJ.verifica_cpf_cnpj(valor);

                // Garante que o valor é uma string
                valor = valor.toString();

                // Remove caracteres inválidos do valor
                valor = valor.replace(/[^0-9]/g, '');


                // Valida CPF
                if (valida === 'CPF') {

                    // Verifica se o CPF é válido
                    if (GARRA.Methods.CPF_CNPJ.valida_cpf(valor)) {

                        // Formata o CPF ###.###.###-##
                        formatado = valor.substr(0, 3) + '.';
                        formatado += valor.substr(3, 3) + '.';
                        formatado += valor.substr(6, 3) + '-';
                        formatado += valor.substr(9, 2) + '';

                    }

                }
                    // Valida CNPJ
                else if (valida === 'CNPJ') {

                    // Verifica se o CNPJ é válido
                    if (GARRA.Methods.CPF_CNPJ.valida_cnpj(valor)) {

                        // Formata o CNPJ ##.###.###/####-##
                        formatado = valor.substr(0, 2) + '.';
                        formatado += valor.substr(2, 3) + '.';
                        formatado += valor.substr(5, 3) + '/';
                        formatado += valor.substr(8, 4) + '-';
                        formatado += valor.substr(12, 14) + '';

                    }

                }

                // Retorna o valor 
                return formatado;

            }
        }
    }
};

//$(document).keydown(function (e) {
//    return (e.which || e.keyCode) !== 116;
//});