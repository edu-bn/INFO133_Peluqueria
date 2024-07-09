import random as rd
from fake import FAKER




"""ATENCION !!!!!
    hay un error al hacer los apellidos con la libreria, 
    el apellido O'Whielacronx lleva una ' y desconfigura 
    todo, reemplazar por OWhielacronx en visual estudio."""




def Mostrar(matriz):
    print("La matriz es la siguiente:")
    for fila in matriz:
        for valor in fila:
            print("\t", valor, end=" ")
        print()

archivo = open("datos.sql", "w")

#Listas
regiones = ["Los Lagos", "Los Ríos", "La Araucanía", "Biobío", "Ñuble", "Maule", "O´higgins", "Metropolitana", "Valparaíso", "Coquimbo"]
comunas = ["Puerto Montt", "Osorno","Valdivia", "Mariquina", "Temuco", "Curacautin", "Concepción", "Cabrero", "Chillan", "San Carlo", "Curicó","Linares", "Rancagua", "Pichilemu", "Santiago", "Maipu", "Valparaiso", "Viña del Mar", "Serena", "Coquimbo"]

archivo.write("SET datestyle = 'DMY';\n")
#REGION
archivo.write("insert into region(id_region, nombre)\nvalues\n")
matrizRegion=[]
for i in range(len(regiones)):
    nombre =regiones[i]
    matrizRegion.append([i+1,nombre])
    if i == len(regiones)-1:
        archivo.write(f"\t({i+1}, '{nombre}');\n")
    else:
        archivo.write(f"\t({i+1}, '{nombre}'),\n")
#Mostrar(matrizRegion)
print("======Region Succesful======")

#COMUNA
archivo.write("\ninsert into comuna(id_comuna, nombre, id_region)\nvalues\n")
matrizComuna = []
j = 1
for i in range(len(comunas)):
    if(i > (j*2)-1):
        j = j + 1
    nombre = comunas[i]
    matrizComuna.append([i+1, nombre, j])
    if i == len(comunas)-1:
        archivo.write(f"\t({i+1}, '{nombre}', {j});\n")
    else:
        archivo.write(f"\t({i+1}, '{nombre}', {j}),\n")
#Mostrar(matrizComuna)
print("======Comuna Succesful======")

#servicio(id_servicio, nombre, costo, duracion, especialidad)
matrizServicio = [
    [1, 'Corte de Cabello Hombre', 15000, 1, 'peluquero'],
    [2, 'Corte de Cabello Mujer', 20000, 2, 'peluquero'],
    [3, 'Tinte para Cabello', 35000, 4, 'peluquero'],
    [4, 'Peinado', 25000, 2, 'peluquero'],
    [5, 'Mascarilla Capilar', 8000, 1, 'peluquero'],
    [6, 'Alisado Permanente', 50000, 6, 'peluquero'],
    [7, 'Depilacion de Cejas', 7000, 1, 'peluquero'],
    [8, 'Masaje Capilar', 10000, 1, 'peluquero'],
    [9, 'Lavado de Cabello', 5000, 1, 'peluquero'],
    [10, 'Secado de Cabello', 8000, 1, 'peluquero'],
    [11, 'Moldeado de Cabello', 15000, 2, 'peluquero'],
    [12, 'Tratamiento Anticaida', 30000, 3, 'peluquero'],
    [13, 'Extensiones de Cabello', 60000, 8, 'peluquero'],
    [14, 'Peinado de Novia', 40000, 3, 'peluquero'],
    [15, 'Peinado de Fiesta', 35000, 3, 'peluquero'],
    [16, 'Corte de Puntas', 8000, 1, 'peluquero'],
    [17, 'Brushing', 10000, 1, 'peluquero'],
    [18, 'Botox Capilar', 45000, 4, 'peluquero'],
    [19, 'Manicure', 12000, 1, 'manicurista'],
    [20, 'Pedicure', 15000, 2, 'manicurista'],
    [21, 'Maquillaje', 20000, 2, 'manicurista'],
    [22, 'Manicure con Esmalte Semipermanente', 18000, 2, 'manicurista'],
    [23, 'Pedicure con Esmalte Semipermanente', 20000, 2, 'manicurista'],
    [24, 'Bano de Crema', 12000, 1, 'manicurista'],
    [25, 'Tinte de Cejas', 10000, 1, 'manicurista']
]
archivo.write("\nINSERT INTO servicio (id_servicio, nombre, costo, duracion, especialidad) \nVALUES\n")
for i in matrizServicio:
    if i == matrizServicio[len(matrizServicio)-1]:
        archivo.write(f"\t({i[0]}, '{i[1]}',{i[2]},{i[3]},'{i[4]}');\n")
    else:
        archivo.write(f"\t({i[0]}, '{i[1]}',{i[2]},{i[3]},'{i[4]}'),\n")

