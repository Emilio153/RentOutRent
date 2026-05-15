SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------
-- 1. ESTRUCTURA DE LA NUEVA TABLA `usuario` (Antiguas Persona/Huesped/Propietario)
-- --------------------------------------------------------

DROP TABLE IF EXISTS `huesped`;
DROP TABLE IF EXISTS `propietario`;
DROP TABLE IF EXISTS `persona`;
DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dni` varchar(20) DEFAULT NULL UNIQUE,
  `email` varchar(100) NOT NULL UNIQUE,
  `nombre` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcado de datos para `usuario`
-- Los que eran PROPIETARIO ahora tienen el rol 'USUARIO'
-- Los que eran HUESPED ahora tienen el rol 'PERSONA'
INSERT INTO `usuario` (`id`, `dni`, `email`, `nombre`, `password`, `telefono`, `rol`) VALUES
(1, '12345678A', 'alex@test.com', 'Alex Admin', '$2a$12$eVfQ3w8b5g1gpbbUtBz9we4lCcIx04XEq.bEGOuB3.YTz8nTTOP4.', '+34600000001', 'USUARIO'),
(2, '23456789B', 'beatriz@test.com', 'Beatriz Viajera', '$2a$12$eVfQ3w8b5g1gpbbUtBz9we4lCcIx04XEq.bEGOuB3.YTz8nTTOP4.', '+34600000002', 'USUARIO'),
(3, '34567890C', 'carlos@test.com', 'Carlos Casero', '$2a$12$eVfQ3w8b5g1gpbbUtBz9we4lCcIx04XEq.bEGOuB3.YTz8nTTOP4.', '+34600000003', 'USUARIO'),
(4, '45678901D', 'diana@test.com', 'Diana Dueña', '$2a$12$eVfQ3w8b5g1gpbbUtBz9we4lCcIx04XEq.bEGOuB3.YTz8nTTOP4.', '+34600000004', 'USUARIO'),
(5, '56789012E', 'elena@test.com', 'Elena Exploradora', '$2a$12$eVfQ3w8b5g1gpbbUtBz9we4lCcIx04XEq.bEGOuB3.YTz8nTTOP4.', '+34600000005', 'PERSONA'),
(6, '65658999L', 'a@mail.com', 'a', '$2a$10$7GgGtjkNdU.VaSvbbFnXiexWsxDLQveU1l/406QTdv.f3zztrB/8q', '111555999', 'USUARIO');

-- --------------------------------------------------------
-- 2. ESTRUCTURA DE LA TABLA `propiedad`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `propiedad`;

CREATE TABLE `propiedad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `calendario` date DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `max_huespedes` int(11) NOT NULL,
  `precio_noche` double NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL, -- 🔥 OJO: Antes era propietario_id
  PRIMARY KEY (`id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcado de datos para `propiedad`
INSERT INTO `propiedad` (`id`, `calendario`, `descripcion`, `direccion`, `max_huespedes`, `precio_noche`, `titulo`, `usuario_id`) VALUES
(1, NULL, 'Espectacular ático en primera línea de playa con terraza privada.', 'Paseo Marítimo 12, Málaga', 4, 120.5, 'Casa en zona residencial', 1),
(2, NULL, 'Cabaña de madera ideal para parejas rodeada de pinos.', 'Camino del Monte s/n, Sierra Nevada', 2, 75, 'Lujoso Chalet', 1),
(3, NULL, 'Diseño moderno en el corazón de la ciudad, techos altos.', 'Calle Nueva 5, Madrid', 3, 110, 'Atico Moderno en el Centro', 3),
(4, NULL, 'Mansión con 5 dormitorios, jardín botánico y piscina infinita.', 'Urb. El Pinar, Marbella', 10, 450, 'Bonito Apartamento', 3),
(5, NULL, 'Cerca de museos y zonas comerciales, muy luminoso.', 'Av. Libertad 45, Bilbao', 2, 90, 'Dúplex estilo Industrial', 3),
(6, NULL, 'Paredes de piedra y chimenea. Perfecta para familias.', 'Plaza Mayor 1, Alquézar', 6, 130, 'Casa con Piscina', 4),
(7, NULL, 'Pequeño pero funcional, ideal para estancias cortas.', 'Calle Estudiante 2, Salamanca', 1, 45, 'Villa en la Sierra', 4),
(8, NULL, 'Acceso directo a pistas de esquí y vistas increíbles.', 'Sector Valdelinares 10, Teruel', 8, 210, 'Chalet en la Montaña', 4),
(9, NULL, 'Decoración de los años 70 con todas las comodidades modernas.', 'Calle Pez 14, Madrid', 4, 95, 'Chalet Adosado de Lujo', 1),
(10, NULL, 'A 50 metros de la arena, con porche y hamacas.', 'Cala Ratjada, Mallorca', 5, 140, 'Bungalow en la Costa', 1),
(11, NULL, 'Dos plantas con mucha luz y domótica integrada.', 'Calle Rio 22, Valencia', 4, 115, 'Duplex Moderno', 3),
(12, NULL, 'Gran propiedad con pinos y trastero.', 'Ctra. Carmona km 4, Sevilla', 12, 300, 'Casa en la Montaña', 3),
(13, NULL, 'Gran complejo de lujo para uso privado con todo tipo de comodidades.', 'Calle San Jorge, Cáceres', 2, 85, 'Complejo de Lujo Privado', 4),
(14, NULL, 'Sencillo y limpio, ideal para surfistas.', 'Calle Ola 1, Tarifa', 3, 60, 'Apartamento de Playa Económico', 4),
(15, NULL, 'Jacuzzi en la terraza y acabados de mármol.', 'Diagonal 100, Barcelona', 4, 550, 'Penthouse Exclusivo', 1);

-- --------------------------------------------------------
-- 3. ESTRUCTURA DE LA TABLA `reserva`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `reserva`;

CREATE TABLE `reserva` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creado_en` datetime(6) DEFAULT NULL,
  `estado` enum('CANCELADA','CONFIRMADA','PENDIENTE') DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `total` double NOT NULL,
  `huesped_id` int(11) DEFAULT NULL, -- Sigue llamándose huesped_id, pero apunta a usuario
  `propiedad_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`huesped_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`propiedad_id`) REFERENCES `propiedad`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcado de datos para `reserva`
