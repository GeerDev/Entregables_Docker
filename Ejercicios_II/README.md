# Ejercicios II

## Ejercicio 1: Creando imágenes propias
Si quieres probarte a ti mismo en el arte de crear imágenes Docker, te propongo el siguiente reto:

1. Crea un directorio llamado mi-aplicacion.
2. Dentro de este directorio, crea un archivo index.html con contenido HTML básico
3. Crea un Dockerfile que use httpd (servidor Apache) como base y copia tu index.html al lugar correcto para servirlo. Busca la imagen base, es decir la etiqueta de esta, que sea menos pesada.
4. Construye la imagen con el nombre mi-aplicacion-web y etiqueta v1.
5. Ejecuta un contenedor a partir de tu imagen y accede a tu aplicación web en el navegador.