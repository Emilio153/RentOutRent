-- Limpieza de tablas
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE mensaje;
TRUNCATE TABLE reserva;
TRUNCATE TABLE imagen_propiedad;
TRUNCATE TABLE propiedad;
TRUNCATE TABLE propietario;
TRUNCATE TABLE huesped;
TRUNCATE TABLE persona;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. PERSONAS (Contraseña: 12345)
INSERT INTO persona (id, nombre, dni, email, password, telefono, tipo_usuario) VALUES
(1, 'Alex Admin', '12345678A', 'alex@test.com', '$2a$12$eVfQ3w8b5g1gpbbUtBz9we4lCcIx04XEq.bEGOuB3.YTz8nTTOP4..', '+34600000001', 'PROPIETARIO'),
(2, 'Beatriz Viajera', '23456789B', 'beatriz@test.com', '$2a$12$eVfQ3w8b5g1gpbbUtBz9we4lCcIx04XEq.bEGOuB3.YTz8nTTOP4.', '+34600000002', 'HUESPED'),
(3, 'Carlos Casero', '34567890C', 'carlos@test.com', '$2a$12$eVfQ3w8b5g1gpbbUtBz9we4lCcIx04XEq.bEGOuB3.YTz8nTTOP4.', '+34600000003', 'PROPIETARIO'),
(4, 'Diana Dueña', '45678901D', 'diana@test.com', '$2a$12$eVfQ3w8b5g1gpbbUtBz9we4lCcIx04XEq.bEGOuB3.YTz8nTTOP4.', '+34600000004', 'PROPIETARIO'),
(5, 'Elena Exploradora', '56789012E', 'elena@test.com', '$2a$12$eVfQ3w8b5g1gpbbUtBz9we4lCcIx04XEq.bEGOuB3.YTz8nTTOP4.', '+34600000005', 'HUESPED');

-- 2. ROLES (Heredados)
INSERT INTO propietario (id) VALUES (1), (3), (4);
INSERT INTO huesped (id) VALUES (2), (5);

-- 3. PROPIEDADES (15 total)
INSERT INTO propiedad (id, titulo, descripcion, direccion, precio_noche, max_huespedes, propietario_id) VALUES
(1, 'Atico con Vistas al Mar', 'Espectacular ático en primera línea de playa con terraza privada.', 'Paseo Marítimo 12, Málaga', 120.50, 4, 1),
(2, 'Cabaña Romántica', 'Cabaña de madera ideal para parejas rodeada de pinos.', 'Camino del Monte s/n, Sierra Nevada', 75.00, 2, 1),
(3, 'Loft Industrial Centro', 'Diseño moderno en el corazón de la ciudad, techos altos.', 'Calle Nueva 5, Madrid', 110.00, 3, 3),
(4, 'Villa de Lujo con Piscina', 'Mansión con 5 dormitorios, jardín botánico y piscina infinita.', 'Urb. El Pinar, Marbella', 450.00, 10, 3),
(5, 'Apartamento Minimalista', 'Cerca de museos y zonas comerciales, muy luminoso.', 'Av. Libertad 45, Bilbao', 90.00, 2, 3),
(6, 'Casa Rural Tradicional', 'Paredes de piedra y chimenea. Perfecta para familias.', 'Plaza Mayor 1, Alquézar', 130.00, 6, 4),
(7, 'Estudio cerca de la Universidad', 'Pequeño pero funcional, ideal para estancias cortas.', 'Calle Estudiante 2, Salamanca', 45.00, 1, 4),
(8, 'Chalet en la Montaña', 'Acceso directo a pistas de esquí y vistas increíbles.', 'Sector Valdelinares 10, Teruel', 210.00, 8, 4),
(9, 'Piso Vintage', 'Decoración de los años 70 con todas las comodidades modernas.', 'Calle Pez 14, Madrid', 95.00, 4, 1),
(10, 'Bungalow en la Costa', 'A 50 metros de la arena, con porche y hamacas.', 'Cala Ratjada, Mallorca', 140.00, 5, 1),
(11, 'Duplex Moderno', 'Dos plantas con mucha luz y domótica integrada.', 'Calle Rio 22, Valencia', 115.00, 4, 3),
(12, 'Cortijo Andaluz', 'Gran propiedad con olivos y patio interior.', 'Ctra. Carmona km 4, Sevilla', 300.00, 12, 3),
(13, 'Suite en el Casco Antiguo', 'Edificio histórico rehabilitado con mucho encanto.', 'Calle San Jorge, Cáceres', 85.00, 2, 4),
(14, 'Apartamento de Playa Económico', 'Sencillo y limpio, ideal para surfistas.', 'Calle Ola 1, Tarifa', 60.00, 3, 4),
(15, 'Penthouse Exclusivo', 'Jacuzzi en la terraza y acabados de mármol.', 'Diagonal 100, Barcelona', 550.00, 4, 1);

