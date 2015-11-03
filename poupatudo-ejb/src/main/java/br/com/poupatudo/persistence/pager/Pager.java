package br.com.poupatudo.persistence.pager;

/**
 * Created by dvlima on 11/3/15.
 */
import java.util.List;

public class Pager<T> {

    private Integer page;
    private Integer perPage;
    private Long total;
    private List<T> list;

    public Integer getPage() {
        if (page == null) {
            setPage(1);
        }
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Integer getPerPage() {
        return perPage;
    }

    public void setPerPage(Integer perPage) {
        this.perPage = perPage;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }
}
