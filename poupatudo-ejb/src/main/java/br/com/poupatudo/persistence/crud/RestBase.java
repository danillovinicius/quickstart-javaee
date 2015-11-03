package br.com.poupatudo.persistence.crud;

/**
 * Created by dvlima on 11/3/15.
 */
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;

@Produces({MediaType.APPLICATION_JSON})
public abstract class RestBase {

    @Context
    private SecurityContext securityContext;

    protected SecurityContext getSecurityContext() {
        return securityContext;
    }
}