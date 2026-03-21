-- Desactivamos chequeo de claves para limpiar
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE mensaje;
TRUNCATE TABLE reserva;
TRUNCATE TABLE imagen_propiedad;
TRUNCATE TABLE propiedad;
TRUNCATE TABLE propietario;
TRUNCATE TABLE huesped;
TRUNCATE TABLE persona;

SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------
-- 1. PERSONAS (Sin ID, es autoincrement)
-- Todas las contraseñas son '123456' encriptadas con BCrypt
-- --------------------------------------------------------
INSERT INTO persona (nombre, dni, email, password, telefono) VALUES
('Juan Propietario', '11111111A', 'juan@test.com', '$2a$10$X8O.U0X3mF/zG7/gQ4h5eO2P7s.e7lJ1s/gV.mQ/rW.8/9C/w.b6u', '+34600100100'),
('Maria Huesped', '22222222B', 'maria@test.com', '$2a$10$X8O.U0X3mF/zG7/gQ4h5eO2P7s.e7lJ1s/gV.mQ/rW.8/9C/w.b6u', '+34600200200'),
('Pedro Anfitrion', '33333333C', 'pedro@test.com', '$2a$10$X8O.U0X3mF/zG7/gQ4h5eO2P7s.e7lJ1s/gV.mQ/rW.8/9C/w.b6u', '+34600300300'),
('Laura Viajera', '44444444D', 'laura@test.com', '$2a$10$X8O.U0X3mF/zG7/gQ4h5eO2P7s.e7lJ1s/gV.mQ/rW.8/9C/w.b6u', '+34600400400'),
('Carlos Dueño', '55555555E', 'carlos@test.com', '$2a$10$X8O.U0X3mF/zG7/gQ4h5eO2P7s.e7lJ1s/gV.mQ/rW.8/9C/w.b6u', '+34600500500');
-- --------------------------------------------------------
-- 2. VINCULAR ROLES (Usamos el email para recuperar el ID generado)
-- --------------------------------------------------------

-- Insertamos en Propietario buscando los IDs por email
INSERT INTO propietario (id)
SELECT id FROM persona WHERE email IN ('juan@test.com', 'pedro@test.com', 'carlos@test.com');

-- Insertamos en Huesped
INSERT INTO huesped (id)
SELECT id FROM persona WHERE email IN ('maria@test.com', 'laura@test.com');


-- --------------------------------------------------------
-- 3. PROPIEDADES
-- En lugar de poner '1' o '3', buscamos el ID del dueño por su email
-- --------------------------------------------------------
INSERT INTO propiedad (titulo, descripcion, direccion, precio_noche, max_huespedes, calendario, propietario_id) VALUES
('Apartamento Centro', 'Ideal parejas.', 'Calle Mayor 10', 85.00, 2, '2024-01-01', (SELECT id FROM persona WHERE email='juan@test.com')),
('Chalet Piscina', 'Gran casa jardin.', 'Av. Playa 55', 250.00, 8, '2024-06-01', (SELECT id FROM persona WHERE email='juan@test.com')),
('Cabaña Rural', 'Naturaleza.', 'Monte s/n', 60.00, 4, '2024-03-15', (SELECT id FROM persona WHERE email='pedro@test.com')),
('Loft Industrial', 'Zona moda.', 'Calle Fabrica 22', 120.00, 3, '2024-02-20', (SELECT id FROM persona WHERE email='pedro@test.com')),
('Villa Lujo', 'Vistas mar.', 'Paseo Maritimo 1', 400.00, 10, '2024-07-01', (SELECT id FROM persona WHERE email='carlos@test.com'));


-- --------------------------------------------------------
-- 4. IMÁGENES
-- Buscamos la propiedad por su Título (asumiendo títulos únicos para el seed)
-- --------------------------------------------------------
INSERT INTO imagen_propiedad (url, propiedad_id) VALUES
('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', (SELECT id FROM propiedad WHERE titulo='Apartamento Centro')),
('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', (SELECT id FROM propiedad WHERE titulo='Apartamento Centro')),
('https://images.unsplash.com/photo-1564013799919-ab600027ffc6', (SELECT id FROM propiedad WHERE titulo='Chalet Piscina')),
('https://images.unsplash.com/photo-1449156493391-d2cfa28e468b', (SELECT id FROM propiedad WHERE titulo='Cabaña Rural')),
('https://images.unsplash.com/photo-1554995207-c18c203602cb', (SELECT id FROM propiedad WHERE titulo='Loft Industrial')),
('https://images.unsplash.com/photo-1613490493576-2f045b1a0677', (SELECT id FROM propiedad WHERE titulo='Villa Lujo'));


-- --------------------------------------------------------
-- 5. RESERVAS
-- Vinculamos Huesped (por email) y Propiedad (por titulo)
-- --------------------------------------------------------
INSERT INTO reserva (fecha_inicio, fecha_fin, total, estado, creado_en, huesped_id, propiedad_id) VALUES
('2024-08-10', '2024-08-15', 425.00, 'CONFIRMADA', NOW(), (SELECT id FROM persona WHERE email='maria@test.com'), (SELECT id FROM propiedad WHERE titulo='Apartamento Centro')),
('2024-09-01', '2024-09-07', 1500.00, 'PENDIENTE', NOW(), (SELECT id FROM persona WHERE email='maria@test.com'), (SELECT id FROM propiedad WHERE titulo='Chalet Piscina')),
('2024-10-05', '2024-10-10', 600.00, 'CONFIRMADA', NOW(), (SELECT id FROM persona WHERE email='laura@test.com'), (SELECT id FROM propiedad WHERE titulo='Cabaña Rural')),
('2024-11-20', '2024-11-22', 240.00, 'PENDIENTE', NOW(), (SELECT id FROM persona WHERE email='laura@test.com'), (SELECT id FROM propiedad WHERE titulo='Loft Industrial'));


-- --------------------------------------------------------
-- 6. MENSAJES
-- Recuperamos IDs de reserva por la fecha y propiedad (un poco truco, pero vale para seed)
-- O simplemente asumimos IDs de reserva ya que arriba se crean en orden
-- Para hacerlo 100% seguro sin saber IDs, usamos subconsultas complejas, 
-- pero para este caso podemos usar los IDs generados asumiendo que es una carga limpia
-- o anidar selects. Haremos lo seguro: SELECT id FROM reserva... LIMIT 1
-- --------------------------------------------------------

-- Mensaje en la reserva de Apartamento Centro (Huesped Maria a Propietario Juan)
INSERT INTO mensaje (contenido, reserva_id, emisor_id, receptor_id) VALUES
('Hola, ¿hay toallas?', 
 (SELECT id FROM reserva WHERE total=425.00 LIMIT 1), 
 (SELECT id FROM persona WHERE email='maria@test.com'), 
 (SELECT id FROM persona WHERE email='juan@test.com'));

INSERT INTO mensaje (contenido, reserva_id, emisor_id, receptor_id) VALUES
('Si, hay de todo.', 
 (SELECT id FROM reserva WHERE total=425.00 LIMIT 1), 
 (SELECT id FROM persona WHERE email='juan@test.com'), 
 (SELECT id FROM persona WHERE email='maria@test.com'));