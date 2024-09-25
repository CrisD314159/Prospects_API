-- Tabla Usuario
CREATE TABLE Usuario (
    Id VARCHAR(15) PRIMARY KEY,
    Usuario VARCHAR(30) NOT NULL,
    Password VARCHAR(30) NOT NULL,
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