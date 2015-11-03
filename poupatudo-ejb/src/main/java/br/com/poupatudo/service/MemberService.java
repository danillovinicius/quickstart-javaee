package br.com.poupatudo.service;

import br.com.poupatudo.model.Member;
import br.com.poupatudo.persistence.crud.ManterService;
//
//import javax.ejb.Stateless;
//import javax.inject.Inject;
//import javax.persistence.EntityManager;

/**
 * Created by dvlima on 11/3/15.
 */
import javax.ejb.Local;

@Local
public interface MemberService extends ManterService<Member, Long> {

//    @Inject
//    private EntityManager em;
//
//    public void register(Member member) throws Exception {
//        em.persist(member);
//    }


}
