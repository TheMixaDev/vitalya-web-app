<template>
    <section>
        <div class="row header">
            <div class="col flex justify-center align-content-center align-items-center align-self-center" @click="this.$router.go(-1)">
                <img class="arrow-left" src="/assets/img/arrow-left.svg" alt="Arrow icon left" />
            </div>
            <div class="col">
                <h3 class="h3" style="margin-top: 2rem;">Твоё меню</h3>
            </div>
            <div class="col">

            </div>
        </div>
        <section class="content-section details">
            <VChart class="big-graph" :option="chartOptions"></VChart>
            <div class="row w-100 justify-between align-content-center align-self-center align-items-center">
                <div class="col">
                    <h3 style="font-size: 17px; font-weight: 500; margin: 0;">Настройки меню</h3>
                </div>
                <div class="col justify-center align-self-end align-items-end justify-end align-content-end edit-row">
                    <div class="row justify-end">
                        <div class="col-auto align-self-center justify-center">
                            <RouterLink to="menu_edit"><span>Изменить</span></RouterLink>
                        </div>
                        <div class="col-auto flex align-self-center justify-center align-content-center align-self-center">
                            <img class="arrow-right" src="/assets/img/arrow-right.svg" alt="Arrow icon right" />
                        </div>
                    </div>
                </div>
            </div>
            <table class="table">
                <colgroup span="4"></colgroup>
                <tr class="t-header">
                    <th class="cat">Нутриент</th>
                    <th class="quantity">Количество</th>
                    <th class="goal">Цели</th>
                </tr>
                <tr>
                    <td class="cat cat-name">Калории</td>
                    <td class="quantity">{{ FrontendService.round(totalMicronutrients.calories) }}</td>
                    <td class="goal">{{ FrontendService.round(targets.calories) }}</td>
                </tr>
                <tr>
                    <td class="cat cat-name">Белки</td>
                    <td class="quantity">{{ FrontendService.round(totalMicronutrients.protein) }}г</td>
                    <td class="goal">{{ FrontendService.round(targets.minProtein) }}г - {{ FrontendService.round(targets.maxProtein) }}г</td>
                </tr>
                <tr>
                    <td class="cat cat-name">Жиры</td>
                    <td class="quantity">{{ FrontendService.round(totalMicronutrients.fat) }}г</td>
                    <td class="goal">{{ FrontendService.round(targets.minFat) }}г - {{ FrontendService.round(targets.maxFat) }}г</td>
                </tr>
                <tr>
                    <td class="cat cat-name">Углеводы</td>
                    <td class="quantity">{{ FrontendService.round(totalMicronutrients.carbohydrates) }}г</td>
                    <td class="goal">{{ FrontendService.round(targets.minCarbohydrates) }}г - {{ FrontendService.round(targets.maxCarbohydrates) }}г</td>
                </tr>
                <!--tr>
                    <td class="cat cat-name">Клетчатка</td>
                    <td class="quantity">{{ FrontendService.round(totalMicronutrients.cellulose) }}г</td>
                    <td class="goal">{{ FrontendService.round(targets.minCellulose) }}г</td>
                </tr-->
            </table>
        </section>
    </section>
</template>

<script>
import { UserService } from '../services/UserService';
import { FrontendService } from '../services/FrontendService';
import VChart from "vue-echarts";

export default {
    name: "MenuDetailsView",
    components: {
        VChart
    },
    computed: {
        FrontendService() {
            return FrontendService
        }
    },
    data() {
        return {
            menu: {},
            totalMicronutrients: {
                calories: 0,
                protein: 0,
                fat: 0,
                carbohydrates: 0,
                //cellulose: 0
            },
            targets: {
                calories: 0.0,
                minProtein: 0.0,
                maxProtein: 0.0,
                minFat: 0.0,
                maxFat: 0.0,
                minCarbohydrates: 0.0,
                maxCarbohydrates: 0.0,
                //minCellulose: 0.0,
                //maxCellulose: 0.0
            },
            chartOptions: {
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '80%',
                        label: {
                            position: 'inner'
                        },
                        color: ['#188027', '#2D001E', '#FE995E'],
                        data: [
                            { value: 0, name: 'Белки 0%' },
                            { value: 0, name: 'Жиры 0%' },
                            { value: 0, name: 'Углеводы 0%' },
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
            }
        }
    },
    methods: {
        calculateMicronutrients() {
            let total = this.totalMicronutrients.protein + this.totalMicronutrients.fat + this.totalMicronutrients.carbohydrates;
            if(total == 0) return;
            this.chartOptions.series[0].data[0].value = this.totalMicronutrients.protein / total;
            this.chartOptions.series[0].data[1].value = this.totalMicronutrients.fat / total;
            this.chartOptions.series[0].data[2].value = this.totalMicronutrients.carbohydrates / total;

            this.chartOptions.series[0].data[0].name = `Белки ${Math.round(this.totalMicronutrients.protein / total * 100)}%`;
            this.chartOptions.series[0].data[1].name = `Жиры ${Math.round(this.totalMicronutrients.fat / total * 100)}%`;
            this.chartOptions.series[0].data[2].name = `Углеводы ${Math.round(this.totalMicronutrients.carbohydrates / total * 100)}%`;
        },
        loadMenu() {
            UserService.getCache(this.$cookies, data => {
                if(!data || data.length == 0)
                    this.searchFailed();
                else {
                    this.menu = data;
                    this.totalMicronutrients = data.params;
                    this.loadTargets();
                }
            }, this.searchFailed);
        },
        loadTargets() {
            UserService.getParams(this.$cookies, data => {
                this.targets = data.params;
                this.calculateMicronutrients();
            }, this.searchFailed)
        },
        searchFailed() {
            FrontendService.notifyError(this.$notify, "Меню не найдено");
            this.$router.push({name: 'Root'});
        }
    },
    mounted() {
        let moveData = FrontendService.getMoveData();
        if(!moveData) this.loadMenu();
        else {
            this.menu = moveData.menu;
            this.loadTargets();
        }
    }
}
</script>