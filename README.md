# AztEscape

Game Design Document
AztEscape

1.- Información básica
Breve sinopsis
AztEscape es un juego de plataformas, cuyo objetivo principal es que el personaje consiga escapar de un templo, tras conseguir un tesoro dorado. En su recorrido por los mapas tendrá que ir resolviendo pequeños puzzles y se encontrará a otros personajes (que en realidad son sombreros) que permitirán al jugador realizar distintas acciones (saltar, trepar, empujar bloques, cavar, disparar o lanzar fuego) dependiendo del que lleve equipado.
Género
Se trata de un juego 2D de plataformas con puzzles, orientado a la narrativa.
Rango de edad
Está enfocado para todos los públicos pero puede incluir algunos insultos
PEGI info
PEGI 12
Audiencia Objetivo
Estará enfocado principalmente a gente entre 12 y 25 años.
2.- Lore y Contexto
Nuestro juego empieza dentro de un templo azteca donde vemos que nuestro personaje principal consigue llegar hasta el tesoro dorado. Se trata de una historia basada en la actualidad, pero el escenario se trata de un templo antiguo. Ésto da lugar a que se puedan escuchar expresiones actuales, encontrarnos objetos modernos y diversos elementos que se encuentran en nuestro día a día. Nuestro personaje tiene que conseguir salir con vida del templo, para ello se va encontrando distintas salas o niveles en los que tiene que superar distintas pruebas o puzles, evitar trampas, eliminar enemigos, etc. En cada nivel se va encontrando distintos sombreros tirados por el suelo, que le permiten cambiar de forma y así poder tener diferentes habilidades especiales dependiendo de qué personaje se esté usando en un determinado momento.

3.- CORE LOOP
Nuestro juego se centrará:
Preparación: el personaje se encuentra en un punto de inicio al inicio de los niveles, donde podrá recuperar vida, puede contener algo de historia, etc.
Desafío: se trata del transcurso de los mapas, donde se deberán utilizar las diferentes mecánicas y habilidades para superar dicho nivel.
Recompensa: al final de cada nivel se mostrará una parte de historia, a su vez que se podrá desbloquear un personaje, el cuál tendrá nuevas habilidades para avanzar por los niveles.
The sequence of top-level abstractions that will keep the players engaged:
Prepare, challenge, reward
4.- Mecánicas
Andar:
Saltar: 
Coger Objetos:
Cambiar Sombrero:
Recibir daño:
Aumentar Salud:
Ataque:
Personaje 1 (forzudo): pegar
Personaje 2 (niño): pegar con la pala
Personaje 3 (minero): disparar con tirachinas
Personaje 4 (edgy): lanzar molotov
Habilidades especiales:
Personaje 1 (forzudo): trepar por lianas/cuerdas
Personaje 2 (niño): cavar
Personaje 3 (minero): disparar a dianas
Personaje 4 (edgy): meterse en el suelo (por las sombras)
Apuntar (con el ratón): 

5.- Dinámicas por Personajes
Personaje 1 (forzudo): tiene la habilidad de subir o bajar por lianas o cuerdas que se encuentra por los mapas, pudiendo así llegar a sitios altos a los que un personaje con un salto simple no puede llegar
Personaje 2 (niño): tiene un tirachinas con el que puede disparar piedras pequeñas para dañar a los enemigos, activar mecanismos o golpear dianas
Personaje 3 (minero): con la pala puede excavar el suelo cuando se encuentre algunos montones de tierra de diferentes color, pudiendo así desenterrar objetos como comida, llaves, etc y además puede cavar en paredes para crear túneles
Personaje 4 (edgy): posee dos habilidades especiales, por una parte puede lanzar cócteles molotov a los enemigos, haciendo daño en área, y también puede agacharse para fundirse con las sombras sin que le vean enemigos o atravesar verjas

6.- Estética
Gráficos: PixelArt.
Música: Música bit.

7.- Controles
El juego será jugable con teclado y ratón, utilizando las teclas AD(movimiento), W (salto) y ESPACIO (Acción especial)

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

