package com.example.apiEscolares.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.apiEscolares.model.Categorias;

public interface CategoriasRepository  extends JpaRepository<Categorias, Integer> {
}
