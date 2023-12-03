<template>
    <section class="section">
        <div class="row header" style="position: relative;">
            <h3 class="h3" style="margin-top: 2rem;">Твоё меню</h3>
            <div class="row flex justify-center">
                <div class="col-auto">
                    <VChart class="chart" style="width: 100px; height: 100px;" :option="chartOptions"></VChart>
                </div>
                <div class="col-auto align-self-center">
                    <h4 class="h4">{{ Math.round(totalMicronutrients.calories) }} калорий</h4>
                    <p class="small-subtext">Белки {{ Math.round(totalMicronutrients.protein) }}г, Жиры {{ Math.round(totalMicronutrients.fat) }}г, Углеводы {{ Math.round(totalMicronutrients.carbohydrates) }}г</p>
                </div>
                <div class="col-auto justify-center align-content-center align-self-center align-items-center">
                    <RouterLink to="/menu_details"><img class="arrow-left" src="/assets/img/arrow-right.svg" alt="Arrow left icon" /></RouterLink>
                </div>
            </div>
        </div>
        <div class="row overlay-top w-100"></div>
        <div class="content-section flex-column main-container" style="position: relative; padding-bottom: 102px;" @scroll="closeDropdowns">
            <div class="container area-container2" v-for="(menuItem, index) in menu" :key="index">
                <div class="dropdown-content" style="display: none" :id="'dropdown'+menuItem.name">
                    <a @click="regenerateSubmenu(menuItem)" class="flex justify-between"> Перегенерировать {{ menuItem.name }} <img src="/assets/img/refresh.svg" alt="Refresh icon" /> </a>
                    <RouterLink to="/menu_edit" class="flex justify-between">Настроить {{ menuItem.name }} <img src="/assets/img/settings.svg" alt="Settings icon" /></RouterLink>
                </div>
                <div class="row container-header justify-center align-items-around align-self-center">
                    <div class="col">
                        <h3 class="meal-time">{{ menuItem.name }}</h3>
                    </div>
                    <div class="col flex justify-end">
                        <button class="menu-button" @click="toggleDropdown($event.target, 'dropdown'+menuItem.name)"><img class="dots-img" src="/assets/img/dots.svg" alt="Dots menu icon" /></button>
                    </div>
                </div>
                <div class="container container-content">
                    <div class="row card-body justify-around" v-for="(dish, index) in menuItem.dishes" :key="index" @click="getRecipe(dish)">
                        <div class="col-auto">
                            <img class="food-photo" :src="dish.logo" :alt="dish.name" />
                        </div>
                        <div class="col-auto text-col justify-center align-items-center align-self-center">
                            <a><h4 class="card-heading">{{ dish.name }}</h4></a>
                            <span class="orange-text">{{ Math.round(dish.calories) }} кал</span>
                        </div>
                        <div class="col-auto"></div>
                    </div>
                </div>
            </div>
            <div class="row overlay-bottom w-100"></div>
        </div>
        <div class="row footer">
            <a class="btn" @click="regenerateMenu">Перегенерировать меню</a>
        </div>
    </section>
</template>

<script>
import { FrontendService } from '../services/FrontendService';
import { UserService } from '../services/UserService';
import { AlgorithmService } from '../services/AlgorithmService';
import VChart from "vue-echarts";

