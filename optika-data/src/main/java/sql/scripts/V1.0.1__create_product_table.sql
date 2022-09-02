CREATE TABLE product
(
    id INT(11) NOT NULL AUTO_INCREMENT,
    code VARCHAR(64) NOT NULL,
    brand VARCHAR(64) NOT NULL,
    price DECIMAL NOT NULL,
    type VARCHAR(45) DEFAULT NULL,
    category VARCHAR(45) DEFAULT NULL,
    image LONGBLOB DEFAULT NULL,
    imagename VARCHAR(64) DEFAULT NULL,
    description VARCHAR(255) NULL,
    instock SMALLINT NOT NULL DEFAULT '1',
    polarized SMALLINT NOT NULL DEFAULT '0',
    photogray SMALLINT NOT NULL DEFAULT '0',
    hotdeal SMALLINT NOT NULL DEFAULT '0',
    deleted SMALLINT NOT NULL DEFAULT '0',
    PRIMARY KEY (id)
) ENGINE = InnoDB;
