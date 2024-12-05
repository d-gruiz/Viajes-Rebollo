package es.udc.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.udc.model.PaqueteViaje;
import es.udc.service.PaqueteViajeService;

@RestController
@RequestMapping("/api/paquete-viaje")
public class PaqueteViajeController {
    
    @Autowired
    private PaqueteViajeService paqueteViajeService;

    @PostMapping
    public ResponseEntity<PaqueteViaje> createPaqueteViaje(@RequestBody PaqueteViaje paqueteViaje) {
        PaqueteViaje savedPaqueteViaje = paqueteViajeService.savePaqueteViaje(paqueteViaje);
        return ResponseEntity.ok(savedPaqueteViaje);
    }

    @GetMapping
    public ResponseEntity<List<PaqueteViaje>> getAllPaqueteViajes() {
        List<PaqueteViaje> paqueteViajes = paqueteViajeService.getAllPaqueteViajes();
        return ResponseEntity.ok(paqueteViajes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaqueteViaje> getPaqueteViajeById(@PathVariable Long id) {
        Optional<PaqueteViaje> paqueteViaje = paqueteViajeService.getPaqueteViajeById(id);
        return paqueteViaje.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaqueteViaje> updatePaqueteViaje(@PathVariable Long id, @RequestBody PaqueteViaje paqueteViajeDetails) {
        Optional<PaqueteViaje> updatedPaqueteViaje = paqueteViajeService.updatePaqueteViaje(id, paqueteViajeDetails);
        return updatedPaqueteViaje.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaqueteViaje(@PathVariable Long id) {
        boolean deleted = paqueteViajeService.deletePaqueteViaje(id);
        return deleted ? ResponseEntity.noContent().build()
                       : ResponseEntity.notFound().build();
    }

}
