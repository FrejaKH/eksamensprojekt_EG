-- DROP DATABASE IF EXISTS dbbyggemarked;
-- CREATE DATABASE dbbyggemarked;
-- USE dbbyggemarked;

-- CREATE TABLE brugere(
--   kundenummer BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
--   email VARCHAR(100) UNIQUE NOT NULL,
--   navn VARCHAR(100) NOT NULL,
--   adresse VARCHAR(200) NOT NULL,
--   postnummer INT(4) NOT NULL,
--   _by VARCHAR(100) NOT NULL,
--   telefonnummer INT(20) NOT NULL,
--   password VARCHAR(100) NOT NULL,
--   rolle VARCHAR(10),
--   hjaelp BOOLEAN,
--   PRIMARY KEY (kundenummer)
-- );

-- CREATE TABLE brugere_erhverv(
-- kundenummer BIGINT UNSIGNED NOT NULL,
-- kontonummer INT NOT NULL,
-- cvr INT NOT NULL,
-- PRIMARY KEY (kundenummer),
-- foreign key(kundenummer) references brugere(kundenummer)
-- );

-- INSERT INTO `brugere` (`kundenummer`, `email`, `navn`, `adresse`, `postnummer`, `_by`, `telefonnummer`, `password`, `rolle`, hjaelp) VALUES
-- (1, 'test@gmail.com', 'test', 'Lærkevej 3', 6200, 'kliplev', 20913871, '$2b$10$xrHb1jXOEwFMfXbbSUX8U.c1G6bPWUjMxpLayoXv2t76PFRGCAKiC', "privat", true);

-- CREATE TABLE ordre(
-- ordrenummer INT NOT NULL,
-- dato DATETIME NOT NULL,
-- betalt BOOLEAN NOT NULL,
-- kundenummer BIGINT UNSIGNED NOT NULL,
-- PRIMARY KEY (ordrenummer),
-- foreign key(kundenummer) references brugere(kundenummer)
-- );

-- CREATE TABLE varehovedgruppe(
-- varehovedgruppe BIGINT UNSIGNED NOT NULL,
-- beskrivelse VARCHAR(300),
-- PRIMARY KEY (varehovedgruppe)
-- );

-- INSERT INTO `varehovedgruppe` (`varehovedgruppe`, `beskrivelse`) VALUES ("2400", "Maling");

-- CREATE TABLE vareundergruppe(
-- vareundergruppe BIGINT UNSIGNED NOT NULL,
-- beskrivelse VARCHAR(300),
-- billede MEDIUMBLOB,
-- contenttype VARCHAR(32),
-- varehovedgruppe BIGINT UNSIGNED NOT NULL,
-- PRIMARY KEY (vareundergruppe),
-- foreign key(varehovedgruppe) references varehovedgruppe(varehovedgruppe)
-- );

-- INSERT INTO `vareundergruppe` (`vareundergruppe`, `beskrivelse`, `varehovedgruppe`) VALUES ("3640", "Vægmaling", "2400");
-- INSERT INTO `vareundergruppe` (`vareundergruppe`, `beskrivelse`, `varehovedgruppe`) VALUES ("3641", "Pensler", "2400");
-- INSERT INTO `vareundergruppe` (`vareundergruppe`, `beskrivelse`, `varehovedgruppe`) VALUES ("3642", "Malerruler", "2400");
-- INSERT INTO `vareundergruppe` (`vareundergruppe`, `beskrivelse`, `varehovedgruppe`) VALUES ("3643", "Malertape", "2400");

-- CREATE TABLE vare(
-- varenummer INT UNSIGNED NOT NULL AUTO_INCREMENT,
-- varenavn VARCHAR(500) NOT NULL,
-- varebeskrivelse VARCHAR(500) NOT NULL,
-- pris FLOAT NOT NULL,
-- enhedsbetegnelse VARCHAR(5) NOT NULL,
-- indkøbspris FLOAT NOT NULL,
-- billede MEDIUMBLOB NOT NULL,
-- contenttype VARCHAR(32) NOT NULL,
-- EAN VARCHAR(20) NOT NULL,
-- vareundergruppe BIGINT UNSIGNED NOT NULL,
-- PRIMARY KEY (varenummer)
-- );

