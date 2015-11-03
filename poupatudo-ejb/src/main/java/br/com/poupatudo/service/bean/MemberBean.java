package br.com.poupatudo.service.bean;

/**
 * Created by dvlima on 11/3/15.
 */
import br.com.poupatudo.dao.MemberDAO;
import br.com.poupatudo.model.Member;
import br.com.poupatudo.persistence.DAOManterPaginado;
import br.com.poupatudo.persistence.crud.ManterBean;
import br.com.poupatudo.service.MemberService;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;

@Stateless
@LocalBean
@TransactionManagement(TransactionManagementType.CONTAINER)
public class MemberBean extends ManterBean<Member, Long> implements MemberService {

    @Inject
    private MemberDAO dao;

    @Override
    public DAOManterPaginado<Member, Long> getDAO() {
        return dao;
    }
}
