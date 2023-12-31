<template>
    <section>
        <div class="row header">
            <div class="col flex justify-center align-content-center align-items-center align-self-center" @click="this.$router.go(-1)">
                <img class="arrow-left" src="/assets/img/arrow-left.svg" alt="Arrow icon left" />
            </div>
            <div class="col">
                <h3 class="h3" style="margin-top: 2rem;">{{ dish.name }}</h3>
            </div>
            <div class="col"></div>
        </div>
        <section class="content-section details">
            <img class="food-photo-big" :src="dish.logo" :alt="dish.name"/>
            <div class="row w-100">
                <p class="timing">Готовить {{ FrontendService.cookingTime(dish.timeToCook) }}</p>
            </div>
            <div class="row flex justify-center">
                <div class="col-auto">
                    <VChart class="chart" style="width: 100px; height: 100px;" :option="chartOptions"></VChart>
                </div>
                <div class="col-auto align-self-center">
                    <h4 class="h4">{{ FrontendService.round(dish.calories) }} калорий</h4>
                    <p class="small-subtext">{{ FrontendService.round(dish.protein) }}г белков, {{ FrontendService.round(dish.fat) }}г жиров, {{ FrontendService.round(dish.carbohydrates) }}г углеводов</p>
                </div>
                <div class="col-auto justify-center align-content-center align-self-center align-items-center">
                </div>
            </div>
            <div class="container area-container">
                <ingridients v-if="ingredients.length > 0">
                    <div class="row w-100">
                        <h4 style="padding: 0; margin-bottom: 0; margin-top: 0.5rem; text-align: left; width: 100%;">Ингридиенты</h4>
                        <!--p class="subtext-small" style="padding: 0; text-align: left!important; width: 100%;">ингредиенты на порцию {{ FrontendService.round(dish.weight) }}г </p-->
                    </div>
                    <div>
                        <div class="row justify-between w-100" v-for="(ingredient, index) in ingredients" :key="index">
                            <div class="col-auto">
                                <div class="row" style="gap: 1rem;">
                                    <div class="col-auto justify-center align-self-center align-items-center align-content-center photo-col" style="max-width: 174px;" v-if="ingredient.imageUrl.length > 0">
                                        <img class="ingredient-image" :src="ingredient.imageUrl" :alt="ingredient.name" />
                                    </div>
                                    <div class="col-auto justify-center align-self-center align-items-center align-content-center">
                                        <h5 class="product-name">{{ ingredient.name }}</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto justify-end align-self-center align-items-end align-content-end quantity-col">
                                <span class="quantity-item">{{ FrontendService.parseMeasure(ingredient.measureCount, ingredient.measureType) }}</span>
                            </div>
                        </div>
                    </div>
                </ingridients>
                <steps v-if="recipeSteps.length > 0">
                    <div class="row w-100">
                        <h4 style="padding: 0; margin-bottom: 0; text-align: left; width: 100%;">Шаги приготовления</h4>
                    </div>
                    <div class="row w-100">
                        <div class="row w-100" v-for="step in recipeSteps" :key="step.relativeId">
                            <div>
                                <div class="row w-100">
                                    <img class="ingredient-image" :src="step.imageUrl" style="width: 100px;" v-if="step.imageUrl.length > 0"/>
                                    <div style="text-align: left; max-width: calc(100% - 100px); font-size: small;">
                                        <b class="step">
                                            Шаг {{ step.relativeId }}
                                        </b>
                                        <p class="receipt-step">
                                            {{ step.text }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </steps>
            </div>
        </section>
    </section>
</template>

<script>
import { FrontendService } from '../services/FrontendService';
import VChart from "vue-echarts";
import { RecipeService } from '../services/RecipeService';

export default {
    name: 'RecipeView',
    components: {
        VChart
    },
    computed: {
        FrontendService() {
            return FrontendService;
        }
    },
    data() {
        return {
            dish: {
                id: -1,
                name: "Загрузка...",
                logo: "Загрузка...",
                calories: 0,
                protein: 0,
                fat: 0,
                carbohydrates: 0,
                cellulose: 0,
                timeToCook: 0,
                dietId: 1,
                typeId: 1,
            },
            chartOptions: {
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '80%',
                        label: {
                            show: false,
                            position: 'inner'
                        },
                        color: ['#188027', '#2D001E', '#FE995E'],
                        data: [
                            { value: 0, name: 'Белки 0%' },
                            { value: 0, name: 'Жиры 0%' },
                            { value: 0, name: 'Углеводы 0%' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            ingredients: [],
            recipeSteps: []
        }
    },
    methods: {
        showMicronutrients() {
            let total = this.dish.protein + this.dish.fat + this.dish.carbohydrates;
            if(total == 0) return;
            this.chartOptions.series[0].data[0].value = this.dish.protein / total;
            this.chartOptions.series[0].data[1].value = this.dish.fat / total;
            this.chartOptions.series[0].data[2].value = this.dish.carbohydrates / total;

            this.chartOptions.series[0].data[0].name = `Белки ${Math.round(this.dish.protein / total * 100)}%`;
            this.chartOptions.series[0].data[1].name = `Жиры ${Math.round(this.dish.fat / total * 100)}%`;
            this.chartOptions.series[0].data[2].name = `Углеводы ${Math.round(this.dish.carbohydrates / total * 100)}%`;
        },
        parseIngridients() {
            RecipeService.recipe(this.$cookies, this.dish.id, data => {
                if(data && data.length > 0 && data[0].steps.length > 0) {
                    this.ingredients = data[0].ingredients;
                    this.recipeSteps = data[0].steps;
                }
            }, () => FrontendService.notifyError(this.$notify, "Не удалось получить информацию о шагах приготовления, попробуйте позже"))
        }
    },
    mounted() {
        let moveData = FrontendService.getMoveData();
        if(!moveData) return this.$router.go(-1);
        this.dish = moveData.dish;
        this.showMicronutrients();
        this.parseIngridients();
    }
}
</script>