-- CREATE TABLE ordrelinje(
-- id INT UNSIGNED NOT NULL auto_increment,
-- antal INT NOT NULL,
-- varenummer INT UNSIGNED NOT NULL,
-- ordrenummer INT NOT NULL,
-- PRIMARY KEY (id),
-- foreign key(varenummer) references vare(varenummer),
-- foreign key(ordrenummer) references ordre(ordrenummer)
-- );


-- CREATE TABLE varehus(
-- id_varehus INT UNSIGNED NOT NULL,
-- navn VARCHAR(300) NOT NULL,
-- adresse VARCHAR(300) NOT NULL,
-- PRIMARY KEY (id_varehus)
-- );

-- CREATE TABLE lagerbeholdning(
-- id INT UNSIGNED NOT NULL auto_increment,
-- id_varehus INT UNSIGNED NOT NULL,
-- varenummer INT UNSIGNED NOT NULL,
-- antal INT NOT NULL,
-- PRIMARY KEY (id),
-- foreign key(id_varehus) references varehus(id_varehus),
-- foreign key(varenummer) references vare(varenummer)
-- );

-- CREATE TABLE varehuslokation(
-- id_varehuslokation INT UNSIGNED NOT NULL AUTO_INCREMENT,
-- id_varehus INT UNSIGNED NOT NULL,
-- gang VARCHAR(300) NOT NULL,
-- PRIMARY KEY (id_varehuslokation),
-- foreign key(id_varehus) references varehus(id_varehus)
-- );

-- CREATE TABLE lokation(
-- id_lokation INT UNSIGNED NOT NULL AUTO_INCREMENT,
-- lokationsnummer VARCHAR(300) NOT NULL,
-- sekvensnummer VARCHAR(300) NOT NULL,
-- varenummer INT UNSIGNED NOT NULL,
-- id_varehuslokation INT UNSIGNED NOT NULL,
-- PRIMARY KEY (id_lokation),
-- foreign key(varenummer) references vare(varenummer),
-- foreign key(id_varehuslokation) references varehuslokation(id_varehuslokation)
-- );




DROP DATABASE IF EXISTS dbbyggemarked;
CREATE DATABASE dbbyggemarked;
USE dbbyggemarked;

CREATE TABLE brugere(
  kundenummer BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  navn VARCHAR(100) NOT NULL,
  adresse VARCHAR(200) NOT NULL,
  postnummer INT(4) NOT NULL,
  _by VARCHAR(100) NOT NULL,
  telefonnummer INT(20) NOT NULL,
  password VARCHAR(100) NOT NULL,
  rolle VARCHAR(10),
     hjaelp BOOLEAN,

  PRIMARY KEY (kundenummer)
);

CREATE TABLE brugere_erhverv(
kundenummer BIGINT UNSIGNED NOT NULL,
kontonummer INT NOT NULL,
cvr INT NOT NULL,
PRIMARY KEY (kundenummer),
foreign key(kundenummer) references brugere(kundenummer)
);

INSERT INTO `brugere` (`kundenummer`, `email`, `navn`, `adresse`, `postnummer`, `_by`, `telefonnummer`, `password`, `rolle`, hjaelp) VALUES
(1, 'test@gmail.com', 'test', 'Lærkevej 3', 6200, 'kliplev', 20913871, '$2b$10$xrHb1jXOEwFMfXbbSUX8U.c1G6bPWUjMxpLayoXv2t76PFRGCAKiC', "privat", true);

CREATE TABLE ordre(
ordrenummer INT NOT NULL,
dato DATETIME NOT NULL,
betalt BOOLEAN NOT NULL,
kundenummer BIGINT UNSIGNED NOT NULL,
PRIMARY KEY (ordrenummer),
foreign key(kundenummer) references brugere(kundenummer)
);

