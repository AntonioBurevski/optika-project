package org.graduation.data.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name = "hotdeal")
public class HotDeal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "productid")
    private Long productId;

    @Column(name = "productcode")
    private String productCode;

    @Column(name = "oldprice")
    private BigDecimal oldPrice;

    @Column(name = "newprice")
    private BigDecimal newPrice;

    @Column(name = "fromdate")
    private LocalDate fromDate;

    @Column(name = "todate")
    private LocalDate toDate;

    private boolean active;

    private boolean deleted;

}
