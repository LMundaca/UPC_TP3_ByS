using System;
using System.Collections.Generic;
using System.Configuration;
using log4net;

using ByS.Presupuesto.Entities;
using ByS.Presupuesto.Entities.DTO;

namespace ByS.Presupuesto.Data
{ 
	/// <summary>
	/// Proyecto    :  Modulo de Mantenimiento de : 
	/// Creacion    : CROM - Orlando Carril Ramírez
	/// Fecha       : 26/11/2015-12:29:08 a.m.
	/// Descripcion : Capa de Datos 
	/// Archivo     : [Presupuesto.PresupuestoData.cs]
	/// </summary>
	public class PresupuestoData
	{
        private static readonly ILog log = LogManager.GetLogger(typeof(PresupuestoData));
        private string conexion = string.Empty;

		public PresupuestoData()
		{
            conexion = Util.ConexionBD();
		}
	
        #region /* Proceso de SELECT ALL */ 

		/// <summary>
		/// Retorna un LISTA de registros de la Entidad Presupuesto.Presupuesto
		/// En la BASE de DATO la Tabla : [Presupuesto.Presupuesto]
		/// <summary>
		/// <returns>List</returns>
        public List<PresupuestoEntityDTO> Listar(int? pID)
        {
            List<PresupuestoEntityDTO> lstPresupuestoEntityDTO = new List<PresupuestoEntityDTO>();
            try
            {
                using (_DBMLPresupuestoDataContext SQLDC = new _DBMLPresupuestoDataContext(conexion))
                {
                    var resul = SQLDC.pa_S_Presupuesto(pID);
                    foreach (var item in resul)
                    {
                        lstPresupuestoEntityDTO.Add(new PresupuestoEntityDTO()
                        {
                            codPresupuesto = item.codPresupuesto,
                            desNombre = item.desNombre,
                            numAnio = item.numAnio,
                            fecInicio = item.fecInicio.HasValue ? item.fecInicio.Value.ToShortDateString() : string.Empty,
                            fecCierre = item.fecCierre.HasValue ? item.fecCierre.Value.ToShortDateString() : string.Empty,
                            codRegEstado = item.codRegEstado,
                            segUsuarioEdita = string.IsNullOrEmpty(item.segUsuarioEdita) ? item.segUsuarioEdita : item.segUsuarioCrea,
                            segFechaEdita = item.segFechaEdita.HasValue ? item.segFechaEdita.Value.ToString() : item.segFechaCrea.ToString(),
                            monTotalGastado = item.monTotalGastado.HasValue?item.monTotalGastado.Value.ToString("N2"):"0.00",
                            monTotalPresupuesto = item.monTotalPresupuesto.HasValue ? item.monTotalPresupuesto.Value.ToString("N2") : "0.00",
                            monTotalSolicitado = item.monTotalSolicitado.HasValue ? item.monTotalSolicitado.Value.ToString("N2") : "0.00",
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                log.Error(String.Concat("Listar", " | ", ex.Message.ToString()));
                throw ex;
            }
            return lstPresupuestoEntityDTO;
        }
		#endregion 

        #region /* Proceso de SELECT BY ID CODE */

        /// <summary>
        /// Retorna una ENTIDAD de registro de la Entidad Presupuesto.Presupuesto
        /// En la BASE de DATO la Tabla : [Presupuesto.Presupuesto]
        /// <summary>
        /// <returns>Entidad</returns>
        public PresupuestoEntityDTO Buscar(int numAnio)
        {
            PresupuestoEntityDTO objPresupuestoEntityDTO = new PresupuestoEntityDTO();
            try
            {
                using (_DBMLPresupuestoDataContext SQLDC = new _DBMLPresupuestoDataContext(conexion))
                {
                    var resul = SQLDC.pa_S_Presupuesto(numAnio);
                    foreach (var item in resul)
                    {
                        objPresupuestoEntityDTO = new PresupuestoEntityDTO()
                        {
                            codPresupuesto = item.codPresupuesto,
                            desNombre = item.desNombre,
                            numAnio = item.numAnio,
                            fecInicio = item.fecInicio.HasValue ? item.fecInicio.Value.ToShortDateString() : string.Empty,
                            fecCierre = item.fecCierre.HasValue ? item.fecCierre.Value.ToShortDateString() : string.Empty,
                            codRegEstado = item.codRegEstado,
                            segUsuarioEdita = string.IsNullOrEmpty(item.segUsuarioEdita) ? item.segUsuarioEdita : item.segUsuarioCrea,
                            segFechaEdita = item.segFechaEdita.HasValue ? item.segFechaEdita.Value.ToString() : item.segFechaCrea.ToString(),
                            monTotalGastado = item.monTotalGastado.HasValue ? item.monTotalGastado.Value.ToString("N2") : "0.00",
                            monTotalPresupuesto = item.monTotalPresupuesto.HasValue ? item.monTotalPresupuesto.Value.ToString("N2") : "0.00",
                            monTotalSolicitado = item.monTotalSolicitado.HasValue ? item.monTotalSolicitado.Value.ToString("N2") : "0.00",
                       
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                log.Error(String.Concat("Buscar", " | ", ex.Message.ToString()));
                throw ex;
            }
            return objPresupuestoEntityDTO;
        }

        #endregion 

        //        #region /* Proceso de INSERT RECORD */ 

//        /// <summary>
//        /// Almacena el registro de una ENTIDAD de registro de Tipo Presupuesto
//        /// En la BASE de DATO la Tabla : [Presupuesto.Presupuesto]
//        /// <summary>
//        /// <param name = >itemPresupuesto</param>
//        public bool Insert( Presupuesto itemPresupuesto )
//        {
//            int codigoRetorno = -1;
//            try
//            {
//                using (CROMDataContext SQLDC = new CROMDataContext(conexion))
//                {
//                    codigoRetorno = SQLDC.omgc_mnt_InsertPresupuesto(
//                        itemPresupuesto.codPresupuesto,
//                        itemPresupuesto.desNombre,
//                        itemPresupuesto.numAnio,
//                        itemPresupuesto.fecInicio,
//                        itemPresupuesto.fecCierre,
//                        itemPresupuesto.codRegEstado,
//                        itemPresupuesto.segUsuarioCrea,
//                        itemPresupuesto.segUsuarioEdita,
//                        itemPresupuesto.segFechaCrea,
//                        itemPresupuesto.segFechaEdita,
//                        itemPresupuesto.segMaquinaOrigen,
//                        itemPresupuesto.indEliminado		);
//                }
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//            return codigoRetorno == 0 ? true : false;
//        }
//        #endregion 

//        #region /* Proceso de UPDATE RECORD */ 

//        /// <summary>
//        /// Almacena el registro de una ENTIDAD de registro de Tipo Presupuesto
//        /// En la BASE de DATO la Tabla : [Presupuesto.Presupuesto]
//        /// <summary>
//        /// <param name = >itemPresupuesto</param>
//        public bool Update( Presupuesto itemPresupuesto )
//        {
//            int codigoRetorno = -1;
//            try
//            {
//                using (CROMDataContext SQLDC = new CROMDataContext(conexion))
//                {
//                    codigoRetorno = SQLDC.omgc_mnt_UpdatePresupuesto(
//                        itemPresupuesto.codPresupuesto,
//                        itemPresupuesto.desNombre,
//                        itemPresupuesto.numAnio,
//                        itemPresupuesto.fecInicio,
//                        itemPresupuesto.fecCierre,
//                        itemPresupuesto.codRegEstado,
//                        itemPresupuesto.segUsuarioCrea,
//                        itemPresupuesto.segUsuarioEdita,
//                        itemPresupuesto.segFechaCrea,
//                        itemPresupuesto.segFechaEdita,
//                        itemPresupuesto.segMaquinaOrigen,
//                        itemPresupuesto.indEliminado		);
//                }
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//            return codigoRetorno == 0 ? true : false;
//        }
//        #endregion 

//        #region /* Proceso de DELETE BY ID CODE */ 

//        /// <summary>
//        /// ELIMINA un registro de la Entidad Presupuesto.Presupuesto
//        /// En la BASE de DATO la Tabla : [Presupuesto.Presupuesto]
//        /// <summary>
//        /// <returns>bool</returns>
//        public bool Delete(int prm_codPresupuesto)
//        {
//            int codigoRetorno = -1;
//            try
//            {
//                using (CROMDataContext SQLDC = new CROMDataContext(conexion))
//                {
//                    codigoRetorno = SQLDC.omgc_mnt_DeletePresupuesto(prm_codPresupuesto);
//                }
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//            return codigoRetorno == 0 ? true : false;
//        }
//        #endregion 

	} 
} 