CREATE TABLE varehovedgruppe(
varehovedgruppe BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(300),
PRIMARY KEY (varehovedgruppe)
);

INSERT INTO `varehovedgruppe` (`varehovedgruppe`, `beskrivelse`) VALUES ("2400", "Maling");

CREATE TABLE vareundergruppe(
vareundergruppe BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(300),
billede MEDIUMBLOB,
contenttype VARCHAR(32),
varehovedgruppe BIGINT UNSIGNED NOT NULL,
PRIMARY KEY (vareundergruppe),
foreign key(varehovedgruppe) references varehovedgruppe(varehovedgruppe)
);

INSERT INTO `vareundergruppe` (`vareundergruppe`, `beskrivelse`, `varehovedgruppe`) VALUES ("3640", "Vægmaling", "2400");
INSERT INTO `vareundergruppe` (`vareundergruppe`, `beskrivelse`, `varehovedgruppe`) VALUES ("3641", "Pensler", "2400");
INSERT INTO `vareundergruppe` (`vareundergruppe`, `beskrivelse`, `varehovedgruppe`) VALUES ("3642", "Malerruler", "2400");
INSERT INTO `vareundergruppe` (`vareundergruppe`, `beskrivelse`, `varehovedgruppe`) VALUES ("3643", "Malertape", "2400");

CREATE TABLE vare(
varenummer INT UNSIGNED NOT NULL,
varenavn VARCHAR(500) NOT NULL,
varebeskrivelse VARCHAR(500) NOT NULL,
pris FLOAT NOT NULL,
enhedsbetegnelse VARCHAR(5) NOT NULL,
indkøbspris FLOAT NOT NULL,
billede MEDIUMBLOB NOT NULL,
contenttype VARCHAR(32) NOT NULL,
EAN VARCHAR(20) NOT NULL,
vareundergruppe BIGINT UNSIGNED,
PRIMARY KEY (varenummer),
foreign key(vareundergruppe) references vareundergruppe(vareundergruppe)
);

CREATE TABLE ordrelinje(
id INT UNSIGNED NOT NULL auto_increment,
antal INT NOT NULL,
varenummer INT UNSIGNED NOT NULL,
ordrenummer INT NOT NULL,
PRIMARY KEY (id),
foreign key(varenummer) references vare(varenummer),
foreign key(ordrenummer) references ordre(ordrenummer)
);


CREATE TABLE varehus(
id_varehus INT UNSIGNED NOT NULL,
navn VARCHAR(300) NOT NULL,
adresse VARCHAR(300) NOT NULL,
PRIMARY KEY (id_varehus)
);

CREATE TABLE lagerbeholdning(
id INT UNSIGNED NOT NULL auto_increment,
id_varehus INT UNSIGNED NOT NULL,
varenummer INT UNSIGNED NOT NULL,
antal INT NOT NULL,
PRIMARY KEY (id),
foreign key(id_varehus) references varehus(id_varehus),
foreign key(varenummer) references vare(varenummer)
);

CREATE TABLE varehuslokation(
id_varehuslokation INT UNSIGNED NOT NULL AUTO_INCREMENT,
id_varehus INT UNSIGNED NOT NULL,
gang VARCHAR(300) NOT NULL,
PRIMARY KEY (id_varehuslokation),
foreign key(id_varehus) references varehus(id_varehus)
);

CREATE TABLE lokation(
id_lokation INT UNSIGNED NOT NULL AUTO_INCREMENT,
lokationsnummer VARCHAR(300) NOT NULL,
sekvensnummer VARCHAR(300) NOT NULL,
varenummer INT UNSIGNED NOT NULL,
id_varehuslokation INT UNSIGNED NOT NULL,
PRIMARY KEY (id_lokation),
foreign key(varenummer) references vare(varenummer),
foreign key(id_varehuslokation) references varehuslokation(id_varehuslokation)
);

