CREATE TABLE customercontact
(
    id INT(11) NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    email VARCHAR(64),
    phone VARCHAR(64),
    message VARCHAR(255),
    timestamp DATETIME,
    deleted SMALLINT NOT NULL DEFAULT '0',
    PRIMARY KEY (id)
) ENGINE = InnoDB;