print("======Servicio Succesful======")

#producto(id_producto, nombre,valor)
matrizProducto = [
    [1, 'Shampoo Pantene', 8000],
    [2, 'Acondicionador Pantene', 9000],
    [3, 'Shampoo Head & Shoulders', 8500],
    [4, 'Acondicionador Head & Shoulders', 9500],
    [5, 'Gel Fijador Got2b', 7000],
    [6, 'Cera para Cabello American Crew', 7500],
    [7, 'Spray para Cabello Tresemmé', 6000],
    [8, 'Mascarilla Capilar Loreal', 10000],
    [9, 'Tinte para Cabello Garnier', 15000],
    [10, 'Aceite Capilar Moroccanoil', 12000],
    [11, 'Serum para Cabello John Frieda', 13000],
    [12, 'Espuma para Cabello Schwarzkopf', 9000],
    [13, 'Peine Antiestatico Conair', 5000],
    [14, 'Cepillo Desenredante Wet Brush', 7000],
    [15, 'Plancha para Cabello GHD', 50000],
    [16, 'Secador de Cabello Dyson', 45000],
    [17, 'Rizador de Cabello Babyliss', 40000],
    [18, 'Difusor de Cabello DevaCurl', 35000],
    [19, 'Pinta Unas OPI', 4000],
    [20, 'Removedor de Esmalte Cutex', 3000],
    [21, 'Base para Unas Sally Hansen', 5000],
    [22, 'Top Coat para Unas Essie', 6000],
    [23, 'Lima de Unas Revlon', 2000],
    [24, 'Corta Unas Tweezerman', 2500],
    [25, 'Crema para Manos Neutrogena', 8000],
    [26, 'Crema para Pies Eucerin', 9000],
    [27, 'Toallas para Manicure Beauticom', 5000],
    [28, 'Kit de Manicure Beurer', 15000],
    [29, 'Kit de Pedicure Beurer', 16000],
    [30, 'Palito de Naranjo CND', 1000],
    [31, 'Esmalte Semipermanente Shellac', 8000],
    [32, 'Lampara UV para Unas SUNUV', 30000],
    [33, 'Gel de Construccion IBD', 12000],
    [34, 'Pincel para Unas Mia Secret', 5000],
    [35, 'Desinfectante para Herramientas Barbicide', 7000],
    [36, 'Crema para Cuticulas Burts Bees', 4000],
    [37, 'Removedor de Cuticulas Sally Hansen', 3000],
    [38, 'Paleta de Colores para Unas Beetles', 5000],
    [39, 'Guantes Desechables MedPride', 2000],
    [40, 'Mascarilla Facial The Body Shop', 10000],
    [41, 'Tonico Facial Thayers', 8000],
    [42, 'Serum Facial The Ordinary', 12000],
    [43, 'Crema Hidratante Cetaphil', 10000],
    [44, 'Exfoliante Facial St Ives', 9000],
    [45, 'Protector Solar Facial Neutrogena', 11000],
    [46, 'Contorno de Ojos Clinique', 13000],
    [47, 'Desmaquillante Bioderma', 7000],
    [48, 'Algodones Desmaquillantes Demak Up', 3000],
    [49, 'Esponja de Maquillaje Beautyblender', 6000],
    [50, 'Brochas de Maquillaje Real Techniques', 15000]
]

