package es.udc.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.udc.model.PlanViaje;
import es.udc.repository.PlanViajeRepository;

@Service
public class PlanViajeService {
    
    @Autowired
    private PlanViajeRepository planViajeRepository;

    public PlanViaje savePlanViaje(PlanViaje planViaje) {
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
            planViaje.setUser(planViajeDetails.getUser());
            planViaje.setViajeros(planViajeDetails.getViajeros());
            planViaje.setPrecio(planViajeDetails.getPrecio());
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
