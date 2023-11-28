<template>
    <section>
        <div class="row header">
            <h3 class="h3">Регистрация</h3>
            <h1 class="subtext">Введите ваши данные</h1>
        </div>

        <div class="container">
            <h3>Пол</h3>
            <div class="row">
              <div class="col">
                <label for="male">Мужской</label>
                <input type="radio" id="male" name="sex" value="male" checked v-model="user.sex" />
              </div>
              <div class="col">
                <label for="female">Женский</label>
                <input type="radio" id="female" name="sex" value="female" v-model="user.sex"/>
              </div>
            </div>
            <hr class="hr" />
            <h3>Рост</h3>
            <input type="number" class="input" v-model="user.height"/>см
            <hr class="hr" />
            <h3>Вес</h3>
            <input type="number" class="input" v-model="user.weight"/>кг
            <hr class="hr" />
            <h3>Дата рождения</h3>
            <VueDatePicker
                v-model="user.birthday"
                locale="ru"
                cancelText="Отмена"
                selectText="Выбрать"
                placeholder="Выберите дату"
                style="display: inline-flex; width: 200px;"/>
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

<style scoped>
input {
  background: #efefef;
  border: none;
  border-radius: 0.3rem;
  border-bottom: 1px solid #d7d7d7;
  padding: 0.3rem;
  width: 100%;
  max-width: 60vw;
  text-align: center;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.hr {
  border-bottom: 1px solid #f8f8f8;
  width: 100%;
  opacity: 0.2;
}
h3 {
  margin-top: 0;
  margin-bottom: 0;
}
.subtext {
  font-size: 0.8rem;
  opacity: 0.57;
}
.dp__input {
  background-color: black!important;
}
</style>