<template>
    <section>
        <div class="row header">
            <h3 class="h3">Регистрация</h3>
        </div>

        <div class="container">
            <h1 class="subtext">Введите ваши данные:</h1>
            Пол: <input type="number" class="input" v-model="user.sex"/> (поменять на radio-button)
            <br>
            Рост: <input type="number" class="input" v-model="user.height"/>см
            <br>
            Вес: <input type="number" class="input" v-model="user.weight"/>кг
            <br>
            Дата рождения: <VueDatePicker v-model="user.birthday" time-picker="false" style="display: inline-flex; width: 200px;"/>
            <br>

        </div>
        <div class="row footer">
            <a class="btn" @click="proceedRegistration">Зарегестрироваться</a>
        </div>
    </section>
</template>

<script>
// CURRENTLY UNUSED VIEW
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    name: 'UserView',
    components: {
        VueDatePicker
    },
    data() {
        return {
            telegramId: 0,
            user: {
                sex: 0,
                height: 0,
                weight: 0,
                birthday: 0,
                active: 1
            }
        }
    }
}
</script>