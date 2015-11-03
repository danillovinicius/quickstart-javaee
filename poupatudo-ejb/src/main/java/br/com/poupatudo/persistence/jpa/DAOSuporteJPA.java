package br.com.poupatudo.persistence.jpa;

/**
 * Created by dvlima on 11/3/15.
 */
import br.com.poupatudo.persistence.DAOManter;
import br.com.poupatudo.persistence.DefaultOrder;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Collection;
import java.util.Iterator;

public abstract class DAOSuporteJPA<T, K> implements DAOManter<T, K> {

    @Inject
    protected EntityManager persistencia;

    protected Class<T> entityClass;

    @Override
    public T obter(K chave) {
        return persistencia.find(getEntityClass(), chave);
    }

    @Override
    public T incluir(T entidade) {
        persistencia.persist(entidade);

        return entidade;
    }

    @Override
    public void incluir(Collection<T> lista) {
        for (T entidade : lista) {
            incluir(entidade);
        }
    }

    @Override
    public T atualizar(T entidade) {
        T ret = persistencia.merge(entidade);
        this.persistencia.flush();
        return ret;
    }

    @Override
    public void atualizar(Collection<T> lista) {
        for (T entidade : lista) {
            atualizar(entidade);
        }
    }

    @Override
    public T reatachar(T entidade) {
        return persistencia.merge(entidade);
    }

    @Override
    public void excluir(K chave) {
        T entidade = obter(chave);

        if (entidade != null) {
            persistencia.remove(entidade);
        }
    }

    public void excluir(Collection<T> lista) {
        for (T entidade : lista) {
            persistencia.remove(entidade);
        }
    }

    @SuppressWarnings("unchecked")
    @Override
    public Collection<T> listar() {
        String sql = listarJPAQL();

        return persistencia.createQuery(sql).getResultList();
    }

    @Override
    public T primeiro() {
        Iterator<T> it = listar().iterator();

        if (it.hasNext()) {
            return it.next();
        }

        return null;
    }

    protected String listarJPAQL() {
        StringBuilder queryBuilder = new StringBuilder("from " + getEntityClass().getSimpleName() + " e ");
        String sql = queryBuilder.toString();

        DefaultOrder order = getEntityClass().getAnnotation(DefaultOrder.class);
        if (order != null) {
            queryBuilder.append(" order by ");
            for (String column : order.columns()) {
                queryBuilder.append(column).append(", ");
            }

            sql = queryBuilder.substring(0, queryBuilder.length() - 2);
        }
        return sql;
    }

    @SuppressWarnings("unchecked")
    protected Class<T> getEntityClass() {
        if (entityClass == null) {
            Type type = getClass().getGenericSuperclass();
            if (type instanceof ParameterizedType) {
                ParameterizedType paramType = (ParameterizedType) type;
                entityClass = (Class<T>) paramType.getActualTypeArguments()[0];
            } else {
                throw new IllegalArgumentException("Erro ao tentar obter o tipo de classe da entidade");
            }
        }

        return entityClass;
    }

    @Override
    public boolean isVazio() {
        return listar().isEmpty();
    }

}
