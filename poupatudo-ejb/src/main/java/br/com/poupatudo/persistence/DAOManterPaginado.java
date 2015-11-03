package br.com.poupatudo.persistence;

import br.com.poupatudo.persistence.filter.Filter;
import br.com.poupatudo.persistence.pager.Pager;

import javax.persistence.Query;

/**
 * Created by dvlima on 11/3/15.
 */
public interface DAOManterPaginado<T, K> extends DAOManter<T, K> {

    Pager<T> listarPaginado(Integer page, Integer perPage);

    Pager<T> listarPaginado(Integer page, Integer perPage, Query query, Query queryCount);

    Pager<T> filtrar(Integer page, Integer perPage, Filter<T> filtro);

}
