package es.udc.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.udc.model.Usuario;
import es.udc.repository.UsuarioRepository;

@Service
public class UsuarioService {  
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario saveUser(Usuario user) {
        return usuarioRepository.save(user);
    }

    public List<Usuario> getAllUsers() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUserById(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> updateUser(Long id, Usuario userDetails) {
        return usuarioRepository.findById(id).map(user -> {
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            user.setTelefono(userDetails.getTelefono());
            user.setPlanViajes(userDetails.getPlanViajes());
            return usuarioRepository.save(user);
        });
    }

    public boolean deleteUser(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