INSERT INTO `reserva` (`id`, `creado_en`, `estado`, `fecha_fin`, `fecha_inicio`, `total`, `huesped_id`, `propiedad_id`) VALUES
(1, '2026-05-10 19:00:26.000000', 'CONFIRMADA', '2024-06-15', '2024-06-10', 602.5, 2, 1),
(2, '2026-05-10 19:00:26.000000', 'PENDIENTE', '2024-07-05', '2024-07-01', 300, 2, 2),
(3, '2026-05-10 19:00:26.000000', 'CONFIRMADA', '2024-06-22', '2024-06-20', 220, 5, 3),
(4, '2026-05-10 19:00:26.000000', 'PENDIENTE', '2024-08-20', '2024-08-15', 2250, 5, 4),
(5, '2026-05-10 19:00:26.000000', 'CONFIRMADA', '2024-06-03', '2024-06-01', 180, 2, 5),
(6, '2026-05-10 19:00:26.000000', 'CANCELADA', '2024-09-15', '2024-09-10', 650, 5, 6),
(7, '2026-05-10 19:00:26.000000', 'PENDIENTE', '2024-07-22', '2024-07-20', 90, 2, 7),
(8, '2026-05-10 19:00:26.000000', 'CONFIRMADA', '2024-12-27', '2024-12-20', 1470, 5, 8),
(9, '2026-05-10 19:00:26.000000', 'PENDIENTE', '2024-07-10', '2024-07-05', 475, 2, 9),
(10, '2026-05-10 19:00:26.000000', 'CONFIRMADA', '2024-08-07', '2024-08-01', 840, 5, 10);

-- --------------------------------------------------------
-- 4. ESTRUCTURA DE LA TABLA `mensaje`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `mensaje`;

