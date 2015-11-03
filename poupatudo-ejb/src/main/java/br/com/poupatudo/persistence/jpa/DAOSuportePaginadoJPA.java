package br.com.poupatudo.persistence.jpa;

import br.com.poupatudo.persistence.DAOManterPaginado;
import br.com.poupatudo.persistence.filter.Filter;
import br.com.poupatudo.persistence.pager.Pager;
import br.com.poupatudo.persistence.pager.PagerHelper;

import javax.persistence.Query;

/**
 * Created by dvlima on 11/3/15.
 */
@SuppressWarnings("unchecked")
public abstract class DAOSuportePaginadoJPA<T, K> extends DAOSuporteJPA<T, K>
        implements DAOManterPaginado<T, K> {

    @Override
    public Pager<T> listarPaginado(Integer page, Integer perPage) {
        String sql = listarJPAQL();

        Query query = toQuery(sql);
        Query queryCount = toCountQuery("select count(e) from " + getEntityClass().getName() + " e ");

        return paginar(page, perPage, query, queryCount);
    }

    @Override
    public Pager<T> listarPaginado(Integer page, Integer perPage, Query query, Query queryCount) {
        return paginar(page, perPage, query, queryCount);
    }

    public Pager<T> filtrar(Integer page, Integer perPage, Filter<T> filtro) {
        filtro.setEntityManager(super.persistencia);
        return new PagerHelper(page, perPage).query(filtro);
    }

    private Pager<T> paginar(Integer page, Integer perPage, Query query,
                             Query queryCount) {

        PagerHelper pagerHelper = new PagerHelper(page, perPage);
        Pager<T> ret = pagerHelper.query(query, queryCount);

        return ret;
    }

    private Query toCountQuery(String sql) {
        return persistencia.createQuery(sql);
    }

    private Query toQuery(String sql) {
        Query query = persistencia.createQuery(sql);
        return query;
    }

}