package br.com.poupatudo.dao.jpa;

import br.com.poupatudo.dao.MemberDAO;
import br.com.poupatudo.model.Member;
import br.com.poupatudo.persistence.jpa.DAOSuportePaginadoJPA;

import javax.inject.Named;

/**
 * Created by dvlima on 11/3/15.
 */
@Named
public class MemberJPA extends DAOSuportePaginadoJPA<Member, Long> implements MemberDAO {

}
