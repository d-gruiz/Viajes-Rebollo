package es.udc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import es.udc.model.PaqueteViaje;

public interface PaqueteViajeRepository extends JpaRepository<PaqueteViaje, Long> {
    
}
