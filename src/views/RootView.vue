<template>
    <div style="text-align: center;">
        <h4>Загрузка...</h4>
    </div>
</template>

<script>
import { UserService } from '../services/UserService';
import { FrontendService } from '../services/FrontendService';

export default {
    name: 'RootView',
    methods: {
        autoLoadMenu() {
            UserService.getCache(this.$cookies, data => {
                if(data && data.eatings && data.eatings.length > 0) {
                    FrontendService.setMoveData({data: data});
                    this.$router.push({name: 'Menu'})
                } else this.$router.push({name: 'EmptyMenu'});
            }, () => this.$router.push({name: 'EmptyMenu'}));
        },
        register(telegram) {
            UserService.CRUDcreate(telegram, {
                "sex": 1,
                "height": 180.0,
                "weight": 70.0,
                "birthday": 123,
                "active": 1
            }, () => {
                UserService.authorize(this.$cookies, telegram,
                    () => this.$router.push({name: 'EmptyMenu'}),
                    () => this.$router.push({name: 'NotAuthorized'})
                );
            },() => this.$router.push({name: 'NotAuthorized'}));
        }
    },
    mounted() {
        if(this.$route.query.tg) {
            UserService.authorize(this.$cookies, this.$route.query.tg, this.autoLoadMenu, () => this.register(this.$route.query.tg));
        } else if(this.$cookies.get('tg')) {
            UserService.authorize(this.$cookies, this.$cookies.get('tg'), this.autoLoadMenu, () => this.register(this.$cookies.get('tg')));
        } else {
            this.$router.push({name: 'NotAuthorized'});
        }
    }
}
</script>