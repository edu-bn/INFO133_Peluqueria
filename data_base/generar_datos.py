import random as rd
from fake import FAKER




"""ATENCION !!!!!
    hay un error al hacer los apellidos con l;a libreria, 
    el apellido O'Whielacronx lleva una ' y desconfigura 
    todo, reemplazar por OWhielacronx en visual estudio."""




def Mostrar(matriz):
    print("La matriz es la siguiente:")
    for fila in matriz:
        for valor in fila:
            print("\t", valor, end=" ")
        print()

archivo = open("data_base/ingresar.sql", "w")

#Listas
regiones = ["Los Lagos", "Los Ríos", "La Araucanía", "Biobío", "Ñuble", "Maule", "O´higgins", "Metropolitana", "Valparaíso", "Coquimbo"]
comunas = ["Puerto Montt", "Osorno","Valdivia", "Mariquina", "Temuco", "Curacautin", "Concepción", "Cabrero", "Chillan", "San Carlo", "Curicó","Linares", "Rancagua", "Pichilemu", "Santiago", "Maipu", "Valparaiso", "Viña del Mar", "Serena", "Coquimbo"]

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
archivo.write("\ninsert into comuna(id_comuna, nombre, fk_region)\nvalues\n")
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

#servicio(id_servicio, nombre, costo, duracion)
matrizServicio = [
    [1, 'Corte de Cabello Hombre', 15000, 1],
    [2, 'Corte de Cabello Mujer', 20000, 2],
    [3, 'Tinte para Cabello', 35000, 4],
    [4, 'Manicure', 12000, 1],
    [5, 'Pedicure', 15000, 2],
    [6, 'Peinado', 25000, 2],
    [7, 'Mascarilla Capilar', 8000, 1],
    [8, 'Alisado Permanente', 50000, 6],
    [9, 'Depilacion de Cejas', 7000, 1],
    [10, 'Masaje Capilar', 10000, 1],
    [11, 'Lavado de Cabello', 5000, 1],
    [12, 'Secado de Cabello', 8000, 1],
    [13, 'Moldeado de Cabello', 15000, 2],
    [14, 'Tratamiento Anticaida', 30000, 3],
    [15, 'Extensiones de Cabello', 60000, 8],
    [16, 'Peinado de Novia', 40000, 3],
    [17, 'Peinado de Fiesta', 35000, 3],
    [18, 'Corte de Puntas', 8000, 1],
    [19, 'Brushing', 10000, 1],
    [20, 'Maquillaje', 20000, 2],
    [21, 'Manicure con Esmalte Semipermanente', 18000, 2],
    [22, 'Pedicure con Esmalte Semipermanente', 20000, 2],
    [23, 'Bano de Crema', 12000, 1],
    [24, 'Tinte de Cejas', 10000, 1],
    [25, 'Botox Capilar', 45000, 4]
]
archivo.write("\nINSERT INTO servicio (id_servicio, nombre, costo, duracion) \nVALUES\n")
for i in matrizServicio:
    if i == matrizServicio[len(matrizServicio)-1]:
        archivo.write(f"\t({i[0]}, '{i[1]}',{i[2]},{i[3]});\n")
    else:
        archivo.write(f"\t({i[0]}, '{i[1]}',{i[2]},{i[3]}),\n")

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


#empleado(rut_empleado,nombre, apellido, telefono, id_comuna)
archivo.write("\ninsert into empleado(rut_empleado, nombre, apellido, telefono, id_comuna)\nvalues\n")
matrizEmpleado = []
j=1
for i in range(100):
    rut_empleado = rd.randint(15000000,22000000)
    nombre = FAKER.first_name()
    apellido = FAKER.last_name()
    telefono='9'+str(rd.randint(12837498, 92736157))
    if(i > (j*5)-1):
        j = j + 1
    id_comuna = j

    matrizEmpleado.append([rut_empleado, nombre, apellido, id_comuna])
    if i == 99:
        archivo.write(f"\t({rut_empleado}, '{nombre}', '{apellido}', '{telefono}', {id_comuna});\n")
    else:
        archivo.write(f"\t({rut_empleado}, '{nombre}', '{apellido}', '{telefono}', {id_comuna}),\n")

print("======Empleado Succesful======")

#cliente(rut_cliente,nombre, apellido, telefono, id_comuna)

archivo.write("\ninsert into cliente(rut_cliente, nombre, apellido, telefono, id_comuna)\nvalues\n")
matrizCliente = []
j=1
for i in range(3000):
    rut_cliente = rd.randint(13000000,25000000)
    nombre = FAKER.first_name()
    apellido = FAKER.last_name()
    telefono = 900000000+rd.randint(12837498, 92736157)
    id_comuna = rd.randint(1,20)

    matrizCliente.append([rut_cliente, nombre, apellido, id_comuna])
    if i == 2999:
        archivo.write(f"\t({rut_cliente}, '{nombre}', '{apellido}', {telefono}, {id_comuna});\n")
    else:
        archivo.write(f"\t({rut_cliente}, '{nombre}', '{apellido}', {telefono}, {id_comuna}),\n")

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

#profesion(id_profesion, peluquero, manicurista, rut_empleado)
MatrizProfesion=[]
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

    MatrizProfesion.append([id_profesion, peluquero, manicurista, rut_empleado])
    if i == len(MatrizProfesion)-1:
        archivo.write(f"\t({id_profesion}, {peluquero}, {manicurista}, {rut_empleado});\n")
    else:
        archivo.write(f"\t({id_profesion}, {peluquero}, {manicurista}, {rut_empleado}),\n")

print("======Profesion Succesful======")