package org.graduation.data.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "archive")
public class Archive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "productid")
    private Long productId;

    @Column(name = "productcode")
    private String productCode;

    private BigDecimal price;

    @Column(name = "archiveddatetime")
    private LocalDateTime archivedDateTime;

    private String remarks;

    @Column(name = "hotdeal")
    private boolean hotDeal;

    private boolean deleted;

}
