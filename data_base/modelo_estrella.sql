-- public.cliente definition

-- Drop table

-- DROP TABLE public.cliente;

CREATE TABLE public.cliente (
	rut_cliente int4 NOT NULL,
	nombre varchar NULL,
	apellido varchar NULL,
	telefono int4 NULL,
	sexo bool NULL,
	comuna varchar NULL,
	region varchar NULL,
	CONSTRAINT cliente_pk PRIMARY KEY (rut_cliente)
);


-- public.empleado definition

-- Drop table

-- DROP TABLE public.empleado;

CREATE TABLE public.empleado (
	rut_empleado int4 NOT NULL,
	nombre varchar NULL,
	apellido varchar NULL,
	telefono int4 NULL,
	comuna varchar NULL,
	region varchar NULL,
	CONSTRAINT empleado_pk PRIMARY KEY (rut_empleado)
);


-- public.peluqueria definition

-- Drop table

-- DROP TABLE public.peluqueria;

CREATE TABLE public.peluqueria (
	id_peluqueria int4 NOT NULL,
	nombre varchar NULL,
	comuna varchar NULL,
	region varchar NULL,
	CONSTRAINT peluqueria_pk PRIMARY KEY (id_peluqueria)
);


-- public.producto definition

-- Drop table

-- DROP TABLE public.producto;

CREATE TABLE public.producto (
	id_producto int4 NOT NULL,
	nombre varchar NULL,
	valor int4 NULL,
	CONSTRAINT producto_pk PRIMARY KEY (id_producto)
);


-- public.profesion definition

-- Drop table

-- DROP TABLE public.profesion;

CREATE TABLE public.profesion (
	manicurista bool NULL,
	peluquero bool NULL,
	id_profesion int4 NOT NULL,
	CONSTRAINT profesion_pk PRIMARY KEY (id_profesion)
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


-- public.factcitas definition

-- Drop table

-- DROP TABLE public.factcitas;

CREATE TABLE public.factcitas (
	id_cita int4 NOT NULL,
	fecha timestamp NULL,
	rut_cliente int4 NULL,
	id_boleta_cita int4 NULL,
	id_servicio int4 NULL,
	id_profesion int4 NULL,
	fechaprofesion varchar NOT NULL,
	rut_empleado int4 NULL,
	monto int4 NULL,
	id_peluqueria int4 NULL,
	CONSTRAINT factcitas_pk PRIMARY KEY (id_cita),
	CONSTRAINT factcitas_unique UNIQUE (fechaprofesion),
	CONSTRAINT factcitas_cliente_fk FOREIGN KEY (rut_cliente) REFERENCES public.cliente(rut_cliente),
	CONSTRAINT factcitas_empleado_fk FOREIGN KEY (rut_empleado) REFERENCES public.empleado(rut_empleado),
	CONSTRAINT factcitas_peluqueria_fk FOREIGN KEY (id_peluqueria) REFERENCES public.peluqueria(id_peluqueria),
	CONSTRAINT factcitas_profesion_fk FOREIGN KEY (id_profesion) REFERENCES public.profesion(id_profesion),
	CONSTRAINT factcitas_servicio_fk FOREIGN KEY (id_servicio) REFERENCES public.servicio(id_servicio)
);


-- public.factdetalle definition

-- Drop table

-- DROP TABLE public.factdetalle;

CREATE TABLE public.factdetalle (
	cantidad int4 NULL,
	id_producto int4 NULL,
	id_boleta int4 NULL,
	fecha date NULL,
	id_peluqueria int4 NULL,
	rut_cliente int4 NULL,
	id_factdetalle int4 NOT NULL,
	CONSTRAINT factdetalle_pk PRIMARY KEY (id_factdetalle),
	CONSTRAINT factdetalle_cliente_fk FOREIGN KEY (rut_cliente) REFERENCES public.cliente(rut_cliente),
	CONSTRAINT factdetalle_peluqueria_fk FOREIGN KEY (id_peluqueria) REFERENCES public.peluqueria(id_peluqueria),
	CONSTRAINT factdetalle_producto_fk FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto)
);


-- public.factempleado definition

-- Drop table

-- DROP TABLE public.factempleado;

CREATE TABLE public.factempleado (
	id_peluqueria int4 NULL,
	rut_empleado int4 NULL,
	id_profesion int4 NULL,
	fecha date NULL,
	monto int4 NULL,
	id_factempleado int4 NOT NULL,
	CONSTRAINT factempleado_pk PRIMARY KEY (id_factempleado),
	CONSTRAINT factempleado_empleado_fk FOREIGN KEY (rut_empleado) REFERENCES public.empleado(rut_empleado),
	CONSTRAINT factempleado_peluqueria_fk FOREIGN KEY (id_peluqueria) REFERENCES public.peluqueria(id_peluqueria),
	CONSTRAINT factempleado_profesion_fk FOREIGN KEY (id_profesion) REFERENCES public.profesion(id_profesion)
);