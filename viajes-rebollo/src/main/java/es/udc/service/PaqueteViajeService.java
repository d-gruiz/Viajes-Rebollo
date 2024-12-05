package es.udc.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.udc.model.PaqueteViaje;
import es.udc.repository.PaqueteViajeRepository;

@Service
public class PaqueteViajeService {

    @Autowired
    private PaqueteViajeRepository paqueteViajeRepository;

        public PaqueteViaje savePaqueteViaje(PaqueteViaje paqueteViaje) {
        return paqueteViajeRepository.save(paqueteViaje);
    }

    public List<PaqueteViaje> getAllPaqueteViajes() {
        return paqueteViajeRepository.findAll();
    }

    public Optional<PaqueteViaje> getPaqueteViajeById(Long id) {
        return paqueteViajeRepository.findById(id);
    }

    public Optional<PaqueteViaje> updatePaqueteViaje(Long id, PaqueteViaje paqueteViajeDetails) {
        return paqueteViajeRepository.findById(id).map(paqueteViaje -> {
            paqueteViaje.setNombre(paqueteViajeDetails.getNombre());
            paqueteViaje.setAlojamiento(paqueteViajeDetails.getAlojamiento());
            paqueteViaje.setActividades(paqueteViajeDetails.getActividades());
            paqueteViaje.setEsModificable(paqueteViajeDetails.getEsModificable());
            paqueteViaje.setPrecio(paqueteViajeDetails.getPrecio());
            paqueteViaje.setTrasporte(paqueteViajeDetails.getTrasporte());
            return paqueteViajeRepository.save(paqueteViaje);
        });
    }

    public boolean deletePaqueteViaje(Long id) {
        if (paqueteViajeRepository.existsById(id)) {
            paqueteViajeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
