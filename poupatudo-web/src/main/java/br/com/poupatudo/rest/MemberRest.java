package br.com.poupatudo.rest;

import br.com.poupatudo.model.Member;
import br.com.poupatudo.service.MemberService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * Created by dvlima on 11/3/15.
 */
@Path("/member")
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
public class MemberRest {

    @Inject
    MemberService memberService;

    @POST
    @Path("json")
    public void incluir(Member m) throws Exception{
        memberService.register(m);
    }

}
