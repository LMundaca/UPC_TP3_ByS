﻿/***********************************************************************
Método     : Solicitud.js
Propósito  : Manejo de las Solicitudes 
Se asume   : N/A
Efectos    : N/A
Notas      : N/A
Autor      : (OCR) Orlando Carril Ramirez.
Fecha/Hora de Creación : 20/01/2016- 11:18am
Modificado : N/A
Fecha/Hora : N/A
***********************************************************************/
$(document).ready(function () {
    'use strict';

    $('#btnSolicitar').bind('click', function (event) {

        var url = '/Presupuesto/SolicitudReg?pID=-1';
        window.location.href = url;
    });

    $('#btnBuscar').bind('click', function (event) {

        $.f_reloadGrid('gridTabla');
    });

    $.fnu_configuraGridTabla();
    
    $('#hddcodArea').val();
    $('#txtAnio').val($('#hddnumAnio').val());
    $('#txtsegUsuarioEdita').attr('Disabled', true);
    $('#txtsegFechaEdita').attr('Disabled', true);
    $('#txtAnio').attr('Disabled', true);
    //$('#txtmonTotalPresupuesto').attr('Disabled', true);
    //$('#txtmonTotalSolicitado').attr('Disabled', true);
    //$('#txtmonTotalGastado').attr('Disabled', true);
   // $.f_formatoFechas("txtfecGasto");
    //$.fnu_MostrarTotalesPresupuesto();
});

/**********************************************************************
Nombre: configuraGrilla
Funcion: Configuración de grilla
**********************************************************************/
(function ($) {

    $.fnu_configuraGridTabla = function () {
        'use strict';

        var gridWidth = window.screen.width * 0.9 - 55;
        $('[id*=gridTabla]').jqGrid({
            width: gridWidth,
            autowidth: true,
            shrinkToFit: false,
            datatype: $.getDataTabla,
            jsonReader:
            {
                root: "Items",
                page: "CurrentPage",
                total: "PageCount",
                records: "RecordCount",
                repeatitems: true,
                cell: "Row",
                id: "ID"
            },
            mtype: 'POST',
            colNames: ['', '','N° Solicitud', 'Fecha Solicitada', 'Fecha Límite', 'Generado por', 'Aprobado por','Estado', 'Tipo','Presupuesto', 'Editado el ', 'Editado por'],
            colModel: [
                { name: '', index: '', width: 35, align: 'center', editable: false, formatter: $.formatEditar, sortable: false },
                { name: '', index: '', width: 35, align: 'center', editable: false, formatter: $.formatEliminar, sortable: false },
                { name: 'numSolicitud', index: 'numSolicitud', editable: true, width: 100, align: 'left' },
                { name: 'fecSolicitada', index: 'fecSolicitada', editable: true, width: 160, align: 'left' },
                { name: 'fecLimite', index: 'fecLimite', editable: false, width: 140, align: 'center' },
                { name: 'codEmpleadoGenera', index: 'codEmpleadoGenera', editable: false, width: 150, align: 'left' },
                { name: 'codEmpleadoAprueba', index: 'codEmpleadoAprueba', editable: false, width: 150, align: 'left' },
                { name: 'codRegEstadoNombre', index: 'codRegEstadoNombre', editable: false, width: 100, align: 'left' },
                { name: 'indTipo', index: 'indTipo', editable: false, width: 80, align: 'center' },
                { name: 'codPresupuesto', index: 'codPresupuesto', editable: false, width: 110, align: 'left' },
                { name: 'segFechaEdita', index: 'segFechaEdita', editable: true, width: 155, align: 'left' },
                { name: 'segUsuarioEdita', index: 'segUsuarioEdita', editable: true, width: 140, align: 'left' }
                ],
            pager: 'pagerTabla',
            pagerpos: "center",
            loadtext: 'Cargando datos',
            recordtext: "{0} - {1} de {2}",
            emptyrecords: 'No existen partida aprobada para ejecución',
            pgtext: 'Pág: {0} de {1}',
            rowNum: 10,
            rowList: [10, 20, 40, 80],
            sortname: 'codPartidaNombre',
            sortorder: "asc",
            viewrecords: true,
            caption: 'Listado',
            height: 'auto',
            rownumbers: true,
            altRows: true,
            subGrid: true,
            subGridOptions: {
                expandOnLoad: false,
                selectOnExpand: false,
                reloadOnExpand: false
            },
            subGridRowExpanded: function (idSubgrid, rowID) {
                var pIdSubGrid = idSubgrid + "_t";
                var pIdSubPager = "p_" + pIdSubGrid;
                $("#" + idSubgrid).html("<table id='" + pIdSubGrid + "'></table><div id='" + pIdSubPager + "'></div>");
                $.configuraGrillaDetalle(pIdSubGrid, pIdSubPager, rowID);
            }
        });

        $(".ui-jqgrid-titlebar").hide();
    }
})(jQuery);

