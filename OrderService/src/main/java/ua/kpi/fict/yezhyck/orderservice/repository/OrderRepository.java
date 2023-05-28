package ua.kpi.fict.yezhyck.orderservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.kpi.fict.yezhyck.orderservice.model.Order;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByUserUUID(UUID userUUID);

    List<Order> findAllByBookId(Long bookId);
}
