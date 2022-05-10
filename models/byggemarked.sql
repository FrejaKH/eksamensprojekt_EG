DROP DATABASE IF EXISTS dbbyggemarked;
CREATE DATABASE dbbyggemarked;
USE dbbyggemarked;

CREATE TABLE user_table(
  kundenummer BIGINT NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  navn VARCHAR(100) NOT NULL,
  adresse VARCHAR(200) NOT NULL,
  postnummer INT(4) NOT NULL,
  _by VARCHAR(100) NOT NULL,
  telefonnummer INT(20) NOT NULL,
  password VARCHAR(100) NOT NULL,
  PRIMARY KEY (kundenummer)
);

CREATE TABLE user_privat(
kundenummer BIGINT unsigned,
id_user BIGINT NOT NULL,
PRIMARY KEY (kundenummer),
foreign key(id_user) references user_table(id_user)
);

CREATE TABLE user_erhverv(
kundenummer BIGINT unsigned,
cvr bigint(100),
id_user BIGINT NOT NULL,
PRIMARY KEY (kundenummer),
foreign key(id_user) references user_table(id_user)
);


CREATE TABLE ordre(
ordrenummer BIGINT,
dato DATETIME NOT NULL,
betalt FLOAT NOT NULL,
id_user BIGINT NOT NULL,
PRIMARY KEY (ordrenummer),
foreign key(id_user) references user_table(id_user)
);

CREATE TABLE varegruppe(
varegruppenummer BIGINT,
beskrivelse VARCHAR(300),
PRIMARY KEY (varegruppenummer)
);

CREATE TABLE vare(
varenummer BIGINT,
prisenhed FLOAT NOT NULL,
beskrivelse VARCHAR(500) NOT NULL,
enhedsbetegnelse VARCHAR(5) NOT NULL,
indkøbspris FLOAT NOT NULL,
billede blob NOT NULL,
EAN INT NOT NULL,
varegruppenummer BIGINT,
PRIMARY KEY (varenummer),
foreign key(varegruppenummer) references varegruppe(varegruppenummer)
);

CREATE TABLE ordrelinje(
id BIGINT auto_increment,
antal INT NOT NULL,
varenummer BIGINT,
ordrenummer BIGINT,
PRIMARY KEY (id),
foreign key(varenummer) references vare(varenummer),
foreign key(ordrenummer) references ordre(ordrenummer)
);

CREATE TABLE varehus(
id_varehus BIGINT,
navn VARCHAR(300) NOT NULL,
adresse VARCHAR(300) NOT NULL,
PRIMARY KEY (id_varehus)
);

CREATE TABLE lagerbeholdning(
id BIGINT auto_increment,
id_varehus INT NOT NULL,
varenummer BIGINT NOT NULL,
PRIMARY KEY (id),
foreign key(id_varehus) references varehus(id_varehus),
foreign key(varenummer) references vare(varenummer)
);

CREATE TABLE varehuslokation(
id_varehuslokation BIGINT AUTO_INCREMENT,
gang VARCHAR(300) NOT NULL,
id_varehus INT NOT NULL,
PRIMARY KEY (id_varehuslokation),
foreign key(id_varehus) references varehus(id_varehus)
);

CREATE TABLE lokation(
id_lokation BIGINT AUTO_INCREMENT,
lokationsnummer VARCHAR(300) NOT NULL,
sekvensnummer VARCHAR(300) NOT NULL,
varenummer BIGINT NOT NULL,
id_varehuslokation INT NOT NULL,
PRIMARY KEY (id_lokation),
foreign key(varenummer) references vare(varenummer),
foreign key(id_varehuslokation) references varehuslokation(id_varehuslokation)
);

CREATE TABLE varerelation(
id_varerelation BIGINT AUTO_INCREMENT,
varenummer BIGINT NOT NULL,
varegruppenummer BIGINT,
PRIMARY KEY (id_varerelation),
foreign key(varenummer) references vare(varenummer),
foreign key(varegruppenummer) references varegruppe(varegruppenummer)
);