archivo.write("\nINSERT INTO producto (id_producto, nombre, valor) \nVALUES\n")
for i in matrizProducto:
    if i == matrizProducto[len(matrizProducto)-1]:
        archivo.write(f"\t({i[0]}, '{i[1]}',{i[2]});\n")
    else:
        archivo.write(f"\t({i[0]}, '{i[1]}',{i[2]}),\n")

print("======Producto Succesful======")


#cliente(rut_cliente,nombre, apellido, telefono, id_comuna, sexo)

archivo.write("\ninsert into cliente(rut_cliente, nombre, apellido, telefono, id_comuna, sexo)\nvalues\n")
matrizCliente = []
j=1
rut_cliente = 13000000
for i in range(3000):
    rut_cliente = rut_cliente + rd.randint(1,7000)
    sexo = rd.choice([True,False])
    nombre = FAKER.first_name()
    apellido = FAKER.last_name()
    telefono = 900000000+rd.randint(12837498, 92736157)
    id_comuna = rd.randint(1,20)
    matrizCliente.append([rut_cliente, nombre, apellido, telefono, id_comuna, sexo])
    if i == 2999:
        archivo.write(f"\t({rut_cliente}, '{nombre}', '{apellido}', {telefono}, {id_comuna}, {sexo});\n")
    else:
        archivo.write(f"\t({rut_cliente}, '{nombre}', '{apellido}', {telefono}, {id_comuna}, {sexo}),\n")

print("======Cliente Succesful======")

#peluqueria(id_peluqueria, nombre, id_comuna)
matrizPeluqueria = [
    [1, 'Peluqueria 1', 1],
    [2, 'Peluqueria 2', 1],
    [3, 'Peluqueria 3', 1],
    [4, 'Peluqueria 4', 2],
    [5, 'Peluqueria 5', 2],
    [6, 'Peluqueria 6', 3],
    [7, 'Peluqueria 7', 3],
    [8, 'Peluqueria 8', 3],
    [9, 'Peluqueria 9', 4],
    [10, 'Peluqueria 10', 5],
    [11, 'Peluqueria 11', 5],
    [12, 'Peluqueria 12', 6],
    [13, 'Peluqueria 13', 7],
    [14, 'Peluqueria 14', 7],
    [15, 'Peluqueria 15', 7],
    [16, 'Peluqueria 16', 8],
    [17, 'Peluqueria 17', 9],
    [18, 'Peluqueria 18', 10],
    [19, 'Peluqueria 19', 11],
    [20, 'Peluqueria 20', 12],
    [21, 'Peluqueria 21', 13],
    [22, 'Peluqueria 22', 14],
    [23, 'Peluqueria 23', 15],
    [24, 'Peluqueria 24', 15],
    [25, 'Peluqueria 25', 15],
    [26, 'Peluqueria 26', 15],
    [27, 'Peluqueria 27', 16],
    [28, 'Peluqueria 28', 16],
    [29, 'Peluqueria 29', 17],
    [30, 'Peluqueria 30', 17],
    [31, 'Peluqueria 31', 18],
    [32, 'Peluqueria 32', 18],
    [33, 'Peluqueria 33', 19],
    [34, 'Peluqueria 34', 19],
    [35, 'Peluqueria 35', 19],
    [36, 'Peluqueria 36', 19],
    [37, 'Peluqueria 37', 20],
    [38, 'Peluqueria 38', 20],
    [39, 'Peluqueria 39', 20],
    [40, 'Peluqueria 40', 20]
]

archivo.write("\nINSERT INTO peluqueria (id_peluqueria, nombre, id_comuna) \nVALUES\n")
for i in matrizPeluqueria:
    if i == matrizPeluqueria[len(matrizPeluqueria)-1]:
        archivo.write(f"\t({i[0]}, '{i[1]}',{i[2]});\n")
    else:
        archivo.write(f"\t({i[0]}, '{i[1]}',{i[2]}),\n")

print("======Peluqueria Succesful======")


