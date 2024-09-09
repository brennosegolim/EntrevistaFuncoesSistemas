using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    /// <summary>
    /// Classe de Modelo de Cliente
    /// </summary>
    public class BeneficiarioModel
    {
        /// <summary>
        /// Identificador do Beneficiário
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        [Required]
        public string Nome { get; set; }

        /// <summary>
        /// Cadastro de Pessoa Física
        /// </summary>
        [Required]
        [MaxLength(11)]
        public string CPF { get; set; }

        /// <summary>
        /// Identificador do Cliente
        /// </summary>
        [Required]
        public long IdCliente { get; set; }

    }
}