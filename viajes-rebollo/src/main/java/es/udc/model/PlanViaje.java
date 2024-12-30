package es.udc.model;

import java.time.LocalDate;  // Importar LocalDate
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "PLAN_VIAJE")
public class PlanViaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String nombre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comprador_id", nullable = false)
    private Usuario comprador;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "PLAN_VIAJE_VIAJEROS",
        joinColumns = @JoinColumn(name = "plan_viaje_id"),
        inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private List<Usuario> viajeros;

    @Column(nullable = false)
    private float precio;

    @Column(nullable = false)
    private String alojamiento;
    
    @Column(nullable = false)
    private String transporte;    

    @Column(name = "actividad")
    private List<String> actividades;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;
}