-- 4. IMÁGENES (3 por propiedad = 45 imágenes)
INSERT INTO imagen_propiedad (url, propiedad_id) VALUES
('https://images.unsplash.com/photo-1493809842364-78817add7ffb', 1), ('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', 1), ('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', 1),
('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9', 2), 
('https://images.unsplash.com/photo-1600607687920-4e20d33f4124', 2), 
('https://images.unsplash.com/photo-1600566753190-17326c08403a', 2),
('https://images.unsplash.com/photo-1536376074432-bc1dafa42427', 3), ('https://images.unsplash.com/photo-1554995207-c18c203602cb', 3), ('https://images.unsplash.com/photo-1560448204-61dc36dc98c8', 3),
('https://images.unsplash.com/photo-1613490493576-2f045b1a0677', 4), ('https://images.unsplash.com/photo-1580587771525-78b9dba3b914', 4), ('https://images.unsplash.com/photo-1512917774080-9991f1c4c750', 4),
('https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6', 5), ('https://images.unsplash.com/photo-1484154218962-a197022b5858', 5), ('https://images.unsplash.com/photo-1524758631624-e2822e304c36', 5),
('https://images.unsplash.com/photo-1564013799919-ab600027ffc6', 6), ('https://images.unsplash.com/photo-1501183007986-d0d080b147f9', 6), ('https://images.unsplash.com/photo-1513584684031-434524ca01d1', 6),
('https://images.unsplash.com/photo-1537726235470-8504e5ebab10', 7), ('https://images.unsplash.com/photo-1505691938895-1758d7feb511', 7), ('https://images.unsplash.com/photo-1523217582562-09d0def993a6', 7),
('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1', 8), ('https://images.unsplash.com/photo-1518780664697-55e3ad937233', 8), ('https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 8),
('https://images.unsplash.com/photo-1556912177-c54030739974', 9), ('https://images.unsplash.com/photo-1560184897-ae75f418493e', 9), ('https://images.unsplash.com/photo-1560185007-cde436f6a4d0', 9),
('https://images.unsplash.com/photo-1499793983690-e29da59ef1c2', 10), ('https://images.unsplash.com/photo-1473116763249-2faaef81ccda', 10), ('https://images.unsplash.com/photo-1507525428034-b723cf961d3e', 10),
('https://images.unsplash.com/photo-1515263487990-61b0082b6b02', 11), ('https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd', 11), ('https://images.unsplash.com/photo-1493238792000-8113da705763', 11),
('https://images.unsplash.com/photo-1568605114967-8130f3a36994', 12), ('https://images.unsplash.com/photo-1570129477492-45c003edd2be', 12), ('https://images.unsplash.com/photo-1572120339554-d7262627473b', 12),
('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb', 13), ('https://images.unsplash.com/photo-1551882547-ff43c63efa17', 13), ('https://images.unsplash.com/photo-1566073771259-6a8506099945', 13),
('https://images.unsplash.com/photo-1439130490301-25e322d88054', 14), ('https://images.unsplash.com/photo-1468413253725-0d5181091126', 14), ('https://images.unsplash.com/photo-1506143925201-0252c51780b0', 14),
('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af', 15), ('https://images.unsplash.com/photo-1486304873000-235643847519', 15), ('https://images.unsplash.com/photo-1505691722718-25036f1fe021', 15);

-- 5. RESERVAS (10 total)
INSERT INTO reserva (fecha_inicio, fecha_fin, total, estado, creado_en, huesped_id, propiedad_id) VALUES
('2024-06-10', '2024-06-15', 602.50, 'CONFIRMADA', NOW(), 2, 1),
('2024-07-01', '2024-07-05', 300.00, 'PENDIENTE', NOW(), 2, 2),
('2024-06-20', '2024-06-22', 220.00, 'CONFIRMADA', NOW(), 5, 3),
('2024-08-15', '2024-08-20', 2250.00, 'PENDIENTE', NOW(), 5, 4),
('2024-06-01', '2024-06-03', 180.00, 'CONFIRMADA', NOW(), 2, 5),
('2024-09-10', '2024-09-15', 650.00, 'CANCELADA', NOW(), 5, 6),
('2024-07-20', '2024-07-22', 90.00, 'PENDIENTE', NOW(), 2, 7),
('2024-12-20', '2024-12-27', 1470.00, 'CONFIRMADA', NOW(), 5, 8),
('2024-07-05', '2024-07-10', 475.00, 'PENDIENTE', NOW(), 2, 9),
('2024-08-01', '2024-08-07', 840.00, 'CONFIRMADA', NOW(), 5, 10);

-- 6. MENSAJES
INSERT INTO mensaje (contenido, enviado_en, reserva_id, emisor_id, receptor_id) VALUES
('Hola Alex, ¿el ático tiene cafetera?', NOW(), 1, 2, 1),
('Hola Beatriz, sí, tiene una Nespresso.', NOW(), 1, 1, 2),
('Perfecto, nos vemos el día 10.', NOW(), 1, 2, 1),
('¿Es posible hacer el check-in antes de las 12?', NOW(), 2, 2, 1),
('Hola Carlos, ¿el loft está cerca del metro?', NOW(), 3, 5, 3),
('Sí, tienes la estación Sol a 2 minutos.', NOW(), 3, 3, 5),
('¿La piscina de la villa está climatizada?', NOW(), 4, 5, 3),
('¿Hay WiFi en la cabaña?', NOW(), 2, 2, 1),
('Sí, pero la señal es algo débil por los árboles.', NOW(), 2, 1, 2),
('Gracias por la info.', NOW(), 2, 2, 1);