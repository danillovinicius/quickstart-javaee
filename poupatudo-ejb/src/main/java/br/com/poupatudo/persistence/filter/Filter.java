package br.com.poupatudo.persistence.filter;

/**
 * Created by dvlima on 11/3/15.
 */
import javax.persistence.EntityManager;
import javax.persistence.Query;

public abstract class Filter<T> {

    protected EntityManager entityManager;

    public Filter(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public Filter() {
    }

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public abstract Query getQuery();

    public abstract Query getQueryCount();

    protected void gerarQuery() {
    }

    protected void adicionarRestricoes() {
    }

    protected void setParametros(Query query) {
    }

}