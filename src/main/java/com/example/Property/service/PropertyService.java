package com.example.Property.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Property.model.Property;
import com.example.Property.repository.PropertyRepository;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository Pr;

    public String saveProperty(Property property) {
        Pr.save(property);
        return "Property saved successfully";
    }

    public Property getPropertyById(Long id) {
        return Pr.findById(id).orElse(null);
    }
    
    public List<Property> getPropertiesByUserId(Long userId) {
        return Pr.findByUserId(userId);
    }
}
