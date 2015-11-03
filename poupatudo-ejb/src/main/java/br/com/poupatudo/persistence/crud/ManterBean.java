package br.com.poupatudo.persistence.crud;

/**
 * Created by dvlima on 11/3/15.
 */
import br.com.poupatudo.persistence.DAOManterPaginado;
import br.com.poupatudo.persistence.filter.Filter;
import br.com.poupatudo.persistence.pager.Pager;

import java.util.Collection;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

public abstract class ManterBean<T, K> implements ManterService<T, K> {

    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
    @Override
    public T obter(K chave) {
        return getDAO().obter(chave);
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    @Override
    public T incluir(T entidade) {
        return getDAO().incluir(entidade);
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    @Override
    public T alterar(T entidade) {
        return getDAO().atualizar(entidade);
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    @Override
    public void excluir(K codigo) {
        getDAO().excluir(codigo);
    }

    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
    @Override
    public Collection<T> listar() {
        return getDAO().listar();
    }

    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
    @Override
    public Pager<T> listarPaginado(Integer page, Integer perPage) {
        return getDAO().listarPaginado(page, perPage);
    }

    @Override
    public Pager<T> filtrar(Integer page, Integer perPage, Filter<T> filtro) {
        return getDAO().filtrar(page, perPage, filtro);
    }

    public abstract DAOManterPaginado<T, K> getDAO();

}
