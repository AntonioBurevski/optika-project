CREATE TABLE archive
(
    id INT(11) NOT NULL AUTO_INCREMENT,
    productid INT(11) NOT NULL,
    productcode VARCHAR(64) NOT NULL,
    price DECIMAL,
    archiveddatetime DATETIME,
    remarks VARCHAR(255),
    hotdeal SMALLINT NOT NULL DEFAULT '0',
    deleted SMALLINT NOT NULL DEFAULT '0',
    PRIMARY KEY (id),
    CONSTRAINT fk_archived_productid FOREIGN KEY (productid) REFERENCES product (id)
) ENGINE = InnoDB;