DROP DATABASE IF EXISTS dbbyggemarked;
CREATE DATABASE dbbyggemarked;
USE dbbyggemarked;

CREATE TABLE brugere(
  kundenummer BIGINT NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  navn VARCHAR(100) NOT NULL,
  adresse VARCHAR(200) NOT NULL,
  postnummer INT(4) NOT NULL,
  _by VARCHAR(100) NOT NULL,
  telefonnummer INT(20) NOT NULL,
  password VARCHAR(100) NOT NULL,
  rolle VARCHAR(10),
  PRIMARY KEY (kundenummer)
);

CREATE TABLE brugere_erhverv(
kundenummer BIGINT NOT NULL,
kontonummer INT NOT NULL,
cvr INT NOT NULL,
PRIMARY KEY (kundenummer),
foreign key(kundenummer) references brugere(kundenummer)
);

INSERT INTO `brugere` (`kundenummer`, `email`, `navn`, `adresse`, `postnummer`, `_by`, `telefonnummer`, `password`, `rolle`) VALUES
(1, 'test@gmail.com', 'test', 'Lærkevej 3', 6200, 'kliplev', 20913871, '$2b$10$xrHb1jXOEwFMfXbbSUX8U.c1G6bPWUjMxpLayoXv2t76PFRGCAKiC', NULL);

CREATE TABLE ordre(
ordrenummer BIGINT,
dato DATETIME NOT NULL,
betalt BOOLEAN NOT NULL,
kundenummer BIGINT NOT NULL,
PRIMARY KEY (ordrenummer),
foreign key(kundenummer) references brugere(kundenummer)
);

CREATE TABLE varehovedgruppe(
varehovedgruppe BIGINT,
beskrivelse VARCHAR(300),
PRIMARY KEY (varehovedgruppe)
);

CREATE TABLE vareundergruppe(
vareundergruppe BIGINT,
beskrivelse VARCHAR(300),
PRIMARY KEY (vareundergruppe)
);

CREATE TABLE vare(
varenummer BIGINT,
prisenhed FLOAT NOT NULL,
beskrivelse VARCHAR(500) NOT NULL,
enhedsbetegnelse VARCHAR(5) NOT NULL,
indkøbspris FLOAT NOT NULL,
billede blob NOT NULL,
EAN BIGINT NOT NULL,
vareundergruppe BIGINT,
PRIMARY KEY (varenummer),
foreign key(vareundergruppe) references vareundergruppe(vareundergruppe)
);

CREATE TABLE ordrelinje(
id INT auto_increment,
antal INT NOT NULL,
varenummer BIGINT,
ordrenummer BIGINT,
PRIMARY KEY (id),
foreign key(varenummer) references vare(varenummer),
foreign key(ordrenummer) references ordre(ordrenummer)
);


CREATE TABLE varehus(
id_varehus INT,
navn VARCHAR(300) NOT NULL,
adresse VARCHAR(300) NOT NULL,
PRIMARY KEY (id_varehus)
);

CREATE TABLE lagerbeholdning(
id INT auto_increment,
id_varehus INT NOT NULL,
varenummer BIGINT NOT NULL,
antal INT NOT NULL,
PRIMARY KEY (id),
foreign key(id_varehus) references varehus(id_varehus),
foreign key(varenummer) references vare(varenummer)
);

CREATE TABLE varehuslokation(
id_varehuslokation INT AUTO_INCREMENT,
id_varehus INT NOT NULL,
gang VARCHAR(300) NOT NULL,
PRIMARY KEY (id_varehuslokation),
foreign key(id_varehus) references varehus(id_varehus)
);

CREATE TABLE lokation(
id_lokation INT AUTO_INCREMENT,
lokationsnummer VARCHAR(300) NOT NULL,
sekvensnummer VARCHAR(300) NOT NULL,
varenummer BIGINT NOT NULL,
id_varehuslokation INT NOT NULL,
PRIMARY KEY (id_lokation),
foreign key(varenummer) references vare(varenummer),
foreign key(id_varehuslokation) references varehuslokation(id_varehuslokation)
);

