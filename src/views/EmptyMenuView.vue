<template>
    <section>
        <div class="row header">
            <h3 class="h3">Твоё меню</h3>
        </div>

        <div class="container">
            <img class="cal-img" src="./assets/img/cal.svg" alt="Calendar icon"/>
            <h1 class="h1">Вы ещё не создали меню</h1>
            <p class="subtext">Нажмите на оранжевую кнопку снизу, чтобы получить меню на день</p>
        </div>

        <div class="row footer">
            <RouterLink class="btn" to="/menu">Сгенерировать меню</RouterLink>
        </div>
    </section>
</template>

<script>
export default {
    name: 'EmptyMenuView'
}
</script>