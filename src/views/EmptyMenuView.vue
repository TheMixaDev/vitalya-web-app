<template>
    <section>
        <div class="row header">
            <h3 class="h3">Твоё меню</h3>
        </div>

        <div class="container">
            <img class="cal-img" src="assets/img/cal.svg" alt="Calendar icon"/>
            <h1 class="h1">Вы ещё не создали меню</h1>
            <p class="subtext">Нажмите на оранжевую кнопку снизу, чтобы получить меню на день</p>
        </div>

        <div class="row footer">
            <RouterLink class="btn" to="/menu">Сгенерировать меню</RouterLink>
        </div>
    </section>
</template>

<script>
import { UserService } from '../services/UserService'
import { FrontendService } from '../services/FrontendService'

export default {
    name: 'EmptyMenuView',
    methods: {
        autoLoadMenu() {
            UserService.getCache(this.$cookies, data => {
                if(data && data.length > 0) {
                    FrontendService.setMoveData({menu: data});
                    this.$router.push({name: 'Menu'})
                }
            }, () => {});
        }
    },
    mounted() {
        try {
            if(!this.$route.query.tg && !this.$cookies.get('tg'))
                this.$router.push({name: 'NotAuthorized'})
            UserService.authorize(this.$cookies, this.$route.query.tg ? this.$route.query.tg : this.$cookies.get('tg'), this.autoLoadMenu, window.close);
        } catch {
            this.$router.push({name: 'NotAuthorized'})
        }
    }
}
</script>