#empleado(rut_empleado,nombre, apellido, telefono, id_comuna)
archivo.write("\ninsert into empleado(rut_empleado, nombre, apellido, telefono, id_comuna)\nvalues\n")
matrizEmpleado = []
j=1
rut_empleado = 12000000
for i in range(100):
    rut_empleado = rut_empleado + rd.randint(0,190000)
    nombre = FAKER.first_name()
    apellido = FAKER.last_name()
    telefono=900000000+rd.randint(12837498, 92736157)
    if(i > (j*5)-1):
        j = j + 1
    id_comuna = matrizPeluqueria[j-1][2]

    matrizEmpleado.append([rut_empleado, nombre, apellido, telefono, id_comuna])
    if i == 99:
        archivo.write(f"\t({rut_empleado}, '{nombre}', '{apellido}', '{telefono}', {id_comuna});\n")
    else:
        archivo.write(f"\t({rut_empleado}, '{nombre}', '{apellido}', '{telefono}', {id_comuna}),\n")

print("======Empleado Succesful======")

#profesion(id_profesion, peluquero, manicurista, rut_empleado)
matrizProfesion=[]
prob =[1,1,2,2,3]
j=1
archivo.write("\nINSERT INTO profesion(id_profesion, peluquero, manicurista, rut_empleado) \nVALUES\n")
for i in matrizEmpleado:
    id_profesion=j
    j+=1
    rut_empleado = i[0]
    peluquero=False
    manicurista = False
    aux = rd.choice(prob)
    if(aux == 1):
        peluquero =True
    elif(aux == 2):
        manicurista = True
    elif(aux==3):
        peluquero = True
        manicurista = True

    matrizProfesion.append([id_profesion, peluquero, manicurista, rut_empleado])
    if i == matrizEmpleado[len(matrizEmpleado)-1]:
        archivo.write(f"\t({id_profesion}, {peluquero}, {manicurista}, {rut_empleado});\n")
    else:
        archivo.write(f"\t({id_profesion}, {peluquero}, {manicurista}, {rut_empleado}),\n")

print("======Profesion Succesful======")

#empleado-peluqueria(fecha_inicio, fecha_fin, id_peluqueria, rut_empleado)
prob = [1,1,1,1,2,2,3]
matrizEmpleadoPeluqueria = []
j=0
archivo.write("\nINSERT INTO \"empleado-peluqueria\"(fecha_inicio, fecha_fin, id_peluqueria, rut_empleado) \nVALUES\n")
for i in range(len(matrizEmpleado)):
    rut_empleado = matrizEmpleado[i][0]
    if(i > (j*5)-1):
        j = j + 1
    id_peluqueria = j
    dia= rd.randint(10,28)
    mes = rd.randint(1,12)
    if (mes<10):
        mes = '0'+str(mes)
    año = rd.choice([2022,2023])
    fecha= str(dia)+'-'+str(mes)+'-'+str(año)
    matrizEmpleadoPeluqueria.append([fecha,None,id_peluqueria,rut_empleado])
    if i == len(matrizEmpleado)-1:
        archivo.write(f"\t('{fecha}',null , {id_peluqueria}, {rut_empleado});\n")
    else:
        archivo.write(f"\t('{fecha}',null , {id_peluqueria}, {rut_empleado}),\n")
print("======Empleado-Peluqueria Succesful======")


#pago(id_pago, fecha,monto, rut_empleado)
matrizPago = []
id_pago=1
archivo.write("\nINSERT INTO pago(id_pago, fecha, monto, rut_empleado, id_peluqueria) \nVALUES\n")

for i in range(len(matrizEmpleado)):
    rut_empleado = matrizEmpleado[i][0]
    mes = int(matrizEmpleadoPeluqueria[i][0][3:5])
    año = int(matrizEmpleadoPeluqueria[i][0][6:10])
    id_peluqueria = matrizEmpleadoPeluqueria[i][2]
    while(año<=2024):
        mes=1
        if año == 2024:
            mesFinal=6
        else:
            mesFinal = 12
        while(mes<=mesFinal):
            if mes<10:
                fecha= '20-0'+str(mes)+'-'+str(año)
            else:
                fecha= '20-'+str(mes)+'-'+str(año)
            monto= rd.randint(200,1000)*100
            matrizPago.append([id_pago,fecha,monto,rut_empleado, id_peluqueria])
            if i == len(matrizEmpleado)-1 and fecha =='20-06-2024':
                archivo.write(f"\t({id_pago},'{fecha}' , {monto}, {rut_empleado}, {id_peluqueria});\n")
            else:
                archivo.write(f"\t({id_pago},'{fecha}' , {monto}, {rut_empleado}, {id_peluqueria}),\n")
            id_pago+=1
            mes+=1
        año+=1
