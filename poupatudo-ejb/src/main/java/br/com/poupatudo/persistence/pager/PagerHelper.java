package br.com.poupatudo.persistence.pager;

import br.com.poupatudo.persistence.filter.Filter;

import java.util.List;
import javax.persistence.Query;

/**
 * Created by dvlima on 11/3/15.
 */
@SuppressWarnings({"rawtypes", "unchecked"})
public class PagerHelper {

    private Integer page;
    private Integer perPage;

    public PagerHelper(Integer page, Integer perPage) {
        this.page = page;
        this.perPage = perPage;
    }

    public Integer maxResults() {
        return perPage;
    }

    public Integer firstResult() {
        return (page - 1) * perPage;
    }

    public Pager query(Query query, Query totalQuery) {
        List<?> list = query.setMaxResults(maxResults()).setFirstResult(firstResult()).getResultList();
        Long total = (Long) totalQuery.getSingleResult();

        Pager pager = gerarPager(total, list);

        return pager;
    }

    public Pager query(Filter filter) {
        Long total = (Long) filter.getQueryCount().getSingleResult();

        List list = filter.getQuery().setMaxResults(maxResults()).setFirstResult(firstResult()).getResultList();

        Pager pager = gerarPager(total, list);

        return pager;
    }

    private Pager gerarPager(Long total, List<?> list) {
        Pager ret = new Pager();
        ret.setPage(page);
        ret.setList(list);
        ret.setPerPage(perPage);
        ret.setTotal(total);
        return ret;
    }
}

