/**
 * 
 * @param {type} param1
 * @param {type} param2
 */

angular.module('poupatudo.filter', [])

    .filter('cepmask', function () {
        return function (input) {
            var str = input + '';
            str = str.replace(/\D/g, '');
            str = str.replace(/^(\d{2})(\d{3})(\d)/, '$1.$2-$3');
            return str;
        };
    })

    .filter('cartaomask', function () {
        return function (input) {
            var str = input + '';
            str = str.replace(/^(\d{4})(\W{4})(\W{4})(\d{4})/, '$1.$2.$3.$4');
            return str;
        };
    })

    .filter('cnpjmask', function () {
        return function (input) {
            var str = input + '';
            str = str.replace(/\D/g, '');
            str = str.replace(/^(\d{2})(\d)/, '$1.$2');
            str = str.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            str = str.replace(/\.(\d{3})(\d)/, '.$1/$2');
            str = str.replace(/(\d{4})(\d)/, '$1-$2');
            return str;
        };
    })

    .filter('cpfmask', function () {
        return function (input) {
            var str = input + '';
            str = str.replace(/\D/g, '');
            str = str.replace(/(\d{3})(\d)/, '$1.$2');
            str = str.replace(/(\d{3})(\d)/, '$1.$2');
            str = str.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            return str;
        };
    })

    .filter('moedamask', function () {
        return function (input) {
            return 'R$ ' + formatReal(input);

            function formatReal(int) {
                var tmp = int + '';
                var res = tmp.replace('.', '');
                tmp = res.replace(',', '');
                var neg = false;
                if (tmp.indexOf('-') === 0) {
                    neg = true;
                    tmp = tmp.replace('-', '');
                }
                if (tmp.length === 1) {
                    tmp = '0' + tmp;
                }
                tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
                if (tmp.length > 6) {
                    tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
                }
                if (tmp.length > 9) {
                    tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, '.$1.$2,$3');
                }
                if (tmp.length > 12) {
                    tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, '.$1.$2.$3,$4');
                }
                if (tmp.indexOf('.') === 0) {
                    tmp = tmp.replace('.', '');
                }
                if (tmp.indexOf(',') === 0) {
                    tmp = tmp.replace(',', '0,');
                }
                return neg ? '-' + tmp : tmp;
            }
        };
    })

    .filter('telmask', function () {
        return function (input) {
            var str = input + '';
            str = str.replace(/\D/g, '');
            if (str.length === 11) {
                str = str.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else {
                str = str.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            }
            return str;
        };
    })


;