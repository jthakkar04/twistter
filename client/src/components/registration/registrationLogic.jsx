import * as Yup from "yup";

const helpers = {
    validation: function passComparator(password, verification) {
        return this.test({
            name: 'equalTo',
            exclusive: false,
            message: "" || 'Passwords don\'t match',
            params: {
                password: password,
                verification: verification
            },
            test: function (password, verification) {
                return password === verification
            }
        });
    },

}

export default helpers;