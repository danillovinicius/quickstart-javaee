package br.com.poupatudo.persistence;

/**
 * Created by dvlima on 11/3/15.
 */
import java.util.Collection;

public interface DAOManter<T, K> {

    T obter(K chave);

    T primeiro();

    T incluir(T entidade);

    T atualizar(T entidade);

    T reatachar(T entidade);

    void atualizar(Collection<T> lista);

    void incluir(Collection<T> lista);

    void excluir(K chave);

    void excluir(Collection<T> lista);

    Collection<T> listar();

    boolean isVazio();
}
