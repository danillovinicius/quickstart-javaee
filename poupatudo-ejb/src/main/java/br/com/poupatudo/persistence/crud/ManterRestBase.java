package br.com.poupatudo.persistence.crud;

/**
 * Created by dvlima on 11/3/15.
 */
import br.com.poupatudo.persistence.pager.Pager;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;

@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
public abstract class ManterRestBase<T, K> extends RestBase {

    @GET
    @Path("/{id}")
    public T obter(@PathParam("id") K id) {
        return this.getService().obter(id);
    }

    @GET
    public Collection<T> listar() {
        return this.getService().listar();
    }

    @GET
    @Path("/pager/{page}/of/{perPage}")
    public Pager<T> pager(@PathParam("page") Integer page, @PathParam("perPage") Integer perPage) {
        return this.getService().listarPaginado(page, perPage);
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public T incluir(T t) {
        return this.getService().incluir(t);
    }

    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public T atualizar(T t) {
        return this.getService().alterar(t);
    }

    @DELETE
    @Path("/{id}")
    public void remover(@PathParam("id") K id) {
        this.getService().excluir(id);
    }

    public abstract ManterService<T, K> getService();

}
