CREATE TABLE IF NOT EXISTS Users (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255),
    `lastname` VARCHAR(255),
    `dni` INT,
    `profilePhoto` VARCHAR(255),
    `birthdate` DATE,
    `email` VARCHAR(255),
    `password` VARCHAR(255),
    `range` VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS Colors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS Sizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    image VARCHAR(255),
    description VARCHAR(255),
    price DECIMAL(10, 2), -- Ajusta la precisión decimal según tus necesidades
    discount DECIMAL(10, 2), -- Ajusta la precisión decimal según tus necesidades
    categoryId INT,
    colorId INT,
    sizeId INT,
    userId INT,
    FOREIGN KEY (categoryId) REFERENCES Categories(id),
    FOREIGN KEY (colorId) REFERENCES Colors(id),
    FOREIGN KEY (sizeId) REFERENCES Sizes(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);