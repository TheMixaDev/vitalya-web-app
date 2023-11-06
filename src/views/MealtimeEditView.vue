<template>
    <section>
        <div class="row header">
            <div class="col flex justify-center align-content-center align-items-center align-self-center" @click="goBack(false)">
                <img class="arrow-left" src="assets/img/arrow-left.svg" alt="Arrow icon left" />
            </div>
            <div class="col">
                <h3 class="h3" style="margin-top: 2rem;">Настройки приёма пищи</h3>
            </div>
            <div class="col flex justify-center align-content-center align-items-center align-self-center" @click="saveAndQuit">
                <img class="save-icon" src="assets/img/save.svg" alt="Save icon" />
            </div>
        </div>
        <section class="content-section details">
            <h4 class="h4 p-4" style="font-weight: 600; padding-bottom: 0!important; text-align: left!important; width: 100%;">
                {{ eating.name }}
            </h4>
            <div class="row justify-between w-100 p-4" style="padding-top: 0!important;">
                <div class="col-auto justify-center align-self-center" >
                    <h4 class="h4" style="margin: 0;">Размер порции</h4>
                </div>
                <div style="padding-top: 0!important;" class="col-auto justify-center align-self-center">
                    <select class="selection" v-model="eating.size">
                        <option value="0.1">Крошечный</option>
                        <option value="0.2">Маленький</option>
                        <option value="0.4">Стандартный</option>
                        <option value="0.6">Большой</option>
                        <option value="0.8">Огромный</option>
                        <!-- TODO: ask about values-->
                    </select>
                </div>
            </div>

            <h4 class="h4 p-4" style="font-weight: 600; padding-top: 0!important; padding-bottom: 0!important; text-align: left!important; width: 100%;">
                Фильтры рецептов
            </h4>
            <div class="row justify-between w-100 p-4" style="padding-top: 0!important;">
                <div class="col-auto justify-center align-self-center" >
                    <h4 class="h4" style="margin: 0;">Предпочтения в блюдах</h4>
                </div>
                <div style="padding-top: 0!important;" class="col-auto justify-center align-self-center">
                    <select class="selection">
                        <option value="0">Любой</option>
                        <option value="1">Завтрак</option>
                        <option value="2">Обед</option>
                        <option value="3">Ужин</option>
                        <option value="4">Перекус</option>
                        <!-- TODO: ask about values-->
                    </select>
                </div>
            </div>
            <div style="padding-top: 0!important;" class="row justify-between w-100 p-4">
                <div class="col-auto justify-center align-self-center">
                    <h4 class="h4" style="margin: 0;">Время готовки</h4>
                </div>
                <div class="col-auto justify-center align-self-center" >
                    <select class="selection">
                        <option value="5">&lt;&nbsp;5 минут</option>
                        <option value="15">&lt;&nbsp;15 минут</option>
                        <option value="30">&lt;&nbsp;30 минут</option>
                        <option value="45">&lt;&nbsp;45 минут</option>
                        <option value="60">&lt;&nbsp;60 минут</option>
                        <option value="0">&lt;&nbsp;Без ограничений</option>
                        <!-- TODO: ask about values-->
                    </select>
                </div>
            </div>
            <div style="padding-top: 0!important;" class="row justify-between w-100 p-4">
                <div class="col-auto justify-center align-self-center">
                    <h4 class="h4" style="margin: 0;">Сложность приготовления</h4>
                </div>
                <div class="col-auto justify-center align-self-center">
                    <select class="selection" v-model="eating.difficulty">
                        <option value="0">Легче простого</option>
                        <option value="1">Просто</option>
                        <option value="2">Средне</option>
                        <option value="3">Сложно</option>
                        <!-- TODO: ask about values-->
                    </select>
                </div>
            </div>
            <div style="padding-top: 0!important;" class="row justify-between w-100 p-4">
                <div class="col-auto justify-center align-self-center">
                    <h4 class="h4" style="margin: 0;">Кол-во блюд</h4>
                </div>
                <div class="col-auto justify-center align-self-center">
                    <select class="selection" v-model="eating.dishCount">
                        <option value="0">Автоматически</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <!-- TODO: ask about values-->
                    </select>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import { FrontendService } from "../services/FrontendService";

export default {
    name: 'MealtimeEditView',
    data() {
        return {
            save: null,
            eating: {
                name: "First",
                size: 0.8,
                type: {
                    "id": 1,
                    "name": "DishType1"
                },
                difficulty: 0,
                dishCount: 4
            }
        }
    },
    methods: {
        goBack(updated) {
            FrontendService.setMoveData({
                saveFlagAccepted: true,
                save: this.save,
                updated: updated ? this.eating : null
            });
            this.$router.go(-1);
        },
        saveAndQuit() {
            this.goBack(this.save != null);
        }
    },
    mounted() {
        let moveData = FrontendService.getMoveData();
        if(!moveData) return this.$router.go(-1);
        if(moveData.saveFlag) this.save = moveData.save;
        this.eating = moveData.eating;
    }
}
</script>