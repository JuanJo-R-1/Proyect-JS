# Análisis de Diseño y Decisiones Técnicas

## Estructura de Datos
- **Productos:** Se obtienen desde la API y se almacenan como objetos con id, título, precio, imagen, categoría y descripción.
- **Carrito:** Es un array de objetos en localStorage, cada uno con id, título, precio, imagen, categoría y cantidad.

## Decisiones de Interfaz
- **Grid/List:** Se eligió mostrar los productos en tarjetas para facilitar la visualización y selección. El usuario puede alternar entre vista grid y lista según su preferencia.
- **Carrito:** Siempre accesible, permite modificar cantidades, eliminar productos y ver el total. Se priorizó la claridad y facilidad de uso.
- **Filtros y Orden:** Los selectores permiten filtrar por categoría y ordenar por precio o nombre. La búsqueda es en tiempo real por nombre o descripción.
- **Responsivo:** El diseño se adapta a escritorio, tablet y móvil usando media queries para garantizar una experiencia óptima en cualquier dispositivo.
- **Configuraciones Globales:** Modo oscuro, idioma y preferencias de visualización se guardan en localStorage y se aplican en todas las páginas.

## Usabilidad
- Botones grandes y accesibles.
- Contraste adecuado y tipografía legible.
- Espaciado suficiente entre elementos.
- Mensajes claros para estados vacíos o errores.

## Justificación de Filtros y Ordenamientos
- Permiten al usuario encontrar productos fácilmente y personalizar la visualización.
- Mejoran la experiencia en catálogos grandes y reducen el tiempo de búsqueda.

## Mejoras Futuras
- Integrar proceso de compra y pago.
- Validaciones adicionales en formularios.
- Mejorar accesibilidad (teclado, lector de pantalla).


## Wireframes
Las imágenes y descripciones de los wireframes se encuentran en la carpeta `/evidencia/wireframes`.

**Por Juan José Rivero**