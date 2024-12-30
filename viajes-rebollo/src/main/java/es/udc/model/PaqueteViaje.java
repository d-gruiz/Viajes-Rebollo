package es.udc.model;

import java.util.ArrayList;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "PAQUETE_VIAJE")
public class PaqueteViaje {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String transporte;

    @Column
    private String alojamiento;
    
    @Column
    private ArrayList<String> actividades;

    @Column(nullable = false)
    private float precio;

    @Column(nullable = false)
    private Boolean esModificable;
}
