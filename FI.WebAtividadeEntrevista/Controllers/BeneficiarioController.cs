using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Incluir()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiarios bo = new BoBeneficiarios();
            BoCliente boCliente = new BoCliente();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else if (!ValidaDigitoCPF.ValidaCPF(model.CPF))
            {
                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, "CPF Inválido"));
            }
            else if (!boCliente.VerificarExistencia(model.CPF))
            {

                model.Id = bo.Incluir(new Beneficiario()
                {
                    Nome = model.Nome,
                    CPF = model.CPF,
                    IdCliente = model.IdCliente
                });

                Response.StatusCode = 200;
                return Json("Cadastro efetuado com sucesso");
            }
            else
            {
                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, "CPF já cadastrado"));
            }
        }

        [HttpPost]
        public JsonResult AlterarBeneficiario(BeneficiarioModel model)
        {
            BoBeneficiarios bo = new BoBeneficiarios();
            BoCliente boCliente = new BoCliente();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else if (!ValidaDigitoCPF.ValidaCPF(model.CPF))
            {
                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, "CPF Inválido"));
            }
            else if (!boCliente.VerificarExistencia(model.CPF))
            {
                bo.Alterar(new Beneficiario()
                {
                    Id = model.Id,
                    Nome = model.Nome,
                    CPF = model.CPF
                });

                Response.StatusCode = 200;
                return Json("Cadastro alterado com sucesso");
            }
            else
            {
                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, "CPF já cadastrado"));
            }
        }

        [HttpPost]
        public JsonResult AlterarConsulta(long id)
        {
            BoBeneficiarios bo = new BoBeneficiarios();
            Beneficiario beneficiario = bo.Consultar(id);
            Models.BeneficiarioModel model = null;

            if (beneficiario != null)
            {
                model = new BeneficiarioModel()
                {
                    Id = beneficiario.Id,
                    Nome = beneficiario.Nome,
                    CPF = beneficiario.CPF,
                    IdCliente = beneficiario.IdCliente,
                };
            }

            Response.StatusCode = 200;
            return Json(model);
        }

        [HttpPost]
        public JsonResult Excluir(long id)
        {
            BoBeneficiarios bo = new BoBeneficiarios();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                bo.Excluir(id);

                Response.StatusCode = 200;
                return Json("Cadastro excluído com sucesso");
            }
        }

        [HttpPost]
        public JsonResult Listar(int idCliente = 0) 
        {
            BoBeneficiarios bo = new BoBeneficiarios();
            List<Beneficiario> beneficiarios = bo.Listar(idCliente);

            return Json(new { Result = "OK", Records = beneficiarios, TotalRecordCount = 10 });
        }
    }
}
