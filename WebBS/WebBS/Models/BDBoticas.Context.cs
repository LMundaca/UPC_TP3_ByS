﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebBS.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class BDBoticasEntities : DbContext
    {
        public BDBoticasEntities()
            : base("name=BDBoticasEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Almacen> Almacen { get; set; }
        public virtual DbSet<Chofer> Chofer { get; set; }
        public virtual DbSet<Control_Asignacion> Control_Asignacion { get; set; }
        public virtual DbSet<DetalleKardex> DetalleKardex { get; set; }
        public virtual DbSet<DetalleNotaIngreso> DetalleNotaIngreso { get; set; }
        public virtual DbSet<DetalleNotaSalida> DetalleNotaSalida { get; set; }
        public virtual DbSet<DetallePedido> DetallePedido { get; set; }
        public virtual DbSet<Kardex> Kardex { get; set; }
        public virtual DbSet<NotaIngreso> NotaIngreso { get; set; }
        public virtual DbSet<NotaSalida> NotaSalida { get; set; }
        public virtual DbSet<Pedido> Pedido { get; set; }
        public virtual DbSet<Productos> Productos { get; set; }
        public virtual DbSet<Ubicacion> Ubicacion { get; set; }
        public virtual DbSet<UbicacionProducto> UbicacionProducto { get; set; }
        public virtual DbSet<Vehiculo> Vehiculo { get; set; }
    
        public virtual ObjectResult<sp_PedidosListar_Result> sp_PedidosListar(string textoBusqueda)
        {
            var textoBusquedaParameter = textoBusqueda != null ?
                new ObjectParameter("TextoBusqueda", textoBusqueda) :
                new ObjectParameter("TextoBusqueda", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_PedidosListar_Result>("sp_PedidosListar", textoBusquedaParameter);
        }
    
        public virtual ObjectResult<sp_DetallePedido_Productos_Result> sp_DetallePedido_Productos(string numeroPedido)
        {
            var numeroPedidoParameter = numeroPedido != null ?
                new ObjectParameter("NumeroPedido", numeroPedido) :
                new ObjectParameter("NumeroPedido", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_DetallePedido_Productos_Result>("sp_DetallePedido_Productos", numeroPedidoParameter);
        }
    
        public virtual ObjectResult<sp_UbicacionProducto_Result> sp_UbicacionProducto(Nullable<int> idProducto)
        {
            var idProductoParameter = idProducto.HasValue ?
                new ObjectParameter("IdProducto", idProducto) :
                new ObjectParameter("IdProducto", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_UbicacionProducto_Result>("sp_UbicacionProducto", idProductoParameter);
        }
    
        public virtual ObjectResult<sp_DetalleNotaIngreso_Result> sp_DetalleNotaIngreso(string numeroNotaIngreso)
        {
            var numeroNotaIngresoParameter = numeroNotaIngreso != null ?
                new ObjectParameter("NumeroNotaIngreso", numeroNotaIngreso) :
                new ObjectParameter("NumeroNotaIngreso", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_DetalleNotaIngreso_Result>("sp_DetalleNotaIngreso", numeroNotaIngresoParameter);
        }
    }
}
