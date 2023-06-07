package ua.kpi.fict.yezhyck.orderservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Getter
@Setter
@ToString
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @SequenceGenerator(name = "orders_id_sequence", sequenceName = "orders_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "orders_id_sequence")
    private Long id;

    @Column(name = "uuid_user", nullable = false)
    private UUID userUUID;

    @Column(name = "id_book", nullable = false)
    private Long bookId;
}
