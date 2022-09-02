package org.graduation.data.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.graduation.data.model.enums.Category;
import org.graduation.data.model.enums.ProductType;
import org.graduation.data.util.Base64Serializer;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Blob;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    private String brand;

    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private ProductType type;

    @Enumerated(EnumType.STRING)
    private Category category;

    @JsonSerialize(using = Base64Serializer.class)
    private byte[] image;

    @Column(name = "imagename")
    private String imageName;

    @Column(name = "instock")
    private boolean inStock;

    private String description;

    private boolean polarized;

    @Column(name = "photogray")
    private boolean photoGray;

    @Column(name = "hotdeal")
    private boolean hotDeal;

    private boolean deleted;

}
