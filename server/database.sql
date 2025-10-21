    CREATE TABLE clientes(
        id SERIAL,
        nombre VARCHAR(15) NOT NULL,
        primerApellido VARCHAR(30) NOT NULL,
        segundoApellido VARCHAR(30) NOT NULL,
        email VARCHAR(50),
        telefono NUMERIC(9),
        CONSTRAINT pk_idCliente PRIMARY KEY (id),
        CONSTRAINT uq_email UNIQUE (email)
    );

    CREATE TABLE usuarios(
        id SERIAL,
        usuario VARCHAR(20) NOT NULL,
        password VARCHAR(20) NOT NULL,
        idCliente INTEGER,
        CONSTRAINT pk_idUsuario PRIMARY KEY (id),
        CONSTRAINT uq_username UNIQUE (usuario),
        CONSTRAINT fk_idClienteUsuario FOREIGN KEY (idCliente) REFERENCES clientes(id)
    );

    CREATE TABLE habitaciones(
        id SERIAL,
        numero NUMERIC NOT NULL,
        tipo VARCHAR(20) NOT NULL,
        precio NUMERIC(10,2) NOT NULL,
        CONSTRAINT pk_idHabitacion PRIMARY KEY (id),
        CONSTRAINT uq_numero UNIQUE (numero),
        CONSTRAINT ck_tipoHabitacion CHECK (tipo IN ('Individual', 'Doble',   'Suite', 'Familiar'))
    );

    CREATE TABLE reservas(
        id SERIAL,
        idCliente INTEGER NOT NULL,
        idHabitacion INTEGER NOT NULL,
        fecha_entrada DATE NOT NULL,
        fecha_salida DATE NOT NULL,
        CONSTRAINT pk_idReservas PRIMARY KEY (id),
        CONSTRAINT fk_idCliente FOREIGN KEY (idCliente) REFERENCES clientes(id),
        CONSTRAINT fk_idHabitacion FOREIGN KEY (idHabitacion) REFERENCES habitaciones(id)
    );

    CREATE TABLE pagos(
        id SERIAL,
        idReserva INTEGER NOT NULL,
        metodoPago VARCHAR(20) NOT NULL,
        precio NUMERIC(10,2) NOT NULL,
        fechaPago DATE NOT NULL,
        CONSTRAINT pk_idPagos PRIMARY KEY (id),
        CONSTRAINT fk_idReserva FOREIGN KEY (idReserva) REFERENCES reservas(id),
        CONSTRAINT ck_metodoPago CHECK (metodoPago IN ('Tarjeta', 'Efectivo', 'PayPal'))
    );

    
--Inserción de datos para clientes.

INSERT INTO clientes (id, nombre, primerApellido, segundoApellido, email, telefono) VALUES
(1, 'David', 'Dorante', 'Lucas', 'davidd@gmail.com', 600111222);

INSERT INTO clientes (id, nombre, primerApellido, segundoApellido, email, telefono) VALUES
(2, 'Maria', 'Gomez', 'Perez', 'mariagom@gmail.com', 600333444);

INSERT INTO clientes (id, nombre, primerApellido, segundoApellido, email, telefono) VALUES
(3, 'Jorge', 'Santos', 'Diaz', 'jogesantos@gmail.com', 600555666);

INSERT INTO clientes (id, nombre, primerApellido, segundoApellido, email, telefono) VALUES
(4, 'Lucia', 'Romero', 'Garcia', 'luciarom@yahoot.es', 600777888);

INSERT INTO clientes (id, nombre, primerApellido, segundoApellido, email, telefono) VALUES
(5, 'Pablo', 'Ruiz', 'Torres', 'pablo@gmail.com', 600999000);

INSERT INTO clientes (id, nombre, primerApellido, segundoApellido, email, telefono) VALUES
(6, 'Sofia', 'Martinez', 'Leon', 'sofleon@yahoot.es', 601111222);

INSERT INTO clientes (id, nombre, primerApellido, segundoApellido, email, telefono) VALUES
(7, 'Alberto', 'Navas', 'Cruz', 'albertonavas@yahoot.es', 601333444);

INSERT INTO clientes (id, nombre, primerApellido, segundoApellido, email, telefono) VALUES
(8, 'Marta', 'Lopez', 'Gil', 'marta@gmail.com', 601555666);

INSERT INTO clientes (id, nombre, primerApellido, segundoApellido, email, telefono) VALUES
(9, 'Raul', 'Castro', 'Vega', 'raulcastro@gmail.com', 601777888);