//**********************************************************************
// Nombre: configuraGrillaDetalle
// Funcion: Configuración grilla de Registros de Gastos
//**********************************************************************
(function ($) {
    $.configuraGrillaDetalle = function (subGridID, pagerSubGridID, rowID) {
        'use strict';

        var widthGrid = window.screen.width * 0.9 - 90;

        $('#' + subGridID).jqGrid({
            width: widthGrid,
            shrinkToFit: false,

            datatype: function (postData) {

                window.sessionStorage.setItem('idSubGrid', subGridID);

                var parametro = Object();
                parametro["p_TamPagina"] = postData.rows;
                parametro["p_NumPagina"] = postData.page;
                parametro["p_OrdenPor"] = postData.sidx;
                parametro["p_OrdenTipo"] = postData.sord;
                parametro['codPlantillaDeta'] = rowID;

                var paramAjax = Object();
                paramAjax['ajaxMessage'] = 'Cargando detalle de la solicitud...';
                paramAjax['url'] = '/Presupuesto/ListarSolicitudDeta';
                paramAjax['data'] = JSON.stringify(parametro);
                paramAjax['error'] = $.f_ajaxRequestFailed;
                paramAjax['success'] = $.getDataDetalleSuccess;

                $.f_ajaxRespuesta(paramAjax);
            },

            jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
            {
                root: "Items",
                page: "CurrentPage",
                total: "PageCount",
                records: "RecordCount",
                repeatitems: true,
                cell: "Row",
                id: "ID" //index of the column with the PK in it    
            },
            mtype: 'POST',
            colNames: ['', '', 'Nro Documento', 'Fecha Gasto', 'Cantidad', 'Monto Gastado','Responsable','Observaciones', 'Editado el ', 'Editado por'],
            colModel: [
                    { name: 'Editar', index: 'Editar', width: 35, align: 'center', editable: false, formatter: $.formatEditarReg, sortable: false, hidden:true },
                    { name: 'Eliminar', index: 'Eliminar', width: 35, align: 'center', editable: false, formatter: $.formatEliminarReg, sortable: false, hidden: true },
                    { name: 'numDocumento', index: 'numDocumento', editable: true, width: 130, align: 'left' },
                    { name: 'fecGasto', index: 'fecGasto', editable: true, width: 100, align: 'left'},
                    { name: 'cntCantidad', index: 'cntCantidad', editable: true, width: 80, align: 'left'},
                    { name: 'monTotal', index: 'monTotal', editable: true, width: 90, align: 'left'},
                    { name: 'codEmpResponsable', index: 'codEmpResponsable', editable: true, width: 180, align: 'left' },
                    { name: 'gloObservacion', index: 'gloObservacion', editable: true, width: 250, align: 'left' },
                    { name: 'segFechaEdita', index: 'segFechaEdita', editable: true, width: 150, align: 'left', search: false },
                    { name: 'segUsuarioEdita', index: 'segUsuarioEdita', editable: true, width: 70, align: 'left', search: false }
            ],

            pager: pagerSubGridID,
            pagerpos: "left",
            loadtext: 'Cargando datos...',
            recordtext: "{0} - {1} de {2}",
            emptyrecords: 'vacío',
            pgtext: 'Pág: {0} de {1}',
            rowNum: 5,
            rowList: [5, 10, 20, 40, 80],
            sortname: 'fecGasto',
            sortorder: "asc",
            viewrecords: true,
            caption: 'Listado',
            height: 'auto',
            altRows: false
        }).jqGrid(); //'filterToolbar', { stringResult: true, searchOnEnter: true }

        $.f_cssGridApply(false, 1);
    }
})(jQuery);

//**********************************************************************
// Nombre: $.getDataDetalleSuccess
// Funcion: Función callback luego de solicitar data para el jQGrid de detalle
//**********************************************************************
(function ($) {
    $.getDataDetalleSuccess = function (response, status) {
        'use strict';

        if (status == 'success') {
            var tipo = response.Type;
            var mensaje = response.Data;

            if (tipo == 'E')
                $.f_Mensaje(mensaje, true, true);
            else if (tipo == 'I')
                $.f_Mensaje(mensaje, true, true);
            else if (tipo == 'C') {
                var data = mensaje;
                var idSubGrid = window.sessionStorage.getItem('idSubGrid');
                var grid = $("#" + idSubGrid)[0];
                grid.addJSONData(data);
            }
        }
        else
            $.f_Mensaje(response.responseText, true, true, 1);
    }
})(jQuery);

/**********************************************************************
  Nombre: $.getDataTabla
  Funcion: Se dispara para realizar una petición de la data actualizada 
           del jQGrid de Datos
 ***********************************************************************/
