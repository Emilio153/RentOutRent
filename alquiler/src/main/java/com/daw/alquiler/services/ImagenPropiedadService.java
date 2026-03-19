package com.daw.alquiler.services;

import com.daw.alquiler.persistence.entities.ImagenPropiedad;
import com.daw.alquiler.persistence.repositories.ImagenPropiedadRepository;
import com.daw.alquiler.services.exceptions.ImagenPropiedadNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImagenPropiedadService {

    @Autowired
    private ImagenPropiedadRepository imagenRepository;

    public List<ImagenPropiedad> findAll() {
        return imagenRepository.findAll();
    }

    public ImagenPropiedad findById(int id) {
        return imagenRepository.findById(id)
                .orElseThrow(() -> new ImagenPropiedadNotFoundException("Imagen no encontrada con ID: " + id));
    }

    public ImagenPropiedad save(ImagenPropiedad imagen) {
        return imagenRepository.save(imagen);
    }

    public void deleteById(int id) {
        if (!imagenRepository.existsById(id)) {
            throw new ImagenPropiedadNotFoundException("No se puede eliminar. Imagen no encontrada");
        }
        imagenRepository.deleteById(id);
    }
}