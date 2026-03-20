package com.daw.alquiler.services;

import com.daw.alquiler.persistence.entities.Propiedad;
import com.daw.alquiler.persistence.repositories.PropiedadRepository;
import com.daw.alquiler.services.exceptions.PropiedadNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropiedadService {

    @Autowired
    private PropiedadRepository propiedadRepository;

    public List<Propiedad> findAll() {
        return propiedadRepository.findAll();
    }

    public Propiedad findById(int id) {
        return propiedadRepository.findById(id)
                .orElseThrow(() -> new PropiedadNotFoundException("No se encontró la propiedad con ID: " + id));
    }
    
    public List<Propiedad> findByPropietario(int propietarioId) {
        return propiedadRepository.findByPropietarioId(propietarioId);
    }
    
    public List<Propiedad> buscarPropiedades(String terminoBusqueda) {
        // Le pasamos el mismo término a ambos campos para que busque en título o dirección
        return propiedadRepository.findByDireccionContainingIgnoreCaseOrTituloContainingIgnoreCase(terminoBusqueda, terminoBusqueda);
    }

    public Propiedad save(Propiedad propiedad) {
        return propiedadRepository.save(propiedad);
    }

    public Propiedad update(int id, Propiedad detalles) {
        Propiedad propiedad = this.findById(id);
        
        propiedad.setTitulo(detalles.getTitulo());
        propiedad.setDescripcion(detalles.getDescripcion());
        propiedad.setDireccion(detalles.getDireccion());
        propiedad.setPrecio_noche(detalles.getPrecio_noche());
        propiedad.setMax_huespedes(detalles.getMax_huespedes());
        propiedad.setCalendario(detalles.getCalendario());
        
        return propiedadRepository.save(propiedad);
    }

    public void deleteById(int id) {
        if (!propiedadRepository.existsById(id)) {
            throw new PropiedadNotFoundException("No se puede eliminar. Propiedad no encontrada con ID: " + id);
        }
        propiedadRepository.deleteById(id);
    }
}