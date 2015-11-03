package br.com.poupatudo.util;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Created by dvlima on 11/3/15.
 */
@ApplicationScoped
public class Resources {

    @Produces
    @PersistenceContext(unitName = "poupatudo")
    EntityManager entityManager;
}
