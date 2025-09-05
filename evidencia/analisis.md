# Análisis de Diseño y Decisiones Técnicas

## Estructura de Datos
- **Productos:** Se obtienen desde la API https://fakestoreapi.com/products y se almacenan en un array de objetos con propiedades como id, title, price, image, category, description.
- **Carrito:** Es un array de objetos en localStorage, cada objeto contiene id, title, price, image, category, cantidad.

## Decisiones de Interfaz
- **Grid/List:** Los productos se muestran en tarjetas con imagen, título, precio y categoría. El usuario puede alternar entre vista grid y lista.
- **Carrito:** Accesible desde cualquier página, permite modificar cantidades, eliminar productos y ver el total.
- **Filtros y Orden:** Se implementan selectores para filtrar por categoría y ordenar por precio o nombre. La búsqueda es en tiempo real por nombre o descripción.
- **Responsivo:** El diseño se adapta a escritorio, tablet y móvil usando media queries.
- **Configuraciones Globales:** Modo oscuro, idioma y preferencias de visualización se guardan en localStorage y se aplican en todas las páginas.

## Usabilidad
- Botones grandes y accesibles.
- Contraste adecuado y tipografía legible.
- Espaciado suficiente entre elementos.
- Mensajes claros para estados vacíos o errores.

## Justificación de Filtros y Ordenamientos
- Permiten al usuario encontrar productos fácilmente y personalizar la visualización.
- Mejoran la experiencia en catálogos grandes.

## Mejoras Futuras
- Integrar proceso de compra.
- Validaciones adicionales en formularios.
- Mejorar accesibilidad (teclado, lector de pantalla).

---

## Bocetos/Wireframes
Agrega aquí imágenes o enlaces a tus bocetos hechos a mano o en herramientas digitales (Figma, Canva, Excalidraw, etc.).

**Por Juan José Rivero**