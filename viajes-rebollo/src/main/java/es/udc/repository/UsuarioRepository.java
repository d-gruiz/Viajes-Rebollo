package es.udc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import es.udc.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
}
