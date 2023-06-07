package ua.kpi.fict.yezhyck.orderservice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ua.kpi.fict.yezhyck.orderservice.dto.OrderDto;
import ua.kpi.fict.yezhyck.orderservice.model.Order;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    OrderDto mapToDto(Order model);

    Order mapToModel(OrderDto dto);

    List<OrderDto> mapAllToDtoList(List<Order> model);

    List<Order> mapAllToModelList(List<OrderDto> dto);
}
