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

Está enfocado para publico un publico adolescente

### PEGI info

PEGI 12

### Audiencia Objetivo

Entre 12 y 25 años.

## Lore y Contexto

Nuestro juego empieza dentro de un templo azteca donde vemos que nuestro personaje principal (el madrileño musculoso) consigue llegar hasta el tesoro dorado. Se trata de una historia basada en la actualidad, pero el escenario es un templo azteca. Esto da lugar a que se puedan escuchar expresiones actuales, encontrarnos objetos modernos y diversos elementos que se encuentran en nuestro día a día así como los diversos peligros caracteristicos de peliculas de aventuras como pinchos, momias, ... Nuestro personaje tiene que conseguir salir con vida del templo, para ello se va encontrando distintas salas o niveles en los que tiene que superar distintas pruebas o puzles, evitar trampas, eliminar enemigos. En cada nivel se va encontrando distintos sombreros tirados por el suelo, que le permiten cambiar de forma (y de personalidad), lo que da lugar a nuevas habilidades a usar por parte del jugador. Durante todo el juego, el madrileño estará hablando consigo mismo (o con alguna de sus personalidades) lo que llevará a conversaciones graciosas y sin sentido con las que se crea un ambiente cómico.

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
#### Cambiar el personaje
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
Teclas utilizadas para el movimiento de personaje. Puede moverse hacia los lados, saltar y trepar por las cuerdas.
### Tecla espacio
Permite al madrileño dar un puñetazo.
### Ratón
Apuntar con el mouse si eres el niño y hacer clic izquierdo para lanzar una piedra hacia el lugar apuntado.
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

## Diagrama UML

![Clase UML - AztEscape](https://user-images.githubusercontent.com/72986779/166735517-1c9db9fc-895b-45f5-b3de-5d26527b3b21.png)

### Pruebas con usuarios

#### Fernando (18 años)
Consiguió pasarse el juego de una vez, ya que tiene bastante manejo con los videojuegos y los controles se les hizo sencillo de aprender. Le gustó mucho el personaje del niño, y la parte del lanzamiento de la piedra le resultó bastante divertida. Piensa que los diálogos son bastantes graciosos, pero puede que haya demasiados en el juego. Se atascó un poco con la combinación de los botones porque se pasó el juego rápido y sin leer. Un comentario que dijo fue: "¿Pasa algo si matas a todas las arañas?", por lo que podría ser una buena idea implementar algún logro por matar a todos los enemigos. 

#### Carmen (17 años)
No está acostumbrada a jugar videojuegos, pero al ir jugando lentamente y leyendo los diálogos pudo aprender a usar todas las mecánicas del juego. Éstos le parecieron muy divertidos y se rió en varias ocasiones. Murió una vez, pero al reiniciar el nivel consiguió pasárselo de nuevo. Aunque aprendió a utilizar al niño con soltura, prefería jugar como el madrileño, ya que prefería pegar puñetazos a lanzar las piedras. Odia a las momias, son su peor enemigo. La escena final le gustó mucho y le hizo mucha gracia.

#### Javier (21 años)
Suele jugar videojuegos de vez en cuando, pero no muy a menudo. Aprendió rápido los controles y piensa que los diálogos son divertidos. Le resultó un poco extraño el movimiento de saltar entre cuerdas. Alterna bastante entre los personajes, en momentos que tiene bastante vida juega más arriesgado con el madrileño, mientras que cuando le quedaba poco jugaba más seguro desde la distancia con el niño. La escena final le hizo mucha gracia.

#### Yago (21 años)
Le gustaron mucho los dialogos y la escena final, pasandose el juego sin morir. Encontró un error con una de las rocas móviles del 2º mapa que causa un softlock y hay que arreglar. Además, propuso implementar la funcionalidad de saltar dialogos. También propuso implementar más tipos de trampas, como lanzallamas o rocas persiguiendo al jugador.

#### David (18 años)
También le gustaron los dialogos y la escena final. También comentó que había una falta de feedback a la hora de disparar y que la acción debería tener animación propia (está hecha pero no implementada por falta de tiempo). También dijo que los fondos le parecían un poco sosos y que le gustaría que hubiese más decoración e igual que el fondo tuviese algún tipo de efecto parallax.

#### Jorge (18 años)
Jugador habitual de videojuegos en consola. Le resulto extraño la disposición de los controles, en especial que la barra espaciadora se usara para golpear en vez de para saltar como en otros videojuegos. Esto no impidió que se pasase el juego sin morir y le resultase ameno el gameplay.

#### Susana (56 años)
Persona adulta sin experiencia reciente en videojuegos, solo en maquinas arcade en su juventud. Necesitó que se le explicaran los controles a pesar de las indicaciones en pantalla dado que desconocía la combinación de teclas WASD para moverse e intentaba moverse con las flechas de dirección. A este respecto sugirió la opción de que se pudiera seleccionar la combinación de teclas para moverse. También se le debió de indicar los pasos a seguir a continuación de sus acciones pero creemos que es debido a su falta de experiecia jugando. A pesar de las dificultades y de morir en un par de ocasiones lo acabó terminando. Tambien le pareció divertido.

#### Miguel (22 años)
Jugador experimentado en videojuegos en consola y ordenador. Desde el principio se le hicieron fáciles los controles y argumentó que son bastante cómodos de utilizar. También añadio que los dialogos son muy graciosos e ingeniosos y que la escena final es muy divertida. No ha encontrado bugs ni fallos en el juego y ha prouesto añadir un enemigo que fuese el/la panadero/a a modo de boss final.
