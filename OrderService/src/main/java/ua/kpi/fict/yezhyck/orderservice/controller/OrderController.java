package ua.kpi.fict.yezhyck.orderservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.kpi.fict.yezhyck.orderservice.dto.OrderDto;
import ua.kpi.fict.yezhyck.orderservice.service.OrderServiceImpl;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderServiceImpl orderService;

    @Autowired
    public OrderController(OrderServiceImpl orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public @ResponseBody ResponseEntity<OrderDto> create(@RequestBody OrderDto orderDto) {
        return new ResponseEntity<>(orderService.add(orderDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity<OrderDto> readById(@PathVariable("id") Long id) {
        return orderService.getById(id)
                .map(orderDto -> new ResponseEntity<>(orderDto, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/healthz")
    public @ResponseBody ResponseEntity<OrderDto> checkHealth() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public @ResponseBody ResponseEntity<List<OrderDto>> readAllByUserUUID(@RequestParam("userUUID") UUID userUUID) {
        return new ResponseEntity<>(orderService.getAllByUserUUID(userUUID), HttpStatus.OK);
    }

    @GetMapping("/healthz")
    public @ResponseBody ResponseEntity<?> checkHealth() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public @ResponseBody ResponseEntity<OrderDto> updateById(@PathVariable("id") Long id, @RequestBody OrderDto orderDto) {
        return Boolean.TRUE.equals(orderService.isExistedById(id)) ?
                new ResponseEntity<>(orderService.updateById(id, orderDto), HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
        if (Boolean.FALSE.equals(orderService.isExistedById(id))) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        orderService.removeById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
