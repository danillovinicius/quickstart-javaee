package br.com.poupatudo.persistence.crud;

/**
 * Created by dvlima on 11/3/15.
 */
import br.com.poupatudo.persistence.filter.Filter;
import br.com.poupatudo.persistence.pager.Pager;

import java.util.Collection;

public interface ManterService<T, K> {

    T obter(K codigo);

    T incluir(T entidade);

    T alterar(T entidade);

    void excluir(K codigo);

    Collection<T> listar();

    Pager<T> listarPaginado(Integer page, Integer perPage);

    Pager<T> filtrar(Integer page, Integer perPage, Filter<T> filtro);

}
