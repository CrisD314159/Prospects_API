-- Tabla Usuario
CREATE TABLE Usuario (
    Id VARCHAR(15) PRIMARY KEY,
    Usuario VARCHAR(30) NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Nombre VARCHAR(30),
    Telefono VARCHAR(10),
    Email VARCHAR(30),
    EsAdministrador BOOLEAN
);

-- Tabla Conjunto
CREATE TABLE Conjunto (
    Id VARCHAR(15) PRIMARY KEY,
    Nombre VARCHAR(30) NOT NULL
);

-- Tabla Inmuebles
CREATE TABLE Inmuebles (
    Nombre VARCHAR(3) PRIMARY KEY,
    Torre VARCHAR(2),
    Descripcion TEXT
);

-- Tabla Prospectos
CREATE TABLE Prospectos (
    Id VARCHAR(15) PRIMARY KEY,
    Nombre VARCHAR(30),
    NombreCliente VARCHAR(30),
    TelefonoCliente VARCHAR(10),
    EmailCliente VARCHAR(30),
    Observacion TEXT,
    Inmueble VARCHAR(3),
    Asesor VARCHAR(15),
    Conjunto VARCHAR(15),
    FOREIGN KEY (Inmueble) REFERENCES Inmuebles(Nombre),
    FOREIGN KEY (Asesor) REFERENCES Usuario(Id),
    FOREIGN KEY (Conjunto) REFERENCES Conjunto(Id)
);

-- Inserts para la tabla Usuario
INSERT INTO Usuario (Id, Usuario, Password, Nombre, Telefono, Email, EsAdministrador) 
VALUES 
('U001', 'juan123', '$2b$10$ZrDLCX3K/tId00JpFMmhguvK1TYkDBqyBxR1z81BVRb5Fo8U9R7K2', 'Juan Perez', '5551234567', 'juan.perez@example.com', TRUE), -- pass: password123
('U002', 'maria456', '$2b$10$YJBANOi1a9kiF9w5e/M7pOFtJg8Pa2xbx9vogsB.onDjn1aDFie/y', 'Maria Lopez', '5559876543', 'maria.lopez@example.com', FALSE),-- pass: password456
('U003', 'carlos789', '$2b$10$UxWLFI/D5EqhjPnd5TiujuCep0PBqU6nkJScBQS8ZMg4QyI6JppHC', 'Carlos Sanchez', '5556547890', 'carlos.sanchez@example.com', FALSE);-- pass: password789

-- Inserts para la tabla Conjunto
INSERT INTO Conjunto (Id, Nombre) 
VALUES 
('C001', 'Conjunto Los Olivos'),
('C002', 'Conjunto Parque Central'),
('C003', 'Conjunto Jardines del Sol');

-- Inserts para la tabla Inmuebles
INSERT INTO Inmuebles (Nombre, Torre, Descripcion) 
VALUES 
('A1', 'T1', 'Apartamento en la Torre 1 con vista al parque.'),
('B2', 'T2', 'Apartamento en la Torre 2, orientación este.'),
('C3', 'T3', 'Apartamento dúplex en la Torre 3.');

-- Inserts para la tabla Prospectos
INSERT INTO Prospectos (Id, Nombre, NombreCliente, TelefonoCliente, EmailCliente, Observacion, Inmueble, Asesor, Conjunto) 
VALUES 
('P001', 'Prospecto1', 'Ana Gomez', '5551112222', 'ana.gomez@example.com', 'Cliente interesada en apartamento con vista al parque.', 'A1', 'U001', 'C001'),
('P002', 'Prospecto2', 'Luis Fernandez', '5553334444', 'luis.fernandez@example.com', 'Busca un apartamento en Torre 2, orientación este.', 'B2', 'U002', 'C002'),
('P003', 'Prospecto3', 'Carolina Ruiz', '5555556666', 'carolina.ruiz@example.com', 'Interesada en dúplex de la Torre 3.', 'C3', 'U003', 'C003');