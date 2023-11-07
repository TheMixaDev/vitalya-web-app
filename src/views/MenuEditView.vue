<template>
    <section>
        <div class="row header">
            <div class="col flex justify-center align-content-center align-items-center align-self-center" @click="this.$router.go(-1)">
                <img class="arrow-left" src="assets/img/arrow-left.svg" alt="Arrow icon left" />
            </div>
            <div class="col">
                <h3 class="h3" style="margin-top: 2rem;">Настройки меню</h3>
            </div>
            <div class="col flex justify-center align-content-center align-items-center align-self-center" @click="saveParams">
                <img class="save-icon" src="assets/img/save.svg" alt="Save icon" />
            </div>
        </div>
        <section class="content-section details">
            <div class="range-slider">
                <div class="col-auto justify-center align-self-center" >
                    <h4 class="h4" style="margin: 0;">Диета</h4>
                </div>
                <div style="padding-top: 0!important;" class="col-auto justify-center align-self-center">
                    <select class="selection" v-model="userParams.diet">
                        <option value="0">Без ограничений</option>
                        <option value="1">Палео</option>
                        <option value="2">Вегетарианская</option>
                        <option value="3">Веганская</option>
                        <option value="4">Кето</option>
                    </select>
                </div>
            </div>
            <div class="range-slider">
                <div class="row justify-between">
                    <div class="col-auto justify-center align-self-center">
                        <span>Количество калорий</span>
                    </div>
                    <div class="col-auto justify-center">
                        <p>{{ sliders.calories.min }}г - {{ sliders.calories.max }}г</p>
                    </div>
                </div><br>
                <Slider v-bind="sliders.calories" v-model="sliders.calories.value" @update="calculateLimits"></Slider>
            </div>
            <h4 class="no_bottom_margin">Макронутриенты</h4>
            <div>
                <div class="range-slider">
                    <div class="row justify-between">
                        <div class="col-auto justify-center align-self-center">
                            <span>Белки</span>
                        </div>
                        <div class="col-auto justify-center">
                            <p>{{ sliders.protein.min }}г - {{ sliders.protein.max }}г</p>
                        </div>
                    </div><br>
                    <Slider v-bind="sliders.protein" v-model="sliders.protein.value"></Slider>
                </div>
                <div class="range-slider">
                    <div class="row justify-between">
                        <div class="col-auto justify-center align-self-center">
                            <span>Жиры</span>
                        </div>
                        <div class="col-auto justify-center">
                            <p>{{ sliders.fat.min }}г - {{ sliders.fat.max }}г</p>
                        </div>
                    </div><br>
                    <Slider v-bind="sliders.fat" v-model="sliders.fat.value"></Slider>
                </div>
                <div class="range-slider">
                    <div class="row justify-between">
                        <div class="col-auto justify-center align-self-center">
                            <span>Углеводы</span>
                        </div>
                        <div class="col-auto justify-center">
                            <p>{{ sliders.carbohydrates.min }}г - {{ sliders.carbohydrates.max }}г</p>
                        </div>
                    </div><br>
                    <Slider v-bind="sliders.carbohydrates" v-model="sliders.carbohydrates.value"></Slider>
                </div>
            </div>
            <h4 class="no_bottom_margin">Микронутриенты</h4>
            <div class="range-slider">
                <div class="row justify-between">
                    <div class="col-auto justify-center align-self-center">
                        <span>Мин. клетчатки</span>
                    </div>
                    <div class="col-auto justify-center">
                        <p>{{ sliders.minCellulose.min }}г - {{ sliders.minCellulose.max }}г</p>
                    </div>
                </div><br>
                <Slider v-bind="sliders.minCellulose" v-model="sliders.minCellulose.value"></Slider>
            </div>
            <meals>
                <h4 class="no_bottom_margin">Приемы пищи</h4>
                <div class="container container-content range-slider" v-for="(mealtime, index) in userParams.eatings?.filter(m => !m.removed)" :key="index">
                    <div class="row card-body justify-around">
                        <div class="col-auto">
                            <h4 class="car-heading">{{ mealtime.name }}</h4>
                        </div>
                        <div class="col-auto text-col justify-center align-items-center align-self-center">
                            <a class="btn_small" @click="editEating(mealtime)">Редактировать</a>
                        </div>
                        <div class="col-auto text-col justify-center align-items-center align-self-center">
                            <a class="btn_small" @click="deleteEating(mealtime)" v-if="index > 0">Удалить</a>
                        </div>
                    </div>
                </div>
            </meals>
            <div class="row footer">
                <a class="btn" @click="addEating">Добавить прием пищи</a>
            </div>
        </section>
    </section>
</template>

<script>
import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css'
import { FrontendService } from '../services/FrontendService';
import { UserService } from '../services/UserService';

