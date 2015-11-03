package br.com.poupatudo.persistence.crud;

/**
 * Created by dvlima on 11/3/15.
 */
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Selection;
import javax.persistence.criteria.Subquery;

@SuppressWarnings("all")
public class QueryBuilder<T> {

    private EntityManager entityManager;
    private Class classe;

    protected Collection<Predicate> restricoes;
    protected CriteriaBuilder criteriaBuilder;
    protected CriteriaQuery<T> criteriaQuery;
    protected CriteriaQuery<Long> criteriaQueryCount;
    protected Root<T> root;
    protected Root<T> rootCount;

    private final Map<String, Join> joins = new LinkedHashMap<String, Join>();
    private Collection<String> selections;
    private Collection<Order> orders;

    public QueryBuilder(EntityManager entityManager, Class<T> classe) {
        this.entityManager = entityManager;
        this.classe = classe;
        this.restricoes = new ArrayList<Predicate>();
        this.orders = new ArrayList<Order>();

        this.criteriaBuilder = this.entityManager.getCriteriaBuilder();
        this.criteriaQuery = this.criteriaBuilder.createQuery(this.classe);
        this.criteriaQueryCount = this.criteriaBuilder.createQuery(Long.class);
        this.root = this.criteriaQuery.from(this.classe);
        this.rootCount = this.criteriaQueryCount.from(this.classe);
    }

    public QueryBuilder(EntityManager entityManager, Class<T> classe, String alias) {
        this(entityManager, classe);
        this.root.alias(alias);
        this.rootCount.alias(alias);
    }

    @SuppressWarnings("unchecked")
    public QueryBuilder selectNEW(String... colunas) {

        selections = new ArrayList<String>();
        for (String coluna : colunas) {
            selections.add(coluna);
        }

        return this;
    }

    public QueryBuilder innerJoin(String property) {
        addInnerJoin(property, false);
        return this;
    }

    public QueryBuilder innerJoinList(String property) {
        addInnerJoin(property, true);
        return this;
    }

    private void addInnerJoin(String property, boolean isList) {
        String[] split = property.split("\\.");

        Join join = null;

        for (String path : split) {
            if (joins.containsKey(path)) {
                join = joins.get(path);
            } else {
                join = new Join(join, path, path, JoinType.INNER, isList);
                joins.put(path, join);
            }
        }
    }

    public QueryBuilder andEquals(String property, Object value) {
        Path variable = getPath(property);
        Predicate predicate = this.criteriaBuilder.equal(variable, value);
        this.restricoes.add(predicate);
        return this;
    }

    public QueryBuilder andEquals(String property, Subquery subquery) {
        Path variable = getPath(property);
        Predicate predicate = this.criteriaBuilder.equal(variable, subquery);
        this.restricoes.add(predicate);
        return this;
    }

    public QueryBuilder andLike(String property, Object value) {
        Path variable = getPath(property);
        Predicate predicate = this.criteriaBuilder.like(variable, "%" + value + "%");
        this.restricoes.add(predicate);
        return this;
    }

    public QueryBuilder<T> andNotNull(String property) {
        Path variable = getPath(property);
        Predicate predicate = this.criteriaBuilder.isNotNull(variable);
        this.restricoes.add(predicate);
        return this;
    }

    public QueryBuilder orderByAsc(String... properties) {
        for (String order : properties) {
            this.orders.add(this.criteriaBuilder.asc(this.getPath(order)));
        }
        return this;
    }

    public QueryBuilder orderByDesc(String... properties) {
        for (String order : properties) {
            this.orders.add(this.criteriaBuilder.desc(this.getPath(order)));
        }
        return this;
    }

    protected Path getPath(String property) {
        String[] split = property.split("\\.");
        Path variable = null;
        for (String path : split) {
            if (variable == null) {
                variable = root.get(path);
            } else {
                variable = variable.get(path);
            }
        }
        return variable;
    }

    protected Expression<Boolean> getPathMain(Root root, String propertyMain) {
        String[] split = propertyMain.split("\\.");
        Path variable = null;
        for (String path : split) {
            if (variable == null) {
                variable = root.get(path);
            } else {
                variable = variable.get(path);
            }
        }
        return variable;
    }

    public TypedQuery<T> build() {

        this.gerarJoins();
        this.gerarSelectNEW();

        this.criteriaQuery.where(this.restricoes.toArray(new Predicate[restricoes.size()]));
        return this.entityManager.createQuery(this.criteriaQuery);

    }

    public TypedQuery<Long> buildCount() {
        this.gerarJoins();
        criteriaQueryCount.select(criteriaBuilder.count(root));
        this.criteriaQueryCount.where(this.restricoes.toArray(new Predicate[restricoes.size()]));
        return this.entityManager.createQuery(this.criteriaQueryCount);
    }

    private void gerarSelectNEW() {
        Collection<Selection> columns = new ArrayList<Selection>();
        for (String coluna : selections) {
            String[] split = coluna.split("\\.");
            if (joins.containsKey(split[0])) {
                columns.add(joins.get(split[0]).variable.get(split[1]));
            } else {
                columns.add(root.get(coluna));
            }
        }

        this.criteriaQuery.select(this.criteriaBuilder.construct(classe,
                columns.toArray(new Selection[columns.size()])));
    }

    protected void gerarJoins() {
        javax.persistence.criteria.Join<Object, Object> lastJoin = null;

        for (String path : this.joins.keySet()) {
            QueryBuilder<T>.Join join = joins.get(path);
            if (join.joinParent == null) {

                if (join.isList) {
                    lastJoin = root.joinList(path, join.type);
                } else {
                    lastJoin = root.join(path, join.type);
                }

                join.variable = root.get(path);
            } else {
                join.variable = lastJoin.get(path);

                if (join.isList) {
                    lastJoin = lastJoin.joinList(path, join.type);
                } else {
                    lastJoin = lastJoin.join(path, join.type);
                }
            }
            lastJoin.alias(path);

        }
    }

    private class Join {

        private Join joinParent;

        private String path;

        private String alias;

        private JoinType type;

        private Path variable;

        private boolean isList;

        public Join(QueryBuilder<T>.Join joinParent, String path, String alias, JoinType type, boolean isList) {
            this.joinParent = joinParent;
            this.path = path;
            this.alias = alias;
            this.type = type;
            this.isList = isList;
        }

    }

}