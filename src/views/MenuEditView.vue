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
            <!--div class="tab">
                <button class="tablinks" @click="selectedTab = 0">В граммах</button>
                <button class="tablinks" @click="selectedTab = 1">% от калорий</button>
            </div-->
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
            <!--div class="tabcontent" v-if="selectedTab == 1">
                <div class="row w-100 justify-center" style="gap: 1rem;">
                    <div class="col-auto">
                        <VChart style="width: 122px; height: 122px;" :option="chartOptions"></VChart>
                    </div>
                    <div class="col-auto">
                        <div class="row">
                            <div class="col-auto" style="margin-right: 0.8rem;">
                                <span class="dot proteins"></span>
                            </div>
                            <div class="col-auto" style="margin-right: 0.8rem;">
                                <div class="col-auto number-col">
                                    <input class="input-number" value="30" type="number" /><span>% </span>
                                </div>
                                <div class="col-auto subtext-col">
                                    <p class="subtext-small">~98г белков</p>
                                </div>
                            </div>

                            <div class="col-auto">
                                <span class="input-postfix">Белков</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-auto" style="margin-right: 0.8rem;">
                                <span class="dot fats"></span>
                            </div>
                            <div class="col-auto">
                                <div class="col-auto number-col" style="margin-right: 0.8rem;">
                                    <input class="input-number" value="30" type="number" /><span>% </span>
                                </div>
                                <div class="col-auto subtext-col">
                                    <p class="subtext-small">~44г жиров</p>
                                </div>
                            </div>

                            <div class="col-auto">
                                <span class="input-postfix">Жиров</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-auto" style="margin-right: 0.8rem;">
                                <span class="dot carbohydrates"></span>
                            </div>
                            <div class="col-auto">
                                <div class="col-auto number-col" style="margin-right: 0.8rem;">
                                    <input class="input-number" value="30" type="number" /><span>% </span>
                                </div>
                                <div class="col-auto subtext-col">
                                    <p class="subtext-small">~131г угл.</p>
                                </div>
                            </div>

                            <div class="col-auto">
                                <span class="input-postfix"> Углеводов</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div-->
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
        </section>
        <!-- TODO meals managment -->
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
            loadedEarly: {}
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
                this.loadedEarly = data;
                this.sliders.calories.value = data.calories;
                this.calculateLimits();
                this.sliders.protein.value = [data.params.minProtein, data.params.maxProtein];
                this.sliders.fat.value = [data.params.minFat, data.params.maxFat];
                this.sliders.carbohydrates.value = [data.params.minCarbohydrates, data.params.maxCarbohydrates];
                this.sliders.minCellulose.value = data.params.minCellulose;
            }, () => {
                FrontendService.notifyError(this.$notify, "Не удалось получить параметры пользователя, попробуйте позже");
                this.$router.push({name: 'EmptyMenu'})
            })
        },
        saveParams() {
            // TODO add diet type change
            this.loadedEarly.calories = this.sliders.calories.value;
            this.loadedEarly.params.calories = this.sliders.calories.value;
            this.loadedEarly.params.minProtein = this.sliders.protein.value[0];
            this.loadedEarly.params.maxProtein = this.sliders.protein.value[1];
            this.loadedEarly.params.minFat = this.sliders.fat.value[0];
            this.loadedEarly.params.maxFat = this.sliders.fat.value[1];
            this.loadedEarly.params.minCarbohydrates = this.sliders.carbohydrates.value[0];
            this.loadedEarly.params.maxCarbohydrates = this.sliders.carbohydrates.value[1];
            this.loadedEarly.params.minCellulose = this.sliders.minCellulose.value;
            // TODO add eating params change
            UserService.setParams(this.$cookies, this.loadedEarly,
                () => FrontendService.notifySuccess(this.$notify, "Параметры сохранены"),
                () => FrontendService.notifyError(this.$notify, "Не удалось сохранить параметры")
            );
        }
    },
    mounted() {
        this.loadParams();
    }
}
</script>

<style>
.no_bottom_margin {
    margin-bottom: 0;
}
</style>