print("======Pago Succesful======")

#profesion-servicio(id_servicio, id_profesion)
archivo.write("\nINSERT INTO \"profesion-servicio\"(id_servicio, id_profesion) \nVALUES\n")
matrizProfesionServicio = []
for i in range(len(matrizProfesion)):
    id_profesion= matrizProfesion[i][0]
    peluquero = matrizProfesion[i][1]
    manicurista = matrizProfesion[i][2]
    if peluquero:
        servicios = rd.sample(matrizServicio[:18], rd.randint(1,18))
        for j in servicios:
            id_servicio= j[0]
            matrizProfesionServicio.append([id_servicio,id_profesion])
            if i == len(matrizProfesion)-1 and not(manicurista) and j == servicios[len(servicios)-1]:
                archivo.write(f"\t({id_servicio}, {id_profesion});\n")
            else:
                archivo.write(f"\t({id_servicio}, {id_profesion}),\n")
            id_pago+=1
    if manicurista:
        servicios = rd.sample(matrizServicio[19:25], rd.randint(1,6))
        for j in servicios:
            id_servicio= j[0]
            matrizProfesionServicio.append([id_servicio,id_profesion])
            if i == len(matrizProfesion)-1 and j == servicios[len(servicios)-1]:
                archivo.write(f"\t({id_servicio}, {id_profesion});\n")
            else:
                archivo.write(f"\t({id_servicio}, {id_profesion}),\n")
print("======Profesion-Servicio Succesful======")

#producto-peluqueria(cant, id_peluqueria, id_producto)
archivo.write("\nINSERT INTO \"producto-peluqueria\"(cant, id_peluqueria, id_producto) \nVALUES\n")
matrizProductoPeluqueria =[]
for i in range(len(matrizPeluqueria)):
    id_peluqueria = matrizPeluqueria[i][0]
    for j in matrizProducto:
        id_producto= j[0]
        cant= rd.randint(0, 100)
        matrizProductoPeluqueria.append([cant,id_peluqueria,id_producto])
        if i == len(matrizPeluqueria)-1 and j == matrizProducto[len(matrizProducto)-1]:
            archivo.write(f"\t({cant}, {id_peluqueria}, {id_producto});\n")
        else:
            archivo.write(f"\t({cant}, {id_peluqueria}, {id_producto}),\n")
print("======Producto-Peluqueria Succesful======")

#boleta_venta(id_boleta_venta,Fecha,rut_cliente)
archivo.write("\nINSERT INTO \"boleta_venta\"(id_boleta_venta, fecha, rut_cliente, monto, id_peluqueria) \nVALUES\n")
matrizBoletaVenta=[]
matrizDetalle = []
clientes = rd.sample(matrizCliente, rd.randint(1500,3000))
id_boleta_venta = 1
for i in clientes:
    rut_cliente = i[0]
    cantBol=rd.randint(1,25)
    while True:
        id_peluqueria = rd.randint(1,40)
        if matrizPeluqueria[id_peluqueria-1][2] == i[4]:
            break
    for j in range(cantBol):
        mes = f'{rd.randint(1, 12):02}'
        dia = f'{rd.randint(1, 28):02}'
        año = rd.randint(2020, 2023)
        fecha = f'{dia}-{mes}-{año}'
        productos = rd.sample(matrizProducto,rd.randint(1,15))
        monto = 0
        for p in productos:
            id_producto = p[0]
            cantidad= rd.randint(1,13)
            matrizDetalle.append([cantidad, id_producto, id_boleta_venta])
            monto += cantidad * p[2]
        matrizBoletaVenta.append([id_boleta_venta,fecha,rut_cliente, monto, id_peluqueria])
        if i == clientes[len(clientes)-1] and j == cantBol-1 and p == productos[len(productos)-1]:
            archivo.write(f"\t({id_boleta_venta}, '{fecha}', {rut_cliente}, {monto}, {id_peluqueria});\n")
        else:
            archivo.write(f"\t({id_boleta_venta}, '{fecha}', {rut_cliente}, {monto}, {id_peluqueria}),\n")
        id_boleta_venta += 1