export default {
    name: 'MenuEditView',
    components: {
        Slider
    },
    data() {
        return {
            sliders: {
                protein: {
                    min: 0,
                    max: 100,
                    step: 0.1,
                    value: [0, 100],
                    format: v => `${FrontendService.round(v)}г`
                },
                fat: {
                    min: 0,
                    max: 100,
                    step: 0.1,
                    value: [0, 100],
                    format: v => `${FrontendService.round(v)}г`
                },
                carbohydrates: {
                    min: 0,
                    max: 100,
                    step: 0.1,
                    value: [0, 100],
                    format: v => `${FrontendService.round(v)}г`
                },
                calories: {
                    min: 200,
                    max: 2000,
                    step: 0.1,
                    value: 0,
                    format: v => `${FrontendService.round(v)}кал`
                },
                minCellulose: {
                    min: 25,
                    max: 50,
                    step: 0.1,
                    value: 0,
                    format: v => `${FrontendService.round(v)}г`
                }
            },
            userParams: {
                diet: 0
            }
        }
    },
    methods: {
        calculateLimits() {
            this.sliders.protein.max = FrontendService.round(this.sliders.calories.value / 4)*1;
            this.sliders.fat.max = FrontendService.round(this.sliders.calories.value / 9)*1;
            this.sliders.carbohydrates.max = FrontendService.round(this.sliders.calories.value / 4)*1;
        },
        loadParams() {
            UserService.getParams(this.$cookies, data => {
                this.userParams = data;
                this.sliders.calories.value = data.calories;
                this.calculateLimits();
                this.sliders.protein.value = [data.params.minProtein, data.params.maxProtein];
                this.sliders.fat.value = [data.params.minFat, data.params.maxFat];
                this.sliders.carbohydrates.value = [data.params.minCarbohydrates, data.params.maxCarbohydrates];
                this.sliders.minCellulose.value = data.params.minCellulose;
            }, () => {
                FrontendService.notifyError(this.$notify, "Не удалось получить параметры пользователя, попробуйте позже");
                this.$router.push({name: 'Root'})
            })
        },
        saveParams() {
            this.userParams.calories = this.sliders.calories.value;
            this.userParams.params.calories = this.sliders.calories.value;
            this.userParams.params.minProtein = this.sliders.protein.value[0];
            this.userParams.params.maxProtein = this.sliders.protein.value[1];
            this.userParams.params.minFat = this.sliders.fat.value[0];
            this.userParams.params.maxFat = this.sliders.fat.value[1];
            this.userParams.params.minCarbohydrates = this.sliders.carbohydrates.value[0];
            this.userParams.params.maxCarbohydrates = this.sliders.carbohydrates.value[1];
            this.userParams.params.minCellulose = this.sliders.minCellulose.value;
            this.userParams.eatings = this.userParams.eatings.filter(e => !e.removed);
            UserService.setParams(this.$cookies, this.userParams,
                () => FrontendService.notifySuccess(this.$notify, "Параметры сохранены"),
                () => FrontendService.notifyError(this.$notify, "Не удалось сохранить параметры")
            );
        },
        editEating(mealtime) {
            for(let index in this.userParams.eatings) {
                if(this.userParams.eatings[index].name == mealtime.name && !this.userParams.eatings[index].removed) {
                    FrontendService.setMoveData({
                        saveFlag: true,
                        save: {
                            sliders: this.sliders,
                            userParams: this.userParams
                        },
                        eating: this.userParams.eatings[index],
                    });
                    this.$router.push({name: 'MealtimeEdit'});
                    return;
                }
            }
            FrontendService.notifyError(this.$notify, "Не удалось отредактировать прием пищи, попробуйте позже");
        },
        deleteEating(mealtime) {
            for(let index in this.userParams.eatings) {
                if(this.userParams.eatings[index].name == mealtime.name) {
                    this.userParams.eatings[index].removed = true;
                    if(this.userParams.eatings[index].name.includes("Перекус")) {
                        let count = 1;
                        this.userParams.eatings.filter(e => !e.removed && e.name.includes("Перекус")).forEach(e => {
                            e.name = "Перекус №"+count;
                            count++;
                        });
                    }
                    return;
                }
            }
            FrontendService.notifyError(this.$notify, "Не удалось удалить прием пищи, попробуйте позже");
        },
        addEating() {
            let data = JSON.parse(JSON.stringify(this.userParams.eatings.filter(e => !e.removed).map(e => e.name)));
            if(data.length > 8) {
                FrontendService.notifyError(this.$notify, "Количество приемов пищи слишком велико");
                return;
            }
            if(!data.includes("Ужин")) {
                this.userParams.eatings.push({
                    "name": "Ужин",
                    "size": 0.4,
                    "type": 3,
                    "difficulty": 3,
                    "dishCount": 2
                });
            } else {
                this.userParams.eatings.push({
                    "name": "Перекус №"+(this.userParams.eatings.filter(e => e.name.includes("Перекус") && !e.removed).length+1),
                    "size": 0.2,
                    "type": 0,
                    "difficulty": 2,
                    "dishCount": 1
                });
            }
            FrontendService.notifySuccess(this.$notify, "Прием пищи добавлен");
        }
    },
    mounted() {
        let moveData = FrontendService.getMoveData();
        if(!moveData || !moveData.saveFlagAccepted)
            this.loadParams();
        else {
            this.sliders = moveData.save.sliders;
            this.userParams = moveData.save.userParams;
            if(moveData.updated) {
                for(let index in this.userParams.eatings) {
                    if(this.userParams.eatings[index].name == moveData.updated.name) {
                        this.userParams.eatings[index] = moveData.updated;
                        FrontendService.notifySuccess(this.$notify, "Данные о приеме пищи обновлены");
                        return;
                    }
                }
                FrontendService.notifyError(this.$notify, "Не удалось сохранить прием пищи, попробуйте позже");
            }
        }
    }
}
</script>

<style>
.no_bottom_margin {
    margin-bottom: 0;
}
</style>