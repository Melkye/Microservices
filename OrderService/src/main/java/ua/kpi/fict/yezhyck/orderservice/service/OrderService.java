package ua.kpi.fict.yezhyck.orderservice.service;

import ua.kpi.fict.yezhyck.orderservice.dto.OrderDto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderService {

    OrderDto add(OrderDto orderDto);

    Optional<OrderDto> getById(Long id);

    List<OrderDto> getAll();

    List<OrderDto> getAllByUserUUID(UUID userUUID);

    List<OrderDto> getAllByBookId(Long bookId);

    OrderDto updateById(Long id, OrderDto orderDto);

    void removeById(Long id);

    Boolean isExistedById(Long id);
}