CREATE TABLE `mensaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contenido` text DEFAULT NULL,
  `enviado_en` datetime(6) DEFAULT NULL,
  `emisor_id` int(11) NOT NULL,
  `receptor_id` int(11) NOT NULL,
  `reserva_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`emisor_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`receptor_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`reserva_id`) REFERENCES `reserva`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcado de datos para `mensaje`
INSERT INTO `mensaje` (`id`, `contenido`, `enviado_en`, `emisor_id`, `receptor_id`, `reserva_id`) VALUES
(1, 'Hola Alex, ¿el ático tiene cafetera?', '2026-05-10 19:00:26.000000', 2, 1, 1),
(2, 'Hola Beatriz, sí, tiene una Nespresso.', '2026-05-10 19:00:26.000000', 1, 2, 1),
(3, 'Perfecto, nos vemos el día 10.', '2026-05-10 19:00:26.000000', 2, 1, 1),
(4, '¿Es posible hacer el check-in antes de las 12?', '2026-05-10 19:00:26.000000', 2, 1, 2),
(5, 'Hola Carlos, ¿el loft está cerca del metro?', '2026-05-10 19:00:26.000000', 5, 3, 3),
(6, 'Sí, tienes la estación Sol a 2 minutos.', '2026-05-10 19:00:26.000000', 3, 5, 3),
(7, '¿La piscina de la villa está climatizada?', '2026-05-10 19:00:26.000000', 5, 3, 4),
(8, '¿Hay WiFi en la cabaña?', '2026-05-10 19:00:26.000000', 2, 1, 2),
(9, 'Sí, pero la señal es algo débil por los árboles.', '2026-05-10 19:00:26.000000', 1, 2, 2),
(10, 'Gracias por la info.', '2026-05-10 19:00:26.000000', 2, 1, 2);

-- --------------------------------------------------------
-- 5. ESTRUCTURA DE LA TABLA `imagen_propiedad`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `imagen_propiedad`;

CREATE TABLE `imagen_propiedad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `propiedad_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`propiedad_id`) REFERENCES `propiedad`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcado de datos para `imagen_propiedad`
INSERT INTO `imagen_propiedad` (`id`, `url`, `propiedad_id`) VALUES
(1, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb', 1),
(2, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', 1),
(3, 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83', 1),
(4, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9', 2),
(5, 'https://images.unsplash.com/photo-1554995207-c18c203602cb', 2),
(6, 'https://images.unsplash.com/photo-1560448204-61dc36dc98c8', 2),
(7, 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf', 3),
(8, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0', 3),
(9, 'https://images.unsplash.com/photo-1600607686527-6fb886090705', 3),
(10, 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7', 4),
(11, 'https://images.unsplash.com/photo-1502672023488-70e25813eb80', 4),
(12, 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4', 4),
(13, 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6', 5),
(14, 'https://images.unsplash.com/photo-1484154218962-a197022b5858', 5),
(15, 'https://images.unsplash.com/photo-1524758631624-e2822e304c36', 5),
(16, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', 6),
(17, 'https://images.unsplash.com/photo-1501183007986-d0d080b147f9', 6),
(18, 'https://images.unsplash.com/photo-1513584684031-434524ca01d1', 6),
(19, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', 7),
(20, 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68', 7),
(21, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea', 7),
(22, 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1', 8),
(23, 'https://images.unsplash.com/photo-1518780664697-55e3ad937233', 8),
(24, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 8),
(25, 'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904', 9),
(26, 'https://images.unsplash.com/photo-1613977257363-707ba9348227', 9),
(27, 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea', 9),
(28, 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2', 10),
(29, 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda', 10),
(30, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', 10),
(31, 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224', 11),
(32, 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd', 11),
(33, 'https://images.unsplash.com/photo-1493238792000-8113da705763', 11),
(34, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994', 12),
(35, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be', 12),
(36, 'https://images.unsplash.com/photo-1572120339554-d7262627473b', 12),
(37, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb', 13),
(38, 'https://images.unsplash.com/photo-1551882547-ff43c63efa17', 13),
(39, 'https://images.unsplash.com/photo-1566073771259-6a8506099945', 13),
(40, 'https://images.unsplash.com/photo-1439130490301-25e322d88054', 14),
(41, 'https://images.unsplash.com/photo-1468413253725-0d5181091126', 14),
(42, 'https://images.unsplash.com/photo-1506143925201-0252c51780b0', 14),
(43, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af', 15),
(44, 'https://images.unsplash.com/photo-1486304873000-235643847519', 15),
(45, 'https://images.unsplash.com/photo-1505691722718-25036f1fe021', 15),
(46, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9', 2);

COMMIT;