<template>
    <section>
        <div class="row header">
            <div class="col flex justify-center align-content-center align-items-center align-self-center" @click="this.$router.go(-1)">
                <img class="arrow-left" src="assets/img/arrow-left.svg" alt="Arrow icon left" />
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
            <div class="container area-container" v-if="dish.ingredients.length > 0">
                <div class="row w-100">
                    <h4 style="padding: 0; margin-bottom: 0; margin-top: 0.5rem; text-align: left; width: 100%;">Ингридиенты</h4>
                    <p class="subtext-small" style="padding: 0; text-align: left!important; width: 100%;">ингредиенты на порцию {{ FrontendService.round(dish.weight) }}г </p>
                </div>
                <div v-if="parsedIngredients.length == dish.ingredients.length">
                    <div class="row justify-between w-100" v-for="(ingredient, index) in parsedIngredients" :key="index">
                        <div class="col-auto">
                            <div class="row" style="gap: 1rem;">
                                <!--div class="col-auto justify-center align-self-center align-items-center align-content-center photo-col" style="max-width: 174px;">
                                    <img class="chicken" src="assets/img/food/chick.png" /> TODO add image once ingredients are properly tested
                                </div-->
                                <div class="col-auto justify-center align-self-center align-items-center align-content-center">
                                    <h5 class="product-name">{{ ingredient.name }}</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto justify-end align-self-center align-items-end align-content-end quantity-col">
                            <span class="quantity-item">{{ ingredient.measure }}</span>
                        </div>
                    </div>
                </div>
                <div class="row w-100" v-else>
                    <h4 style="padding: 0; margin-bottom: 0; margin-top: 0.5rem; text-align: left; width: 100%;">Зарузка ингридиентов...</h4>
                </div>
                <!--div class="row w-100">
                    <h4 style="padding: 0; margin-bottom: 0; text-align: left; width: 100%;">Шаги приготовления</h4>
                </div>
                <div class="row w-100">
                    <ul class="ul">
                        <li class="col-auto">
                            <span class="step">
                                Шаг {step_number}
                            </span>
                            <p class="receipt-step">
                                {step_data}
                            </p>
                        </li>
                        <li>
                            <span>
                                Приятного аппетита!
                            </span>
                        </li>
                    </ul>
                </div-->
            </div>
        </section>
    </section>
</template>

<script>
import { FrontendService } from '../services/FrontendService';
import { IngredientsService } from '../services/IngredientsService';
import VChart from "vue-echarts";

export default {
    name: 'ReceiptView',
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
                weight: 0,
                timeToCook: 0,
                dietId: 1,
                typeId: 1,
                ingredients: [ // TODO: debugging measures, remove once ingredients are properly tested
                    {
                        id: 1,
                        name: "Test 1",
                        measureType: 1,
                        measureCount: 2200.0
                    },
                    {
                        id: 2,
                        name: "Test 2",
                        measureType: 1,
                        measureCount: 90.0
                    },
                    {
                        id: 3,
                        name: "Test 3",
                        measureType: 2,
                        measureCount: 120.0
                    },
                    {
                        id: 4,
                        name: "Test 4",
                        measureType: 2,
                        measureCount: 90.0
                    }
                ],
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
            parsedIngredients: []
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
            let input = [];
            this.dish.ingredients.forEach((ingredient) => {
                input.push({
                    id: ingredient.id,
                    count: ingredient.measureCount
                });
            });
            IngredientsService.measureMapping(this.$cookies, {input: input}, data => {
                this.dish.ingredients.forEach((ingredient) => {
                    let measureCount = ingredient.measureCount;
                    let measureName = ingredient.measureType == 1 ? "г" : "мл";
                    let measureData = data.output.find(m => m.id == ingredient.id);
                    if(measureData.measureName != null)
                        measureName = " "+measureData.measureName;
                    else {
                        if(measureCount > 2000) {
                            measureName = ingredient.measureType == 1 ? "кг" : "л";
                            measureCount = FrontendService.round(ingredient.measureCount / 1000);
                        }
                    }
                    this.parsedIngredients.push({
                        name: ingredient.name,
                        measure: measureCount + measureName
                    })
                });
            }, () => FrontendService.notifyError(this.$notify, "Не удалось получить информацию об ингредиентах, попробуйте позже"))
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