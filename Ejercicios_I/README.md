# Ejercicios I

## Ejercicio 1: Mi primer Nginx (Muy básico)
**Objetivo**: Crear y acceder a tu primer contenedor web

**Pasos**:

1. Ejecuta docker run -d -p 8080:80 nginx
2. Verifica que el contenedor está corriendo con docker ps
3. Accede a http://localhost:8080 en tu navegador
4. Deberías ver la página "Welcome to nginx"
5. Para el contenedor con docker stop

**Conceptos practicados**: docker run, mapeo de puertos (-p), docker ps, docker stop

## Ejercicio 2: Listar, renombrar y limpiar
**Objetivo**: Practicar los comandos básicos de gestión de contenedores

**Pasos**:

1. Crea 2-3 contenedores nginx sin mapear puertos: docker run -d nginx (repite 2-3 veces)
2. Lista todos los contenedores: docker ps -a
3. Renombra uno de ellos: docker rename NOMBRE_ANTIGUO mi-nginx-renombrado
4. Elimina los contenedores que creaste: docker rm NOMBRE_O_ID
5. Verifica que desaparecieron: docker ps -a

**Conceptos practicados**: docker ps -a, docker rename, docker rm

## Ejercicio 3: Comparando servidores web: Nginx vs Apache
**Objetivo**: Explorar diferentes imágenes y ver cómo se ve cada servidor web

**Pasos**:

1. Crea un contenedor con Apache: docker run -d --name apache-server -p 8081:80 httpd
2. Crea un contenedor con Nginx: docker run -d --name nginx-server -p 8082:80 nginx
3. Accede a ambos en tu navegador:
   - Apache: http://localhost:8081
   - Nginx: http://localhost:8082
4. Observa las diferencias en las páginas de bienvenida
5. Lista los contenedores con docker ps
6. Para y elimina ambos contenedores

**Conceptos practicados**: Diferentes imágenes, naming (--name), mapeo de puertos, comparación de alternativas