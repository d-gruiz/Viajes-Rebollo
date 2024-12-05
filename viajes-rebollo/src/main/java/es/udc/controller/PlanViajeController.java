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

import es.udc.model.PlanViaje;
import es.udc.service.PlanViajeService;

@RestController
@RequestMapping("api/plan-viaje")
public class PlanViajeController {
    
    @Autowired
    private PlanViajeService planViajeService;

    @PostMapping
    public ResponseEntity<PlanViaje> createPlanViaje(@RequestBody PlanViaje planViaje) {
        PlanViaje savedplanViaje = planViajeService.savePlanViaje(planViaje);
        return ResponseEntity.ok(savedplanViaje);
    }

    @GetMapping
    public ResponseEntity<List<PlanViaje>> getAllPlanViajes() {
        List<PlanViaje> planViajes = planViajeService.getAllPlanViajes();
        return ResponseEntity.ok(planViajes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanViaje> getPlanViajeById(@PathVariable Long id) {
        Optional<PlanViaje> planViaje = planViajeService.getPlanViajeById(id);
        return planViaje.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanViaje> updatePlanViaje(@PathVariable Long id, @RequestBody PlanViaje planViajeDetails) {
        Optional<PlanViaje> updatedPlanViaje = planViajeService.updatePlanViaje(id, planViajeDetails);
        return updatedPlanViaje.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlanViaje(@PathVariable Long id) {
        boolean deleted = planViajeService.deletePlanViaje(id);
        return deleted ? ResponseEntity.noContent().build()
                       : ResponseEntity.notFound().build();
    }
}
