import schedule
from dotenv import load_dotenv
import os
import psycopg2
import sys
import codecs

# Cambiar la codificación de la salida estándar a UTF-8
sys.stdout = codecs.getwriter('utf-8')(sys.stdout.detach())

load_dotenv()
tiempo = os.getenv('TIEMPO')


def expTabla(tabla, con):
    query = f"SELECT * FROM {tabla}"
    cursor_source = con.cursor()
    cursor_source.execute(query)
    rows = cursor_source.fetchall()
    cursor_source.close()

    # Convertir los resultados a una matriz (lista de listas)
    matriz = [list(row) for row in rows]
    return matriz


def eliminaDatos(conn):
    """
    Elimina todos los datos de todas las tablas en una base de datos PostgreSQL.
    
    :param conn: Objeto de conexión de psycopg2.
    """
    cursor = conn.cursor()
    
    # Obtener el nombre de todas las tablas en la base de datos
    cursor.execute("""
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public';
    """)
    
    tablas = cursor.fetchall()
    
    # Desactivar las restricciones de clave externa temporalmente
    cursor.execute("SET session_replication_role = 'replica';")
    
    # Eliminar los datos de cada tabla
    for tabla in tablas:
        cursor.execute(f"DELETE FROM {tabla[0]};")
    
    # Reactivar las restricciones de clave externa
    cursor.execute("SET session_replication_role = 'origin';")

    conn.commit()
    cursor.close()

def insertarMat(conn, matriz, tabla):
    """
    Inserta los datos de una matriz en una tabla SQL después de eliminar los datos existentes.
    
    :param conn: Objeto de conexión de psycopg2.
    :param matriz: Lista de listas, donde cada sublista es una fila a insertar.
    :param tabla_columnas_str: Cadena con el nombre de la tabla y las columnas, en el formato '"tabla"(columna, columna, columna)'.
    """
    cursor = conn.cursor()
    
    # Crear la consulta SQL para insertar los datos
    insert_query = f"INSERT INTO {tabla} VALUES ({', '.join(['%s'] * len(matriz[0]))})"
    
    # Insertar cada fila de la matriz en la tabla
    for fila in matriz:
        cursor.execute(insert_query, fila)
    
    # Confirmar la transacción
    conn.commit()

    # Cerrar el cursor
    cursor.close()

def actualizar():
    conn_source = psycopg2.connect(
        dbname="peluqueria",
        user="postgres",
        password="1234",
        host="localhost"
    )

    # Conexión a la base de datos destino
    conn_dest = psycopg2.connect(
        dbname="peluqueria estrella",
        user="postgres",
        password="1234",
        host="localhost"
    )


    # Leer datos de la base de datos origen

    matrizCliente = expTabla("cliente", conn_source)
  
    matrizComuna = expTabla("comuna", conn_source)

    matrizRegion = expTabla("region", conn_source)

    matrizEmpleado = expTabla("empleado", conn_source)

    matrizProfesion = expTabla("profesion", conn_source)

    matrizPeluqueria = expTabla("peluqueria", conn_source)

    matrizProducto = expTabla("producto", conn_source)

    matrizServicio = expTabla("servicio", conn_source)

    matrizCita = expTabla("cita", conn_source)

    matrizBoletaCita = expTabla("boleta_cita", conn_source)

    matrizDetalle = expTabla("detalle", conn_source)

    matrizBoletaVenta = expTabla("boleta_venta", conn_source)

    matrizPago = expTabla("pago", conn_source)

    #Formatear las tablas e insertar a la base de datos estrellas
    eliminaDatos(conn_dest)


    matrizClienteIns = []

    for i in matrizCliente:
        matrizClienteIns.append([i[0], i[1], i[2],i[3],matrizComuna[i[4]-1][1], matrizRegion[matrizComuna[i[4]-1][2]-1][0], i[5]])
    insertarMat(conn_dest, matrizClienteIns, "cliente(rut_cliente, nombre, apellido, telefono, comuna, region, sexo)")

    matrizEmpleadoIns = []
    for i in matrizEmpleado:
        matrizEmpleadoIns.append([i[4], i[0], i[1], i[2], matrizComuna[i[3]-1][1], matrizRegion[matrizComuna[i[3]-1][2]-1][0]])
    insertarMat(conn_dest, matrizEmpleadoIns, "empleado(rut_empleado, nombre, apellido, telefono, comuna, region)")

    matrizProfesionIns = []
    for i in matrizProfesion:
        matrizProfesionIns.append([i[3],i[1],i[0]])
    insertarMat(conn_dest, matrizProfesionIns, "profesion(id_profesion, peluquero, manicurista)")
    
    matrizPeluqueriaIns = []
    for i in matrizPeluqueria:
        matrizPeluqueriaIns.append([i[0], i[1], matrizComuna[i[2]-1][1], matrizRegion[matrizComuna[i[2]-1][2]-1][0]])
    insertarMat(conn_dest, matrizPeluqueriaIns, "peluqueria(id_peluqueria, nombre, comuna, region)")

    #producto ingresar como esta
    insertarMat(conn_dest, matrizProducto, "producto(id_producto, nombre, valor)")

    #servicio ingresar como esta
    insertarMat(conn_dest, matrizServicio, "servicio (id_servicio, nombre, costo, duracion, especialidad)")

    matrizFactCita = []
    for i in matrizCita:
        matrizFactCita.append([i[0], i[1], i[2], i[3], i[4], i[5], i[6], matrizProfesion[i[5]-1][2], matrizBoletaCita[i[3]-1][1], matrizBoletaCita[i[3]-1][3]])
    insertarMat(conn_dest, matrizFactCita, "factCitas(id_cita, fecha, rut_cliente, id_boleta_cita, id_servicio, id_profesion, fechaprofesion, rut_empleado, monto, id_peluqueria)")

    matrizFactDetalle = []
    id_factdetalle = 1
    for i in matrizDetalle:
        j = matrizBoletaVenta[i[2]-1]
        matrizFactDetalle.append([id_factdetalle, i[0], i[1], i[2], j[1], j[4], j[2]])
        id_factdetalle += 1
    insertarMat(conn_dest, matrizFactDetalle, "factdetalle(id_factdetalle, cantidad, id_producto, id_boleta, fecha, id_peluqueria, rut_cliente)")    
    
    matrizFactEmpleado = []
    for i in matrizPago:
        for j in matrizProfesion:
            if j[3] == i[3]:
                break
        id_factempleado = 1
        matrizFactEmpleado.append([i[1], i[4], i[2], j[3], i[0], i[3]])
        id_factempleado += 1
    insertarMat(conn_dest, matrizFactEmpleado, "factempleado(id_factempleado, id_peluqueria, rut_empleado, id_profesion, fecha, monto)")    


    conn_source.close()
    conn_dest.close()
    print("Actualizado con exito")

actualizar()

schedule.every(int(tiempo)).seconds.do(actualizar)

while True:
    schedule.run_pending()