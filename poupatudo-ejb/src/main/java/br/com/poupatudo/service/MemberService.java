package br.com.poupatudo.service;

import br.com.poupatudo.model.Member;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;

/**
 * Created by dvlima on 11/3/15.
 */
@Stateless
public class MemberService {

    @Inject
    private EntityManager em;

    public void register(Member member) throws Exception {
        em.persist(member);
    }


}