print("======Boleta_Venta Succesful======")


#detalles(cantidad, id_producto, id_boleta_venta)
archivo.write("\nINSERT INTO detalle(cantidad,id_producto, id_boleta_venta, id_peluqueria) \nVALUES\n")
for i in matrizDetalle:
    if i == matrizDetalle[len(matrizDetalle)-1]:
        archivo.write(f"\t({i[0]}, {i[1]}, {i[2]});\n")
    else:
        archivo.write(f"\t({i[0]}, {i[1]}, {i[2]}),\n")
print("======Detalle Succesful======")


#cita(id_cita, rut_cliente, id_boleta_cita, id_servicio,fecha,id_profesion)
archivo.write("\nINSERT INTO \"cita\" (id_cita,rut_cliente, id_boleta_cita, id_servicio, fecha, id_profesion, horaprofesion) \nVALUES\n")
matrizCita = []
matrizBoletaCita = []
ids =[]
id_cita = 1
id_boleta_cita =1
for i in matrizProfesion:
    cantCi = rd.randint(1,10)
    id_profesion = i[0]
    id_peluqueria = rd.randint(0,39)
    for j in range(cantCi):
        if i[1] and i[2]:
            id_servicio = rd.randint(1,len(matrizServicio))
        else:
            if[1]:
                id_servicio = rd.randint(1,18)
            else:
                id_servicio = rd.randint(19,25)
        rut_cliente = rd.choice(matrizCliente)[0]
        while True:
            mes = f'{rd.randint(1, 12):02}'
            dia = f'{rd.randint(1, 28):02}'
            año = rd.randint(2020, 2023)
            hora = rd.randint(0, 23)  
            minutos = rd.choice([0, 30])
            fecha = f'{dia}-{mes}-{año} {hora:02}:{minutos:02}'
            id = f'{fecha}:{id_profesion}'
            if id not in ids:
                break
        ids.append(id)
        matrizCita.append([id_cita, rut_cliente, id_boleta_cita, id_servicio, fecha, id_profesion, id])
        if i == matrizProfesion[len(matrizProfesion)-1] and matrizServicio[id_servicio-1][3] == 1 and j ==cantCi-1:
           archivo.write(f"\t({id_cita}, {rut_cliente}, {id_boleta_cita}, {id_servicio}, '{fecha}', {id_profesion}, '{id}');\n")
        else:
            archivo.write(f"\t({id_cita}, {rut_cliente}, {id_boleta_cita}, {id_servicio}, '{fecha}', {id_profesion}, '{id}'),\n")
        id_cita += 1
        for l in range(matrizServicio[id_servicio-1][3]-1):
            if minutos==0:
                minutos=30
            else:
                if hora == 23:
                    hora = 0
                else:
                    hora += 1
                minutos = 0
            fecha = f'{dia}-{mes}-{año} {hora:02}:{minutos:02}'
            id = f'{fecha}:{id_profesion}'
            ids.append(id)
            matrizCita.append([id_cita, rut_cliente, id_boleta_cita, id_servicio, fecha, id_profesion, id])
            if i == matrizProfesion[len(matrizProfesion)-1] and j == cantCi-1 and l == matrizServicio[id_servicio-1][3]-2:
                archivo.write(f"\t({id_cita}, {rut_cliente}, {id_boleta_cita}, {id_servicio}, '{fecha}', {id_profesion}, '{id}');\n")
            else:
                archivo.write(f"\t({id_cita}, {rut_cliente}, {id_boleta_cita}, {id_servicio}, '{fecha}', {id_profesion}, '{id}'),\n")
            id_cita += 1
        matrizBoletaCita.append([id_boleta_cita,rut_cliente,matrizServicio[id_servicio-1][2],id_peluqueria])
        id_boleta_cita += 1
