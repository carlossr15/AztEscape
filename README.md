# AztEscape

![image](https://user-images.githubusercontent.com/72986779/166503204-cc5c6dfe-df02-4b69-92e3-ee2e73e3e9d7.png)

# Grupo
AztEscape

# Enlace al juego
https://carlossr15.github.io/AztEscape/index.html

# Game Design Document
## Información general

### Género

Se trata de un juego 2D de plataformas con puzzles, orientado a la narrativa.

### Rango de edad

Está enfocado para todos los públicos pero puede incluir algunos insultos

### PEGI info

PEGI 12

### Audiencia Objetivo

Estará enfocado principalmente a gente entre 12 y 25 años.

## Lore y Contexto

Nuestro juego empieza dentro de un templo azteca donde vemos que nuestro personaje principal (el madrileño) consigue llegar hasta el tesoro dorado. Se trata de una historia basada en la actualidad, pero el escenario es un templo azteca. Ésto da lugar a que se puedan escuchar expresiones actuales, encontrarnos objetos modernos y diversos elementos que se encuentran en nuestro día a día en contraste con lo antiguo que podemos encontrar en el templo, así como columnas, piedras y antorchas. Nuestro personaje tiene que conseguir salir con vida del templo, para ello se va encontrando distintas salas o niveles en los que tiene que superar distintas pruebas o puzles, evitar trampas, eliminar enemigos. En cada nivel se va encontrando distintos sombreros tirados por el suelo, que le permiten cambiar de forma (y de personalidad), lo que da lugar a nuevas habilidades a usar por parte del jugador. Durante todo el juego, el madrileño estará hablando consigo mismo (o con alguna de sus personalidades) lo que llevará a conversaciones graciosas y sin sentido con las que se crea un ambiente cómico.

## Mecánicas y dinámicas
### Mecánicas
#### Andar
Nos permite el desplazamiento del personaje a lo largo de los mapas.
#### Saltar
Permite al personaje alcanzar niveles a distintas alturas.
#### Trepar
Permite al personaje, utilizando cuerdas, poder desplazarse de manera vertical.
#### Golpear
El personaje lanza un puñetazo que hiere a los enemigos. (Sólo el madrileño)
#### Disparar
El personaje lanza una piedra. (Sólo el niño)
#### Cambiar el gorro
El personaje cambia su personalidad, y con ello sus habilidades posibles.
#### Coger objetos
El personaje se desplaza por encima de los objetos para recogerlos.
#### Morir
Cuando el personaje llega a 0 de vida, pierde.


### Dinámicas
#### Atacar a los enemigos
El personaje puede hacer daño al enemigo, ya sea dándole un puñetazo, o lanzándole una roca.
#### Recibir daño
Así como el personaje hace daño, también puede recibirlo por parte de distintos enemigos y trampas a lo largo de los niveles.
#### Dianas y botones
El niño puede lanzar una roca a estas dianas y así activarlas, lo que abrirá el camino para poder seguir avanzando en el nivel.
También existen botones, a los cuales se ha de disparar en un orden concreto para poder seguir avanzando.
#### Mover rocas
El personaje puede desplazar rocas, moviendo estas plataforas mientras camina para poder avanzar por el nivel. Así como la piedra del niño, se pueden utilizar estas piedras para activar botones y poder seguir con la aventura.
#### Recogida de objetos
##### Batidos
El personaje recupera 2 de vida (1 corazón).
##### Llave
Objeto que es necesario recoger para poder atravesar la puerta final y poder pasar al siguiente nivel.
##### Nota
El personaje la recoge y puede consultar su contenido, el cuál puede ser útil para el desarrollo del juego.
##### Gorro 
Objeto que se recoge al final de nivel, lo que permite a nuestro personaje 'transformarse'.
##### Ídolo dorado
Primer objeto que se coge en la aventura, ¡sin él el juego no tendría sentido!

## Controles

### WASD
Teclas utilizadas para el movimiento de personaje, se desplaza hacia los lados y permite saltar.
### Tecla espacio
Permite al madrileño dar un puñetazo.
### Ratón
Apuntando con el ratón en el mapa siendo el niño y haciendo clic izquierdo, puede lanzar una piedra hacia el lugar apuntado.
### Tecla F
Pantalla completa
### Tecla Esc
Botón de pausa del juego
### Tecla E
Si tenemos una nota, podemos abrirla para ver su contenido.
### Teclas 1-2
Una vez se ha obtenido el gorro, con estos botones podemos cambiar de personaje (1-Madrileño, 2-Niño).

## Dirección artística
Para la creación de este juego hemos utilizado la temática de PixelArt, tanto para el diseño de los sprites, como para la música y efectos sonoros. Hemos utilizado colores marrones y oscuros, los cuáles son característicos de lugares viejos y abandonados para poder crear un ambiente antiguo en el templo, pero también hemos usado colores más vivos para los objetos que se recogen y que son modernos para así hacer contraste entre lo viejo y lo nuevo de nuestro juego.

Hemos utilizado recursos de sitios web para la creación de los mapas, de algunos enemigos y objetos:

![columna](https://user-images.githubusercontent.com/72986779/166509684-3f978b4b-0ae2-4bff-98b4-4443339d22b2.png)

![esqueleto](https://user-images.githubusercontent.com/72986779/166509708-cc8844ac-5f88-4bfc-9623-6cc75d6b5c69.png)
![araña](https://user-images.githubusercontent.com/72986779/166509553-a1710905-0a14-4229-ad2a-6cdb62f0667a.png)

Pero también existen sprites creados a mano y de manera original por nuestra parte:

![MC](https://user-images.githubusercontent.com/72986779/166509857-bcb3af32-3707-46f9-a022-f467158511dc.png)

![antorcha](https://user-images.githubusercontent.com/72986779/166509869-c9d04df8-18e4-4f73-9a35-690e03c35fa1.png)
![diana](https://user-images.githubusercontent.com/72986779/166509894-36c4c604-3af2-4aba-ac9e-991b3e1c9adf.png)
![preparado](https://user-images.githubusercontent.com/72986779/166509935-5fccd483-16ef-464f-89fc-7e872a000a22.png)

Nuestro juego se centrará:
Preparación: el personaje se encuentra en un punto de inicio al inicio de los niveles, donde podrá recuperar vida, puede contener algo de historia, etc.
Desafío: se trata del transcurso de los mapas, donde se deberán utilizar las diferentes mecánicas y habilidades para superar dicho nivel.
Recompensa: al final de cada nivel se mostrará una parte de historia, a su vez que se podrá desbloquear un personaje, el cuál tendrá nuevas habilidades para avanzar por los niveles.

8.- Tabla de datos

PERSONAJE
vida
velocidad
daño

Forzudo
2
3
1

Niño
3
3
1

Minero
4
3
1

Edgy
5
3
2



ENEMIGO
vida
velocidad
daño

Esqueleto
1
3
1

Momia
2
2
1

Araña
1
5
1

Trampa (flecha)
1
X
1

Trampa (pinchos)
-
-
1

Boss Final
10
4
2

Captura de pantalla de la Demo
![image](https://user-images.githubusercontent.com/60467583/157461538-c494d3d8-b7e2-4226-8a59-27933342cafd.png)



Diseños
A SEPRITE / LIBRESPRITE
PHOTOSHOP
KRITA
GIMP

Diseños Vectoriales
Audacity
Blender
Inkscape
Synfig Studio

Sonido
Audacity

