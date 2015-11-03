package br.com.poupatudo.rest;

import br.com.poupatudo.model.Member;
import br.com.poupatudo.persistence.crud.ManterRestBase;
import br.com.poupatudo.persistence.crud.ManterService;
import br.com.poupatudo.service.MemberService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Path;

/**
 * Created by dvlima on 11/3/15.
 */
@RequestScoped
@Path("/member")
public class MemberRest extends ManterRestBase<Member, Long> {

    @Inject
    MemberService memberService;

    @Override
    public ManterService<Member, Long> getService() {
        return memberService;
    }

}