print("======Cita Succesful======")


#boleta_cita(id_boleta_cita, rut_cliente, monto)
archivo.write("\nINSERT INTO \"boleta_cita\" (id_boleta_cita, rut_cliente, monto, id_peluqueria) \nVALUES\n")
for i in matrizBoletaCita:
    if i == matrizBoletaCita[len(matrizBoletaCita)-1]:
        archivo.write(f"\t({i[0]}, {i[1]},{i[2]}, {i[3]});\n")
    else:
        archivo.write(f"\t({i[0]}, {i[1]},{i[2]}, {i[3]}),\n")
print("======BoletaCita Succesful======")

archivo.close()





archivo = open("datosEstrella.sql", "w")
#cliente(rut_cliente,nombre, apellido, telefono, comuna, region, sexo)
archivo.write("\nINSERT INTO de cliente(rut_cliente, nombre, apellido, telefono, comuna, region, sexo) \nVALUES\n")
for i in matrizCliente:
    if i == matrizCliente[len(matrizCliente)-1]:
        archivo.write(f"\t({i[0]}, '{i[1]}', '{i[2]}', {i[3]}, '{matrizComuna[i[4]-1][1]}', '{matrizRegion[matrizComuna[i[4]-1][2]-1][1]}', {i[5]});\n")
    else:
        archivo.write(f"\t({i[0]}, '{i[1]}', '{i[2]}', {i[3]}, '{matrizComuna[i[4]-1][1]}', '{matrizRegion[matrizComuna[i[4]-1][2]-1][1]}', {i[5]}),\n")
print("======Cliente Succesful======")
#empleado(rut_empleado,nombre, apellido, telefono, id_comuna)
archivo.write("\nINSERT INTO de empleado(rut_empleado, nombre, apellido, telefono, comuna, region) \nVALUES\n")
for i in matrizEmpleado:
    if i == matrizEmpleado[len(matrizEmpleado)-1] :
        archivo.write(f"\t({i[0]}, '{i[1]}', '{i[2]}', {i[3]}, '{matrizComuna[i[4]-1][1]}', '{matrizRegion[matrizComuna[i[4]-1][2]-1][1]}');\n")
    else:
        archivo.write(f"\t({i[0]}, '{i[1]}', '{i[2]}', {i[3]}, '{matrizComuna[i[4]-1][1]}', '{matrizRegion[matrizComuna[i[4]-1][2]-1][1]}'),\n")
print("======Empleado Succesful======")


#profesion(id_profesion, peluquero, manicurista, rut_empleado)
archivo.write("\nINSERT INTO de profesion(id_profesion, peluquero, manicurista) \nVALUES\n")
for i in matrizProfesion:
    if i == matrizProfesion[len(matrizProfesion)-1] :
        archivo.write(f"\t({i[0]}, {i[1]}, {i[2]});\n")
    else:
        archivo.write(f"\t({i[0]}, {i[1]}, {i[2]}),\n")
print("======Profesion Succesful======")

#peluqueria(id_peluqueria, nombre, comuna, region)
archivo.write("\nINSERT INTO de peluqueria(id_peluqueria, nombre, comuna, region) \nVALUES\n")
for i in matrizPeluqueria:
    if i == matrizPeluqueria[len(matrizPeluqueria)-1] :
        archivo.write(f"\t({i[0]}, '{i[1]}', '{matrizComuna[i[2]-1][1]}', '{matrizRegion[matrizComuna[i[2]-1][2]-1][1]}');\n")
    else:
        archivo.write(f"\t({i[0]}, '{i[1]}', '{matrizComuna[i[2]-1][1]}', '{matrizRegion[matrizComuna[i[2]-1][2]-1][1]}'),\n")
print("======Peluqueria Succesful======")

