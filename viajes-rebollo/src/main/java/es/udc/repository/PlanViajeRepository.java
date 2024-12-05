package es.udc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import es.udc.model.PlanViaje;

public interface PlanViajeRepository extends JpaRepository<PlanViaje, Long> {
    
}
