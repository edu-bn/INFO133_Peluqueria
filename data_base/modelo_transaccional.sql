-- public.producto definition

-- Drop table

-- DROP TABLE public.producto;

CREATE TABLE public.producto (
	id_producto int4 NOT NULL,
	nombre varchar NULL,
	valor int4 NULL,
	CONSTRAINT producto_pk PRIMARY KEY (id_producto)
);


-- public.region definition

-- Drop table

-- DROP TABLE public.region;

CREATE TABLE public.region (
	nombre varchar NULL,
	id_region int4 NOT NULL,
	CONSTRAINT region_pk PRIMARY KEY (id_region)
);


-- public.servicio definition

-- Drop table

-- DROP TABLE public.servicio;

CREATE TABLE public.servicio (
	id_servicio int4 NOT NULL,
	nombre varchar NULL,
	costo int4 NULL,
	duracion int4 NULL,
	especialidad varchar NULL,
	CONSTRAINT servicio_pk PRIMARY KEY (id_servicio)
);


-- public.comuna definition

-- Drop table

-- DROP TABLE public.comuna;

CREATE TABLE public.comuna (
	id_comuna int4 NOT NULL,
	nombre varchar NULL,
	id_region int4 NULL,
	CONSTRAINT comuna_pk PRIMARY KEY (id_comuna),
	CONSTRAINT comuna_region_fk FOREIGN KEY (id_region) REFERENCES public.region(id_region)
);


-- public.empleado definition

-- Drop table

-- DROP TABLE public.empleado;

CREATE TABLE public.empleado (
	nombre varchar NULL,
	apellido varchar NULL,
	telefono int4 NULL,
	sueldo int4 NULL,
	id_comuna int4 NULL,
	rut_empleado int4 NOT NULL,
	CONSTRAINT empleado_pk PRIMARY KEY (rut_empleado),
	CONSTRAINT empleado_comuna_fk FOREIGN KEY (id_comuna) REFERENCES public.comuna(id_comuna)
);


-- public.peluqueria definition

-- Drop table

-- DROP TABLE public.peluqueria;

CREATE TABLE public.peluqueria (
	id_peluqueria int4 NOT NULL,
	nombre varchar NULL,
	id_comuna int4 NULL,
	CONSTRAINT peluqueria_pk PRIMARY KEY (id_peluqueria),
	CONSTRAINT peluqueria_comuna_fk FOREIGN KEY (id_comuna) REFERENCES public.comuna(id_comuna)
);


-- public."producto-peluqueria" definition

-- Drop table

-- DROP TABLE public."producto-peluqueria";

CREATE TABLE public."producto-peluqueria" (
	cant int4 NULL,
	id_peluqueria int4 NULL,
	id_producto int4 NULL,
	CONSTRAINT producto_peluqueria_peluqueria_fk FOREIGN KEY (id_peluqueria) REFERENCES public.peluqueria(id_peluqueria),
	CONSTRAINT producto_peluqueria_producto_fk FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto)
);
ALTER TABLE "producto-peluqueria"
ADD CONSTRAINT pk_producto_peluqueria PRIMARY KEY (id_peluqueria, id_producto);


-- public.profesion definition

-- Drop table

-- DROP TABLE public.profesion;

CREATE TABLE public.profesion (
	manicurista bool NULL,
	peluquero bool NULL,
	rut_empleado int4 NULL,
	id_profesion int4 NOT NULL,
	CONSTRAINT profesion_pk PRIMARY KEY (id_profesion),
	CONSTRAINT profesion_empleado_fk FOREIGN KEY (rut_empleado) REFERENCES public.empleado(rut_empleado)
);


-- public."profesion-servicio" definition

-- Drop table

-- DROP TABLE public."profesion-servicio";

CREATE TABLE public."profesion-servicio" (
	id_servicio int4 NULL,
	id_profesion int4 NULL,
	CONSTRAINT profesion_servicio_profesion_fk FOREIGN KEY (id_profesion) REFERENCES public.profesion(id_profesion),
	CONSTRAINT profesion_servicio_servicio_fk FOREIGN KEY (id_servicio) REFERENCES public.servicio(id_servicio)
);


-- public.cliente definition

-- Drop table

-- DROP TABLE public.cliente;

CREATE TABLE public.cliente (
	rut_cliente int4 NOT NULL,
	nombre varchar NULL,
	apellido varchar NULL,
	telefono int4 NULL,
	id_comuna int4 NULL,
	sexo bool NULL,
	CONSTRAINT cliente_pk PRIMARY KEY (rut_cliente),
	CONSTRAINT cliente_comuna_fk FOREIGN KEY (id_comuna) REFERENCES public.comuna(id_comuna)
);


