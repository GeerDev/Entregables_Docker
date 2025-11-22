# 🐳 Laboratorio Contenedores 🐳

## 🎯 Los 4 Retos

El objetivo es tener esta aplicación funcionando completamente en contenedores, la cual es un calendario de las clases de Lemoncode 🍋🗓️

![Lemoncode Calendar](./images/Aplicacion%20Lemoncode%20Challenge.png)

La misma aplicación está disponible en dos stacks tecnológicos diferentes para el backend: .NET y Node.js. El frontend es idéntico en ambos casos. ¡Tú eliges cuál usar! 

Está compuesta de tres componentes principales:

- 🌐 **Frontend**: Una interfaz con Node.js
- ⚙️ **Backend**: Elige tu aventura - .NET (`dotnet-stack`) o Node.js (`node-stack`) que se conecta con MongoDB
- 🗄️ **Base de datos**: MongoDB para almacenar toda la información

> 💡 **¡Libertad de elección!** Como habrás notado, tienes dos carpetas: `dotnet-stack` y `node-stack`. El frontend es idéntico en ambos casos, solo cambia el backend. ¡Elige el que más te motive! O puedes hacer las dos si quieres.

---

### 🙈 Antes de empezar

Por causas del destino tengo que realizar el laboratorio en un Ubuntu 24 recien formateado.

Así que como quiero probar las diferentes partes del aplicativo en mi local, voy a instalar:
- `nvm` para utilizar la versión que quiera de Nodejs.

```bash
# Descarga e instala nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# En lugar de reiniciar la shell
\. "$HOME/.nvm/nvm.sh"
# Descarga e instala Node.js:
nvm install 24
# Verifica la versión de Node.js:
node -v
# Verifica versión de npm:
npm -v
```

- `docker desktop` para utilizar Docker, aunque hubiera podido instalar las dependencias de docker simplemente y no utilizar desktop pero prefiero tener un interfaz que me ofrezca más info mientras esté aprendiendo.

```bash
# Add Docker's official GPG key:
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update

# Install Docker Desktop package
sudo apt update
sudo apt install ./docker-desktop-amd64.deb
```

**Ojo cuidado**: Puede que existan problemas de virtualización al abrir el Desktop, tienes que revisar la configuración de KVM (puede que incluso tengas que acceder a la BIOS de la máquina si no estás con alguna máquina virtual)

- `mongoDB` para poder levantar en mi local la base de datos, además aquí creamos un admin para un mínimo de seguridad.

```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
mongosh "mongodb://localhost:27017"

# Seguridad
sudo vi /etc/mongod.conf # Aquí ponermos security: authorization: "enabled"
sudo systemctl restart mongod
# Desde la terminal MongoDB
use admin;

db.createUser({
	"user": "nraboy",
	"pwd": "mongodb",
	"roles": [
		{
			"role": "userAdminAnyDatabase",
			"db": "admin"
		}
	]
});

# Para acceder
mongosh --host localhost --port 27017 -u nraboy -p --authenticationDatabase admin

```

- `.net` esta parte la voy a levantar usando Dev container así que en mi local no instalaré nada relativo a esto.

Añadiendo las variables de entorno que se necesitan comprobamos que localmente tenemos ready todo:

Pues vamos allá, **ahora con contenedores**.

### 🔥 Reto 1: MongoDB en Contenedor

**Objetivo**: Ejecutar MongoDB dentro de un contenedor y conectar el backend (ejecutándose localmente) para que pueda recuperar, crear, modificar y eliminar clases de la base de datos.

#### 📋 Requisitos:
1. ✅ Crear una red Docker para la comunicación
2. ✅ Ejecutar MongoDB en un contenedor con persistencia de datos
4. ✅ Ejecutar el backend localmente conectándose a tu nuevo MongoDB
5. ✅ Verificar que el CRUD funciona correctamente usando la extensión REST Client y el archivo `backend/client.http` del stack que hayas elegido
6. ✨ Puedes instalar la extensión de [MongoDB for VS Code](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode) o usar MongoDB Compass para verificar que los datos se almacenan correctamente

