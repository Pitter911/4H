package com.example.apiEscolares.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.apiEscolares.model.Herramientas;

public interface HerramientasRepository extends JpaRepository<Herramientas, Integer> {
    List<Herramientas> findByCategoria(String categoria);
}