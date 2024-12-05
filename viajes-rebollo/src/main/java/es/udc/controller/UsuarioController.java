package es.udc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import es.udc.model.Usuario;
import es.udc.service.UsuarioService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> createUser(@RequestBody Usuario usuario) {
        Usuario savedUser = usuarioService.saveUser(usuario);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsers() {
        List<Usuario> users = usuarioService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUserById(@PathVariable Long id) {
        Optional<Usuario> user = usuarioService.getUserById(id);
        return user.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUser(@PathVariable Long id, @RequestBody Usuario userDetails) {
        Optional<Usuario> updatedUser = usuarioService.updateUser(id, userDetails);
        return updatedUser.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        boolean deleted = usuarioService.deleteUser(id);
        return deleted ? ResponseEntity.noContent().build()
                       : ResponseEntity.notFound().build();
    }
}
