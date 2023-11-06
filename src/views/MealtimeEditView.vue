<template>
    <section>
        <div class="row header">
            <div class="col flex justify-center align-content-center align-items-center align-self-center" @click="this.$router.go(-1)">
                <img class="arrow-left" src="assets/img/arrow-left.svg" alt="Arrow icon left" />
            </div>
            <div class="col">
                <h3 class="h3" style="margin-top: 2rem;">Настройки приёма пищи</h3>
            </div>
            <div class="col flex justify-center align-content-center align-items-center align-self-center">
                <img class="save-icon" src="assets/img/save.svg" alt="Save icon" />
            </div>
        </div>
        <section class="content-section details">
        <h4 class="h4 p-4" style="font-weight: 600; padding-bottom: 0!important; text-align: left!important; width: 100%;">
            Завтрак
        </h4>
            <div class="row justify-between w-100 p-4" style="padding-top: 0!important;">

                <div class="col-auto justify-center align-self-center" >
                    <h4 class="h4" style="margin: 0;">Размер порции</h4>
                </div>

                <div style="padding-top: 0!important;" class="col-auto justify-center align-self-center">
                    <select name="choice" class="selection">
                        <option value="first">Маленький</option>
                        <option value="second" selected>Средний</option>
                        <option value="third">Большой</option>
                    </select>
                </div>
            </div>

            <h4 class="h4 p-4" style="font-weight: 600; padding-top: 0!important; padding-bottom: 0!important; text-align: left!important; width: 100%;">
                Фильтры рецептов
            </h4>
            <div class="row justify-between w-100 p-4" style="padding-top: 0!important;">
                <div class="col-auto justify-center align-self-center">
                    <h4 class="h4" style="margin: 0;">Время готовки</h4>
                </div>

                <div class="col-auto justify-center align-self-center" >
                    <select name="choice" class="selection">
                        <option value="first">&lt; 10 минут</option>
                        <option value="second" selected>&lt; 30 минут</option>
                        <option value="third">&lt; 40 минут</option>
                    </select>
                </div>
            </div>
            <div style="padding-top: 0!important;" class="row justify-between w-100 p-4">

                <div class="col-auto justify-center align-self-center">
                    <h4 class="h4" style="margin: 0;">Сложность</h4>
                </div>

                <div class="col-auto justify-center align-self-center">
                    <select name="choice" class="selection">
                        <option value="first">Легко</option>
                        <option value="second" selected>Средняя</option>
                        <option value="third">Придется заморочиться</option>
                    </select>
                </div>
            </div>
            <div style="padding-top: 0!important;" class="row justify-between w-100 p-4">

                <div class="col-auto justify-center align-self-center">
                    <h4 class="h4" style="margin: 0;">Кол-во блюд</h4>
                </div>

                <div class="col-auto justify-center align-self-center">
                    <select name="choice" class="selection">
                        <option value="first">3</option>
                        <option value="second" selected>Автоматически</option>
                        <option value="third">4</option>
                    </select>
                </div>
            </div>
        </section>
    </section>
</template>