(function ($) {
    $.getDataTabla = function (postData) {
        'use strict';

        // Leer los datos para la petición
        var vnumAnio = $('#hddnumAnio').val();
        var vcodArea = $('#cboAreas').val();
        var vcodRegEstado = 4;
        var vnumSolicitud = $('#hddnumAnio').val();
        var parametros = Object();
        parametros["p_TamPagina"] = postData.rows;
        parametros["p_NumPagina"] = postData.page;
        parametros["p_OrdenPor"] = postData.sidx;
        parametros["p_OrdenTipo"] = postData.sord;

        parametros["numAnio"] = vnumAnio; //null;
        //parametros["codArea"] = vcodArea;
        parametros["codRegEstado"] = vcodRegEstado;
        //parametros["numSolicitud"] = vnumSolicitud;
        
        var paramAjax = Object();
        paramAjax["ajaxMessage"] = 'Listando detalle de plantillas presuestales...';
        paramAjax["url"] = "/Presupuesto/ListarSolicitud";
        paramAjax["data"] = JSON.stringify(parametros);
        paramAjax["error"] = $.f_ajaxRequestFailed;
        paramAjax["success"] = function (response, status) {  /* Función callback */
            if (status == 'success') {
                var tipo = response.Type;
                var mensaje = response.Data;
                if (tipo == "E")
                    $.f_Mensaje(mensaje, false, true, 1);
                else if (tipo == "I")
                    $.f_Mensaje(mensaje, false, true);
                else
                    $.getDataTablaSuccess(response, status);
            }
            else
                $.f_Mensaje(response.responseText, true, true, 1);
        }


        $.f_ajaxRespuesta(paramAjax);
    }
})(jQuery);

/**********************************************************************
 Nombre: $.getDataTablaSuccess
 Funcion: Función callback luego de solicitar data para el jQGrid
 **********************************************************************/
(function ($) {
    $.getDataTablaSuccess = function (response, status) {
        'use strict';

        if (status == 'success') {
            var tipo = response.Type;
            var mensaje = response.Data;
            if (tipo == 'E')
                $.f_Mensaje(mensaje, true, true, 1);
            else if (tipo == 'I')
                $.f_Mensaje(mensaje, true, true);
            else if (tipo == 'C') {
                $("#gridTabla")[0].addJSONData(mensaje);
            }
        }
    }
})(jQuery);

/***********************************************************************
Nombre: $.formatDetalle (OCR)
Funcion: Formatea columna de Detalle de la grilla de DOCUMENTO
************************************************************************/
(function ($) {
    $.formatEditar = function (cellvalue, options, rowObject) {
        'use strict';

        var srcImage = '../Content/Images/icoEditar.png';
        var image;
        image = "<a href='#' onclick=\"$.fnu_showDialogEditSolicitud('" + options.rowId + "', 0);\"><img title='Detalle se la solicitud de ejecución' src='" + srcImage + "' border='0' id='imgEditarRegistro' /></a>";
        return image;
    }
})(jQuery);


/*******************************************************
Pantalla POPUP para editar registro de Tabla
********************************************************/
(function ($) {
    $.fnu_showDialogEditSolicitud= function (pID) {
        'use strict';

        var url = '/Presupuesto/SolicitudReg?pID=' + pID;
        window.location.href = url;

    };
})(jQuery);

/***********************************************************************
Nombre: $.formatEliminar
Funcion: Formatea columna de eliminación de la grilla de Solicitud
************************************************************************/
(function ($) {
    $.formatEliminar = function (cellvalue, options, rowObject) {
        'use strict';

        var srcImage = '../Content/Images/icoEliminar.png';
        var image;
        image = "<a href='#' onclick=\"$.fnu_showDialogEliminaReg('" + options.rowId + "');\"><img title='Eliminar registro de la solicitud' src='" + srcImage + "' border='0' id='imgEliminarRegistro' /></a>";
        return image;
    }
})(jQuery);


(function ($) {
    $.fnu_showDialogEliminaReg = function (codReg) {
        'use strict';

        var mensajeOK = new CROMMessageBox({
            contenido: '¿Confirma la eliminación del gasto de la partida presupuestal:?',
            tipo: 4,
            botones: [
                    {
                        Etiqueta: "Aceptar",
                        Click: function () { $.fnu_eliminarRegistro(codReg); }
                    },
                    {
                        Etiqueta: "Cancelar"
                    }]
        });
        mensajeOK.Mostrar();
    }
})(jQuery);

(function ($) {
    $.fnu_eliminarRegistro = function (codReg) {
        'use strict';

        var paramAjax = {};
        paramAjax["ajaxMessage"] = 'Eliminando solicitud de ejecución partida presupuestal...';
        paramAjax["url"] = '/Presupuesto/EliminarSolicitud' + '?pId=' + codReg
        paramAjax["error"] = $.f_ajaxRequestFailed;
        paramAjax["success"] = function (response, status) {
            if (status == 'success') {
                var tipo = response.Type;
                var mensaje = response.Data;
                if (tipo == "E")
                    $.f_Mensaje(mensaje, false, true, 1);
                else if (tipo == "I")
                    $.f_Mensaje(mensaje, false, true);
                else if (tipo == "C") {
                    $.f_Mensaje(mensaje, true, true, 3);
                    $.f_reloadGrid('gridTabla');
                }
            }
            else
                $.f_Mensaje(response.responseText, true, true);
        }

        $.f_ajaxRespuesta(paramAjax);

    }
})(jQuery);
