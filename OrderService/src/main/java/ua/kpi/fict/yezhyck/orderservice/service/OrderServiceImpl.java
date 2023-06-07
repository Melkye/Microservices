package ua.kpi.fict.yezhyck.orderservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.kpi.fict.yezhyck.orderservice.dto.OrderDto;
import ua.kpi.fict.yezhyck.orderservice.mapper.OrderMapper;
import ua.kpi.fict.yezhyck.orderservice.repository.OrderRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
    }

    @Override
    public OrderDto add(OrderDto orderDto) {
        return orderMapper.mapToDto(orderRepository.save(orderMapper.mapToModel(orderDto)));
    }

    @Override
    public Optional<OrderDto> getById(Long id) {
        return orderRepository.findById(id).map(orderMapper::mapToDto);
    }

    @Override
    public List<OrderDto> getAll() {
        return orderMapper.mapAllToDtoList(orderRepository.findAll());
    }

    @Override
    public List<OrderDto> getAllByUserUUID(UUID userUUID) {
        return orderMapper.mapAllToDtoList(orderRepository.findAllByUserUUID(userUUID));
    }

    @Override
    public List<OrderDto> getAllByBookId(Long bookId) {
        return orderMapper.mapAllToDtoList(orderRepository.findAllByBookId(bookId));
    }

    @Override
    public OrderDto updateById(Long id, OrderDto orderDto) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setUserUUID(orderDto.getUserUUID());
                    order.setBookId(orderDto.getBookId());

                    return orderMapper.mapToDto(orderRepository.save(order));
                })
                .orElse(null);
    }

    @Override
    public void removeById(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public Boolean isExistedById(Long id) {
        return orderRepository.existsById(id);
    }
}