export default {
    name: "MenuView",
    components: {
        VChart
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
            chartOptions: {
                series: [
                    {
                        name: 'MicronutrientsForm',
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
        closeDropdowns() {
            for(let i of this.menu) {
                let dropdown = document.getElementById("dropdown"+i.name);
                let dropdownClosed = !dropdown.style.cssText.includes("block");
                if(!dropdownClosed && !dropdown.getAttribute("closing")) {
                    dropdown.style.animation = "fadeOutUp 0.3s ease-in-out";
                    setTimeout(function() {
                        dropdown.style.display = "none";
                        dropdown.style.animation = "";
                    }, 300);
                }
            }
        },
        toggleDropdown(button, dropdownId) {
            let dropdown = document.getElementById(dropdownId);
            let dropdownClosed = !dropdown.style.cssText.includes("block");
            if(dropdownClosed) {
                var rect = button.getBoundingClientRect();
                dropdown.style.top = (rect.bottom + window.scrollY) + "px";
                dropdown.style.left = rect.left + "px";
                dropdown.style.animation = "fadeInDown 0.3s ease-in-out";
                dropdown.style.display = "block";
            } else {
                dropdown.style.animation = "fadeOutUp 0.3s ease-in-out";
                dropdown.setAttribute("closing", true);
                setTimeout(function() {
                    dropdown.style.display = "none";
                    dropdown.style.animation = "";
                    dropdown.removeAttribute("closing");
                }, 300);
            }
        },
        loadMenu() {
            UserService.getCache(this.$cookies, data => {
                if(!data || data.length == 0)
                    this.regenerateMenu();
                else {
                    this.menu = data.eatings;
                    this.totalMicronutrients = data.params;
                    this.calculateMicronutrients();
                }
            }, this.regenerateMenu);
        },
        searchFailed() {
            FrontendService.notifyError(this.$notify, "Меню не найдено");
            this.$router.push({name: 'Root'});
        },
        regenerateMenu() {
            UserService.getParams(this.$cookies, () => {
                AlgorithmService.calculateMenu(this.$cookies, data => {
                    this.menu = data.eatings;
                    this.totalMicronutrients = data.params;
                    this.calculateMicronutrients();
                    FrontendService.notifySuccess(this.$notify, "Меню перегенерировано");
                }, () => FrontendService.notifyError(this.$notify, "Не удалось сгенерировать меню по указанным параметрам"));
            }, err => {
                if(err.response.status == 404) {
                    UserService.setParams(this.$cookies,
                    {
                        "diet": 0,
                        "calories": 2000,
                        "isMacronutrientsParamsSet": true,
                        "params": {
                                "calories": 2000,
                                "minProtein": 0,
                                "maxProtein": 166.7,
                                "minFat": 0,
                                "maxFat": 74.1,
                                "minCarbohydrates": 0,
                                "maxCarbohydrates": 166.7,
                                //"minCellulose": 25,
                                //"maxCellulose": 999
                        },
                        "eatings": [
                            {
                                "name": "Завтрак",
                                "size": 0.4,
                                //"type": 1,
                                "difficulty": 3,
                                "dishCount": 2
                            },
                            {
                                "name": "Обед",
                                "size": 0.4,
                                //"type": 2,
                                "difficulty": 3,
                                "dishCount": 0
                            }
                        ]
                    }, () => {
                        window.location.reload();
                    }, () => FrontendService.notifyError(this.$notify, "Не удалось установить параметры пользователя. Сообщите о проблеме администраторам."));
                } else FrontendService.notifyError(this.$notify, "Не удалось установить параметры пользователя. Сообщите о проблеме администраторам.");
            });
        },
        regenerateSubmenu(menuItem) {
            UserService.getParams(this.$cookies, params => {
                delete params["calories"];
                delete params["isMacronutrientsParamsSet"];
                params.excludeDishes = menuItem.dishes.map(dish => dish.id);
                AlgorithmService.calculateCustom(this.$cookies, params, data => {
                    this.menu = data.eatings;
                    this.totalMicronutrients = data.params;
                    this.calculateMicronutrients();
                    FrontendService.notifySuccess(this.$notify, "Меню перегенерировано");
                }, () => FrontendService.notifyError(this.$notify, "Не удалось сгенерировать меню по указанным параметрам"));
            }, () => FrontendService.notifyError(this.$notify, "Не удалось получить параметры пользователя, попробуйте позже"));
        },
        goToDetails() {
            this.$router.push({name: 'MenuDetails'})
        },
        getRecipe(dish) {
            FrontendService.setMoveData({dish: dish});
            this.$router.push({name: 'Recipe'})
        }
    },
    mounted() {
        let moveData = FrontendService.getMoveData();
        if(!moveData) return this.loadMenu();
        this.menu = moveData.data.eatings;
        this.totalMicronutrients = moveData.data.params;
        this.calculateMicronutrients();
    }
}
</script>
<style scoped>
.main-container {
  height: 100%;
  max-height: 80vh;
  width: 100%;
}
.area-container2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}
</style>