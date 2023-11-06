<template>
    <section>
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
                    <a @click="goToDetails"><img class="arrow-left" src="assets/img/arrow-right.svg" alt="Arrow left icon" /></a>
                </div>
            </div>
        </div>
        <div class="row overlay-top w-100"></div>
        <section class="content-section" style="position: relative" @scroll="closeDropdowns">
            <section v-for="menuItem in menu" :key="menuItem.name">
                <div class="dropdown-content" style="display: none" :id="'dropdown'+menuItem.name">
                    <a href="#" class="flex justify-between">
                        Перегенерировать {{ menuItem.name }} <img src="assets/img/refresh.svg" alt="Refresh icon" /> </a>
                    <!--TODO PROPER LINKING-->
                    <a @click="goToDetails" class="flex justify-between">Настроить {{ menuItem.name }} <img src="assets/img/settings.svg" alt="Settings icon" /></a>
                </div>
                <div class="row container-header justify-center align-items-around align-self-center">
                    <div class="col">
                        <h3 class="meal-time">{{ menuItem.name }}</h3>
                    </div>
                    <div class="col flex justify-end">
                        <button class="menu-button" @click="toggleDropdown($event.target, 'dropdown'+menuItem.name)"><img class="dots-img" src="assets/img/dots.svg" alt="Dots menu icon" /></button>
                    </div>
                </div>
                <div class="container container-content">
                    <div class="row card-body justify-around" v-for="dish in menuItem.dishes" :key="dish.id">
                        <div class="col-auto">
                            <img class="food-photo" :src="dish.logo" alt="Food photo" />
                        </div>
                        <div class="col-auto text-col justify-center align-items-center align-self-center">
                            <a @click="getReceipt(dish)"><h4 class="card-heading">{{ dish.name }}</h4></a>
                            <span class="orange-text">{{ Math.round(dish.weight) }}г, {{ Math.round(dish.calories) }} кал</span>
                        </div>
                        <div class="col-auto">
                            <!-- TODO refresh -->
                            <!--a href="#"><img class="dots-img low-opacity" src="assets/img/refresh.svg" alt="Refresh menu icon" /></a-->
                        </div>
                    </div>
                </div>
            </section>
            <div class="row overlay-bottom w-100"></div>
        </section>
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
            menu: [],
            totalMicronutrients: {
                calories: 0,
                protein: 0,
                fat: 0,
                carbohydrates: 0,
                cellulose: 0
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
            // TODO rewrite on idealParams
            for(let i of this.menu) {
                let micronutrients = i.micronutrients;
                for(let j in micronutrients) {
                    this.totalMicronutrients[j] += micronutrients[j];
                }
            }
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
                    this.$router.push({name: 'EmptyMenu'})
                else {
                    this.menu = data;
                    this.calculateMicronutrients();
                }
            }, () => this.$router.push({name: 'EmptyMenu'}));
        },
        regenerateMenu() {
            AlgorithmService.calculateMenu(this.$cookies, () => {
                window.location.reload();
                // TODO: Soft update
            }, () => {
                // TODO: Handle error
            });
        },
        goToDetails() {
            this.$router.push({name: 'MenuDetails'})
        },
        getReceipt(dish) {
            FrontendService.setMoveData({dish: dish});
            this.$router.push({name: 'Receipt'})
        }
    },
    mounted() {
        let moveData = FrontendService.getMoveData();
        if(!moveData) this.loadMenu();
        else {
            this.menu = moveData.menu;
            this.calculateMicronutrients();
        }
    }
}
</script>