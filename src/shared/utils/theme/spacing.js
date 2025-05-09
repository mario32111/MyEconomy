
/** Sistema de espaciado para mantener consistencia en márgenes y padding 
 * Uso:
 * - Márgenes pequeños: spacing(1) = 8px
 * - Padding estándar: spacing(2) = 16px
 * - Separación entre secciones: spacing(4) = 32px*/

// Valor base de espaciado en píxeles
const BASE_SPACING = 8;

// Función de espaciado que multiplica el valor base por el factor proporcionado
const spacing = (factor) => `${BASE_SPACING * factor}px`;

// También exportamos el valor base para cálculos personalizados
spacing.base = BASE_SPACING;

export default spacing;