INSERT INTO clientes (id, nombre, primerApellido, segundoApellido, email, telefono) VALUES
(10, 'Laura', 'Morales', 'Cano', 'laura@gmail.com', 601999000);

--Inserción de datos en la tabla Usuarios.
INSERT INTO usuarios (usuario, password, idCliente) VALUES
('david', 'david', 1);

INSERT INTO usuarios (usuario, password, idCliente) VALUES
('mariagom', 'mariagom12', 2);

INSERT INTO usuarios (usuario, password, idCliente) VALUES
('jorgesant', 'jorgesantos', 3);

--Inserción de datos en la tabla Habitiaciones.
INSERT INTO habitaciones (id, numero, tipo, precio) VALUES
(1, 101, 'Individual', 50);

INSERT INTO habitaciones (id, numero, tipo, precio) VALUES
(2, 102, 'Doble', 80);

INSERT INTO habitaciones (id, numero, tipo, precio) VALUES
(3, 103, 'Suite', 150);

INSERT INTO habitaciones (id, numero, tipo, precio) VALUES
(4, 104, 'Individual', 50);

INSERT INTO habitaciones (id, numero, tipo, precio) VALUES
(5, 105, 'Doble', 80);

INSERT INTO habitaciones (id, numero, tipo, precio) VALUES
(6, 106, 'Suite', 150);


--Inserción de datos en la tabla Reservas.
INSERT INTO reservas (id, idCliente, idHabitacion, fecha_entrada, fecha_salida) VALUES 
(1, 1, 1, TO_DATE('2025-10-01', 'YYYY-MM-DD'), TO_DATE('2025-10-05', 'YYYY-MM-DD'));

INSERT INTO reservas (id, idCliente, idHabitacion, fecha_entrada, fecha_salida) 
VALUES (2, 2, 2, TO_DATE('2025-10-03', 'YYYY-MM-DD'), TO_DATE('2025-10-06', 'YYYY-MM-DD'));

INSERT INTO reservas (id, idCliente, idHabitacion, fecha_entrada, fecha_salida) 
VALUES (3, 2, 3, TO_DATE('2026-10-02', 'YYYY-MM-DD'), TO_DATE('2026-10-04', 'YYYY-MM-DD'));

INSERT INTO reservas (id, idCliente, idHabitacion, fecha_entrada, fecha_salida) 
VALUES (4, 2, 4, TO_DATE('2025-12-08', 'YYYY-MM-DD'), TO_DATE('2025-12-15', 'YYYY-MM-DD'));

INSERT INTO reservas (id, idCliente, idHabitacion, fecha_entrada, fecha_salida) 
VALUES (5, 1, 5, TO_DATE('2025-10-07', 'YYYY-MM-DD'), TO_DATE('2025-10-12', 'YYYY-MM-DD'));

INSERT INTO reservas (id, idCliente, idHabitacion, fecha_entrada, fecha_salida) 
VALUES (6, 6, 6, TO_DATE('2025-10-01', 'YYYY-MM-DD'), TO_DATE('2025-10-03', 'YYYY-MM-DD'));

--Inserción de datos en la tabla Pagos.
INSERT INTO pagos (id, idReserva, metodoPago, precio, fechaPago) VALUES (1, 1, 'Tarjeta', 200, TO_DATE('2025-10-01', 'YYYY-MM-DD'));

INSERT INTO pagos (id, idReserva, metodoPago, precio, fechaPago) VALUES (2, 2, 'Efectivo', 240, TO_DATE('2025-10-03', 'YYYY-MM-DD'));

INSERT INTO pagos (id, idReserva, metodoPago, precio, fechaPago) VALUES (3, 3, 'PayPal', 300, TO_DATE('2025-10-02', 'YYYY-MM-DD'));

INSERT INTO pagos (id, idReserva, metodoPago, precio, fechaPago) VALUES (4, 4, 'Tarjeta', 400, TO_DATE('2025-10-05', 'YYYY-MM-DD'));

INSERT INTO pagos (id, idReserva, metodoPago, precio, fechaPago) VALUES (5, 5, 'Efectivo', 320, TO_DATE('2025-10-07', 'YYYY-MM-DD'));

INSERT INTO pagos (id, idReserva, metodoPago, precio, fechaPago) VALUES (6, 6, 'PayPal', 150, TO_DATE('2025-10-01', 'YYYY-MM-DD'));