-- public."empleado-peluqueria" definition

-- Drop table

-- DROP TABLE public."empleado-peluqueria";

CREATE TABLE public."empleado-peluqueria" (
	fecha_inicio date NULL,
	fecha_fin date NULL,
	id_peluqueria int4 NULL,
	rut_empleado int4 NULL,
	CONSTRAINT empleado_peluqueria_empleado_fk FOREIGN KEY (rut_empleado) REFERENCES public.empleado(rut_empleado),
	CONSTRAINT empleado_peluqueria_peluqueria_fk FOREIGN KEY (id_peluqueria) REFERENCES public.peluqueria(id_peluqueria)
);


-- public.pago definition

-- Drop table

-- DROP TABLE public.pago;

CREATE TABLE public.pago (
	fecha date NULL,
	id_pago int4 NOT NULL,
	rut_empleado int4 NULL,
	monto int4 NULL,
	id_peluqueria int4 NULL,
	CONSTRAINT pago_pk PRIMARY KEY (id_pago),
	CONSTRAINT pago_empleado_fk FOREIGN KEY (rut_empleado) REFERENCES public.empleado(rut_empleado),
	CONSTRAINT pago_peluqueria_fk FOREIGN KEY (id_peluqueria) REFERENCES public.peluqueria(id_peluqueria)
);


-- public.boleta_cita definition

-- Drop table

-- DROP TABLE public.boleta_cita;

CREATE TABLE public.boleta_cita (
	id_boleta_cita int4 NOT NULL,
	monto int4 NULL,
	rut_cliente int4 NULL,
	id_peluqueria int4 NULL,
	CONSTRAINT boleta_pk PRIMARY KEY (id_boleta_cita),
	CONSTRAINT boleta_cita_cliente_fk FOREIGN KEY (rut_cliente) REFERENCES public.cliente(rut_cliente),
	CONSTRAINT boleta_cita_peluqueria_fk FOREIGN KEY (id_peluqueria) REFERENCES public.peluqueria(id_peluqueria)
);


-- public.boleta_venta definition

-- Drop table

-- DROP TABLE public.boleta_venta;

CREATE TABLE public.boleta_venta (
	id_boleta_venta int4 NOT NULL,
	fecha date NULL,
	rut_cliente int4 NULL,
	monto int4 NULL,
	id_peluqueria int4 NULL,
	CONSTRAINT boleta_venta_pk PRIMARY KEY (id_boleta_venta),
	CONSTRAINT boleta_venta_cliente_fk FOREIGN KEY (rut_cliente) REFERENCES public.cliente(rut_cliente),
	CONSTRAINT boleta_venta_peluqueria_fk FOREIGN KEY (id_peluqueria) REFERENCES public.peluqueria(id_peluqueria)
);


-- public.cita definition

-- Drop table

-- DROP TABLE public.cita;

CREATE TABLE public.cita (
	id_cita int4 NOT NULL,
	fecha timestamp NULL,
	rut_cliente int4 NULL,
	id_boleta_cita int4 NULL,
	id_servicio int4 NULL,
	id_profesion int4 NULL,
	horaprofesion varchar NOT NULL,
	CONSTRAINT cita_pk PRIMARY KEY (id_cita),
	CONSTRAINT cita_unique UNIQUE (horaprofesion),
	CONSTRAINT cita_boleta_cita_fk FOREIGN KEY (id_boleta_cita) REFERENCES public.boleta_cita(id_boleta_cita),
	CONSTRAINT cita_cliente_fk FOREIGN KEY (rut_cliente) REFERENCES public.cliente(rut_cliente),
	CONSTRAINT cita_profesion_fk FOREIGN KEY (id_profesion) REFERENCES public.profesion(id_profesion),
	CONSTRAINT cita_servicio_fk FOREIGN KEY (id_servicio) REFERENCES public.servicio(id_servicio)
);


-- public.detalle definition

-- Drop table

-- DROP TABLE public.detalle;

CREATE TABLE public.detalle (
	cantidad int4 NULL,
	id_producto int4 NULL,
	id_boleta_venta int4 NULL,
	CONSTRAINT detalle_boleta_venta_fk FOREIGN KEY (id_boleta_venta) REFERENCES public.boleta_venta(id_boleta_venta),
	CONSTRAINT detalle_producto_fk FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto)
);