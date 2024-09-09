
let modoSalvar = "I";
$(document).ready(function () {
    $("#btnSalvarBeneficiario").click(function (e)
    {
        if (modoSalvar == "I") {
            e.preventDefault();
            $.ajax({
                url: urlPostBen,
                method: "POST",
                data: {
                    "NOME": $("#NomeBeneficiario").val(),
                    "CPF": somenteNumeros($("#CPFBeneficiario").val()),
                    "IdCliente": parseInt(sessionStorage.getItem('idCliente')),
                },
                error:
                    function (r) {
                        if (r.status == 400)
                            ModalDialog("Ocorreu um erro", r.responseJSON);
                        else if (r.status == 500)
                            ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                    },
                success:
                    function (r) {
                        limparCampos();
                        listarBeneficiario(parseInt(sessionStorage.getItem('idCliente')));
                    }
            });
        } else {
            e.preventDefault();
            $.ajax({
                url: urlAltBen,
                method: "POST",
                data: {
                    "ID": parseInt(sessionStorage.getItem('IdBeneficiario')),
                    "NOME": $("#NomeBeneficiario").val(),
                    "CPF": somenteNumeros($("#CPFBeneficiario").val())
                },
                error:
                    function (r) {
                        if (r.status == 400)
                            ModalDialog("Ocorreu um erro", r.responseJSON);
                        else if (r.status == 500)
                            ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                    },
                success:
                    function (r) {
                        limparCampos();
                        listarBeneficiario(parseInt(sessionStorage.getItem('idCliente')));
                    }
            });

            modoSalvar = "I";
        }
    })
})

function abrirModal() {
    modoSalvar = "I";
    $('#modalBeneficiarios').modal('show');
    $("#NomeBeneficiario").val("");
    $("#CPFBeneficiario").val("");
    listarBeneficiario(parseInt(sessionStorage.getItem('idCliente')));
}

function alterarBeneficiario(id) {
    debugger;
    $.ajax({
        url: urlAltConsBen,
        method: "POST",
        data: {
            "ID": id
        },
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                modoSalvar = "A";
                $("#NomeBeneficiario").val(r.Nome);
                $("#CPFBeneficiario").val(String(r.CPF));
                sessionStorage.setItem("IdBeneficiario", id);
            }
    });
}

function deletarBeneficiario(idBeneficiario) {
    $.ajax({
        url: urlDelBen,
        method: "POST",
        data: {
            "ID": idBeneficiario
        },
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                listarBeneficiario(parseInt(sessionStorage.getItem('idCliente')));
            }
    });
}

function listarBeneficiario(idCliente) {
    if ($("#gridBeneficiarios"))
        $('#gridBeneficiarios').jtable({
            title: 'Beneficiários',
            defaultSorting: 'Nome ASC',
            paging: false,
            sorting: false,
            actions: {
                listAction: urlListBen,
                listAction: function (postData) {
                    // Adiciona o parâmetro que será passado
                    return $.ajax({
                        url: urlListBen,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            idCliente: idCliente
                        }
                    });
                }
                //createAction: '~/~/Views/Incluir.cshtml'
            },
            fields: {
                CPF: {
                    title: 'CPF',
                    width: '35%'
                },
                Nome: {
                    title: 'Nome',
                    width: '50%'
                },
                Modificar: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="alterarBeneficiario(\''+ data.record.Id +'\')" class="btn btn-primary btn-sm">Alterar</button>';
                    }
                },
                Deletar: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="deletarBeneficiario(\'' + data.record.Id + '\')" class="btn btn-primary btn-sm">Excluir</button>';
                    }
                }
            }
        });

    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable('load');
}

function limparCampos() {
    $("#NomeBeneficiario").val("");
    $("#CPFBeneficiario").val("");
}

function mascaraCPF(texto) {

    var v = texto.value;

    if (isNaN(v[v.length - 1])) { 
        texto.value = v.substring(0, v.length - 1);
        return;
    }

    texto.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) texto.value += ".";
    if (v.length == 11) texto.value += "-";
}

function somenteNumeros(cpf) {
    let numeros = cpf.toString().replace(/\.|-/gm, '');
    if (numeros.length === 11)
        return numeros;

    return 'cpf inválido'
}

function aplicarMascaraCpf(texto) {
    texto = texto.replace(/\D/g, "")
    texto = texto.replace(/(\d{3})(\d)/, "$1.$2")
    texto = texto.replace(/(\d{3})(\d)/, "$1.$2")
    texto = texto.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return v
}