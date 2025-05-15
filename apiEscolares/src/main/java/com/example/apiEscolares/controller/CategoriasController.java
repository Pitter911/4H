package com.example.apiEscolares.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.apiEscolares.model.Categorias;
import com.example.apiEscolares.repository.CategoriasRepository;

@RestController
@RequestMapping("/api/categorias")
public class CategoriasController {

    @Autowired
    private CategoriasRepository categoriasRepository;

    @GetMapping
    public List<Categorias> getAllCategorias() {
        return categoriasRepository.findAll();
    }

    // Método para obtener una categoría por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Categorias> getCategoriaById(@PathVariable Integer id) {
        Optional<Categorias> categoria = categoriasRepository.findById(id);
        return categoria.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Método para crear una nueva categoría
    @PostMapping
    public Categorias createCategoria(@RequestBody Categorias categoria) {
        return categoriasRepository.save(categoria);
    }

    // Método para actualizar una categoría existente
    @PutMapping("/{id}")
    public ResponseEntity<Categorias> updateCategoria(@PathVariable Integer id,
            @RequestBody Categorias updatedData) {
        Optional<Categorias> categoriaOpt = categoriasRepository.findById(id);
        if (categoriaOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        // Actualiza solo el nombre de la categoría
        Categorias categoria = categoriaOpt.get();
        categoria.setNombre(updatedData.getNombre());

        return ResponseEntity.ok(categoriasRepository.save(categoria));
    }

    // Aquí puedes agregar otros métodos como deleteCategoria, etc.
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Integer id) {
        if (!categoriasRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        categoriasRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}