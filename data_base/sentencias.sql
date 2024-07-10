

--1)horario con más citas durante el día por peluquería, identificando la comuna
WITH citas_por_fecha AS (
SELECT DATE(fc.fecha) AS Fecha, COUNT(*) AS cantidad_de_citas FROM factcitas fc 
GROUP BY DATE(fc.fecha))
SELECT Fecha, cantidad_de_citas FROM citas_por_fecha
WHERE cantidad_de_citas = (SELECT MAX(cantidad_de_citas) FROM citas_por_fecha)
ORDER BY Fecha;

--lista de clientes que gastan más dinero por peluquería, indicando comuna del cliente y de peluquería, además de cuanto gasto 
select fd.rut_cliente, fd.id_peluqueria,sum(fd.cantidad * p.valor) as monto_total, c.comuna 
from factdetalle fd
inner join producto p on fd.id_producto = p.id_producto 
inner join cliente c on fd.rut_cliente = c.rut_cliente 
group by fd.rut_cliente, fd.id_peluqueria,c.comuna
having sum(fd.cantidad * p.valor) = (
    select max(sub.monto_total)
    from (select fd2.id_peluqueria,sum(fd2.cantidad * p2.valor) as monto_total
        from factdetalle fd2
        inner join producto p2 on fd2.id_producto = p2.id_producto
 		group by fd2.rut_cliente, fd2.id_peluqueria
            having fd2.id_peluqueria = fd.id_peluqueria) sub)
order by fd.id_peluqueria asc;
--lista de peluqueros que ha ganado más por mes durante el 2023, esto por peluquería 
with ganancias_peluquero_mes as (
    select fc.id_peluqueria, extract(year from fc.fecha) as anio, extract(month from fc.fecha) as mes, fc.rut_empleado, sum(fc.monto) as total_ganado,
        rank() over (partition by fc.id_peluqueria, extract(year from fc.fecha), extract(month from fc.fecha) order by sum(fc.monto) desc) as rk
    from factempleado fc
    where extract(year from fc.fecha) = 2023
    group by fc.id_peluqueria, extract(year from fc.fecha), extract(month from fc.fecha), fc.rut_empleado)
select id_peluqueria, anio, mes, rut_empleado, total_ganado
from ganancias_peluquero_mes
where rk = 1
order by id_peluqueria, anio, mes;
--lista de clientes hombres que se cortan el pelo y la barba 
select c.rut_cliente, c.nombre as nombre_cliente, c.sexo, s.nombre as servicio_realizado from factcitas fc
inner join cliente c on fc.rut_cliente = c.rut_cliente
inner join servicio s on fc.id_servicio = s.id_servicio
where (s.nombre = 'Corte de Cabello Hombre' or s.nombre = 'Perfilado Barba')and c.sexo = true
order by c.rut_cliente;


--lista de clientes que tiñen el pelo, indicando la comuna del cliente, la peluquería donde se atendió y el valor que pagó 
select distinct on (c.rut_cliente) c.rut_cliente, c.nombre , c.comuna, fc.id_peluqueria, s.costo, s.nombre from factcitas fc
inner join cliente c on fc.rut_cliente = c.rut_cliente
inner join servicio s on fc.id_servicio = s.id_servicio
where s.nombre = 'Tinte para Cabello'
order by c.rut_cliente;

--identificar el horario más concurrido por peluquería durante el 2019 y 2020, desagregados por mes 
with citas_por_mes as (select extract(year from fc.fecha) as anio, extract(month from fc.fecha) as mes, to_char(fc.fecha, 'HH24:MI') as hora, count(*) as cantidad_citas,
        rank() over (partition by extract(year from fc.fecha), extract(month from fc.fecha) order by count(*) desc) as rk from factcitas fc
where extract(year from fc.fecha) in (2019, 2020)
group by anio, mes, hora)
select anio, mes, hora, cantidad_citas
from citas_por_mes
where rk = 1
order by mes asc;

--identificar al cliente que ha tenido las citas más largas por peluquería, por mes
with max_duracion_cliente as (
    select fc.id_peluqueria, extract(year from fc.fecha) as anio, extract(month from fc.fecha) as mes, fc.rut_cliente, max(s.duracion) as max_duracion
    from factcitas fc
    inner join servicio s on fc.id_servicio = s.id_servicio
    group by fc.id_peluqueria, extract(year from fc.fecha), extract(month from fc.fecha), fc.rut_cliente ),
duracion_mes as ( select id_peluqueria, anio, mes, rut_cliente, max_duracion, rank() over (partition by id_peluqueria, anio, mes order by max_duracion desc) as rk
    from max_duracion_cliente)
select id_peluqueria, anio, mes, rut_cliente, max_duracion as duracion_servicio
from duracion_mes
where rk = 1
order by anio, id_peluqueria, mes;

--identificar al peluquero que ha trabajado más por mes durante el 2019
with citas_por_pelucquero as (
    select e.rut_empleado, extract(year from fc.fecha) as anio, extract(month from fc.fecha) as mes, count(*) * 0.5 as horas_trabajadas,
        rank() over (partition by extract(year from fc.fecha), extract(month from fc.fecha) order by count(*) desc) as rk
    from factcitas fc
    inner join empleado e on fc.rut_empleado = e.rut_empleado
    where extract(year from fc.fecha) = 2020
    group by e.rut_empleado, anio, mes)
select anio, mes, ep.rut_empleado, ep.nombre as nombre_empleado, cp.horas_trabajadas
from citas_por_pelucquero cp
join empleado ep on cp.rut_empleado = ep.rut_empleado
where rk = 1
order by mes asc;
-- Seleccionar solo el empleado con más citas por mes
select extract(year from fc.fecha) as anio, extract(month from fc.fecha) as mes, fc.rut_empleado, e.nombre as nombre_empleado, count(distinct fc.id_boleta_cita) as cantidad_citas
from factcitas fc
inner join empleado e on fc.rut_empleado = e.rut_empleado
group by extract(year from fc.fecha), extract(month from fc.fecha), fc.rut_empleado, e.nombre
having count(distinct fc.id_boleta_cita) = (
        select max(num_citas)from (
            select count(distinct fc.id_boleta_cita) as num_citas from factcitas fc
            group by extract(year from fc.fecha), extract(month from fc.fecha), fc.rut_empleado) as max_citas)
order by cantidad_citas desc;

--identificar lista clientes de totales por comuna, cantidad de peluquerías, cantidad de clientes residentes en la comuna
select p.comuna, count(distinct fc.rut_cliente) from factcitas fc 
inner join peluqueria p ON fc.id_peluqueria = p.id_peluqueria 
group by p.comuna;
select p.comuna, count(distinct p.id_peluqueria) from peluqueria p
group by p.comuna;
select c.comuna, count(distinct c.rut_cliente) from cliente c
group by c.comuna


