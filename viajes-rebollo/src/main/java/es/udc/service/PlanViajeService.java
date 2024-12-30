package es.udc.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.udc.model.PlanViaje;
import es.udc.model.Usuario;
import es.udc.repository.PlanViajeRepository;
import es.udc.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class PlanViajeService {
    
    @Autowired
    private PlanViajeRepository planViajeRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public PlanViaje savePlanViaje(String nombre, float precio, String alojamiento, String transporte, 
        List<String> actividades, Long compradorId, List<Long> viajerosIds, LocalDate fechaInicio, LocalDate fechaFin) {

        PlanViaje planViaje = new PlanViaje();
        
        // Buscar comprador
        Usuario comprador = usuarioRepository.findById(compradorId)
            .orElseThrow(() -> new EntityNotFoundException("Comprador con ID " + compradorId + " no encontrado"));

        // Buscar viajeros
        List<Usuario> viajeros = usuarioRepository.findAllById(viajerosIds);
        if (viajeros.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron viajeros para los IDs proporcionados");
        }

        // Configuración del Plan de Viaje
        planViaje.setNombre(nombre);
        planViaje.setPrecio(precio);
        planViaje.setTransporte(transporte);
        planViaje.setAlojamiento(alojamiento);
        planViaje.setActividades(actividades);
        planViaje.setComprador(comprador);
        planViaje.setViajeros(viajeros);
        planViaje.setFechaInicio(fechaInicio); // Añadir fecha de inicio
        planViaje.setFechaFin(fechaFin); // Añadir fecha de fin

        return planViajeRepository.save(planViaje);
    }

    public List<PlanViaje> getAllPlanViajes() {
        return planViajeRepository.findAll();
    }

    public Optional<PlanViaje> getPlanViajeById(Long id) {
        return planViajeRepository.findById(id);
    }

    public Optional<PlanViaje> updatePlanViaje(Long id, PlanViaje planViajeDetails) {
        return planViajeRepository.findById(id).map(planViaje -> {
            planViaje.setNombre(planViajeDetails.getNombre());
            planViaje.setPrecio(planViajeDetails.getPrecio());
            planViaje.setAlojamiento(planViajeDetails.getAlojamiento());
            planViaje.setTransporte(planViajeDetails.getTransporte());
            planViaje.setActividades(planViajeDetails.getActividades());
            planViaje.setFechaInicio(planViajeDetails.getFechaInicio());  // Actualizar fecha de inicio
            planViaje.setFechaFin(planViajeDetails.getFechaFin());  // Actualizar fecha de fin
    
            return planViajeRepository.save(planViaje);
        });
    }
    

    public boolean deletePlanViaje(Long id) {
        if (planViajeRepository.existsById(id)) {
            planViajeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

