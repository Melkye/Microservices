package ua.kpi.fict.yezhyck.orderservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Getter
@Setter
@ToString
public class OrderDto {

    @NotNull
    private Long id;

    @NotNull
    private UUID userUUID;

    @NotNull
    private Long bookId;
}