#producto(id_producto, nombre,valor)
archivo.write("\nINSERT INTO de producto(id_producto, nombre, valor) \nVALUES\n")
for i in matrizProducto:
    if i == matrizProducto[len(matrizProducto)-1] :
        archivo.write(f"\t({i[0]}, '{i[1]}', {i[2]});\n")
    else:
        archivo.write(f"\t({i[0]}, '{i[1]}', {i[2]}),\n")
print("======Producto Succesful======")

#servicio(id_servicio, nombre, costo, duracion, especialidad)
archivo.write("\nINSERT INTO servicio (id_servicio, nombre, costo, duracion, especialidad) \nVALUES\n")
for i in matrizServicio:
    if i == matrizServicio[len(matrizServicio)-1]:
        archivo.write(f"\t({i[0]}, '{i[1]}',{i[2]},{i[3]},'{i[4]}');\n")
    else:
        archivo.write(f"\t({i[0]}, '{i[1]}',{i[2]},{i[3]},'{i[4]}'),\n")

print("======Servicio Succesful======")


#factCitas(id_cita, fecha, rut_cliente, id_boleta_cita, id_servicio, id_profesion, fechaprofesion, rut_empleado, id_comuna, mont, id_peluqueria)
archivo.write("\nINSERT INTO de factCitas(id_cita, fecha, rut_cliente, id_boleta_cita, id_servicio, id_profesion, fechaprofesion, rut_empleado, monto, id_peluqueria) \nVALUES\n")
#cita(id_cita, rut_cliente, id_boleta_cita, id_servicio, fecha, id_profesion, fechaprofesion)
for i in matrizCita:
    if i == matrizCita[len(matrizCita)-1] :
        archivo.write(f"\t({i[0]}, '{i[4]}', {i[1]}, {i[2]}, {i[3]}, {i[5]}, '{i[6]}', {matrizProfesion[i[5]-1][3]}, {matrizBoletaCita[i[2]-1][2]}, {matrizBoletaCita[i[2]-1][3]});\n")
    else:
        archivo.write(f"\t({i[0]}, '{i[4]}', {i[1]}, {i[2]}, {i[3]}, {i[5]}, '{i[6]}', {matrizProfesion[i[5]-1][3]}, {matrizBoletaCita[i[2]-1][2]}, {matrizBoletaCita[i[2]-1][3]}),\n")
print("======FactCita Succesful======")
#factdetalle(id_factdetalle, cantidad, id_producto, id_boleta, fecha, id_peluqueria, rut_cliente)
archivo.write("\nINSERT INTO de factdetalle(id_factdetalle, cantidad, id_producto, id_boleta, fecha, id_peluqueria, rut_cliente) \nVALUES\n")
id_factdetalle = 1
for i in matrizDetalle:
    j = matrizBoletaVenta[i[2]-1]
    if i == matrizDetalle[len(matrizDetalle)-1] :
        archivo.write(f"\t({id_factdetalle}, {i[0]}, {i[1]}, {i[2]}, '{j[1]}', {j[4]}, {j[2]});\n")
    else:
        archivo.write(f"\t({id_factdetalle}, {i[0]}, {i[1]}, {i[2]}, '{j[1]}', {j[4]}, {j[2]}),\n")
    id_factdetalle += 1
print("======FactDetalle Succesful======")

#factempleado(id_factempleado, id_peluqueria, rut_empleado, id_profesion, fecha, monto)
archivo.write("\nINSERT INTO de factempleado(id_factempleado, id_peluqueria, rut_empleado, id_profesion, fecha, monto) \nVALUES\n")
for i in matrizPago:
    for j in matrizProfesion:
        if j[3] == i[3]:
            break
    id_factempleado = 1
    if i == matrizPago[len(matrizPago)-1] :
        archivo.write(f"\t({i[0]}, {i[4]}, {i[3]}, {j[0]}, '{i[1]}', {i[2]});\n")
    else:
        archivo.write(f"\t({i[0]}, {i[4]}, {i[3]}, {j[0]}, '{i[1]}', {i[2]}),\n")
    id_factempleado += 1
print("======FactEmpleado Succesful======")
archivo.close()
