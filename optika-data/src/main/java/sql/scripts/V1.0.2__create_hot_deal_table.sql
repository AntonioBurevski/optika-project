CREATE TABLE hotdeal
(
    id INT(11) NOT NULL AUTO_INCREMENT,
    productid INT(11) NOT NULL,
    productcode VARCHAR(64) NOT NULL,
    oldprice DECIMAL,
    newprice DECIMAL,
    fromdate DATE,
    todate DATE,
    active SMALLINT NOT NULL DEFAULT '1',
    deleted SMALLINT NOT NULL DEFAULT '0',
    PRIMARY KEY (id),
    CONSTRAINT fk_product_productid FOREIGN KEY (productid) REFERENCES product (id)
) ENGINE = InnoDB;
