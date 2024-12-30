package es.udc.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/plan-viaje")
public class PlanViajeController {

    @Autowired
    private PlanViajeService planViajeService;

    @PostMapping
    public ResponseEntity<PlanViajeRequestDTO> createPlanViaje(@RequestBody PlanViajeRequestDTO dto) {
        // Modificar para incluir las fechas de inicio y fin
        PlanViaje planViaje = planViajeService.savePlanViaje(
            dto.getNombre(), 
            dto.getPrecio(),
            dto.getAlojamiento(), 
            dto.getTransporte(), 
            dto.getActividades(), 
            dto.getCompradorId(), 
            dto.getViajerosId(),
            dto.getFechaInicio(),   // Nuevo campo
            dto.getFechaFin()       // Nuevo campo
        );
        
        // Asignamos el id al DTO para la respuesta
        dto.setId(planViaje.getId());
        
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<PlanViajeRequestDTO>> getAllPlanViajes() {
        List<PlanViaje> planViajes = planViajeService.getAllPlanViajes();
        
        List<PlanViajeRequestDTO> listDto = planViajes.stream().map(planViaje -> {
            PlanViajeRequestDTO dto = new PlanViajeRequestDTO();

            dto.setId(planViaje.getId());
            dto.setNombre(planViaje.getNombre());
            dto.setPrecio(planViaje.getPrecio());
            dto.setActividades(planViaje.getActividades());
            dto.setCompradorId(planViaje.getComprador().getId());
            dto.setAlojamiento(planViaje.getAlojamiento());
            dto.setTransporte(planViaje.getTransporte());
            dto.setFechaInicio(planViaje.getFechaInicio());   // Agregamos fechaInicio
            dto.setFechaFin(planViaje.getFechaFin());         // Agregamos fechaFin
            
            List<Long> viajerosIds = planViaje.getViajeros().stream()
                                            .map(viajero -> viajero.getId())
                                            .collect(Collectors.toList());
            dto.setViajerosId(viajerosIds);

            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(listDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanViaje> getPlanViajeById(@PathVariable Long id) {
        Optional<PlanViaje> planViaje = planViajeService.getPlanViajeById(id);
        return planViaje.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanViajeRequestDTO> updatePlanViaje(@PathVariable Long id, @RequestBody PlanViajeRequestDTO dto) {
        // Creamos el objeto PlanViaje y asignamos los valores del DTO
        PlanViaje planViaje = new PlanViaje();
        
        // Asignamos los valores al planViaje, incluyendo las fechas
        planViaje.setNombre(dto.getNombre());
        planViaje.setPrecio(dto.getPrecio());
        planViaje.setAlojamiento(dto.getAlojamiento());
        planViaje.setTransporte(dto.getTransporte());
        planViaje.setActividades(dto.getActividades());
        planViaje.setFechaInicio(dto.getFechaInicio());   // Asignar fechaInicio
        planViaje.setFechaFin(dto.getFechaFin());         // Asignar fechaFin
    
        dto.setId(id);
    
        // Llamamos al servicio para actualizar el PlanViaje
        planViajeService.updatePlanViaje(id, planViaje);
        
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlanViaje(@PathVariable Long id) {
        boolean deleted = planViajeService.deletePlanViaje(id);
        return deleted ? ResponseEntity.noContent().build()
                       : ResponseEntity.notFound().build();
    }
}