¡Perfecto! Si has llegado hasta aquí, ya tienes MongoDB corriendo en un contenedor y tu backend puede comunicarse con él. ¡Buen trabajo! 🎉

---

### 🐳 Reto 2: Dockerizar el Backend

**Objetivo**: Crear un Dockerfile para el backend y ejecutarlo en contenedor, conectado a MongoDB via red Docker.

#### 📋 Requisitos:
1. ✅ Crear un Dockerfile para el backend (para .NET para o Node.js)
2. ✅ Construir la imagen del backend
3. ✅ Ejecutar el backend en un contenedor en la red Docker que creaste en el Reto 1
4. ✅ Verificar que se conecta correctamente a MongoDB
5. ✅ Exponerse el puerto 5000 para que sea accesible

#### 💡 Tips:
- Define variables de entorno adecuadas para la conexión a MongoDB
- Asegúrate de que la imagen sea lo más eficiente posible
- Usa puertos correctos (5000 para la API)

---

### 🎨 Reto 3: Dockerizar el Frontend

**Objetivo**: Crear un Dockerfile para el frontend y ejecutarlo en contenedor, conectado al backend via red Docker.

#### 📋 Requisitos:
1. ✅ Crear un Dockerfile para el frontend
2. ✅ Construir la imagen del frontend
3. ✅ Ejecutar el frontend en un contenedor en la red Docker
4. ✅ Configurar las variables de entorno para conectarse al backend en `http://topics-api:5000/api/classes`
5. ✅ Acceder a la interfaz desde el navegador en el puerto 3000

#### 💡 Tips:
- El frontend debe ser accesible desde http://localhost:3000
- Configura las variables de entorno para apuntar al backend correcto
- A través de los terminales de ambos componentes, e incluso desde la propia web podrás verificar que todo funciona correctamente

---

### 🎪 Reto 4: Docker Compose - Todo Junto

**Objetivo**: Usar Docker Compose para orquestar todos los servicios (MongoDB, Backend, Frontend) como un director de orquesta.

#### 📋 Requisitos:
1. ✅ Crear un `compose.yml` que incluya los tres servicios
2. ✅ Configurar la red compartida `lemoncode-network`
3. ✅ Definir volumen para persistencia de MongoDB
4. ✅ Establecer todas las variables de entorno necesarias
5. ✅ Exponer los puertos correctos (3000 para frontend, 5000 para API, 27017 para MongoDB)
6. ✅ Definir dependencias entre servicios
7. ✅ Levantar toda la aplicación con un único comando
8. ✅ Acceder a la aplicación desde el navegador en http://localhost:3000 

#### 💡 Tips:
- Usa `depends_on` para ordenar el inicio de los servicios
- Mapea el volumen para persistencia de datos
- Define claramente las variables de entorno para cada servicio
- Documenta los comandos útiles (up, down, logs, etc.)

Apartado personal para ver que implementar aquí:
- Podemos meter un nginx que actue como un proxy inverso para montar los 2 stacks a la vez.
- Como hacer peticiones al back: Curl, Postman, directamente con consultas en mongo.
- Me gustaría utilizar Tableplus.
- ¿Donde están las variables de entorno en el back de .net?
- Prueba a mapear los mismos puertos en el front y en el back y explica porque puedes hacerlo funcionar.
- Estaría bien crear unos scripts de copia de bases de datos, back ups, esto solo por la ciencia.
- ¿Utilizamos mongo express?
- Utiliza la propiedad "healthcheck" con el compose para ver como funciona.
- Averigua como crear seeders en base de datos.
- Averigua donde guarda un contenedor MongoDB la información de la bd.
- Levanta dev container para el stack de .net.
- El contenedor de  dotnet: 
  - https://hub.docker.com/r/microsoft/dotnet-sdk
  - https://mcr.microsoft.com/en-us/artifact/mar/dotnet/sdk/tag/8.0-alpine